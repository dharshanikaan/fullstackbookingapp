document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('booking-form');
    const bookingList = document.getElementById('booking-list');
    const addBookingButton = document.getElementById('add-booking');

    function displayBookings() {
        fetch('/api/bookings')
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    bookingList.innerHTML = '';
                    data.bookings.forEach((booking) => {
                        const li = document.createElement('li');
                        li.className = 'list-group-item d-flex justify-content-between align-items-center';
                        li.innerHTML = `
                            <span><strong>Name:</strong> ${booking.name} | <strong>Phone:</strong> ${booking.phone} | <strong>Email:</strong> ${booking.email}</span>
                            <button class="btn btn-danger btn-sm" onclick="deleteBooking(${booking.id})">Delete</button>
                            <button class="btn btn-primary btn-sm ml-2" onclick="showEditForm(${booking.id}, '${booking.name}', '${booking.phone}', '${booking.email}')">Edit</button>
                        `;
                        bookingList.appendChild(li);
                    });
                } else {
                    alert('Failed to load bookings');
                }
            })
            .catch(error => console.error('Error fetching bookings:', error));
    }

    function addBooking() {
        const name = document.getElementById('name').value;
        const phone = document.getElementById('phone').value;
        const email = document.getElementById('email').value;

        if (name && phone && email) {
            fetch('/api/bookings/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name, phone, email })
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    form.reset();
                    displayBookings();
                } else {
                    alert('Failed to add booking');
                }
            })
            .catch(error => console.error('Error adding booking:', error));
        } else {
            alert('Please fill out all fields.');
        }
    }

    window.showEditForm = function(id, name, phone, email) {
        document.getElementById('edit-id').value = id;
        document.getElementById('edit-name').value = name;
        document.getElementById('edit-phone').value = phone;
        document.getElementById('edit-email').value = email;
        document.getElementById('edit-form-container').style.display = 'block';
    };

    function editBooking() {
        const id = document.getElementById('edit-id').value;
        const name = document.getElementById('edit-name').value;
        const phone = document.getElementById('edit-phone').value;
        const email = document.getElementById('edit-email').value;

        if (name && phone && email) {
            fetch(`/api/bookings/edit/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name, phone, email })
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    document.getElementById('edit-form-container').style.display = 'none';
                    displayBookings();
                } else {
                    alert('Failed to edit booking');
                }
            })
            .catch(error => console.error('Error editing booking:', error));
        } else {
            alert('Please fill out all fields.');
        }
    }

    window.deleteBooking = function(id) {
        fetch(`/api/bookings/delete/${id}`, {
            method: 'DELETE'
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                displayBookings();
            } else {
                alert('Failed to delete booking');
            }
        })
        .catch(error => console.error('Error deleting booking:', error));
    };

    addBookingButton.addEventListener('click', addBooking);
    document.getElementById('edit-form-submit').addEventListener('click', editBooking);

    displayBookings();
});
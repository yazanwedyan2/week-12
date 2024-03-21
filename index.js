$(document).ready(function() {
    // fetch cars from API and display on page load
    fetchCars();

    // Handle form submission to add new car
    $('#addCarForm').submit(function(event) {
        event.preventDefault();
        var formData = $(this).serialize();
        $.ajax({
            type: 'POST',
            url: '/cars', // Change the URL as per your API endpoint
            data: formData,
            success: function(response) {
                fetchCars();
                $('#addCarForm')[0].reset(); // Clear the form
            },
            error: function(xhr, status, error) {
                console.error(error);
            }
        });
    });

    // Handle delete car button click
    $(document).on('click', '.delete-btn', function() {
        var carId = $(this).data('id');
        $.ajax({
            type: 'DELETE',
            url: '/cars/' + carId, // Change the URL as per your API endpoint
            success: function(response) {
                fetchCars();
            },
            error: function(xhr, status, error) {
                console.error(error);
            }
        });
    });

    // Function to fetch cars from API and display on the page
    function fetchCars() {
        $.ajax({
            type: 'GET',
            url: '/cars', // Change the URL as per your API endpoint
            success: function(cars) {
                $('#carList').empty();
                $.each(cars, function(index, car) {
                    $('#carList').append(`
                        <li class="list-group-item">
                            ${car.make} ${car.model} (${car.year})
                            <button class="btn btn-danger delete-btn float-right" data-id="${car.id}">Delete</button>
                        </li>
                    `);
                });
            },
            error: function(xhr, status, error) {
                console.error(error);
            }
        });
    }
});

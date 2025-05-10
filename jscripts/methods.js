/*Date and time update functions*/
function get_current_time() {
    // Create a new Date object for the current date and time
    let now = new Date();

    // Get the current hour and minutes
    let hours = now.getHours(); // Returns the hour (0-23)
    let minutes = now.getMinutes(); // Returns the minutes (0-59)

    // Add a leading zero to minutes if it's less than 10
    if (minutes < 10) {
        minutes = '0' + minutes;
    }

    document.getElementById('times_display').innerText = hours + ':' + minutes;
}

function get_current_date(){
    let date = new Date();

    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();

    if (day < 10) {
        day = '0' + day;
    }
    if (month < 10) {
        month = '0' + month;
    }

    document.getElementById('date_display').innerText = day + '/' + month + '/' + year;
}

/*Image and subtext update functions*/
const img_files=["imgs/playership.png","imgs/enemyship.png","imgs/enemyship2.png"];
const img_subtexts=["Image by: John Doe", "Image by: Jane Doe", "Image by: Jan Doe"];
let indx=0;

function update_image(button_dir){
    if (button_dir === 'right') {
        if (indx === 2) {
            indx = 0;
        } else {
            indx = indx+1;
        }

    } else if (button_dir === 'left') {
        if (indx === 0) {
            indx = 2;
        } else {
            indx = indx-1;
        }
    }

    //Update the image source
    document.getElementById('ship_sprite').src = img_files[indx];
    
    //Update the subtext
    document.getElementById('image_caption').innerText = img_subtexts[indx];
}

/*registration form functionality*/
function validate_form(){
    // Select the form using querySelector instead of getElementsByClassName
    document.querySelector('.registration_form').addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent form submission

        // Clear previous error messages
        const errors = document.querySelectorAll('.error');
        errors.forEach(error => error.textContent = '');

        // Get form values
        const firstName = document.getElementById('firstName').value.trim();
        const lastName = document.getElementById('lastName').value.trim();
        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value.trim();
        const confirmPassword = document.getElementById('confirmPassword').value.trim();
        
        let hasError = false;

        // Validate first name
        if (firstName === '') {
            document.getElementById('firstNameError').textContent = 'First name is required';
            hasError = true;
        }

        // Validate last name
        if (lastName === '') {
            document.getElementById('lastNameError').textContent = 'Last name is required';
            hasError = true;
        }

        // Validate email
        const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        if (email === '') {
            document.getElementById('emailError').textContent = 'Email is required';
            hasError = true;
        } else if (!emailPattern.test(email)) {
            document.getElementById('emailError').textContent = 'Invalid email format';
            hasError = true;  
        }

        // Validate password
        const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,20}$/;
        if (password === '') {
            document.getElementById('passwordError').textContent = 'Password is required';
            hasError = true;
        } else if (!passwordPattern.test(password)) {
            document.getElementById('passwordError').textContent = 'Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, and one digit';
            hasError = true;
        }

        // Validate confirm password
        if (confirmPassword === '') {
            document.getElementById('confirmPasswordError').textContent = 'Password confirmation is required';
            hasError = true;
        } else if (password !== confirmPassword) {
            document.getElementById('confirmPasswordError').textContent = 'Passwords do not match';
            hasError = true;
        }

        // If no errors, submit the form
        if (!hasError) {
            alert('Form submitted successfully!');
        }
    });
}

// Call the validation function after the DOM is fully loaded (if necessary)
window.onload = function() {
    validate_form();
};


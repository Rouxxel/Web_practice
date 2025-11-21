/*CSRF Token Management*/
const CSRFProtection = (function() {
    const TOKEN_KEY = 'csrf_token';
    const TOKEN_EXPIRY_KEY = 'csrf_token_expiry';
    const TOKEN_LIFETIME = 3600000; // 1 hour in milliseconds

    function generateToken() {
        // Generate a random token using crypto API if available
        if (window.crypto && window.crypto.getRandomValues) {
            const array = new Uint8Array(32);
            window.crypto.getRandomValues(array);
            return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
        } else {
            // Fallback for older browsers
            return 'csrf_' + Math.random().toString(36).substring(2) + Date.now().toString(36);
        }
    }

    function getToken() {
        const token = sessionStorage.getItem(TOKEN_KEY);
        const expiry = sessionStorage.getItem(TOKEN_EXPIRY_KEY);
        
        // Check if token exists and is not expired
        if (token && expiry && Date.now() < parseInt(expiry)) {
            return token;
        }
        
        // Generate new token if expired or doesn't exist
        const newToken = generateToken();
        const newExpiry = Date.now() + TOKEN_LIFETIME;
        
        sessionStorage.setItem(TOKEN_KEY, newToken);
        sessionStorage.setItem(TOKEN_EXPIRY_KEY, newExpiry.toString());
        
        return newToken;
    }

    function validateToken(token) {
        const storedToken = sessionStorage.getItem(TOKEN_KEY);
        const expiry = sessionStorage.getItem(TOKEN_EXPIRY_KEY);
        
        if (!storedToken || !expiry) {
            return false;
        }
        
        if (Date.now() >= parseInt(expiry)) {
            return false;
        }
        
        return token === storedToken;
    }

    function injectTokenIntoForm(form) {
        // Remove existing CSRF token input if present
        const existingToken = form.querySelector('input[name="csrf_token"]');
        if (existingToken) {
            existingToken.remove();
        }
        
        // Create and inject new CSRF token
        const tokenInput = document.createElement('input');
        tokenInput.type = 'hidden';
        tokenInput.name = 'csrf_token';
        tokenInput.value = getToken();
        form.appendChild(tokenInput);
    }

    return {
        getToken: getToken,
        validateToken: validateToken,
        injectTokenIntoForm: injectTokenIntoForm
    };
})();

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
const ImageCarousel = (function() {
    // Private variables (encapsulated)
    const imgFiles = ["playership.png", "enemyship.png", "enemyship2.png"];
    const imgSubtexts = ["Image by: John Doe", "Image by: Jane Doe", "Image by: Jan Doe"];
    let currentIndex = 0;
    
    // Get the base path dynamically
    function getBasePath() {
        const imgElement = document.getElementById('ship_sprite');
        if (!imgElement) return '';
        const currentSrc = imgElement.src;
        const lastSlash = currentSrc.lastIndexOf('/');
        return currentSrc.substring(0, lastSlash + 1);
    }

    return {
        updateImage: function(buttonDir) {
            if (buttonDir === 'right') {
                currentIndex = (currentIndex + 1) % imgFiles.length;
            } else if (buttonDir === 'left') {
                currentIndex = (currentIndex - 1 + imgFiles.length) % imgFiles.length;
            }

            const basePath = getBasePath();
            const imgElement = document.getElementById('ship_sprite');
            const captionElement = document.getElementById('image_caption');
            
            if (imgElement) {
                imgElement.src = basePath + imgFiles[currentIndex];
            }
            if (captionElement) {
                captionElement.innerText = imgSubtexts[currentIndex];
            }
        }
    };
})();

// Wrapper function for backward compatibility
function update_image(button_dir) {
    ImageCarousel.updateImage(button_dir);
}

/*registration form functionality*/
const FormValidator = (function() {
    let isInitialized = false;

    return {
        init: function() {
            if (isInitialized) return; // Prevent double initialization
            
            const form = document.querySelector('.registration_form');
            if (!form) return;
            
            // Inject CSRF token into form
            CSRFProtection.injectTokenIntoForm(form);
            
            form.addEventListener('submit', function(event) {
                event.preventDefault(); // Prevent form submission

                // Clear previous error messages
                const errors = document.querySelectorAll('.error');
                errors.forEach(error => error.textContent = '');

                // Validate CSRF token
                const csrfToken = form.querySelector('input[name="csrf_token"]');
                if (!csrfToken || !CSRFProtection.validateToken(csrfToken.value)) {
                    alert('Security token validation failed. Please refresh the page and try again.');
                    // Regenerate token
                    CSRFProtection.injectTokenIntoForm(form);
                    return;
                }

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
                    // In a real application, this would send data to a server
                    // For now, we'll just show success and regenerate token
                    alert('Form submitted successfully!');
                    
                    // Regenerate CSRF token for next submission
                    CSRFProtection.injectTokenIntoForm(form);
                    
                    // Reset form
                    form.reset();
                }
            });
            
            isInitialized = true;
        }
    };
})();

// Initialize form validation when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', FormValidator.init);
} else {
    FormValidator.init();
}
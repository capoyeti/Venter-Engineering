// Initialize EmailJS
(function() {
    emailjs.init("YOUR_PUBLIC_KEY"); // Replace with your EmailJS public key
})();

function sendEmail(event) {
    event.preventDefault();
    
    const formStatus = document.getElementById('formStatus');
    const submitButton = event.target.querySelector('button[type="submit"]');
    
    // Disable submit button and show loading state
    submitButton.disabled = true;
    submitButton.textContent = 'Sending...';
    
    // Get form data
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    // Create XHR request
    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'send_email.php', true);
    xhr.setRequestHeader('Content-Type', 'application/json');

    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                try {
                    var response = JSON.parse(xhr.responseText);
                    if (response.success) {
                        formStatus.textContent = 'Thank you! Your message has been sent.';
                        formStatus.className = 'form-status success';
                        event.target.reset();
                    } else {
                        throw new Error(response.error || 'Failed to send message');
                    }
                } catch (e) {
                    formStatus.textContent = 'Sorry, there was an error sending your message. Please try again later.';
                    formStatus.className = 'form-status error';
                    console.error('Error:', e);
                }
            } else {
                formStatus.textContent = 'Sorry, there was an error sending your message. Please try again later.';
                formStatus.className = 'form-status error';
            }

            // Re-enable submit button
            formStatus.classList.remove('hidden');
            submitButton.disabled = false;
            submitButton.textContent = 'Send Message';
        }
    };

    // Send the request
    xhr.send(JSON.stringify({
        name: name,
        email: email,
        message: message
    }));
}

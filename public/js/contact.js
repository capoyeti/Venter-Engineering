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
    
    // Prepare template parameters
    const templateParams = {
        from_name: name,
        from_email: email,
        to_email: 'anton@venterengineering.co.za',
        message: message
    };

    // Send email using EmailJS
    emailjs.send('default_service', 'YOUR_TEMPLATE_ID', templateParams)
        .then(function(response) {
            formStatus.textContent = 'Thank you! Your message has been sent.';
            formStatus.className = 'form-status success';
            formStatus.classList.remove('hidden');
            event.target.reset();
        }, function(error) {
            formStatus.textContent = 'Sorry, there was an error sending your message. Please try again later.';
            formStatus.className = 'form-status error';
            formStatus.classList.remove('hidden');
        })
        .finally(function() {
            submitButton.disabled = false;
            submitButton.textContent = 'Send Message';
        });
}

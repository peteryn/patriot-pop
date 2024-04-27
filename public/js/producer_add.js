document.addEventListener('DOMContentLoaded', function() {
    const addButtons = document.querySelectorAll('.form-submit button');
    addButtons.forEach(button => {
        button.addEventListener('click', function(event) {
            event.preventDefault();

            document.querySelectorAll('.success-popup').forEach(popup => {
                popup.style.display = 'none';
            });

            const panel = button.closest('.panel');
            const successPopup = panel.querySelector('.success-popup');
            successPopup.style.display = 'block';

            setTimeout(function() {
                successPopup.style.display = 'none';
            }, 3000);
        });
    });

    document.body.addEventListener('click', function(event) {
        if (event.target.classList.contains('close-popup')) {
            event.target.closest('.success-popup').style.display = 'none';
        }
    });
});

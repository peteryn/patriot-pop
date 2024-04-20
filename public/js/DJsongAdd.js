document.addEventListener('DOMContentLoaded', function() {

    function showSuccessPopup() {
      
        const successPopup = document.getElementById('success-popup');
        successPopup.style.display = 'block';
        setTimeout(function() {
        successPopup.style.display = 'none';
      }, 2000);
    }
    const addIcons = document.querySelectorAll('.add-icon');
    addIcons.forEach(icon => {
      icon.addEventListener('click', function(event) {
        document.querySelectorAll('.success-popup').forEach(popup => {
          popup.style.display = 'none';
        });
        const panel = icon.closest('.panel');
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
    document.body.addEventListener('click', function(event) {
      if (event.target.classList.contains('undo')) {
        alert('The song has been unadded!');
        event.target.closest('.success-popup').style.display = 'none';
      }
    });
  });
  
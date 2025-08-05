const logo = document.querySelector('.logo');
logo.addEventListener("click", function(){
    window.location.href = "index.html";
});

const startButtons = document.querySelectorAll('.start-button, .start');
startButtons.forEach(button => {
  button.addEventListener('click', () => {
    window.location.href = 'start.html';
  });
});


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

const blog = document.querySelector('.blog');
blog.addEventListener("click", function(){
    window.location.href = "blog.html";
});

const hamburgerButton = document.getElementById('hamburger-btn');
const navLinks = document.getElementById('nav-links');

hamburgerButton.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});




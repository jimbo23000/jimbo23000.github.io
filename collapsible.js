document.addEventListener('DOMContentLoaded', function () {
  const collapsible = document.querySelectorAll('.collapsible');
  collapsible.forEach(button => {
    button.addEventListener('click', function () {
      this.classList.toggle('active');
      const content = this.nextElementSibling;
      content.style.display = content.style.display === 'block' ? 'none' : 'block';
    });
  });
});
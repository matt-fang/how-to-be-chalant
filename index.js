document.querySelectorAll('.copy-btn').forEach(button => {
  button.addEventListener('click', () => {
    const message = button.parentElement.textContent.replace('Copy', '').trim();
    navigator.clipboard.writeText(message).then(() => {
      button.textContent = 'Copied!';
      setTimeout(() => (button.textContent = 'Copy'), 1000);
    });
  });
});
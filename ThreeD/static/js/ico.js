const solidico = document.querySelector('.solidico');

let isDraggingSolidico = false;
let previousMouseXSolidico = 0;
let previousMouseYSolidico = 0;
let rotationXSolidico = 0;
let rotationYSolidico = 0;

solidico.addEventListener('mousedown', (event) => {
  isDraggingSolidico = true;
  previousMouseXSolidico = event.clientX;
  previousMouseYSolidico = event.clientY;

  // Prevent animation during drag
  solidico.style.animation = 'none';
  solidico.style.transition = 'none';
});

document.addEventListener('mouseup', () => {
  if (isDraggingSolidico) {
    isDraggingSolidico = false;
    solidico.style.transition = 'transform 0.3s ease-out';
    setTimeout(() => {
      solidico.style.animation = 'spin 16s infinite linear';
    }, 300);
  }
});

document.addEventListener('mousemove', (event) => {
  if (!isDraggingSolidico) return;

  const deltaX = event.clientX - previousMouseXSolidico;
  const deltaY = event.clientY - previousMouseYSolidico;
  rotationYSolidico += deltaX * 0.2;
  rotationXSolidico -= deltaY * 0.2;

  solidico.style.transform = `rotateX(${rotationXSolidico}deg) rotateY(${rotationYSolidico}deg)`;

  previousMouseXSolidico = event.clientX;
  previousMouseYSolidico = event.clientY;
});

const dodecahedron = document.querySelector('.dodecahedron');

let isDraggingDodecahedron = false;
let previousMouseXDodecahedron = 0;
let previousMouseYDodecahedron = 0;
let rotationXDodecahedron = 0;
let rotationYDodecahedron = 0;

dodecahedron.addEventListener('mousedown', (event) => {
  isDraggingDodecahedron = true;
  previousMouseXDodecahedron = event.clientX;
  previousMouseYDodecahedron = event.clientY;

  dodecahedron.style.animation = 'none';
  dodecahedron.style.transition = 'none';
});

document.addEventListener('mouseup', () => {
  if (isDraggingDodecahedron) {
    isDraggingDodecahedron = false;
    dodecahedron.style.transition = 'transform 0.3s ease-out';
    setTimeout(() => {
      dodecahedron.style.animation = 'spin 16s infinite linear';
    }, 300);
  }
});

document.addEventListener('mousemove', (event) => {
  if (!isDraggingDodecahedron) return;

  const deltaX = event.clientX - previousMouseXDodecahedron;
  const deltaY = event.clientY - previousMouseYDodecahedron;
  rotationYDodecahedron += deltaX * 0.2;
  rotationXDodecahedron -= deltaY * 0.2;

  dodecahedron.style.transform = `rotateX(${rotationXDodecahedron}deg) rotateY(${rotationYDodecahedron}deg)`;

  previousMouseXDodecahedron = event.clientX;
  previousMouseYDodecahedron = event.clientY;
});
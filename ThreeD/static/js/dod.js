const dodecahedron = document.querySelector('.dodecahedron');

let isDraggingdod = false;
let previousMouseX = 0;
let previousMouseY = 0;
let rotationX = 0;
let rotationY = 0;

// Function to start dragging
dodecahedron.addEventListener('mousedown', (event) => {
  isDraggingdod = true;
  previousMouseX = event.clientX;
  previousMouseY = event.clientY;
});

// Function to stop dragging
document.addEventListener('mouseup', () => {
  isDraggingdod = false;
});

// Function to rotate the dodecahedron based on mouse movement
document.addEventListener('mousemove', (event) => {
  if (!isDraggingdod) return;

  const deltaX = event.clientX - previousMouseX;
  const deltaY = event.clientY - previousMouseY;
  rotationY += deltaX * 0.2;
  rotationX -= deltaY * 0.2;

  // Apply the rotation
  dodecahedron.style.transform = `rotateX(${rotationX}deg) rotateY(${rotationY}deg)`;

  previousMouseX = event.clientX;
  previousMouseY = event.clientY;
});

// Optional: Add smooth rotation stop on mouseup
dodecahedron.style.transition = 'transform 0.1s ease';
document.addEventListener('mouseup', () => {
  isDraggingdod = false;
  dodecahedron.style.transition = 'transform 0.3s ease-out';
});

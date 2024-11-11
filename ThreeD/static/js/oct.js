const solid = document.querySelector('.solid');

let isDraggingoct = false;
let hasMoved = false; // Tracks if there's actual dragging movement
let previousX, previousY;
let rotateX = 0; // Initial rotation X
let rotateY = 0; // Initial rotation Y

// Mouse down event to start tracking
solid.addEventListener('mousedown', (e) => {
  isDraggingoct = true;
  hasMoved = false; // Reset movement tracker
  previousX = e.clientX;
  previousY = e.clientY;
  solid.style.cursor = 'grabbing';
});

// Mouse move event to rotate if dragging
window.addEventListener('mousemove', (e) => {
  if (!isDraggingoct) return;

  // Calculate the change in position
  const deltaX = e.clientX - previousX;
  const deltaY = e.clientY - previousY;

  // Check if there's actual movement
  if (Math.abs(deltaX) > 0 || Math.abs(deltaY) > 0) {
    hasMoved = true;
  }

  // Update rotations based on drag distance
  rotateY += deltaX * 0.2;
  rotateX -= deltaY * 0.2;

  // Apply transformations
  solid.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;

  // Update previous coordinates
  previousX = e.clientX;
  previousY = e.clientY;
});

// Mouse up event to stop dragging
window.addEventListener('mouseup', () => {
  isDraggingoct = false;
  solid.style.cursor = 'grab';

  // If it was just a click, reset to the last transform without update
  if (!hasMoved) {
    solid.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  }
});

const cube = document.querySelector('.cube');
let isMouseDown = false;
let rotX = -15;
let rotY = 15;``
let startX, startY;

cube.addEventListener('mousedown', e => {
  isMouseDown = true;
  startX = e.pageX - rotY;
  startY = e.pageY - rotX;
});

document.addEventListener('mousemove', e => {
  if (!isMouseDown) return;

  rotY = e.pageX - startX;
  rotX = e.pageY - startY;
  
  cube.style.transform = `rotateX(${-rotX}deg) rotateY(${rotY}deg)`;
});

document.addEventListener('mouseup', () => {
  isMouseDown = false;
});

// Prevent dragging from causing unwanted selections
cube.addEventListener('dragstart', e => {
  e.preventDefault();
});


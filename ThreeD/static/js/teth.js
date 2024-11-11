// Wrap the code in an IIFE (Immediately Invoked Function Expression) to create a local scope
(function () {
    const polyhedron = document.querySelector('.polyhedron');

    let isDraggingteth = false;
    let startX = 0;
    let startY = 0;
    let rotationX = 0;
    let rotationY = 0;

    // Function to start dragging
    function startDrag(event) {
        isDraggingteth = true;
        startX = event.clientX;
        startY = event.clientY;

        // Prevent text selection and unwanted drag behavior
        event.preventDefault();
    }

    // Function to drag the polyhedron
    function drag(event) {
        if (!isDraggingteth) return;

        const dx = event.clientX - startX;
        const dy = event.clientY - startY;

        // Update rotation based on mouse movement
        rotationX += dy * 0.5; // Adjust sensitivity here
        rotationY += dx * 0.5; // Adjust sensitivity here

        // Apply the rotation to the polyhedron
        polyhedron.style.transform = `rotateX(${rotationX}deg) rotateY(${rotationY}deg)`;

        startX = event.clientX;
        startY = event.clientY;
    }

    // Function to stop dragging
    function stopDrag() {
        isDraggingteth = false;
    }

    // Event listeners for mouse actions
    polyhedron.addEventListener('mousedown', startDrag);
    window.addEventListener('mousemove', drag);
    window.addEventListener('mouseup', stopDrag);
})();

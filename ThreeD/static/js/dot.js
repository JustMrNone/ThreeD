// Select all dot elements and the scene element
document.addEventListener('DOMContentLoaded', () => {
    const dots = document.querySelectorAll('.dot-nav-item');
    const scene1 = document.querySelector('.scene1');
    const scene2 = document.querySelector('.scene2');
    const scene3 = document.querySelector('.scene3');
    const scene4 = document.querySelector('.scene4');
    // Function to switch active dot and update scene visibility
    function setActiveDot(index) {
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
        });
        
        // Show scene1 only if the first dot (index 0) is active
        if (index === 0) {
            scene1.classList.add('visible');
            scene2.classList.remove('visible');
            scene3.classList.remove('visible');
            scene4.classList.remove('visible');
        } else if (index == 1) {
            scene1.classList.remove('visible');
            scene2.classList.add('visible');
            scene3.classList.remove('visible');
            scene4.classList.remove('visible');
        } else if (index == 2){
            scene3.classList.add('visible');
            scene1.classList.remove('visible');
            scene2.classList.remove('visible'); 
            scene4.classList.remove('visible');
        }else if (index == 3){
            scene1.classList.remove('visible');
            scene2.classList.remove('visible');
            scene3.classList.remove('visible');
            scene4.classList.add('visible');
        }

        
    }

    // Add event listeners to each dot for switching
    setActiveDot(0);

    // Add event listeners for each dot
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            setActiveDot(index);
            console.log(`Switched to mode ${index}`);
        });
    });
});

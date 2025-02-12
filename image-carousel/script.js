const imgsContainer = document.getElementById('imgs');
const leftBtn = document.getElementById('left');
const rightBtn = document.getElementById('right');
const images = document.querySelectorAll('#imgs img');

let idx = 0;
let interval = setInterval(run, 3000); // Adjusted interval for better visibility

function run() {
    idx++;
    changeImage();
}

function changeImage() {
    if (idx >= images.length) {
        idx = 0;
    } else if (idx < 0) {
        idx = images.length - 1;
    }

    imgsContainer.style.transition = 'transform 0.5s ease-in-out'; // Smooth transition
    imgsContainer.style.transform = `translateX(${-idx * 500}px)`;
}

function resetInterval() {
    clearInterval(interval);
    interval = setInterval(run, 3000);
}

rightBtn.addEventListener('click', () => {
    idx++;
    changeImage();
    resetInterval();
});

leftBtn.addEventListener('click', () => {
    idx--;
    changeImage();
    resetInterval();
});

// Pause auto-slide when the user hovers over the images
imgsContainer.addEventListener('mouseenter', () => clearInterval(interval));
imgsContainer.addEventListener('mouseleave', resetInterval);

const counters = document.querySelectorAll('.counter');

counters.forEach(counter => {
    counter.innerText = '0';
    
    const target = +counter.getAttribute('data-target');
    const speed = target / 100; // Adjust speed dynamically

    const updateCounter = () => {
        const current = +counter.innerText;
        const increment = Math.ceil(speed); // Ensure rounding avoids small float issues

        if (current < target) {
            counter.innerText = current + increment > target ? target : current + increment;
            requestAnimationFrame(updateCounter);
        } else {
            counter.innerText = target; // Ensure exact final value
        }
    };

    updateCounter();
});

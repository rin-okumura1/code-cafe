document.addEventListener('DOMContentLoaded', function() {
    const inputs = document.querySelectorAll('.carousel input');
    const images = document.querySelectorAll('.carousel img');

    function showSlide(index) {
        images.forEach((img, idx) => {
            img.classList.remove('active');
            img.classList.remove('rotate-scale-up'); 
            inputs[idx].checked = false;
            if (index === idx) {
                img.classList.add('active');
                img.classList.add('rotate-scale-up');
                inputs[idx].checked = true;
            }
        });
    }

    inputs.forEach((input, index) => {
        input.addEventListener('change', () => {
            showSlide(index);
        });
    });

    let currentIndex = 0;

    function prevSlide() {
        currentIndex = (currentIndex === 0) ? images.length - 1 : currentIndex - 1;
        showSlide(currentIndex);
    }

    function nextSlide() {
        currentIndex = (currentIndex === images.length - 1) ? 0 : currentIndex + 1;
        showSlide(currentIndex);
    }

    window.prevSlide = prevSlide;
    window.nextSlide = nextSlide;

    showSlide(currentIndex);
});

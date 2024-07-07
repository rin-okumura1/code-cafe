document.addEventListener('DOMContentLoaded', function() {
    const buttons = document.querySelectorAll('.toggle-button');

    buttons.forEach(button => {
        button.addEventListener('click', function() {
            const info = this.parentElement.querySelector('.additional-info');
            info.classList.toggle('show');
            if (info.classList.contains('show')) {
                this.textContent = 'Show Less';
            } else {
                this.textContent = 'Show More';
            }
        });
    });
});
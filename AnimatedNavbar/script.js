

document.addEventListener("DOMContentLoaded", function() {
    const togggle = document.getElementById('toggle')
    const nav = document.getElementById('nav')

    togggle.addEventListener('click', () => {
        nav.classList.toggle('active')
    })
});

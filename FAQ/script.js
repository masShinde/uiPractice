

document.addEventListener("DOMContentLoaded", function() {
    const toggleButtons = document.querySelectorAll('.faq-toggle')
    const faqs = document.querySelectorAll('.faq')

    toggleButtons.forEach((toggle )=> {
        toggle.addEventListener(('click'), ()=> {
            toggle.parentNode.classList.toggle('active')
        })
    })


});

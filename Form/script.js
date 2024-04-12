

document.addEventListener("DOMContentLoaded", function() {
    const labels = document.querySelectorAll('.form-control label')

    labels.forEach(label => {
        label.innerHTML = label?.innerText?.split('')
                            .map((char, i) => `<span style="transition-delay:${i * 50}ms" >${char}</span>`)
                            .join('')
    })
});



document.addEventListener("DOMContentLoaded", function() {
    const glassList = document.querySelector('.glass-list')
    const targetGlass = document.querySelector('.target')
    const target = 2000
    const intervals = 8
    const singleConsumption = Math.ceil(target / intervals)
    const remainingSection = document.querySelector('.remaining-section')
    const filledSection = document.querySelector('.filled-section')

    function renderGlasses(){
        Array.from(Array(intervals)).forEach((_, index)=> {
            const glassDiv = document.createElement('div')
            glassDiv.setAttribute('data-index', index + 1)
            glassDiv.classList.add('glass')
            glassDiv.innerText = `${singleConsumption} ml`
            glassList.appendChild(glassDiv)
        })
    }

    function handleGlassSelection(e){
        const eventTarget = e?.target
        if(!eventTarget?.classList.contains('glass'))
            return
        const dataIndex = eventTarget?.getAttribute('data-index')
        fillTargetGlass(dataIndex)
        fillGlasses(dataIndex)
    }

    function fillTargetGlass(index){
        targetGlass.classList.add('filled-target')
        const targetTitle = targetGlass.querySelector('h2')
        const remainingTarget = (target - ( index * singleConsumption))
        const fillPercentage = ((target - remainingTarget)/target) * 100
        filledSection.style.height = `${fillPercentage}%`
        remainingSection.style.height = `${(100 - fillPercentage)}%`
        filledSection.innerText = `${fillPercentage}%`
        targetTitle.innerText = `${(remainingTarget/ 1000)} L`
    }

    function fillGlasses(index){
        const glasses = document.querySelectorAll('.glass-list .glass')
        glasses?.forEach((glass, i )=> {
            if(i + 1  <= index)
                glass.classList.add('filled')
            else
                glass.classList.remove('filled')
        })
    }

    glassList.addEventListener('click', handleGlassSelection)

    renderGlasses()
});

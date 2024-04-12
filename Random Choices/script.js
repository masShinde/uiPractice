

document.addEventListener("DOMContentLoaded", function() {
    const textInput = document.querySelector('.text')
    const choiceList = document.querySelector('.choice-list')
    document.addEventListener('keypress', (e)=> {
        if(e.key == "Enter"){
            const value = textInput.value?.trim();
            textInput.value = ""
            if(!value) return
            const choices = value?.split(',')
            let length = choices?.length;
            choiceList.innerHTML= ""
            choices.map(choice => {
                const choiceElm = document.createElement('span')
                choiceElm.classList.add('choice')
                choiceElm.innerText = choice?.trim()
                choiceList.appendChild(choiceElm)
            })
            let rdm = Math.random()
            let random = 3000 / (Math.floor( (rdm == 0 ? 1 : rdm ) * length) * 5)
            console.log(random, rdm);
            let currentIndex = 0
            const intervalId = setInterval(()=> {
                    highlightChoice(currentIndex)
            }, random)

            setTimeout(()=> {
                clearInterval(intervalId)
            }, 3000)

            function highlightChoice(){
                const choices = document.getElementsByClassName('choice')
                     if(currentIndex == 0){
                         choices[length - 1].classList.remove('active')
                     }else{
                         choices[currentIndex - 1].classList.remove('active')
                     }
                     choices[currentIndex].classList.add('active')
                     if(currentIndex === length - 1)
                         currentIndex = 0
                     else {
                         currentIndex++;     
                     }  
             }
        }
    })

});

document.addEventListener("DOMContentLoaded", function() {
    const queueInputs= Array.from({length: 5},()=> Array.from({length: 0}, () => 0))
    const totals = Array.from({length: 5}, () => 0)
    const inputElm = document.querySelector(".queue-input")
    const buttonElm = document.querySelector(".submit-button")
    const clearBtn = document.querySelector(".clear-button")
    const queueContainer = document.querySelector(".queue-container")

    const removeElmFromQueue = () => {
        queueInputs?.forEach(queue => {
            if(queue[0] <= 1 || isNaN(queue[0]))
                queue.shift()
            else
                --queue[0]
        })
        renderQueues()
    }

    const intervalId = setInterval(()=> {

        removeElmFromQueue()
    }, 5000)

    const getTotalofEachQueue = () => {
        queueInputs?.map((queue, index) => {
            totals[index] = queue?.reduce((prev, cur)=> {
                prev += cur
                return prev
            },0)
        })
    }

    const getIndexOfLeastTotal = () => {
        let minIndex = 0
        for(let i =1; i< totals?.length; i++){
            if(totals[i] < totals[minIndex])
                minIndex = i
        }
        return minIndex
    }
    
    const addValueToQueue = (val) => {
        getTotalofEachQueue()
        const minIndex = getIndexOfLeastTotal()
        queueInputs[minIndex].push(val)
        renderQueues()
    }

    const handleButtonClick = (e) => {
        e.preventDefault()
        const inputValue = inputElm.value
        addValueToQueue(inputValue)
        inputElm.value = ""
    }

    const addElementsToQueue = (wrapperElm, queue) => {
        queue?.forEach((val)=> {
            if(val > 0){
                const valElem = document.createElement('div')
                valElem.classList.add('queue-val')
                valElem.innerText = val
                wrapperElm.appendChild(valElem)
            }
        })
    }
    
    const renderQueues = () => {
        console.log(queueInputs);
        queueContainer.innerHTML = ""
        queueInputs.forEach(queue => {
            const wrapperElm = document.createElement('div')
            wrapperElm.classList.add('queue')
            addElementsToQueue(wrapperElm, queue)
            queueContainer.appendChild(wrapperElm)
        })
    }

    const handleClearInterval = () => {
        clearInterval(intervalId)
    }
    
    buttonElm.addEventListener('click', handleButtonClick)
    clearBtn.addEventListener('click', handleClearInterval)
    renderQueues()


});


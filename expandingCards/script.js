

document.addEventListener("DOMContentLoaded", function() {
    const container = document.getElementsByClassName('container')?.[0]
    
    const isPanelTarget = (e) => {
        return e?.target?.classList?.contains('panel')
    }

    const isPanelActive = (e) => {
        return e?.target?.classList?.contains('active')
    }

    // to allow multiple panel selections
    // const updatePanelActiveState = (e) => {
    //     if(e?.target?.classList?.contains('active')){
    //         e.target.classList.remove('active')
    //     }else{
    //         e.target.classList.add('active')
    //     }
    // }

    const removeAllActiveState = () => {
        const panels = document?.querySelectorAll('.panel')
        panels?.forEach(panel => {
            panel?.classList?.remove('active')
        });
    }

     // to allow multiple panel selections
    const updatePanelActiveState = (e) => {
        removeAllActiveState()
        e?.target?.classList?.add('active')
    }

    const handleClick = (e) => {
        if(isPanelTarget(e)){
            updatePanelActiveState(e)
        }
    }

    container.addEventListener('click', handleClick) 
});

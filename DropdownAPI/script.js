const containerElm = document.querySelector("#container")
const URL = "https://run.mocky.io/v3/ceba5011-b324-4485-a5a6-fcf89ce68b66"
const ip = document.querySelector(".ip")
const cb = document.querySelector(".cb")
ip.addEventListener('input', handleInputChange)

cb.addEventListener('click', handleCheck)


function handleCheck(e){
    console.log(e.target.checked);
}   

function select(selector) {
    const element = document.querySelector(selector);
    const queue = [];
    let isProcessing = false;
  
    const processQueue = () => {
      if (!isProcessing && queue.length > 0) {
        isProcessing = true;
        const task = queue.shift();
        task();
      }
    };
  
    const addToQueue = (task) => {
      queue.push(task);
      processQueue();
    };
  
    const chain = {
      color: function(color) {
        const colorChange = () => {
          element.style.color = color;
          isProcessing = false;
          processQueue();
        };
  
        addToQueue(colorChange);
  
        return chain;
      },
      wait: function(milliseconds) {
        const waitTask = () => {
          setTimeout(() => {
            isProcessing = false;
            processQueue();
          }, milliseconds);
        };
  
        addToQueue(waitTask);
  
        return chain;
      }
    };
  
    return chain;
  }
  


function handleInputChange(e){
    console.log(e.target.value);
}   

function renderDropDown(){
    fetchData()?.then(data => createDropDownElm(data))
}

function createDropDownElm(data){
    const elm = document.createElement("select")
    elm.addEventListener("change", handleSelection)
    elm.name = "Countries"
    elm.classList.add("drop-down")
    elm.appendChild(renderOptionElm({text: "Select Country", value: ""}, -1, true, true))
    data?.map((option, i)=>{
        elm.appendChild(renderOptionElm(option, i))
    })
    containerElm.appendChild(elm)
}

function handleSelection(event){
    console.log(event.target.value);
}


function renderOptionElm(option, index, isDisabled=false, isSelected = false){
    const elm = document.createElement("option")
    elm.classList.add("drop-down-item")
    elm.setAttribute("data-index", index)
    elm.innerText = option?.text
    elm.value = option?.value
    elm.disabled = isDisabled
    elm.selected = isSelected
    return elm
}

function fetchData(){
    return fetch(URL).then((result) => {
        return result
    })
    .then(res => res.json())
}

// renderDropDown()

select("#myDiv").color('red').wait(1000).color('blue').wait(2000).color('orange')
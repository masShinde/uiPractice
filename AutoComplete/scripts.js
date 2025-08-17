document.addEventListener("DOMContentLoaded", () => {
  const inputElm = document.querySelector("#auto-complete-input");
  const suggestionsWrapper = document.querySelector("#suggestion-wrapper");
  const suggestions = [
    "test1",
    "test2",
    "test3",
    "test4",
    "test40",
    "test50",
    "test20",
    "test11",
  ];

  function handleSuggestionClick(e) {
    const targetVal = e?.target?.getAttribute("target-val")

    if(targetVal){
        inputElm.value = targetVal
        suggestionsWrapper.innerHTML = ""
    }
  }

  suggestionsWrapper.addEventListener("click", handleSuggestionClick);

  function createSuggestionItem(value, index) {
    const divElm = document.createElement("div");
    const className = `suggestion-item-${index}`
    divElm.setAttribute("target-val", value)
    divElm.className = className;
    divElm.innerText = value;
    return divElm;
  }

  function updateSuggestions(filteredSuggestions) {
    suggestionsWrapper.innerHTML = "";
    if (filteredSuggestions?.length > 0) {
      const fragment = document.createDocumentFragment();
      filteredSuggestions.forEach((suggestedValue, index) => {
        fragment.appendChild(createSuggestionItem(suggestedValue, index));
      });
      suggestionsWrapper.appendChild(fragment);
    } else {
      suggestionsWrapper.appendChild(
        createSuggestionItem("No Suggestions found!")
      );
    }
  }

  function filterSuggestionValue(value) {
    return suggestions.filter((suggestion) => suggestion?.includes(value));
  }

  function onInputChangeHandler(e) {
    const value = e?.target?.value ?? "";
    if (value) {
      const filteredSuggestions = filterSuggestionValue(value);
      updateSuggestions(filteredSuggestions);
    }
  }

  function debounceMethod(fn, threshold) {
    let timerId = null;

    return (...args) => {
      if (timerId) {
        clearTimeout(timerId);
      }
      timerId = setTimeout(() => {
        fn.call(this, ...args);
        timerId = null;
      }, threshold);
    };
  }

  const debouncedInputHandler = debounceMethod(onInputChangeHandler, 600);

  inputElm.addEventListener("input", debouncedInputHandler);
});

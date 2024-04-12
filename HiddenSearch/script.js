

document.addEventListener("DOMContentLoaded", function() {
    const searchButton = document.getElementsByClassName("search-button")?.[0]
    const searchInput = document.querySelectorAll(".search-wrapper")?.[0]
    searchButton?.addEventListener('click', () => {
        if(searchInput.classList.contains('hide')){
            searchInput.classList.remove('hide')
            searchButton.classList.remove('button-hide')
        }else{
            searchInput.classList.add('hide')
            searchButton.classList.add('button-hide')
        }
    })
});

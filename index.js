let clickedIp = false;
let categorySelected;

document.addEventListener("DOMContentLoaded", ()=>{

    categorySelected = document.getElementById("vip1");
    document.addEventListener("click", (e) => {
        if (!e.target.classList.contains("button_category")) return;
        e.preventDefault();
        const element = e.target;
        if (!element.classList.contains("category_selected")){
            categorySelected.classList.remove("category_selected");
            element.classList.add("category_selected");
            categorySelected = element;
        }
    });

});
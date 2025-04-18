let clickedIp = false;
let categorySelected;
let pageSelected;

document.addEventListener("DOMContentLoaded", ()=>{

    categorySelected = document.getElementById("vip1"); //definindo a categoria selecionada por padrão
    pageSelected = document.getElementById("shop_button"); // definindo a página selecionada por padrão

    document.addEventListener("click", (e) => {

        const element = e.target;
        if (element.classList.contains("button")) { // configurando botão das páginas
            e.preventDefault();
            window.scrollTo(0, 0);
            if (!element.classList.contains("button_selected")){
                pageSelected.classList.remove("button_selected");
                element.classList.add("button_selected");
                pageSelected = element;
            }
            return;
        }

        if (element.classList.contains("button_category")) { // configurando botão das categorias
            e.preventDefault();
            if (!element.classList.contains("category_selected")){
                categorySelected.classList.remove("category_selected");
                element.classList.add("category_selected");
                categorySelected = element;
            }
        }
        
    });

});
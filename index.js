let clickedIp = false;
let pageSelected;

document.addEventListener("DOMContentLoaded", ()=>{

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
        
    });

});
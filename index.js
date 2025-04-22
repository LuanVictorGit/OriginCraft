let clickedIp = false;

let pageSelected;
document.addEventListener("DOMContentLoaded", ()=>{

    resetPages();
    document.addEventListener("click", (e) => {

        const element = e.target;
        if (element.classList.contains("button") || element.id === "terms_button") { // configurando botão das páginas
            e.preventDefault();
            if (!element.classList.contains("button_selected")){
                window.scrollTo(0, 0);
                if (document.getElementsByClassName("button_selected").length > 0) document.getElementsByClassName("button_selected")[0].classList.remove("button_selected");
                if (pageSelected) pageSelected.classList.remove("button_selected");
                element.classList.add("button_selected");
                pageSelected = element;
                if (document.getElementsByClassName("selectedPage").length > 0) document.getElementsByClassName("selectedPage")[0].classList.remove("selectedPage");
                let elementClicked;
                switch(pageSelected.id) {
                    case "shop_button":
                        elementClicked = document.getElementById("contentMainPage");
                        break;
                    case "wiki_button":
                        elementClicked = document.getElementById("contentWikiPage");
                        if (document.getElementsByClassName("buttonWiki")[0]) document.getElementsByClassName("buttonWiki")[0].click();
                        break;
                    case "terms_button":
                        elementClicked = document.getElementById("contentTermsPage");
                        break;
                }
                resetPages();
                if (elementClicked) {
                    elementClicked.classList.add("selectedPage");
                    elementClicked.style.display = null;
                }
            }
            return;
        }
    });
    document.getElementById("shop_button").click(); // inicializando a pagina principal
});

function resetPages(){
    document.getElementById("contentMainPage").style.display = "none";
    document.getElementById("contentWikiPage").style.display = "none";
    document.getElementById("contentTermsPage").style.display = "none";
}
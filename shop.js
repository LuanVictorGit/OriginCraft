document.addEventListener("DOMContentLoaded", async () => {
    updateCategorys();

    document.addEventListener("click", (e) => {
        const element = e.target;
        if (!element.classList.contains("button_category")) return;
        e.preventDefault();
        if (element.classList.contains("category_selected")) return;
        categorySelected.classList.remove("category_selected");
        element.classList.add("category_selected");
        categorySelected = element;
        onClickCategory(json["categorys"][element.id.split("_")[1]]);
    });
});

let json;
async function updateCategorys() {
    // conteudo das categorias
    const contentCategorys = document.getElementById("contentCategorysShop");
    const req = await fetch("https://jogar.luandev.blog.br:3001/config");
    if (!req || !req.ok) {
        console.log("Não foi possivel conectar as categorias da loja, aguarde....");
        setTimeout(() => {
            updateCategorys();
        }, 5000);
        return;
    }

    json = await req.json();
    if (!json){
        console.log("Não foi possivel pegar o json da loja, aguarde....");
        setTimeout(() => {
            updateCategorys();
        }, 5000);
        return;
    }

    contentCategorys.innerHTML = "";
    
    let i = 0;
    for(let element of json["categorys"]) {
        let nameCategory = element["name"];
        let imagePath = element["pathIcon"];

        var htmlCategory = `
                <a href="#" title="${nameCategory}" class="button_category" id="category_${i}">
                    <p>${nameCategory}</p>
                    <img src="https://jogar.luandev.blog.br:3001/image/${imagePath}" alt="image gold ingot">
                </a>
        `;
        contentCategorys.innerHTML += htmlCategory;
        i++;
    }

    if (contentCategorys.childElementCount > 0) {
        var element = document.getElementsByClassName("button_category")[0];
        element.classList.add("category_selected");
        categorySelected = element;
        onClickCategory(json["categorys"][0]);
    } else {
        contentCategorys.innerHTML = `<div class="loader"></div>`;
    }    
}

function onClickItemShop(item){

}

let categorySelected;
async function onClickCategory(category) {
    const contentItems = document.getElementById("contentItemsShop");
    let delay = 0.1;

    let html = "";
    for(let item of category["items"]) {
        const title = item["title"];
        const subtitle = item["subtitle"];
        const description = item["description"];
        const iconPathItem = item["iconPath"];
        const price = item["price"];

        var htmlItem = `
                <a href="#" onclick="onClickItemShop(${item})" class="card flex justify-center items-center flex-col w-100 max-w-100 gap-2 text-shadow-black text-shadow-md p-6 bg-blue-950 rounded-lg shadow-black shadow-md transition-all duration-500 ease-in-out" style="animation: slideUp 0.5s ease-in-out ${delay}s forwards;">
                    <img src="https://jogar.luandev.blog.br:3001/image/${iconPathItem}" alt="item icon" class="w-60 h-auto">
                    <p class="font-[Minecraft] text-6xl text-yellow-200">${title}</p>
                    <div class="flex justify-center items-center gap-1 flex-row">
                        <p class="font-[Minecraft] text-2xl line-through text-yellow-200">R$ ${(price*2)}</p>
                        <p class="font-[Minecraft] text-5xl text-yellow-400">R$ ${price}</p>
                    </div>
                    <p class="font-[Minecraft] text-green-400 text-2xl">${subtitle}</p>
                    <div class="flex justify-center items-center gap-1 p-6 rounded-full bg-blue-900">
                        <img src="./src/images/shopping_cart.png" alt="cart icon" class="w-8 h-auto invert animate-pulse">
                        <p class="font-[Minecraft] text-3xl uppercase text-stone-50">comprar</p>
                    </div>
                    <div class="description_card min-w-[20rem] min-h-[14rem] z-10 font-[Minecraft2] text-blue-50 text-2xl p-6 lowercase brightness-90">${description}</div>
                </a>
        `
        html += htmlItem;
        delay += 0.1; // Aumenta o delay para o próximo item
    }
    contentItems.innerHTML = html; // Adiciona o HTML dos itens ao conteúdo
}
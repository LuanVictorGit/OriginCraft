let quantity = 1;
document.addEventListener("DOMContentLoaded", async () => {
    updateCategorys();

    // clicando nos elementos
    document.addEventListener("click", (e) => {
        const element = e.target;

        if (element.id === "plus") {
            e.preventDefault();
            const inputQuantity = document.getElementById("inputQuantity");
            let quantityDiv = parseInt(inputQuantity.innerHTML);
            quantity = quantityDiv + 1 > 10 ? 10 : quantityDiv + 1;
            inputQuantity.innerHTML = quantity;
            updatePriceItem();
            return;
        }

        if (element.id === "minus") {
            e.preventDefault();
            const inputQuantity = document.getElementById("inputQuantity");
            let quantityDiv = parseInt(inputQuantity.innerHTML);
            quantity = quantityDiv - 1 <= 0 ? 1 : quantityDiv - 1;
            inputQuantity.innerHTML = quantity;
            updatePriceItem();
            return;
        }

        if (!element.classList.contains("button_category")) return;
        e.preventDefault();
        if (element.classList.contains("category_selected")) return;
        document.getElementsByClassName("category_selected")[0].classList.remove("category_selected");
        categorySelected.classList.remove("category_selected");
        element.classList.add("category_selected");
        categorySelected = element;
        onClickCategory(json["categorys"][element.id.split("_")[1]]);
    });

    // escrevendo no campo do nick
    document.addEventListener("input", (e) => {

        const element = e.target;
        if (element.id !== "inputNick") return;
        const img = document.getElementById("playerOfNick");

        img.src = `https://mc-heads.net/player/${element.value}`;

        element.value = sanitizeInput(element.value);

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

let htmlBody;
let itemSelected;
function onClickItemShop(event) {
    event.preventDefault();
    const element = event.target;
    const item = JSON.parse(element.dataset.item);
    if (!item) return;

    // Desativa o scroll da página
    htmlBody = document.body.innerHTML;

    const title = item["title"];
    const subtitle = item["subtitle"];
    const description = item["description"];
    const iconPathItem = item["iconPath"];
    const price = item["price"];
    const html = `
  <div class="w-screen h-[100vh] z-50 backdrop-blur-sm bg-opacity-50 flex flex-col items-center justify-start p-2 gap-2 md:gap-10 scroll-auto" id="confirmBuy">
    <a href="#" class="bg-blue-950 w-[15rem] h-[4rem] flex justify-center items-center gap-2 rounded-lg shadow-black shadow-md duration-500 ease-in-out transition-all hover:brightness-75" onclick="closeModalShopItem()" id="buttonBack">
        <img src="./src/images/arrow_back.png" alt="back icon" class="w-6 h-auto invert animate-pulse">
        <p class="text-blue-50 font-[Minecraft2] uppercase text-4xl font-bold">voltar</p>
    </a>
    <div class="flex justify-evenly items-center gap-10 md:gap-20 flex-col md:flex-row">
        <div class="w-[20rem] min-h-[25rem] bg-blue-950 shadow-black shadow-md rounded-lg brightness-90 flex justify-start items-center gap-2 flex-col p-4">
            <img src="https://jogar.luandev.blog.br:3001/image/${iconPathItem}" alt="item icon" class="w-[12rem] h-auto rounded-lg">
            <p class="text-blue-50 font-[Minecraft2] text-6xl text-center">${title}<br>${subtitle}</p>
            <div class="p-2 rounded-full bg-blue-900 w-[80%] text-center text-blue-50 font-[Minecraft2] text-4xl" id="priceDiv">R$ ${price}</div>
            <div class="p-2 rounded-lg bg-blue-900 w-[80%] text-left text-blue-50 font-[Minecraft2] text-2xl">${description}</div>
        </div>
        <div class="bg-blue-950 w-[20rem] min-h-[20rem] gap-4 flex justify-start items-center flex-col shadow-black shadow-md rounded-lg">
            <div class="md:w-[80%] flex flex-col justify-center items-start text-2xl md:text-4xl font-[Minecraft2] text-blue-50">
                <label for="inputNick" class="text-blue-50 uppercase text-lg md:text-3xl p-1">Nickname <span class="text-red-600 text-lg md:text-2xl">*</span></label>
                <input type="text" id="inputNick" class="w-full h-[3rem] bg-blue-900 text-blue-50 rounded-lg p-2 shadow-black shadow-md border-none outline-none" placeholder="Ex: lHawk_">
            </div>
            <div class="md:w-[80%] flex justify-center items-center gap-2">
                <div class="flex justify-center items-center flex-row w-full text-4xl gap-1 font-[Minecraft2] text-blue-50 bg-blue-900 rounded-lg p-2 shadow-black shadow-md">
                    <div class="w-fit text-center" id="inputQuantity">1</div>
                    <div>un.</div>
                </div>
                <div class="flex justify-center items-center gap-1 flex-col w-fit text-4xl font-[Minecraft2] text-blue-50">
                    <a href="#" id="plus" class="rounded-full bg-blue-700 shadow-black shadow-md p-2 transition-all duration-300 hover:brightness-50 hover:scale-95"><img src="./src/images/plus.png" alt="icon plus" class="w-4 h-auto invert"></a>
                    <a href="#" id="minus" class="rounded-full bg-blue-700 shadow-black shadow-md p-2 transition-all duration-300 hover:brightness-50 hover:scale-95"><img src="./src/images/minus.png" alt="icon minus" class="w-4 h-auto invert"></a>
                </div>
            </div>
            <div class="w-[80%]">
                <a href="#" class="bg-green-900 w-full h-[4rem] flex justify-center items-center gap-2 rounded-lg shadow-black shadow-md duration-500 ease-in-out transition-all hover:brightness-75" onclick="confirmBuy(event)">
                    <img src="./src/images/check.png" alt="cart icon" class="w-6 h-auto invert animate-pulse">
                    <p class="text-blue-50 font-[Minecraft2] uppercase text-4xl font-bold">confirmar</p>
                </a>
            </div>
        </div>
        <div class="rounded-lg p-6 backdrop-blur-xs bg-blue-950/50 shadow-black shadow-md w-fit">
            <img src="https://mc-heads.net/player/" alt="item icon" class="w-[10rem] h-auto" id="playerOfNick"> 
        </div>
    </div>
    <div class="w-[50rem] bg-red-900 shadow-black shadow-md rounded-lg p-4 flex justify-center items-center flex-row flex-nowrap gap-2">
        <div class="w-fit flex justify-center items-center bg-black/10 p-4 h-full rounded-lg">
            <img src="./src/images/warning.png" alt="item icon" class="w-10 h-auto invert animate-pulse"> 
        </div>
        <div class="w-full text-sm md:text-1xl text-justify text-blue-50 bg-black/10 p-4 h-full rounded-lg">
            <span class="animate-bounce font-bold text-red-400">OBS:</span> Ao comprar o produto, você concorda automaticamente com nossos <a href="#" class="text-green-300" onclick="
                document.getElementById('buttonBack').click();
                document.getElementById('terms_button').click();
            ">termos e condições</a>. Após o pagamento, você deverá entrar em nosso servidor com o nick selecionado e executar o comando <span class="text-green-500">/CaixaPostal</span> para verificar o status do pagamento e, consequentemente, resgatar suas compras, caso aprovado.
        </div>
    </div>
</div>
    `;

    quantity = 1;
    itemSelected = item;
    updatePriceItem();
    document.body.innerHTML = html;
}

function sanitizeInput(input) {
    // Remove tags HTML
    input = input.replace(/<[^>]*>?/gm, '');
  
    // Permite letras, números, espaços, underscores e pontos
    input = input.replace(/[^a-zA-Z0-9\s_\.]/g, '');
  
    // Remove espaços em branco no início e no final (trim)
    input = input.trim();
  
    // Remove espaços em branco extras no meio (opcional)
    input = input.replace(/\s+/g, ' ');
  
    return input;
  }

function updatePriceItem(){
    let element = document.getElementById("priceDiv");
    if (!element) return;
    let number = parseFloat((itemSelected["price"] * quantity).toFixed(2));
    element.innerHTML = `R$ ${number}`;
}

function closeModalShopItem() {
    document.body.innerHTML = htmlBody;
    ajustVolumeSound();
}

let categorySelected;
async function onClickCategory(category) {
    const contentItems = document.getElementById("contentItemsShop");
    
    let delay = 0.3;
    contentItems.innerHTML = "";
    for(let item of category["items"]) {
        const title = item["title"];
        const subtitle = item["subtitle"];
        const description = item["description"];
        const iconPathItem = item["iconPath"];
        const price = item["price"];
        const promotion = item["promotion"];

        var htmlItem = `
                <a href="#" onclick="onClickItemShop(event)" data-item='${JSON.stringify(item)}' class="card flex justify-center items-center flex-col w-40 md:w-100 max-w-100 gap-1 md:gap-2 text-shadow-black text-shadow-md p-2 md:p-6 bg-blue-950 rounded-lg shadow-black shadow-md transition-all duration-500 ease-in-out" style="animation: slideUp ${delay}s ease-in-out forwards;">
                    <img src="https://jogar.luandev.blog.br:3001/image/${iconPathItem}" alt="item icon" class="w-60 h-auto">
                    <p class="font-[Minecraft] text-4xl md:text-6xl text-yellow-200">${title}</p>
                    <div class="flex justify-center items-center gap-1 flex-col md:flex-row">
                        <p class="font-[Minecraft] text-sm md:text-2xl line-through text-yellow-200 promotion_card">R$ ${(price*2)}</p>
                        <p class="font-[Minecraft] text-2xl md:text-5xl text-yellow-400">R$ ${price}</p>
                    </div>
                    <p class="font-[Minecraft] text-green-400 text-lg md:text-2xl">${subtitle}</p>
                    <div class="flex w-fit justify-center items-center gap-1 p-4 md:p-6 rounded-lg md:rounded-full bg-blue-900">
                        <img src="./src/images/shopping_cart.png" alt="cart icon" class="w-4 md:w-8 h-auto invert animate-pulse">
                        <p class="font-[Minecraft] text-lg md:text-3xl uppercase text-stone-50">comprar</p>
                    </div>
                    <div class="description_card min-w-full min-h-[5rem] md:min-h-[14rem] z-10 font-[Minecraft2] text-blue-50 text-sm md:text-2xl p-6 lowercase brightness-90">${description}</div>
                </a>
        `
        contentItems.innerHTML += htmlItem;

        
        contentItems.getElementsByClassName("card")[contentItems.getElementsByClassName("card").length - 1].click(); //clicando no item
        return; 

        const elementCard = contentItems.getElementsByClassName("card")[contentItems.getElementsByClassName("card").length - 1];
        if (!promotion) {
            const elementPromotion = elementCard.getElementsByClassName("promotion_card")[0];
            elementPromotion.innerHTML="";
        }

        delay += 0.3;
    }
}
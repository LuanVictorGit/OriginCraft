let jsonWiki;
document.addEventListener("DOMContentLoaded", async () => {

    //document.getElementById("wiki_button").click();

    const req = await fetch("https://jogar.luandev.blog.br:3001/wiki");
    const json = await req.json();
    if (!json) return;
    jsonWiki = json;

    const contentButtons = document.getElementById("contentButtonsWiki");
    contentButtons.innerHTML = "";
    let index = 0;
    for(let element of json["pages"]) {
        let name = element["name"];
        let iconPath = element["iconPath"];
        let title = element["title"];
        let contentHtml = element["content"];

        const htmlButton = `
            <a href="#" onclick="onClickButtonWiki(event)" data-item="${index}" class="w-full md:min-w-[10rem] min-w-[4rem] h-[4rem] bg-blue-700 rounded-lg md:rounded-full shadow-black shadow-md flex justify-center flex-col md:flex-row items-center gap-1 md:gap-2 text-blue-50 font-[roboto] uppercase font-bold text-sm md:text-lg text-shadow-black text-shadow-md duration-500 ease-in-out transition-all hover:brightness-75 buttonWiki">
                <img src="https://jogar.luandev.blog.br:3001/image/${iconPath}" alt="${name} icon" class="w-4 md:w-6 h-auto">
                <p>${title}</p>
            </a>
        `;
        contentButtons.innerHTML += htmlButton;
        index++;
    }

});

function onClickButtonWiki(event) {
    const target = event.target;
    if (!target.classList.contains("buttonWiki")) return;
    event.preventDefault();
    if (target.classList.contains("selectedButtonWiki")) return;
    resetButtonsWiki();
    target.classList.add("selectedButtonWiki");
    const element = jsonWiki["pages"][target.dataset.item];
    const title = element["title"];

    // setando o titulo da página
    const contentTitle = document.getElementById("titleContentWiki");
    contentTitle.innerHTML = title;

    const content = document.getElementById("contentGeneralWiki");
    content.innerHTML = element["content"];
}

function resetButtonsWiki(){
    document.querySelectorAll(".buttonWiki").forEach((button) => {
        button.classList.remove("selectedButtonWiki");
    });
}
document.addEventListener("DOMContentLoaded", async ()=> {
    //updatePlayers();
});

let lastJson = null;
async function updatePlayers() {
    const contentPlayers = document.getElementById("contentPlayers");
    
    try {
        const req = await fetch("https://jogar.luandev.blog.br:3001/server");
        if (!req.ok) {
            setTimeout(updatePlayers, 10000);
            return;
        }
        const currentJson = await req.json();
        if (JSON.stringify(lastJson) === JSON.stringify(currentJson)) {
            setTimeout(updatePlayers, 1000);
            return;
        }
        lastJson = currentJson;
        if (contentPlayers.classList.contains("loader")) {
            contentPlayers.classList.remove("loader");
            contentPlayers.classList.add("contentPlayers");
            // removendo o icone de carregamento.
        }

        contentPlayers.innerHTML = ""; // limpando o conteúdo anterior

        let onlines = Number(currentJson["onlines"])

        const elementOnlines = document.getElementById("onlineNumber");
        elementOnlines.innerText = onlines;

        for(let name of currentJson["playerNames"]) {
            let html = `
            <div class="flex justify-center items-center flex-col">
                <p class="text-blue-50 font-[Minecraft2] text-4xl">${name}</p>
                <img src="https://mc-heads.net/body/${name}" alt="image of player ${name} icon" class="w-20 md:w-40 h-auto">
            </div>
            `
            contentPlayers.innerHTML += html;
        }

    } catch (error) {
        console.error("Erro na requisição:", error);
    }
    setTimeout(updatePlayers, 1000);
}
document.addEventListener("DOMContentLoaded", async function () {
	const usuario = localStorage.getItem("usuario");

	const user = await fetch(`https://auditoria.onrender.com/pegar/${usuario}`);
	const data = await user.json();

	console.log(" esse valor ai", data);

	data.forEach(item => {
		const content = `
            <div>
            ${item.pergunta_id}
            <br>
            Resposta: 
            ${item.resposta}
            </div><br>
        `;
		const tabela = document.getElementById("logs");
		tabela.insertAdjacentHTML("beforeend", content);
	});

	// Define o conteúdo do elemento logs
});

const tabela = document.getElementById("base");
tabela.insertAdjacentHTML("beforeend", content);

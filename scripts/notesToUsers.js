document.addEventListener("DOMContentLoaded", async function () {
	try {
	} catch (error) {
		console.error("Erro ao buscar dados da API:", error);
		// Tratar erros, se necessário
	}

	const email = localStorage.getItem("email");

	if (!email) {
		console.log("nao logado");
	} else if (email) {
		var content = `
        <li><a href="./pageUser.html">Perfil</a></li>
        `;

		document.getElementById("signup-login").innerHTML = content;
	}

	const getNick = localStorage.getItem("nick");
	const countentUser = `
            <div>
            ${getNick}
            </div>
    
    `;
	const divUser = document.getElementById("usuarios");
	divUser.insertAdjacentHTML("beforeend", countentUser);

	const user = await fetch(`https://auditoria.onrender.com/pegar/${getNick}`);
	const data = await user.json();

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
});

document.addEventListener("DOMContentLoaded", async function () {
	document
		.getElementById("enviarConteudos")
		.addEventListener("click", async function () {
			// Pegar o conteúdo da div com id "div1"
			const div1Content = document.getElementById("div1").value;
			const constatacoesValue = div1Content
			console.log(constatacoesValue);

			// Pegar o conteúdo da div com id "div2"
			const div2Content = document.getElementById("div2").value;
			const avaliacaoValue = div2Content
			console.log(avaliacaoValue);

			// Pegar o conteúdo da div com id "div3"
			const div3Content = document.getElementById("div3").value;
			const planoValue = div3Content
			console.log(planoValue);

			/*  */

			const userValue = localStorage.getItem("nick")
			console.log(userValue)

			const values = {
				usuario: userValue,
				constatacoes: constatacoesValue,
				nossa_avaliacao: avaliacaoValue,
				plano_acao: planoValue
			};

			const response = await fetch("https://auditoria.onrender.com/constatacoes", {
				method: "POST",
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify(values)
			});
		});
});

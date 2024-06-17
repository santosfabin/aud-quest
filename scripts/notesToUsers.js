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

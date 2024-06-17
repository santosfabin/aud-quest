document.addEventListener("DOMContentLoaded", async function () {
	const email = localStorage.getItem("email");

	if (!email) {
		console.log("nao logado");
	} else if (email) {
		var content = `
        <li><a href="./pageUser.html">Perfil</a></li>
        `;

		document.getElementById("signup-login").innerHTML = content;
	}

	const user = await fetch(`https://auditoria.onrender.com/getConstatacoes`);
	const data = await user.json();

	data.forEach(item => {
		const content = `
            <div class="log-container">
                <div>
                Usuario:
                ${item.usuario}
                </div>
                
                <div>
                Constatação: 
                ${item.constatacoes}
                </div>
                
                <div>
                Nossa Avaliação: 
                ${item.nossa_avaliacao}
                </div>
                
                <div>
                Plano de Ação: 
                ${item.plano_acao}
                </div>
            </div><br>
        `;
		const tabela = document.getElementById("logs");
		tabela.insertAdjacentHTML("beforeend", content);
	});
});

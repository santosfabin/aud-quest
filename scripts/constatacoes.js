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
})
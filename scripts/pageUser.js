document.addEventListener("DOMContentLoaded", function () {
	const sair = document.getElementById("sair");
	sair.addEventListener("click", function () {
		localStorage.removeItem("email");
		localStorage.removeItem("usuario");
		window.location.href = "../pages/index.html";
	});

	usuario = localStorage.getItem("usuario");

	var content = `
        <a href="./getAllUsers.html"><h1>Fazer uma Constatação</h1></a>
		<a href="./constatacoes.html"><h1>Verificar Constatações</h1></a>
        `;
    

	if(usuario == "admin"){
            
		const tabela = document.getElementById("pegarOsUsuarios");
		tabela.insertAdjacentHTML("beforeend", content);
	}
});

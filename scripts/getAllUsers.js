document.addEventListener("DOMContentLoaded", async function () {
	try {
		const pegandoUsuario = await fetch(
			"https://auditoria.onrender.com/pegarUsuarios"
		);
		const respostaUsuario = await pegandoUsuario.json();
		console.log(respostaUsuario);

		respostaUsuario.forEach(element => {
			const nickUsuario = element.username;

			const countentUser = `
                    <div class="class-usuario" id="${nickUsuario}">
                    ${nickUsuario}
                    </div>
            
            `;

			const divUser = document.getElementById("usuarios");
			divUser.insertAdjacentHTML("beforeend", countentUser);
		});
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
    const usuarios = document.querySelectorAll('.class-usuario');


	usuarios.forEach(function(usuario) {
        usuario.addEventListener('click', function() {
            // Exibe o valor do atributo 'id' no console
            localStorage.setItem("nick", this.id);
			window.location.href = "../pages/notesToUsers.html";
        });
    });
});

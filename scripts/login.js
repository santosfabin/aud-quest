document.addEventListener("DOMContentLoaded", function () {
	const form = document.getElementById("myForm");
	const responseDiv = document.getElementById("response");

	form.addEventListener("submit", async function (event) {
		event.preventDefault();

		const email = document.getElementById("email").value;
		const password = document.getElementById("password").value;

		if (!email || !password) {
			responseDiv.textContent = "Por favor, preencha todos os campos.";
			return;
		}

		try {
			const response = await fetch("https://auditoria.onrender.com/login", {
				method: "POST",
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify({email, password})
			});

			const data = await response.json();

			if (!response.ok) {
				throw new Error(data.error || "Erro ao tentar fazer login");
			}

			responseDiv.textContent = `Login bem sucedido para o usuário ${data.user.email}`;

			localStorage.setItem("email", data.user.email);
			window.location.href = "../pages/pageUser.html";


			// Aqui você pode redirecionar o usuário para outra página, exibir uma mensagem de sucesso, etc.
		} catch (error) {
			responseDiv.textContent = `Erro: ${error.message}`;
		}
	});

	/*     // Exemplo de botão para fazer um GET de usuários (opcional)
    const getDataButton = document.getElementById('getData');
    getDataButton.addEventListener('click', async function() {
        try {
            const response = await fetch('/login');
            const data = await response.json();
            console.log(data); // Exemplo de como lidar com os dados do GET
        } catch (error) {
            console.error('Erro ao tentar obter dados:', error);
        }
    }); */
});

/* 
const responseField = document.getElementById('response');
const getDataButton = document.getElementById('getData');
getDataButton.addEventListener('click', async function() {
    try {
        const response = await fetch('https://auditoria.onrender.com/login');
        if (!response.ok) {
            throw new Error('Erro ao obter dados: ' + response.statusText);
        }

        const data = await response.json();
        // Exemplo de como você poderia usar os dados recebidos:
        responseField.textContent = JSON.stringify(data, null, 2);
    } catch (error) {
        console.error('Erro ao obter dados:', error);
        responseField.textContent = 'Erro ao obter dados.';
    }
});
 */

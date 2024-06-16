document.addEventListener("DOMContentLoaded", async function () {
	const email = localStorage.getItem("email");

	if (!email) {
		console.log("logado");
		window.location.href = "../pages/index.html";
	}

	try {
		const questoesResponse = await fetch(
			"https://auditoria.onrender.com/tabela8"
		);
		const questoesJson = await questoesResponse.json();

		// Aqui questoesJson é uma array de objetos
		questoesJson.forEach(finalQuest => {
			// Acessando os campos de cada objeto
			const requisito = finalQuest.requisito;
			const fonte = finalQuest.fonte;
			const evidencias_possiveis = finalQuest.evidencias_possiveis;
			const pergunta = finalQuest.pergunta;
			const documento_ou_registro = finalQuest.documento_ou_registro;
			const tipo_de_teste = finalQuest.tipo_de_teste;

			// Construindo a string conforme necessário
			const content = `
                <tr>
                    <td>${requisito}</td>
                    <td>${fonte}</td>
                    <td>${evidencias_possiveis}</td>
                    <td>${pergunta}</td>
                    <td>${documento_ou_registro}</td>
                    <td>${tipo_de_teste}</td>
                </tr>
            `;

			const tabela = document.getElementById("base");
			tabela.insertAdjacentHTML("beforeend", content);

			console.log(content); // Exemplo de uso: imprimir no console
		});
	} catch (error) {
		console.error("Erro ao buscar dados da API:", error);
		// Tratar erros, se necessário
	}
});

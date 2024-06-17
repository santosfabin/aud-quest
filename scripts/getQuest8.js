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
		/* const questoesResponse = await fetch("http://localhost:3333/tabela5"); */
		const questoesJson = await questoesResponse.json();

		let count = 0;

		// Aqui questoesJson é uma array de objetos
		questoesJson.forEach(finalQuest => {
			count++;

			// Acessando os campos de cada objeto
			const requisito = finalQuest.requisito;
			const fonte = finalQuest.fonte;
			const evidencias_possiveis = finalQuest.evidencias_possiveis;
			const pergunta = finalQuest.pergunta;
			const documento_ou_registro = finalQuest.documento_ou_registro;
			const tipo_de_teste = finalQuest.tipo_de_teste;

			// Construindo a string conforme necessário
			const content = `
                <tr id="tr-de-numero-${count}">
                    <td>Questão ${count}</td>
                    <td>${requisito}</td>
                    <td>${fonte}</td>
                    <td>${evidencias_possiveis}</td>
                    <td>${pergunta}</td>
                    <td>${documento_ou_registro}</td>
                    <td>${tipo_de_teste}</td>
						<div class="div-pergunta">
							<input type="radio" id="${requisito} - Questão ${count} - Alternativa(a)" name="pergunta${count}" value="atende">
							<label for="${requisito} - Questão ${count} - Alternativa(a)">Atende</label><br>

							<input type="radio" id="${requisito} - Questão ${count} - Alternativa(b)" name="pergunta${count}" value="atende-parcialmente">
							<label for="${requisito} - Questão ${count} - Alternativa(b)">Atende Parcialmente</label><br>

							<input type="radio" id="${requisito} - Questão ${count} - Alternativa(c)" name="pergunta${count}" value="nao-atende">
							<label for="${requisito} - Questão ${count} - Alternativa(c)">Não Atende</label><br>

							<input type="radio" id="${requisito} - Questão ${count} - Alternativa(d)" name="pergunta${count}" value="nao-se-aplica">
							<label for="${requisito} - Questão ${count} - Alternativa(d)">Não se Aplica</label>

							<label for="${requisito} - Arquivo ${count}">Arquivo</label>
							<input type="file" accept=".pdf, .png, .jpg, .jpeg" id="${requisito} - Arquivo ${count}">
						</div>

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
	/*  */
	/*  */
});

async function mostrarValores() {
	// Seleciona todos os inputs do tipo rádio com name="opcao" que estão selecionados
	const inputsSelecionados = document.querySelectorAll(
		'input[type="radio"]:checked'
	);

	// Verifica se algum input foi selecionado
	if (inputsSelecionados.length > 0) {
		// Objeto para armazenar os valores selecionados
		const valoresSelecionados = {};

		// Itera sobre os inputs selecionados e armazena seus valores no objeto
		inputsSelecionados.forEach(input => {
			valoresSelecionados[input.id] = input.value;
		});

		// Mostra os valores selecionados no console

		console.log(valoresSelecionados);

		for (const key in valoresSelecionados) {
			if (Object.hasOwnProperty.call(valoresSelecionados, key)) {
				const values = {
					usuario: localStorage.getItem("usuario"),
					pergunta_id: key,
					resposta: valoresSelecionados[key]
				};

				console.log(values);
				try {
					console.log("Enviando requisição para pergunta_id:", key);
					const responseField = document.getElementById("enviando");
					responseField.textContent = `Enviando requisição para pergunta_id: ${key}`;

					const response = await fetch(
						"https://auditoria.onrender.com/resposta",
						{
							method: "POST",
							headers: {
								"Content-Type": "application/json"
							},
							body: JSON.stringify(values)
						}
					);

					if (!response.ok) {
						throw new Error(
							"Erro ao enviar requisição: " + response.statusText
						);
					}
				} catch (error) {
					console.error("Erro ao enviar requisição:", error);
					responseField.textContent = "Erro ao enviar requisição.";
				}
			}
		}

		const responseField = document.getElementById("enviando");
		responseField.textContent = `requisições enviadas com sucesso`;

		/* console.log(localStorage.getItem("email")); */

		// Retorna os valores selecionados como JSON
		return JSON.stringify(valoresSelecionados);
	} else {
		console.log("Nenhuma opção selecionada.");
		return null; // Retorna null caso nenhum input esteja selecionado
	}
}

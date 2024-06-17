document.addEventListener('DOMContentLoaded', async () => {
    try {
        
        const response = await fetch("https://auditoria.onrender.com/tabela5");
        const json = await response.json();

        // Verificar se os dados foram carregados corretamente
        console.log(json);

        const docCounts = {
            documento: 0,
            registro: 0
        };

        const testeCounts = {
            Indagação: 0,
            Inspeção: 0,
            'Revisão de documentos': 0,
            Entrevista: 0,
            Observação: 0,
            'Confirmação externa': 0,
            Reexecução: 0
        };

        // Processar cada entrada do JSON
        json.forEach(entry => {
            const docRegText = entry['documento_ou_registro'];
            const tipoTesteText = entry['tipo_de_teste'];

            // Processar "Documento/Registro"
            if (docRegText) {
                const docRegLower = docRegText.toLowerCase();
                if (docRegLower.includes("documento") || docRegLower.startsWith("doc")) docCounts.documento++;
                if (docRegLower.includes("registro") || docRegLower.startsWith("pol")) docCounts.registro++;
            }

            // Processar "Tipo de Teste"
            if (tipoTesteText) {
                if (testeCounts[tipoTesteText] !== undefined) {
                    testeCounts[tipoTesteText]++;
                }
            }
        });

        // Verificar os contadores
        console.log('docCounts:', docCounts);
        console.log('testeCounts:', testeCounts);

        const docData = {
            labels: ["Documento", "Registro"],
            datasets: [{
                label: 'Documento/Registro',
                data: [docCounts.documento, docCounts.registro],
                backgroundColor: [
                    'rgba(75, 192, 192, 0.6)',
                    'rgba(54, 162, 235, 0.6)'
                ],
                borderColor: [
                    'rgba(75, 192, 192, 1)',
                    'rgba(54, 162, 235, 1)'
                ],
                borderWidth: 2
            }]
        };

        const testeData = {
            labels: ["Indagação", "Inspeção", "Revisão de documentos", "Entrevista", "Observação", "Confirmação externa","Reexecução"],
            datasets: [{
                label: 'Tipo de Teste',
                data: [
                    testeCounts.Indagação,
                    testeCounts.Inspeção,
                    testeCounts['Revisão de documentos'],
                    testeCounts.Entrevista,
                    testeCounts.Observação,
                    testeCounts['Confirmação externa'],
                    testeCounts.Reexecução
                ],
                backgroundColor: [
                    'rgba(75, 192, 192, 0.6)',
                    'rgba(54, 162, 235, 0.6)',
                    'rgba(255, 206, 86, 0.6)',
                    'rgba(255, 99, 132, 0.6)',
                    'rgba(153, 102, 255, 0.6)',
                    'rgba(255, 159, 64, 0.6)',
                    'rgba(199, 199, 199, 0.6)'
                ],
                borderColor: [
                    'rgba(75, 192, 192, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(255, 99, 132, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                    'rgba(199, 199, 199, 1)'
                ],
                borderWidth: 2
            }]
        };

        const ctxDoc = document.getElementById('documentChart').getContext('2d');
        const documentChart = new Chart(ctxDoc, {
            type: 'bar',
            data: docData,
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: true,
                        position: 'bottom'
                    }
                }
            }
        });

        const ctxTeste = document.getElementById('testeChart').getContext('2d');
        const testeChart = new Chart(ctxTeste, {
            type: 'bar',
            data: testeData,
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: true,
                        position: 'bottom'
                    }
                }
            }
        });
    } catch (error) {
        console.error('Erro ao carregar os dados:', error);
    }
});

document.addEventListener('DOMContentLoaded', async () => {

    const usuario = localStorage.getItem("usuario");

    const questoesResponse = await fetch(`https://auditoria.onrender.com/pegar/${usuario}`);
    const questoesJson = await questoesResponse.json();
    

    const counts = {
        atende: 0,
        atendeParcialmente: 0,
        naoAtende: 0,
        naoSeAplica: 0
    };

    questoesJson.forEach(questao => {
        if (questao.resposta === "atende") {
            counts.atende++;
        } else if (questao.resposta === "atende-parcialmente") {
            counts.atendeParcialmente++;
        } else if (questao.resposta === "nao-atende") {
            counts.naoAtende++;
        } else if (questao.resposta === "nao-se-aplica") {
            counts.naoSeAplica++;
        }
    });

    const data = {
        labels: ["Atende", "Atende Parcialmente", "Não Atende", "Não Se Aplica"],
        datasets: [{
            label: 'Respostas',
            data: [counts.atende, counts.atendeParcialmente, counts.naoAtende, counts.naoSeAplica],
            backgroundColor: [
                'rgba(75, 192, 192, 0.6)',
                'rgba(54, 162, 235, 0.6)',
                'rgba(255, 206, 86, 0.6)',
                'rgba(255, 99, 132, 0.6)'
            ],
            borderColor: [
                'rgba(75, 192, 192, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(255, 99, 132, 1)'
            ],
            borderWidth: 2
        }]
    };

    const ctx = document.getElementById('responseChart').getContext('2d');
    const responseChart = new Chart(ctx, {
        type: 'pie',
        data: data,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: true,
                    position: 'bottom'
                }
            }
        }
    });

    const buttons = {
        toggleAtende: 'atende',
        toggleAtendeParcialmente: 'atendeParcialmente',
        toggleNaoAtende: 'naoAtende',
        toggleNaoSeAplica: 'naoSeAplica'
    };

    for (const [buttonId, label] of Object.entries(buttons)) {
        document.getElementById(buttonId).addEventListener('click', () => {
            const index = data.labels.indexOf(label.charAt(0).toUpperCase() + label.slice(1));
            if (data.datasets[0].data[index] !== 0) {
                data.datasets[0].data[index] = 0;
            } else {
                data.datasets[0].data[index] = counts[label];
            }
            responseChart.update();
        });
    }
});

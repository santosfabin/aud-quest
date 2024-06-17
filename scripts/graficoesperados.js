document.addEventListener('DOMContentLoaded', async () => {
    try {
        const usuario = localStorage.getItem("usuario");

        const response = await fetch(`https://auditoria.onrender.com/pegar/${usuario}`);
        const json = await response.json();
         

        // Verificar se os dados foram carregados corretamente
        console.log(json);

        // Contadores para as respostas
        const counts = {
            atende: 0,
            atendeParcialmente: 0,
            naoAtende: 0,
            naoSeAplica: 0
        };

        // Conjunto para armazenar todos os IDs de questões
        const allIds = new Set();
        const respondedIds = new Set();

        json.forEach(entry => {
            allIds.add(entry.id);

            if (entry.resposta) {
                respondedIds.add(entry.id);

                switch(entry.resposta) {
                    case 'atende':
                        counts.atende++;
                        break;
                    case 'atende-parcialmente':
                        counts.atendeParcialmente++;
                        break;
                    case 'nao-atende':
                        counts.naoAtende++;
                        break;
                    case 'nao-se-aplica':
                        counts.naoSeAplica++;
                        break;
                    default:
                        break;
                }
            }
        });

        // Verificar os contadores
        console.log('counts:', counts);

        // Contador total de IDs
        const totalIds = allIds.size;

        // IDs que receberam respostas
        const totalResponded = respondedIds.size;

        // Calcular respostas esperadas como um valor fixo (49) dividido pelo número de respostas recebidas
        const fixedValue = 119;
        const totalExpectedValue = Math.round(fixedValue - totalResponded);

        console.log('totalIds:', totalIds);
        console.log('totalResponded:', totalResponded);
        console.log('totalExpected:', totalExpectedValue);

        // Dados para o gráfico de respostas recebidas
        const responseData = {
            labels: ["Atende", "Atende Parcialmente", "Não Atende", "Não Se Aplica"],
            datasets: [{
                label: 'Respostas Recebidas',
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

        // Dados para o gráfico de respostas esperadas
        const expectedData = {
            labels: ["Respostas Recebidas", "Respostas Esperadas"],
            datasets: [{
                label: 'Respostas Esperadas',
                data: [totalResponded, totalExpectedValue],
                backgroundColor: [
                    'rgba(75, 192, 192, 0.6)',
                    'rgba(255, 159, 64, 0.6)'
                ],
                borderColor: [
                    'rgba(75, 192, 192, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 2
            }]
        };

        // Renderizar o gráfico de respostas recebidas
        const ctxResponse = document.getElementById('responseChart').getContext('2d');
        new Chart(ctxResponse, {
            type: 'pie',
            data: responseData,
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

        // Renderizar o gráfico de respostas esperadas
        const ctxExpected = document.getElementById('expectedChart').getContext('2d');
        new Chart(ctxExpected, {
            type: 'pie',
            data: expectedData,
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

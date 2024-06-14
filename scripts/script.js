const form = document.getElementById('myForm');
const responseField = document.getElementById('response');
const getDataButton = document.getElementById('getData');

form.addEventListener('submit', async function(event) {
    event.preventDefault();

    const formData = new FormData(form);
    const values = {
        title: formData.get('title'),
        description: formData.get('description'),
        duration: formData.get('duration')
    };

    try {
        const response = await fetch('https://auditoria.onrender.com/vitorinha', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(values)
        });

        if (!response.ok) {
            throw new Error('Erro ao enviar requisição: ' + response.statusText);
        }

        responseField.textContent = 'Requisição POST enviada com sucesso!';
    } catch (error) {
        console.error('Erro ao enviar requisição:', error);
        responseField.textContent = 'Erro ao enviar requisição.';
    }
});

getDataButton.addEventListener('click', async function() {
    try {
        const response = await fetch('https://auditoria.onrender.com/vitorinha');
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

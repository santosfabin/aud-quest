const form = document.getElementById('myForm');
const responseField = document.getElementById('response');
/* const getDataButton = document.getElementById('getData'); */

form.addEventListener('submit', async function(event) {
    event.preventDefault();

    const formData = new FormData(form);
    const values = {
        username: formData.get('username'),
        email: formData.get('email'),
        password: formData.get('password'),
        nome_da_empresa: formData.get('nome_da_empresa')
    };

    if (!values.username || !values.email || !values.password || !values.nome_da_empresa) {
        responseField.textContent = 'Por favor, preencha todos os campos.';
        return;
    }

    try {
        const response = await fetch('https://auditoria.onrender.com/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(values)
        });

        if (!response.ok) {
            throw new Error('Erro ao enviar requisição: ' + response.statusText);
        }

        responseField.textContent = 'Conta Criada com sucesso';
    } catch (error) {
        console.error('Erro ao enviar requisição:', error);
        responseField.textContent = 'Erro ao enviar requisição.';
    }
});

/* getDataButton.addEventListener('click', async function() {
    try {
        const response = await fetch('https://auditoria.onrender.com/signup');
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
}); */



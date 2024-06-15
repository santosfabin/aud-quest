document.getElementById('myForm').addEventListener('submit', async (event) => {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const responseDiv = document.getElementById('response');

    try {
        const response = await fetch('http://localhost:3333/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });

        const data = await response.json();

        if (response.ok) {
            // Armazena o token no localStorage (ou cookie, conforme preferir)
            localStorage.setItem('token', data.token);
            responseDiv.textContent = 'Login bem-sucedido!';
            // Redireciona ou faz outra ação após login bem-sucedido
        } else {
            responseDiv.textContent = `Erro: ${data.error}`;
        }
    } catch (error) {
        responseDiv.textContent = `Erro: ${error.message}`;
    }
});

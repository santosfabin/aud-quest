document.getElementById('myForm').addEventListener('submit', async (event) => {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const responseDiv = document.getElementById('response');

    try {
        const response = await fetch('https://auditoria.onrender.com/login', {
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
            responseDiv.textContent = 'Login bem-sucedido! Redirecionando...';

            // Chama a função para buscar dados do usuário após o login bem-sucedido
            await fetchUserData();

            // Redirecionar para a página após login bem-sucedido
            window.location.replace('/index.html'); // Altere para a página desejada após login

        } else {
            responseDiv.textContent = `Erro: ${data.error}`;
        }
    } catch (error) {
        responseDiv.textContent = `Erro: ${error.message}`;
    }
});

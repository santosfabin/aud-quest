const form = document.getElementById('myForm');
form.addEventListener('submit', async function(event) {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const response = await fetch('/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
    });

    if (!response.ok) {
        const errorMessage = await response.json();
        document.getElementById('response').textContent = errorMessage.error;
        return;
    }

    const { token } = await response.json();
    localStorage.setItem('token', token); // Armazena o token JWT em localStorage ou sessionStorage

    // Redireciona para a página de perfil, dashboard, ou outra página protegida
    window.location.href = '/profile.html'; // Substitua com a URL da página que deseja redirecionar
});

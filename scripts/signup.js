const form = document.getElementById('myForm');
const responseField = document.getElementById('response');
const getDataButton = document.getElementById('getData');

form.addEventListener('submit', async function(event) {
    event.preventDefault();

    const formData = new FormData(form);
    const values = {
        username: formData.get('username'),
        email: formData.get('email'),
        password: formData.get('password'),
        nome_da_empresa: formData.get('nome_da_empresa')
    };

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

        responseField.textContent = 'Requisição POST enviada com sucesso!';
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
});
 */

document.addEventListener('DOMContentLoaded', () => {
    function getLocalStorage(key) {
      return localStorage.getItem(key);
    }
  
    function toggleLocalStorage(key, value) {
      if (getLocalStorage(key)) {
        return localStorage.removeItem(key);
      }
      return localStorage.setItem(key, value);
    }
  
    document.querySelector('header nav span').addEventListener('click', () => {
      document.body.classList.toggle('light');
      toggleLocalStorage('theme', true);
    });
    if (getLocalStorage('theme')) {
      document.body.classList.toggle('light');
    }
  });
document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const loginButton = document.getElementById('btn-login');
    const messageElement = document.getElementById('message');


    function validateForm() {

        const emailValido = emailInput.value.trim() !== '';
        const senhaValida = passwordInput.value.trim() !== '';
        
        if (emailValido && senhaValida) {
            loginButton.disabled = false;
        } else {

            loginButton.disabled = true;
        }
    }


    emailInput.addEventListener('input', validateForm);
    passwordInput.addEventListener('input', validateForm);


    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        messageElement.textContent = '';

        const email = emailInput.value;
        const password = passwordInput.value;

        try {
            const response = await fetch('http://localhost:3000/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, senha })
            });

            const data = await response.json();

            if (response.ok) {

                localStorage.setItem('successMessage', data.message); 

                window.location.href = 'home.html'; 
            } else {

                messageElement.textContent = data.message; 

            }
        } catch (error) {
            messageElement.textContent = 'Erro ao conectar com a API.';
        }
    });
});
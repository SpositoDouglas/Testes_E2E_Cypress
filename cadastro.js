document.addEventListener('DOMContentLoaded', () => {
    const cadastroForm = document.getElementById('cadastro-form');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const cadastroButton = document.getElementById('btn-cadastro');
    const messageElement = document.getElementById('message');


    function validateForm() {
        const emailValido = emailInput.value.trim() !== '';
        const senhaValida = passwordInput.value.trim() !== '';
        cadastroButton.disabled = !(emailValido && senhaValida);
    }

    emailInput.addEventListener('input', validateForm);
    passwordInput.addEventListener('input', validateForm);


    cadastroForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        messageElement.textContent = '';
        messageElement.className = '';

        const email = emailInput.value;
        const password = passwordInput.value;

        try {
            const response = await fetch('http://localhost:3000/cadastro', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, senha: password })
            });

            const data = await response.json();

            if (response.ok) {

                messageElement.textContent = data.message;
                messageElement.className = 'success-message';


                setTimeout(() => {
                    window.location.href = '/login.html';
                }, 2000);
            
            } else {

                messageElement.textContent = data.message;
            }
        } catch (error) {
            messageElement.textContent = 'Erro ao conectar com a API.';
        }
    });
});
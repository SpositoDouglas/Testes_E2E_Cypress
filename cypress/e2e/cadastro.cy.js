describe('Fluxo de Cadastro', () => {

    beforeEach(() => {
      // Intercepta as chamadas de API
      cy.intercept('POST', 'http://localhost:3000/cadastro').as('cadastroRequest');
      
      // Visita a página de cadastro
      cy.visit('http://localhost:3000/cadastro.html');
    });
  
    it('1. Deve cadastrar um novo usuário com sucesso', () => {
      // Para garantir um email único, usamos o timestamp
      const email = `teste${Date.now()}@exemplo.com`;
      
      cy.get('#email').type(email);
      cy.get('#password').type('senhaForte123');
      
      cy.get('#btn-cadastro').click();
  
      // Espera a API responder com 201 (Created)
      cy.wait('@cadastroRequest').its('response.statusCode').should('eq', 201);
  
      // Verifica a mensagem de sucesso
      cy.get('#message').should('have.text', 'Cadastro realizado com sucesso!');
      cy.get('#message').should('have.class', 'success-message');
  
      // Verifica se foi redirecionado para o login
      cy.url().should('include', '/login.html');
    });
  
    it('2. Deve exibir erro ao tentar cadastrar email duplicado', () => {
      // 1. Primeiro, cadastra um usuário
      const email = `duplicado${Date.now()}@exemplo.com`;
      cy.request('POST', 'http://localhost:3000/cadastro', {
        email: email,
        senha: '123'
      });
  
      // 2. Agora, tenta cadastrar o MESMO email pela UI
      cy.get('#email').type(email);
      cy.get('#password').type('outrasenha');
  
      cy.get('#btn-cadastro').click();
  
      // Espera a API responder com 409 (Conflict)
      cy.wait('@cadastroRequest').its('response.statusCode').should('eq', 409);
  
      // Verifica se permaneceu na página de cadastro
      cy.url().should('include', '/cadastro.html');
  
      // Verifica a mensagem de erro
      cy.get('#message').should('have.text', 'Email já cadastrado');
      cy.get('#message').should('not.have.class', 'success-message');
    });
  
    it('3. Deve validar o botão desabilitado', () => {
      cy.get('#btn-cadastro').should('be.disabled');
  
      // Preenche email
      cy.get('#email').type('teste@teste.com');
      cy.get('#btn-cadastro').should('be.disabled');
  
      // Preenche senha
      cy.get('#password').type('123');
      cy.get('#btn-cadastro').should('not.be.disabled');
    });
  });
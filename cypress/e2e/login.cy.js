describe('Fluxo de Autenticação (Login)', () => {

    beforeEach(() => {
      cy.intercept('POST', 'http://localhost:3000/login').as('loginRequest');
  
      cy.visit('http://localhost:3000/login.html');
    });

    it('1. Deve realizar o login com sucesso', () => {

      cy.get('#email').type('user@test.com');
      cy.get('#password').type('12345678');
  

      cy.get('#btn-login').click();
  

      cy.wait('@loginRequest').its('response.statusCode').should('eq', 200);
  
      
      cy.url().should('include', '/home.html');
  
      
      cy.get('#home-message').should('have.text', 'Login efetuado com sucesso!');
    });
  

    it('2. Deve exibir erro com credenciais inválidas', () => {
      
      cy.get('#email').type('usuario@errado.com');
      cy.get('#password').type('senhaerrada');
  
      
      cy.get('#btn-login').click();
  

      cy.wait('@loginRequest').its('response.statusCode').should('eq', 401);
  
      
      cy.url().should('not.include', '/home.html');
      cy.url().should('include', '/login.html');
  
      
      cy.get('#message').should('have.text', 'Credenciais inválidas');
    });

    it('3. Deve habilitar o botão "Entrar" apenas com ambos os campos preenchidos', () => {
      
      cy.get('#btn-login').should('be.disabled');
  

      cy.get('#email').type('teste@teste.com');
      cy.get('#btn-login').should('be.disabled');
  

      cy.get('#password').type('123');
      cy.get('#btn-login').should('not.be.disabled');
  

      cy.get('#email').clear();
      cy.get('#btn-login').should('be.disabled');
    });
  });
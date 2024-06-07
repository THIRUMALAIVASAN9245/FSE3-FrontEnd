describe('Login', () => {
  it('Visits the initial project page', () => {
    cy.visit('/');
    cy.contains('Project Management Tracker');
  });

  it('Visits the initial login page', () => {
    cy.visit('/login');
    cy.url().should('includes', 'login');
    cy.get('#loginFormTitle').should('be.visible');
    cy.get('#loginFormTitle').should('have.text', 'Project Management Tracker');
    cy.get('#loginFormUserNameInputValue').should('exist');
    cy.get('#loginFormPasswordInputValue').should('exist');
  });

  it('Visits the initial login page - validation', () => {
    cy.visit('/login');
    cy.get('#loginFormUserNameInputValue').should('exist');
    cy.get('#loginFormPasswordInputValue').should('exist');

    cy.get('#loginFormSubmitButton').click();

    cy.contains('Username is required');
    cy.contains('Password is required');
  });

  it('Visits the login page and click to login button and get Invalid User message', () => {
    cy.visit('/login');
    cy.get('#loginFormUserNameInputValue').should('exist');
    cy.get('#loginFormPasswordInputValue').should('exist');

    cy.get('#loginFormUserNameInputValue').type('Thiru Invalid User');
    cy.get('#loginFormPasswordInputValue').type('Thiru  Invalid User');
    cy.get('#loginFormSubmitButton').click();

    cy.contains('Invalid User');
  });

  it('Visits the login page and click to login button', () => {
    cy.visit('/login');

    cy.get('#loginFormUserNameInputValue').type('Thiru');
    cy.get('#loginFormPasswordInputValue').type('Thiru');
    cy.get('#loginFormSubmitButton').click();

    cy.contains('Home');
    cy.get('#btnlogout').should('exist');
    cy.wait(1000);
    cy.get('#btnlogout').click();
  });
});

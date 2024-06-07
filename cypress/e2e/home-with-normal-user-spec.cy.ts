describe('Login with Normal User', () => {
  beforeEach(() => {
    cy.visit('/login');
    cy.url().should('includes', 'login');
    cy.get('#loginFormTitle').should('be.visible');
    cy.get('#loginFormTitle').should('have.text', 'Project Management Tracker');

    cy.get('#loginFormUserNameInputValue').type('Vasan');
    cy.get('#loginFormPasswordInputValue').type('Vasan');
    cy.get('#loginFormSubmitButton').click();
  });

  it('Login with  Normal User - Successfull login', () => {
    cy.contains('Home')
    cy.get('#nav-manage-team-member').should('not.exist');   
    cy.get('#nav-manage-team-member-task').should('not.exist'); 
    cy.get('#btnlogout').should('exist');
    cy.contains('User');
    cy.wait(1000);
    cy.get('#btnlogout').click();
  });

  it('Login with Normal User - I can see task list count atleast one', () => {
    cy.contains('Home');
    cy.get('#nav-home').should('exist'); 
    cy.get('#nav-manage-team-member').should('not.exist');   
    cy.get('#nav-manage-team-member-task').should('not.exist');   
    cy.get('#btnlogout').should('exist'); 
    cy.contains('User');
    cy.wait(1000);
    cy.get('#btnlogout').click();
  });

  it('Login with Normal User - Verify Table data contain name atleast one', () => {
    cy.contains('User');
    cy.wait(1000);
    cy.get('table tr').should('have.length.at.least', 2);
    cy.wait(1000);
    cy.get('#btnlogout').click();
  });
});

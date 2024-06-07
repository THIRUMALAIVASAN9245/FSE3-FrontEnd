describe('Login with Admin', () => {
  beforeEach(() => {
    cy.visit('/login');
    cy.url().should('includes', 'login');
    cy.get('#loginFormTitle').should('be.visible');
    cy.get('#loginFormTitle').should('have.text', 'Project Management Tracker');

    cy.get('#loginFormUserNameInputValue').type('Thiru');
    cy.get('#loginFormPasswordInputValue').type('Thiru');
    cy.get('#loginFormSubmitButton').click();
  });

  it('Login with Admin - Successfull login', () => {
    cy.contains('Home')
    cy.contains('Manage Team Member');
    cy.contains('Assign Task');
    cy.get('#nav-home').should('exist');
    cy.get('#nav-manage-team-member').should('exist');
    cy.get('#nav-manage-team-member-task').should('exist');
    cy.get('#btnlogout').should('exist');
    cy.contains('Admin');
    cy.wait(1000);
    cy.get('#btnlogout').click();
  });

  it('Login with Admin - I can see task list count atleast one', () => {
    cy.contains('Admin');
    cy.wait(1000);
    cy.get('table tr').should('have.length.at.least', 2);
    cy.wait(1000);
    cy.get('#btnlogout').click();
  });

  it('Login with Admin - Verify Table data contain name atleast one', () => {
    cy.contains('Admin');
    cy.wait(1000);
    cy.get('table tr').should('have.length.at.least', 2);
    cy.get('.table').should('be.visible')
      .contains('tr', 'Thiru')
      .then($row => {
        expect($row.index()).to.eq(0);
      });
    cy.wait(1000);
    cy.get('#btnlogout').click();
  });
});

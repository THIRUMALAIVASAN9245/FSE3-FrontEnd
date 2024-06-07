describe('Home With Admin User', () => {
  beforeEach(() => {
    cy.visit('/login');
    cy.url().should('includes', 'login');
    cy.get('#loginFormTitle').should('be.visible');
    cy.get('#loginFormTitle').should('have.text', 'Project Management Tracker');

    cy.get('#loginFormUserNameInputValue').type('Thiru');
    cy.get('#loginFormPasswordInputValue').type('Thiru');
    cy.get('#loginFormSubmitButton').click();
  });

  it('Visits the initial manage team member page and see the manage team member list task', () => {
    cy.contains('Admin');
    cy.wait(1000);
    cy.get('#nav-manage-team-member-task').click();
    cy.wait(1000);
    cy.contains('Add Team Member');
  });

  it('Verify login user in the table and see the manage team member list task', () => {
    cy.contains('Admin');
    cy.wait(1000);
    cy.get('#nav-manage-team-member-task').click();
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

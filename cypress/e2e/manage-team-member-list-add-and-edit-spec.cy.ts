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

  it('Visits the initial manage team member page and click to add team member with invalid form', () => {
    cy.get('#nav-manage-team-member').click();
    cy.wait(1000);
    cy.get('#add-new-team-member').click();
    cy.wait(1000);
    cy.contains('Add Team Member');
    cy.get('#btn-save-team-Member').click();
    cy.contains('Member Name is required');
    cy.contains('Number Of Exp is required');
    cy.contains('Skill Sets is required');
    cy.contains('Project Start Date is required');
    cy.contains('Project End Date is required');
    cy.contains('Allocation Percentage is required');
    cy.contains('Additional Info is required');
    cy.contains('Role is required');
  });

  it('Visits the initial manage team member page and click to add team member with valid form', () => {
    cy.get('#nav-manage-team-member').click();
    cy.wait(1000);
    cy.get('#add-new-team-member').click();
    cy.wait(1000);
    cy.contains('Add Team Member');
    const uniqueSeed = Date.now().toString();
    const getUniqueId = () => Cypress._.uniqueId(uniqueSeed);
    cy.get('#input-memberName').type('Thiru valid User auto');
    cy.get('#input-numberOfExp').type('10');
    cy.get('#input-allocationPercentage').type('100');
    cy.get('#input-additionalInfo').type('Thiru Invalid User');
    cy.get('#input-projectStartDate').type('2024-02-02');
    cy.get('#input-projectEndDate').type('2024-05-05');
    cy.get('#select-role').select('Admin');
    cy.get('#JavaScript').check();
    cy.get('#MongoDB').check();
    cy.get('#ANGULAR').check();
    cy.get('#Python').check();
    cy.get('#btn-save-team-Member').click();
    cy.contains('Team Member saved');
  });

  it('Visits the initial manage team member page and click to with edit and update', () => {
    cy.get('#nav-manage-team-member').click();
    cy.wait(1000);
    cy.contains('tr', 'Thiru valid User auto').find('a').click();
    cy.contains('Edit Team Member');
    cy.get('#input-numberOfExp').clear();
    cy.get('#input-numberOfExp').type('8');
    cy.get('#btn-save-team-Member').click();
    cy.wait(1000);
    cy.contains('Team Member saved');
  });
});

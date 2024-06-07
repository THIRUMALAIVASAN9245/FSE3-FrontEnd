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
    cy.get('#nav-manage-team-member-task').click();
    cy.wait(1000);
    cy.get('#manage-team-member-task-add').click();
    cy.wait(1000);
    cy.contains('Add Team Member');
    cy.get('#btn-save-team-Member-task').click();
    cy.contains('Team Member is required');
    cy.contains('Task Name is required');
    cy.contains('Deliverables is required');
    cy.contains('Task Start Date is required');
    cy.contains('Task End Date is required');
  });

  it('Visits the initial manage team member page and click to add team member with valid form', () => {
    cy.get('#nav-manage-team-member-task').click();
    cy.wait(1000);
    cy.get('#manage-team-member-task-add').click();
    cy.wait(1000);
    cy.contains('Add Team Member Task');
    cy.wait(1000);
    cy.get('#selectTeamMemberId').select('1');
    cy.get('#txtTaskStartDate').type('2024-06-11');
    cy.get('#txtTaskEndDate').type('2024-06-13');
    cy.get('#txtDeliverables').type('Thiru Deliverables');
    cy.get('#txtTaskName').type('Sample Task');
    cy.get('#btn-save-team-Member-task').click();
    cy.wait(1000);
    cy.contains('Team Member Task Saved');
  });

  it('Visits the initial manage team member page and click to with edit and update', () => {
    cy.get('#nav-manage-team-member-task').click();
    cy.wait(1000);
    cy.contains('tr', 'Thiru').find('a').click();
    cy.contains('Edit Team Member Task');
    cy.get('#txtTaskName').clear();
    cy.get('#txtTaskName').type('Sample Task Update');
    cy.get('#btn-save-team-Member-task').click();
    cy.wait(1000);
    cy.contains('Team Member Task Saved');
  });
});

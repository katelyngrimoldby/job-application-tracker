describe('Job Application Tracker', () => {
  beforeEach(() => {
    cy.request('DELETE', 'http://localhost:8080/api/testing/reset');
    cy.visit('http://localhost:5173/');
  });

  describe('Registration', () => {
    beforeEach(() => {
      cy.contains('Create one now').click();
    });

    it('Has a disabled button with no values inputted', () => {
      cy.get('.primary').should('be.disabled');
    });

    it('Has a disabled button when password is too short', () => {
      cy.get('#username').type('root');
      cy.get('#name').type('Root');
      cy.get('#password').type('fo');
      cy.get('#confirmPass').type('fo');
      cy.get('.primary').should('be.disabled');
    });

    it('Has a disabled button when passwords do not match', () => {
      cy.get('#username').type('root');
      cy.get('#name').type('Root');
      cy.get('#password').type('password');
      cy.get('#confirmPass').type('passwords');
      cy.get('.primary').should('be.disabled');
    });

    it('Navigates to login page when user is registered', () => {
      cy.get('#username').type('root');
      cy.get('#name').type('Root');
      cy.get('#password').type('password');
      cy.get('#confirmPass').type('password');
      cy.get('.primary').click();
      cy.contains('Login');
    });

    it('Shows error when duplicate username is submitted', () => {
      cy.request('POST', 'http://localhost:8080/api/users', {
        name: 'Root',
        username: 'root',
        password: 'password',
      });
      cy.get('#username').type('root');
      cy.get('#name').type('Root');
      cy.get('#password').type('password');
      cy.get('#confirmPass').type('password');
      cy.get('.primary').click();
      cy.contains('Username is already taken');
    });
  });

  describe('Logging in', () => {
    beforeEach(() => {});
  });
});

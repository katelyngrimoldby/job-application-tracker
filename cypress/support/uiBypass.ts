Cypress.Commands.add('register', () => {
  cy.fixture('user').then((user) => {
    cy.request('POST', 'http://localhost:8080/api/users', {
      name: user.name,
      username: user.username,
      password: user.password,
    });
  });
});

Cypress.Commands.add('login', () => {
  cy.fixture('user').then((user) => {
    cy.request('POST', 'http://localhost:8080/api/auth/login', {
      username: user.username,
      password: user.password,
    }).then((res) => {
      cy.setLocalStorage('id', res.body.id.toString());
      cy.visit('http://localhost:5173');
    });
  });
});

Cypress.Commands.add('getUserData', () => {
  cy.getLocalStorage('id').then((id) => {
    cy.request('GET', `http://localhost:8080/api/auth/${id}`);
  });
});

Cypress.Commands.add('createApplication', (index) => {
  cy.fixture('applications').then((applications) => {
    cy.getUserData().then((data) => {
      cy.request({
        method: 'POST',
        url: 'http://localhost:8080/api/applications',
        headers: { Authorization: `bearer ${data.body.accessToken}` },
        body: { ...applications[index] },
      });
    });
  });
});

Cypress.Commands.add('createApplicationFile', (fileName, applicationId) => {
  cy.readFile(`./cypress/fixtures/${fileName}`, 'base64').then((file) => {
    cy.getUserData().then((data) => {
      cy.request({
        method: 'POST',
        url: 'http://localhost:8080/api/files/application',
        headers: { Authorization: `bearer ${data.body.accessToken}` },
        body: { filename: fileName, fileData: file, applicationId },
      });
    });
  });
});

Cypress.Commands.add('createInterview', (index, applicationId) => {
  cy.fixture('interviews').then((interviews) => {
    cy.getUserData().then((data) => {
      cy.request({
        method: 'POST',
        url: 'http://localhost:8080/api/interviews',
        headers: { Authorization: `bearer ${data.body.accessToken}` },
        body: { ...interviews[index], applicationId },
      });
    });
  });
});

Cypress.Commands.add('createInterviewFile', (fileName, interviewId) => {
  cy.readFile(`./cypress/fixtures/${fileName}`, 'base64').then((file) => {
    cy.getUserData().then((data) => {
      cy.request({
        method: 'POST',
        url: 'http://localhost:8080/api/files/interview',
        headers: { Authorization: `bearer ${data.body.accessToken}` },
        body: { filename: fileName, fileData: file, interviewId },
      });
    });
  });
});

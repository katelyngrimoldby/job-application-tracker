import * as utility from '../support/util';

describe('Job Application Tracker', () => {
  beforeEach(() => {
    cy.request('DELETE', 'http://localhost:8080/api/testing/reset');
    cy.visit('http://localhost:5173/');
  });

  it('Updates theme on button click', () => {
    cy.get('#root').hasAttr('data-theme', 'light');
    cy.get('#toggleTheme').click();
    cy.get('#root').hasAttr('data-theme', 'dark');
  });

  describe('Registration', () => {
    beforeEach(() => {
      cy.visit('http://localhost:5173/register');
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
    beforeEach(() => {
      cy.register();
    });

    it('Has disabled button when inputs are empty', () => {
      cy.get('.primary').should('be.disabled');
    });

    it('Displays error when login information is invalid', () => {
      cy.get('#username').type('Foo');
      cy.get('#password').type('Bar');
      cy.get('.primary').click();

      cy.contains('Invalid username or password');
    });

    it('Redirects to dashboard when logged in', () => {
      cy.get('#username').type('root');
      cy.get('#password').type('password');
      cy.get('.primary').click();

      cy.contains('Hello, Test');
    });
  });

  describe('While logged in', () => {
    beforeEach(() => {
      cy.register();
      cy.login();
    });

    it('Directs to login page when logged out', () => {
      cy.contains('Log out').click();
      cy.contains('Login');
    });

    it('Says there are no applications on dashboard', () => {
      cy.contains("You don't have any applications");
      cy.get('a').contains('Add one now').hasAttr('href', '/applications/new');
    });

    it('Says there are no applications on applications page', () => {
      cy.get('a').contains('Your Applications').click();
      cy.contains('You have no applications.');
      cy.get('a').contains('Add one now').hasAttr('href', '/applications/new');
    });

    it('Says there are no interviews on interviews page', () => {
      cy.get('a').contains('Your Interviews').click();
      cy.contains('You have no interviews.');
      cy.get('a').contains('Add one now').hasAttr('href', '/interviews/new');
    });

    it('Says there are no applications when making new interview', () => {
      cy.get('a').contains('New Interview').click();
      cy.contains('You have no applications to assign an interview to.');
      cy.get('a').contains('Add one now').hasAttr('href', '/applications/new');
    });
  });

  describe('Adding an application', () => {
    beforeEach(() => {
      cy.register();
      cy.login();
      cy.visit('http://localhost:5173/applications/new');
    });

    it('Does not submit if input fields are empty', () => {
      cy.get('button').contains('Save').click();
      cy.get('h1').contains('New Application');
    });

    it("Redirects to application's page after submission", () => {
      cy.fixture('applications').then((applications) => {
        cy.get('#position').type(applications[0].positionTitle);
        cy.get('#company').type(applications[0].company);
        cy.get('#jobId').type(applications[0].jobId);
        cy.get('#location').type(applications[0].location);
        cy.get('button').contains('Save').click();

        cy.get('h1').contains(applications[0].positionTitle);
        cy.get('span').contains(applications[0].company);
      });
    });

    it('Shows selected status', () => {
      cy.fixture('applications').then((applications) => {
        cy.get('[data-testid="status"').click();
        cy.get(`[data-testid="${applications[0].status}"]`).click();
        cy.get('[data-testid="status"').contains(
          utility.formatStatus(applications[0].status)
        );
      });
    });

    it('Uploads a single file', () => {
      cy.get('input[type="file"]').uploadFile('Lipsum.pdf');
      cy.contains('Lipsum.pdf');
    });

    it('Uploads multiple files', () => {
      cy.get('input[type="file"]').uploadFile(['Lipsum.pdf', 'Lipsum1.pdf']);
      cy.contains('Lipsum.pdf');
      cy.contains('Lipsum1.pdf');
    });

    it('Removes file when it is clicked', () => {
      cy.get('input[type="file"]').uploadFile('Lipsum.pdf');
      cy.contains('Lipsum.pdf').click();
      cy.get('[data-testid="fileList"]').should('not.contain', 'Lipsum.pdf');
    });

    it('Correctly displays notes as rich text', () => {
      cy.get('#notes').writeNotes('notes');
      cy.hasNotes('notes');
    });
  });

  describe('Viewing an application', () => {
    beforeEach(() => {
      cy.register();
      cy.login();
      cy.createApplication(0)
        .then((application) => {
          return application.body;
        })
        .as('application');

      cy.get('@application').then((application: any) => {
        cy.createApplicationFile('Lipsum.pdf', application.id);
        cy.visit(`http://localhost:5173/applications/${application.id}`);
      });
    });

    it('Displays application information', () => {
      cy.get('@application').then((application: any) => {
        cy.get('header').find('h1').contains(application.positionTitle);
        cy.get('header').find('span').contains(application.company);
        cy.get('[data-testid="status"]').contains(
          utility.formatStatus(application.status)
        );
        cy.get('[data-testid="jobId"]').contains(application.jobId);
        cy.get('[data-testid="location"]').contains(application.location);
        cy.get('[data-testid="timeline"]')
          .children()
          .each((child) => {
            cy.wrap(child).should(
              'contain.text',
              utility.getLongDate(new Date())
            );
          });
        cy.get('[data-testid="interviews"]').contains('Add interview');
        cy.get('[data-testid="fileList"]').contains('Lipsum.pdf');
        cy.hasNotes('notes');
      });
    });

    it('Links to the new interview page', () => {
      cy.get('a').contains('Add interview').hasAttr('href', '/interviews/new');
    });

    it("Links to the application's edit page", () => {
      cy.get('@application').then((application: any) => {
        cy.get('[data-testid="edit"]').hasAttr(
          'href',
          `/applications/${application.id}/edit`
        );
      });
    });

    it('Deletes application when delete button is clicked', () => {
      cy.get('[data-testid="delete"]').click({ force: true });
      cy.get('p').contains('You have no applications. ');
    });
  });

  describe('Applications page', () => {
    beforeEach(() => {
      cy.register();
      cy.login();
      cy.createApplication(0)
        .then((application) => {
          return application.body;
        })
        .as('application1');
      cy.createApplication(1)
        .then((application) => {
          return application.body;
        })
        .as('application2');
      cy.visit('http://localhost:5173/applications');
    });

    it('Displays information on both applications', () => {
      cy.get('@application1').then((application: any) => {
        cy.get(`[data-testid="${application.id}"]`)
          .find('[data-testid="position"]')
          .contains(application.positionTitle);
        cy.get(`[data-testid="${application.id}"]`)
          .find('[data-testid="company"]')
          .contains(application.company);
        cy.get(`[data-testid="${application.id}"]`)
          .find('[data-testid="status"]')
          .contains(utility.formatStatus(application.status));

        cy.get(`[data-testid="${application.id}"]`)
          .find('[data-testid="secondary"]')
          .should('not.be.visible');
        cy.get(`[data-testid="${application.id}"]`)
          .find('[data-testid="toggle"]')
          .click();
        cy.get(`[data-testid="${application.id}"]`)
          .find('[data-testid="secondary"]')
          .should('be.visible');

        cy.get(`[data-testid="${application.id}"]`)
          .find('[data-testid="date"]')
          .contains(utility.getShortDate(new Date()));
      });

      cy.get('@application2').then((application: any) => {
        cy.get(`[data-testid="${application.id}"]`)
          .find('[data-testid="position"]')
          .contains(application.positionTitle);
        cy.get(`[data-testid="${application.id}"]`)
          .find('[data-testid="company"]')
          .contains(application.company);
        cy.get(`[data-testid="${application.id}"]`)
          .find('[data-testid="status"]')
          .contains(utility.formatStatus(application.status));

        cy.get(`[data-testid="${application.id}"]`)
          .find('[data-testid="secondary"]')
          .should('not.be.visible');
        cy.get(`[data-testid="${application.id}"]`)
          .find('[data-testid="toggle"]')
          .click();
        cy.get(`[data-testid="${application.id}"]`)
          .find('[data-testid="secondary"]')
          .should('be.visible');

        cy.get(`[data-testid="${application.id}"]`)
          .find('[data-testid="date"]')
          .contains(utility.getShortDate(new Date()));
      });
    });

    it('Links to the application page for each application', () => {
      cy.get('@application1').then((application: any) => {
        cy.get(`[data-testid="${application.id}"]`)
          .find('[data-testid="toggle"]')
          .click();
        cy.get(`[data-testid="${application.id}"]`)
          .find('a')
          .hasAttr('href', `/applications/${application.id}`);
      });

      cy.get('@application2').then((application: any) => {
        cy.get(`[data-testid="${application.id}"]`)
          .find('[data-testid="toggle"]')
          .click();
        cy.get(`[data-testid="${application.id}"]`)
          .find('a')
          .hasAttr('href', `/applications/${application.id}`);
      });
    });

    it('Properly filters applications', () => {
      cy.get('input#applied').click();
      cy.contains('You have no applications.');

      cy.get('input#assessments').click();
      cy.contains('You have no applications.');

      cy.get('input#interviewing').click();
      cy.contains('You have no applications.');

      cy.fixture('applications').then((applications) => {
        cy.get('input#offered').click();
        cy.contains(applications[0].positionTitle);
        cy.should('not.contain.text', applications[1].positionTitle);

        cy.get('input#rejected').click();
        cy.contains(applications[1].positionTitle);
        cy.should('not.contain.text', applications[0].positionTitle);
      });
    });

    it('Properly sorts applications', () => {
      cy.fixture('applications').then((applications) => {
        cy.get('#company-asc').click();
        cy.get('main')
          .find('li')
          .first()
          .contains(applications[0].positionTitle);
        cy.get('main')
          .find('li')
          .last()
          .contains(applications[1].positionTitle);

        cy.get('#company-desc').click();
        cy.get('main')
          .find('li')
          .first()
          .contains(applications[1].positionTitle);
        cy.get('main')
          .find('li')
          .last()
          .contains(applications[0].positionTitle);

        cy.get('#position-asc').click();
        cy.get('main')
          .find('li')
          .first()
          .contains(applications[1].positionTitle);
        cy.get('main')
          .find('li')
          .last()
          .contains(applications[0].positionTitle);

        cy.get('#position-desc').click();
        cy.get('main')
          .find('li')
          .first()
          .contains(applications[0].positionTitle);
        cy.get('main')
          .find('li')
          .last()
          .contains(applications[1].positionTitle);

        cy.get('#newest').click();
        cy.get('main')
          .find('li')
          .first()
          .contains(applications[1].positionTitle);
        cy.get('main')
          .find('li')
          .last()
          .contains(applications[0].positionTitle);

        cy.get('#oldest').click();
        cy.get('main')
          .find('li')
          .first()
          .contains(applications[0].positionTitle);
        cy.get('main')
          .find('li')
          .last()
          .contains(applications[1].positionTitle);
      });
    });
  });

  describe('Dashboard w/out interviews', () => {
    beforeEach(() => {
      cy.register();
      cy.login();
      cy.createApplication(0)
        .then((application) => {
          return application.body;
        })
        .as('application1');
      cy.createApplication(1)
        .then((application) => {
          return application.body;
        })
        .as('application2');
      cy.createApplication(2)
        .then((application) => {
          return application.body;
        })
        .as('application3');
      cy.createApplication(3)
        .then((application) => {
          return application.body;
        })
        .as('application4');
      cy.visit('http://localhost:5173/');
    });

    it('Shows a count of applications today', () => {
      cy.get('header').contains('You have applied to 4 jobs today!');
    });

    it('Shows a breakdown of application status', () => {
      cy.get('[data-testid="applications"]').contains('1 Application');
      cy.get('[data-testid="assessments"]').contains('0 Assessments');
      cy.get('[data-testid="interviews"]').contains('1 Interview');
      cy.get('[data-testid="offers"]').contains('1 Offer');
    });

    it('Says there are no interviews and links to new interview page', () => {
      cy.contains("You don't have any interviews");

      cy.get('a').contains('Add one now').hasAttr('href', '/interviews/new');
    });

    it('Displays the three newest applications & links to their application pages', () => {
      cy.get('@application4').then((application: any) => {
        cy.get(`[data-testid="${application.id}"]`)
          .find('[data-testid="company"]')
          .contains(application.company);
        cy.get(`[data-testid="${application.id}"]`)
          .find('[data-testid="position"]')
          .contains(application.positionTitle);
        cy.get(`[data-testid="${application.id}"]`)
          .find('[data-testid="date"]')
          .contains('Today');
        cy.get(`[data-testid="${application.id}"]`)
          .find('[data-testid="status"]')
          .contains(utility.formatStatus(application.status));

        cy.get(`[data-testid="${application.id}"]`)
          .find('[data-testid="link"]')
          .find('a')
          .hasAttr('href', `/applications/${application.id}`);
      });

      cy.get('@application3').then((application: any) => {
        cy.get(`[data-testid="${application.id}"]`)
          .find('[data-testid="company"]')
          .contains(application.company);
        cy.get(`[data-testid="${application.id}"]`)
          .find('[data-testid="position"]')
          .contains(application.positionTitle);
        cy.get(`[data-testid="${application.id}"]`)
          .find('[data-testid="date"]')
          .contains('Today');
        cy.get(`[data-testid="${application.id}"]`)
          .find('[data-testid="status"]')
          .contains(utility.formatStatus(application.status));
        cy.get(`[data-testid="${application.id}"]`)
          .find('[data-testid="link"]')
          .find('a')
          .hasAttr('href', `/applications/${application.id}`);
      });

      cy.get('@application2').then((application: any) => {
        cy.get(`[data-testid="${application.id}"]`)
          .find('[data-testid="company"]')
          .contains(application.company);
        cy.get(`[data-testid="${application.id}"]`)
          .find('[data-testid="position"]')
          .contains(application.positionTitle);
        cy.get(`[data-testid="${application.id}"]`)
          .find('[data-testid="date"]')
          .contains('Today');
        cy.get(`[data-testid="${application.id}"]`)
          .find('[data-testid="status"]')
          .contains(utility.formatStatus(application.status));
        cy.get(`[data-testid="${application.id}"]`)
          .find('[data-testid="link"]')
          .find('a')
          .hasAttr('href', `/applications/${application.id}`);
      });

      cy.get('@application1').then((application: any) => {
        cy.get('table')
          .first()
          .should('not.contain.text', application.positionTitle);
      });
    });

    it('Links to the applications page below table', () => {
      cy.get('[data-testid="allApplications"]')
        .find('a')
        .hasAttr('href', '/applications');
    });
  });

  describe('Editing an application', () => {
    beforeEach(() => {
      cy.register();
      cy.login();
      cy.createApplication(0)
        .then((application) => {
          return application.body;
        })
        .as('application');

      cy.get('@application').then((application: any) => {
        cy.createApplicationFile('Lipsum.pdf', application.id);
        cy.visit(`http://localhost:5173/applications/${application.id}/edit`);
      });

      cy.fixture('applications')
        .then((applications) => applications[1])
        .as('newApplication');
    });

    it('Updates information', () => {
      cy.get('@newApplication').then((application: any) => {
        cy.get('#position').clear().type(application.positionTitle);
        cy.get('#company').clear().type(application.company);
        cy.get('#jobId').clear().type(application.jobId);
        cy.get('#location').clear().type(application.location);
        cy.get('[data-testid="status"').click();
        cy.get('[data-testid="rejected"]').click();
        cy.get('.ProseMirror').clear().type(application.notes);
        cy.get('button').contains('Save').click();

        cy.get('header').find('h1').contains(application.positionTitle);
        cy.get('header').find('span').contains(application.company);
        cy.get('[data-testid="status"]').contains(
          `Status: ${utility.formatStatus(application.status)}`
        );
        cy.get('[data-testid="jobId"]').contains(
          `Job ID: ${application.jobId}`
        );
        cy.get('[data-testid="location"]').contains(
          `Location: ${application.location}`
        );
        cy.get('[data-testid="timeline"]')
          .children()
          .each((child) => {
            cy.wrap(child).should(
              'contain.text',
              utility.getLongDate(new Date())
            );
          });
        cy.get('[data-testid="interviews"]').contains('Add interview');
        cy.get('.ProseMirror').contains(application.notes);
      });
    });

    it('Preserves unchanged information', () => {
      cy.get('button').contains('Save').click();

      cy.get('@application').then((application: any) => {
        cy.get('header').find('h1').contains(application.positionTitle);
        cy.get('header').find('span').contains(application.company);
        cy.get('[data-testid="status"]').contains(
          `Status: ${utility.formatStatus(application.status)}`
        );
        cy.get('[data-testid="jobId"]').contains(
          `Job ID: ${application.jobId}`
        );
        cy.get('[data-testid="location"]').contains(
          `Location: ${application.location}`
        );
        cy.get('[data-testid="timeline"]')
          .children()
          .each((child) => {
            cy.wrap(child).should(
              'contain.text',
              utility.getLongDate(new Date())
            );
          });
        cy.get('[data-testid="interviews"]').contains('Add interview');
        cy.get('[data-testid="fileList"]').contains('Lipsum.pdf');
        cy.hasNotes('notes');
      });
    });

    it('Can remove a file', () => {
      cy.get('[data-testid="fileList"]').contains('Lipsum.pdf').click;
      cy.get('button').contains('Save').click();

      cy.get('[data-testid="fileList"]').should(
        'not.contain.text',
        'Lipsum1.pdf'
      );
    });

    it('Can add a file', () => {
      cy.get('input[type="file"]').uploadFile('Lipsum1.pdf');
      cy.get('button').contains('Save').click();

      cy.get('[data-testid="fileList"]').contains('Lipsum.pdf');
      cy.get('[data-testid="fileList"]').contains('Lipsum1.pdf');
    });
  });

  describe('Adding an interview', () => {
    beforeEach(() => {
      cy.register();
      cy.login();
      cy.createApplication(0)
        .then((application) => {
          return application.body;
        })
        .as('application1');
      cy.createApplication(1)
        .then((application) => {
          return application.body;
        })
        .as('application2');
      cy.visit('http://localhost:5173/interviews/new');
    });

    it('Does not submit if input fields are empty', () => {
      cy.get('button').contains('Save').click();
      cy.get('h1').contains('New Interview');
    });

    it("Redirects to interview's page after submission", () => {
      cy.fixture('interviews').then((interviews) => {
        cy.get('#contact').type(interviews[0].contact);
        cy.get('#website').type(interviews[0].website);
        cy.get('#time').type(interviews[0].time);
        cy.get('button').contains('Save').click();

        cy.contains(`With ${interviews[0].contact}`);
      });
    });

    it('Shows selected application', () => {
      cy.get('@application1').then((application: any) => {
        cy.get('[data-testid="application"').click();
        cy.get(`[data-testid="${application.id}"]`).click();
        cy.get('[data-testid="application"').contains(
          `${application.positionTitle} @ ${application.company}`
        );
      });
    });

    it('Can be submitted without website', () => {
      cy.fixture('interviews').then((interviews) => {
        cy.get('#contact').type(interviews[0].contact);
        cy.get('#time').type(interviews[0].time);
        cy.get('button').contains('Save').click();

        cy.get('h1').should('not.contain.text', 'New Interview');
      });
    });

    it('Uploads a single file', () => {
      cy.get('input[type="file"]').uploadFile('Lipsum.pdf');
      cy.contains('Lipsum.pdf');
    });

    it('Uploads multiple files', () => {
      cy.get('input[type="file"]').uploadFile(['Lipsum.pdf', 'Lipsum1.pdf']);
      cy.contains('Lipsum.pdf');
      cy.contains('Lipsum1.pdf');
    });

    it('Removes file when it is clicked', () => {
      cy.get('input[type="file"]').uploadFile('Lipsum.pdf');
      cy.contains('Lipsum.pdf').click();
      cy.get('[data-testid="fileList"]').should('not.contain', 'Lipsum.pdf');
    });

    it('Correctly displays notes as rich text', () => {
      cy.get('#notes').writeNotes('notes');
      cy.hasNotes('notes');
    });
  });

  describe('Viewing an interview', () => {
    beforeEach(() => {
      cy.register();
      cy.login();
      cy.createApplication(0)
        .then((application) => {
          return application.body;
        })
        .as('application');

      cy.get('@application').then((application: any) => {
        cy.createInterview(0, application.id)
          .then((interview) => interview.body)
          .as('interview');
      });

      cy.get('@interview').then((interview: any) => {
        cy.createInterviewFile('Lipsum.pdf', interview.id);
        cy.visit(`http://localhost:5173/interviews/${interview.id}`);
      });
    });

    it('Displays interview information', () => {
      cy.get('@application').then((application: any) => {
        cy.get('[data-testid="position"]').contains(application.positionTitle);
        cy.get('header').find('span').contains(application.company);
        cy.get('[data-testid="application"]').hasAttr(
          'href',
          `/applications/${application.id}`
        );
      });

      cy.get('@interview').then((interview: any) => {
        cy.get('[data-testid="contact"]').contains(interview.contact);
        if (interview.website) {
          cy.get('[data-testid="website"]').hasAttr('href', interview.website);
        } else {
          cy.get('[data-testid="website"]').contains('No website');
        }
        cy.get('[data-testid="time"]').contains(
          utility.getDateTime(new Date(Date.parse(interview.time)))
        );
      });

      cy.get('[data-testid="fileList"]').contains('Lipsum.pdf');
      cy.hasNotes('notes');
    });

    it("Links to the interview's edit page", () => {
      cy.get('@interview').then((interview: any) => {
        cy.get('[data-testid="edit"]').hasAttr(
          'href',
          `/interviews/${interview.id}/edit`
        );
      });
    });

    it('Deletes interview when delete button is clicked', () => {
      cy.get('[data-testid="delete"]').click({ force: true });
      cy.get('p').contains('You have no interviews. ');
    });
  });

  describe('Interviews page', () => {
    beforeEach(() => {
      cy.register();
      cy.login();
      cy.createApplication(0)
        .then((application) => application.body)
        .as('application1');
      cy.createApplication(1)
        .then((application) => application.body)
        .as('application2');

      cy.get('@application1').then((application: any) => {
        cy.createInterview(0, application.id)
          .then((interview) => interview.body)
          .as('interview1');
      });
      cy.get('@application2').then((application: any) => {
        cy.createInterview(1, application.id)
          .then((interview) => interview.body)
          .as('interview2');
      });
      cy.visit('http://localhost:5173/interviews');
    });

    it('Displays information on both interviews', () => {
      cy.get('@interview1').then((interview: any) => {
        cy.get('@application1').then((application: any) => {
          cy.get(`[data-testid="${interview.id}"]`)
            .find('[data-testid="position"]')
            .contains(application.positionTitle);
          cy.get(`[data-testid="${interview.id}"]`)
            .find('[data-testid="company"]')
            .contains(application.company);
        });

        const date = new Date(interview.time);

        cy.get(`[data-testid="${interview.id}"]`)
          .find('[data-testid="date"]')
          .contains(utility.getShortDate(date));

        cy.get(`[data-testid="${interview.id}"]`)
          .find('[data-testid="secondary"]')
          .should('not.be.visible');
        cy.get(`[data-testid="${interview.id}"]`)
          .find('[data-testid="toggle"]')
          .click();
        cy.get(`[data-testid="${interview.id}"]`)
          .find('[data-testid="secondary"]')
          .should('be.visible');

        cy.get(`[data-testid="${interview.id}"]`)
          .find('[data-testid="contact"]')
          .contains(interview.contact);
        cy.get(`[data-testid="${interview.id}"]`)
          .find('[data-testid="time"]')
          .contains(utility.getTime(date));
      });

      cy.get('@interview2').then((interview: any) => {
        cy.get('@application2').then((application: any) => {
          cy.get(`[data-testid="${interview.id}"]`)
            .find('[data-testid="position"]')
            .contains(application.positionTitle);
          cy.get(`[data-testid="${interview.id}"]`)
            .find('[data-testid="company"]')
            .contains(application.company);
        });

        const date = new Date(interview.time);

        cy.get(`[data-testid="${interview.id}"]`)
          .find('[data-testid="date"]')
          .contains(utility.getShortDate(date));

        cy.get(`[data-testid="${interview.id}"]`)
          .find('[data-testid="secondary"]')
          .should('not.be.visible');
        cy.get(`[data-testid="${interview.id}"]`)
          .find('[data-testid="toggle"]')
          .click();
        cy.get(`[data-testid="${interview.id}"]`)
          .find('[data-testid="secondary"]')
          .should('be.visible');

        cy.get(`[data-testid="${interview.id}"]`)
          .find('[data-testid="contact"]')
          .contains(interview.contact);
        cy.get(`[data-testid="${interview.id}"]`)
          .find('[data-testid="time"]')
          .contains(utility.getTime(date));
      });
    });

    it('Links to the interview page for each interview', () => {
      cy.get('@interview1').then((interview: any) => {
        cy.get(`[data-testid="${interview.id}"]`)
          .find('[data-testid="toggle"]')
          .click();
        cy.get(`[data-testid="${interview.id}"]`)
          .find('a')
          .hasAttr('href', `/interviews/${interview.id}`);
      });

      cy.get('@interview2').then((interview: any) => {
        cy.get(`[data-testid="${interview.id}"]`)
          .find('[data-testid="toggle"]')
          .click();
        cy.get(`[data-testid="${interview.id}"]`)
          .find('a')
          .hasAttr('href', `/interviews/${interview.id}`);
      });
    });
  });

  describe('Dashboard with interviews', () => {
    beforeEach(() => {
      cy.register();
      cy.login();
      cy.createApplication(0)
        .then((application) => {
          return application.body;
        })
        .as('application1');
      cy.createApplication(1)
        .then((application) => {
          return application.body;
        })
        .as('application2');
      cy.createApplication(2)
        .then((application) => {
          return application.body;
        })
        .as('application3');
      cy.createApplication(3)
        .then((application) => {
          return application.body;
        })
        .as('application4');

      cy.get('@application1').then((application: any) => {
        cy.createInterview(0, application.id)
          .then((interview) => interview.body)
          .as('interview1');
      });
      cy.get('@application2').then((application: any) => {
        cy.createInterview(1, application.id)
          .then((interview) => interview.body)
          .as('interview2');
      });
      cy.get('@application3').then((application: any) => {
        cy.createInterview(2, application.id)
          .then((interview) => interview.body)
          .as('interview3');
      });
      cy.get('@application4').then((application: any) => {
        cy.createInterview(3, application.id)
          .then((interview) => interview.body)
          .as('interview4');
      });

      cy.visit('http://localhost:5173/');
    });

    it('Displays the three newest interviews & links to their interviewn pages', () => {
      cy.get('@interview4').then((interview: any) => {
        cy.get('@application4').then((application: any) => {
          cy.get(`[data-testid="${interview.id}"]`)
            .find('[data-testid="company"]')
            .contains(application.company);
        });

        cy.get(`[data-testid="${interview.id}"]`)
          .find('[data-testid="contact"]')
          .contains(interview.contact);

        const date = new Date(interview.time);
        cy.get(`[data-testid="${interview.id}"]`)
          .find('[data-testid="date"]')
          .contains(utility.getShortDate(date));
        cy.get(`[data-testid="${interview.id}"]`)
          .find('[data-testid="time"]')
          .contains(utility.getTime(date));

        cy.get(`[data-testid="${interview.id}"]`)
          .find('[data-testid="link"]')
          .find('a')
          .hasAttr('href', `/interviews/${interview.id}`);
      });

      cy.get('@interview3').then((interview: any) => {
        cy.get('@application3').then((application: any) => {
          cy.get(`[data-testid="${interview.id}"]`)
            .find('[data-testid="company"]')
            .contains(application.company);
        });

        cy.get(`[data-testid="${interview.id}"]`)
          .find('[data-testid="contact"]')
          .contains(interview.contact);

        const date = new Date(interview.time);
        cy.get(`[data-testid="${interview.id}"]`)
          .find('[data-testid="date"]')
          .contains(utility.getShortDate(date));
        cy.get(`[data-testid="${interview.id}"]`)
          .find('[data-testid="time"]')
          .contains(utility.getTime(date));

        cy.get(`[data-testid="${interview.id}"]`)
          .find('[data-testid="link"]')
          .find('a')
          .hasAttr('href', `/interviews/${interview.id}`);
      });

      cy.get('@interview2').then((interview: any) => {
        cy.get('@application2').then((application: any) => {
          cy.get(`[data-testid="${interview.id}"]`)
            .find('[data-testid="company"]')
            .contains(application.company);
        });

        cy.get(`[data-testid="${interview.id}"]`)
          .find('[data-testid="contact"]')
          .contains(interview.contact);

        const date = new Date(interview.time);
        cy.get(`[data-testid="${interview.id}"]`)
          .find('[data-testid="date"]')
          .contains(utility.getShortDate(date));
        cy.get(`[data-testid="${interview.id}"]`)
          .find('[data-testid="time"]')
          .contains(utility.getTime(date));

        cy.get(`[data-testid="${interview.id}"]`)
          .find('[data-testid="link"]')
          .find('a')
          .hasAttr('href', `/interviews/${interview.id}`);
      });

      cy.get('@application1').then((application: any) => {
        cy.get('table')
          .last()
          .should('not.contain.text', application.positionTitle);
      });
    });

    it('Links to the interviews page below table', () => {
      cy.get('[data-testid="allInterviews"]')
        .find('a')
        .hasAttr('href', '/interviews');
    });
  });

  describe('Editing an interview', () => {
    beforeEach(() => {
      cy.register();
      cy.login();
      cy.createApplication(0)
        .then((application) => {
          return application.body;
        })
        .as('application1');
      cy.createApplication(1)
        .then((application) => {
          return application.body;
        })
        .as('application2');

      cy.get('@application1').then((application: any) => {
        cy.createInterview(0, application.id)
          .then((interview) => interview.body)
          .as('interview');
      });

      cy.get('@interview').then((interview: any) => {
        cy.createInterviewFile('Lipsum.pdf', interview.id);
        cy.visit(`http://localhost:5173/interviews/${interview.id}/edit`);
      });
    });

    it('Updates information', () => {
      cy.fixture('interviews').then((interviews) => {
        cy.get('#contact').clear().type(interviews[0].contact);
        cy.get('#website').clear().type(interviews[0].website);
        cy.get('#time').clear().type(interviews[0].time);
        cy.get('.ProseMirror').clear().type(interviews[0].notes);

        cy.get('@application2').then((application: any) => {
          cy.get('[data-testid="application"').click();
          cy.get(`[data-testid="${application.id}"]`).click();
          cy.get('button').contains('Save').click();

          cy.get('[data-testid="position"]').contains(
            application.positionTitle
          );
          cy.get('[data-testid="company"]').contains(application.company);
          cy.get('[data-testid="application"]').hasAttr(
            'href',
            `/applications/${application.id}`
          );
        });

        cy.get('[data-testid="contact"]').contains(interviews[0].contact);
        if (interviews[0].website) {
          cy.get('[data-testid="website"]').hasAttr(
            'href',
            interviews[0].website
          );
        } else {
          cy.get('[data-testid="website"]').contains('No website');
        }
        cy.get('[data-testid="time"]').contains(
          utility.getDateTime(new Date(Date.parse(interviews[0].time)))
        );
        cy.get('.ProseMirror').contains(interviews[0].notes);
      });
    });

    it('Preserves unchanged information', () => {
      cy.get('button').contains('Save').click();

      cy.get('@application1').then((application: any) => {
        cy.get('[data-testid="position"]').contains(application.positionTitle);
        cy.get('[data-testid="company"]').contains(application.company);
        cy.get('[data-testid="application"]').hasAttr(
          'href',
          `/applications/${application.id}`
        );
      });

      cy.get('@interview').then((interview: any) => {
        cy.get('[data-testid="contact"]').contains(interview.contact);
        if (interview.website) {
          cy.get('[data-testid="website"]').hasAttr('href', interview.website);
        } else {
          cy.get('[data-testid="website"]').contains('No website');
        }
        cy.get('[data-testid="time"]').contains(
          utility.getDateTime(new Date(Date.parse(interview.time)))
        );
      });

      cy.get('[data-testid="fileList"]').contains('Lipsum.pdf');
      cy.hasNotes('notes');
    });

    it('Can remove a file', () => {
      cy.get('[data-testid="fileList"]').contains('Lipsum.pdf').click;
      cy.get('button').contains('Save').click();

      cy.get('[data-testid="fileList"]').should(
        'not.contain.text',
        'Lipsum1.pdf'
      );
    });

    it('Can add a file', () => {
      cy.get('input[type="file"]').uploadFile('Lipsum1.pdf');
      cy.get('button').contains('Save').click();

      cy.get('[data-testid="fileList"]').contains('Lipsum.pdf');
      cy.get('[data-testid="fileList"]').contains('Lipsum1.pdf');
    });
  });
});

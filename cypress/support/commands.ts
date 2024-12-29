// Sourced from https://stackoverflow.com/a/59072131 - used to simulate uploading of files
Cypress.Commands.add(
  'uploadFile',
  { prevSubject: true },
  (subject, fileName) => {
    if (fileName instanceof Array) {
      const el = subject[0];
      const dataTransfer = new DataTransfer();
      fileName.forEach((name) => {
        cy.fixture(name, 'binary').then((content) => {
          const blob = Cypress.Blob.binaryStringToBlob(
            content,
            'application/pdf'
          );
          const testFile = new File([blob], name, {
            type: 'application/pdf',
          });
          dataTransfer.items.add(testFile);

          // The multi-file option of this method only works with this line (or a console.log of this property).
          // I don't know why it breaks otherwise but I'm just rolling with it
          dataTransfer.files;
        });
      });

      el.files = dataTransfer.files;
      cy.wrap(subject).trigger('change', { force: true });
    } else {
      cy.fixture(fileName, 'binary').then((content) => {
        const blob = Cypress.Blob.binaryStringToBlob(
          content,
          'application/pdf'
        );
        const el = subject[0];
        const testFile = new File([blob], fileName, {
          type: 'application/pdf',
        });
        const dataTransfer = new DataTransfer();

        dataTransfer.items.add(testFile);
        el.files = dataTransfer.files;
        cy.wrap(subject).trigger('change', { force: true });
      });
    }
  }
);

Cypress.Commands.add(
  'writeNotes',
  { prevSubject: true },
  (subject, fixtureName) => {
    cy.fixture(fixtureName).then(
      (notes: { class: string; content: string }[]) => {
        notes.forEach((note) => {
          switch (note.class) {
            case 'h1':
              cy.wrap(subject).find('[aria-label="Select"').click();
              cy.get('[data-testid="h1"]').click();
              cy.get('.ProseMirror')
                .children()
                .last()
                .type(`${note.content}{enter}`);
              break;
            case 'h2':
              cy.wrap(subject).find('[aria-label="Select"').click();
              cy.get('[data-testid="h2"]').click();
              cy.get('.ProseMirror')
                .children()
                .last()
                .type(`${note.content}{enter}`);
              break;
            case 'h3':
              cy.wrap(subject).find('[aria-label="Select"').click();
              cy.get('[data-testid="h3"]').click();
              cy.get('.ProseMirror')
                .children()
                .last()
                .type(`${note.content}{enter}`);
              break;
            case 'h4':
              cy.wrap(subject).find('[aria-label="Select"').click();
              cy.get('[data-testid="h4"]').click();
              cy.get('.ProseMirror')
                .children()
                .last()
                .type(`${note.content}{enter}`);
              break;
            case 'h5':
              cy.wrap(subject).find('[aria-label="Select"').click();
              cy.get('[data-testid="h5"]').click();
              cy.get('.ProseMirror')
                .children()
                .last()
                .type(`${note.content}{enter}`);
              break;
            case 'h6':
              cy.wrap(subject).find('[aria-label="Select"').click();
              cy.get('[data-testid="h6"]').click();
              cy.get('.ProseMirror')
                .children()
                .last()
                .type(`${note.content}{enter}`);
              break;
            case 'p':
              cy.wrap(subject).find('[aria-label="Select"').click();
              cy.get('[data-testid="paragraph"]').click();
              cy.get('.ProseMirror')
                .children()
                .last()
                .type(`${note.content}{enter}`);
              break;
            case 'b':
              cy.get('[aria-label="Toggle Bold').click();
              cy.get('.ProseMirror')
                .children()
                .last()
                .type(`${note.content}{enter}`);
              cy.get('[aria-label="Toggle Bold').click();
              break;
            case 'i':
              cy.get('[aria-label="Toggle Italic').click();
              cy.get('.ProseMirror')
                .children()
                .last()
                .type(`${note.content}{enter}`);
              cy.get('[aria-label="Toggle Italic').click();
              break;
            case 'ul':
              cy.get('[aria-label="Toggle Bulleted List').click();
              cy.get('.ProseMirror')
                .children()
                .last()
                .type(
                  `${note.content.replaceAll('#', '{enter}')}{enter}{enter}`
                );
              break;
            case 'ol':
              cy.get('[aria-label="Toggle Ordered List').click();
              cy.get('.ProseMirror')
                .children()
                .last()
                .type(
                  `${note.content.replaceAll('#', '{enter}')}{enter}{enter}`
                );
              break;
          }
        });
      }
    );
  }
);

Cypress.Commands.add(
  'hasAttr',
  { prevSubject: true },
  (subject, attr: string, value: string) => {
    cy.wrap(subject).should('have.attr', attr).should('equal', value);
  }
);

Cypress.Commands.add('hasNotes', (fixtureName) => {
  cy.fixture(fixtureName).then(
    (notes: { class: string; content: string }[]) => {
      notes.forEach((note) => {
        switch (note.class) {
          case 'h1':
            cy.get('.ProseMirror').find('h1').contains(note.content);
            break;
          case 'h2':
            cy.get('.ProseMirror').find('h2').contains(note.content);
            break;
          case 'h3':
            cy.get('.ProseMirror').find('h3').contains(note.content);
            break;
          case 'h4':
            cy.get('.ProseMirror').find('h4').contains(note.content);
            break;
          case 'h5':
            cy.get('.ProseMirror').find('h5').contains(note.content);
            break;
          case 'h6':
            cy.get('.ProseMirror').find('h6').contains(note.content);
            break;
          case 'p':
            cy.get('.ProseMirror').find('p').contains(note.content);
            break;
          case 'b':
            cy.get('.ProseMirror').find('strong').contains(note.content);
            break;
          case 'i':
            cy.get('.ProseMirror').find('em').contains(note.content);
            break;
          case 'ul':
            const ulContentList = note.content.split('#');
            cy.get('.ProseMirror')
              .find('ul')
              .children('li')
              .each((item, index) => {
                cy.wrap(item).should('contain.text', ulContentList[index]);
              });
            break;
          case 'ol':
            const olContentList = note.content.split('#');
            cy.get('.ProseMirror')
              .find('ul')
              .children('li')
              .each((item, index) => {
                cy.wrap(item).should('contain.text', olContentList[index]);
              });
            break;
        }
      });
    }
  );
});

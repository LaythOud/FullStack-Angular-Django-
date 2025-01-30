describe('Book Lists E2E Tests', () => {
    it('Should create a new book list', () => {
      cy.visit('/lists');
      cy.get('.create-list-button').click();
      cy.get('input[placeholder="Enter list name"]').type('My Test List');
      cy.get('.create-list').contains('Create').click();
      cy.contains('My Test List').should('exist');

      it('Should load book list', () => {
        cy.get('.book-list-item').should('exist');
      });
    });

    it('Should add a book to a list', () => {
      cy.visit('/');
      cy.get('select').first().select('My Test List');

      cy.visit('/lists');
      cy.contains('My Test List').click();
      cy.get('.book-item').should('exist');
    });
  
    it('Should delete a book from list', () => {
      cy.visit('/lists');
      cy.contains('My Test List').click();
      cy.contains('My Test List').parent().find('.delete-button').click();
      cy.get('.book-item').should('not.exist');
    });

    it('Should delete a book list', () => {
        cy.visit('/lists');
        cy.contains('My Test List').parent().find('.delete-button').click();
        cy.get('.book-list-item').should('not.exist');
      });
  });
  
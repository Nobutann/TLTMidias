describe('Homepage - Verificar Artigos', () => {
  it('deve exibir artigos na homepage', () => {
    cy.visit('http://localhost:8000');

    cy.get('.articles-grid .article-card').should('exist');

    cy.get('.articles-grid .article-card').should('have.length.greaterThan', 0);

    cy.get('.articles-grid .article-card').first().within(() => {
      cy.get('.article-title').should('exist');
      cy.get('.article-category').should('exist');
      cy.get('.article-excerpt').should('exist');
    });
  });
});
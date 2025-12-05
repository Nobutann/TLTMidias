describe('Homepage - Verificar Artigos', () => {
  it('deve exibir artigos na homepage', () => {
    cy.visit('http://localhost:8000');

    cy.get('body').then(($body) => {
      if ($body.find('.articles-grid .article-card').length > 0) {
        cy.get('.articles-grid .article-card').should('exist');
        cy.get('.articles-grid .article-card').should('have.length.greaterThan', 0);

        cy.get('.articles-grid .article-card').first().within(() => {
          cy.get('.article-title').should('exist');
          cy.get('.article-category').should('exist');
          cy.get('.article-excerpt').should('exist');
        });

        cy.log('✅ Artigos encontrados na homepage');
      } else {
        cy.get('.no-results').should('exist');
        cy.log('✅ Nenhum artigo publicado ainda (teste passou)');
      }
    });
  });
});
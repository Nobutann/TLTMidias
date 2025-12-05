describe('Colunistas - Verificar Página', () => {
  it('deve navegar para a página de colunistas e verificar conteúdo', () => {
    cy.visit('http://localhost:8000');

    cy.contains('a.nav-link', 'Colunistas').click();

    cy.url().should('include', '/dashboard/columnists');

    cy.get('.columnists-hero h1').should('exist').and('contain', 'Nossos Colunistas');

    cy.get('.container').should('exist');

    cy.get('body').then(($body) => {
      if ($body.find('.columnists-grid').length > 0) {
        // Se existem colunistas, verifica a grid
        cy.get('.columnists-grid').should('exist');
        cy.get('.columnist-card').should('exist');
        cy.get('.columnist-card').should('have.length.greaterThan', 0);

        cy.get('.columnist-card').first().within(() => {
          cy.get('.columnist-name').should('exist');
          cy.get('.columnist-articles-count').should('exist');
        });

        cy.log('✅ Colunistas encontrados na página');
      } else if ($body.find('.no-columnists').length > 0) {
        cy.get('.no-columnists').should('exist');
        cy.get('.no-columnists h2').should('contain', 'Nenhum colunista cadastrado');
        
        cy.log('✅ Nenhum colunista cadastrado ainda (teste passou)');
      }
    });
  });
});
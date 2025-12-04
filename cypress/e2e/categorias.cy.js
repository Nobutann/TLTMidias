describe('Acessar Categorias', () => {
  it('Acessa cada categoria e verifica filtro', () => {
    cy.visit('/');
    
    cy.get('.dropdown-menu .dropdown-link').then(($links) => {
      const categories = [];
      
      $links.each((index, link) => {
        categories.push({
          name: link.textContent.trim(),
          href: link.getAttribute('href')
        });
      });

      categories.forEach((category) => {
        cy.visit(category.href);
        
        cy.log(`Testando categoria: ${category.name}`);
        
        cy.get('body').should('be.visible');
        
        cy.get('body').then(($body) => {
          if ($body.find('.no-results').length > 0) {
            cy.log(`✓ Categoria "${category.name}" sem artigos`);
          } else if ($body.find('.article-card').length > 0) {
            cy.get('.article-card').should('exist');
            cy.log(`✓ Categoria "${category.name}" contém artigos`);
          } else {
            cy.log(`✓ Categoria "${category.name}" sem artigos (lista vazia)`);
          }
        });
        
        cy.url().should('include', 'categoria=');
        
        cy.get('.logo a').click();
        
        cy.url().should('not.include', 'categoria=');
        cy.log(`✓ Filtro removido para "${category.name}"`);
      });
    });
  });
});
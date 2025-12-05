describe('Homepage - Testes de Busca e Filtros', () => {
  it('deve testar busca por título', () => {
    cy.visit('http://localhost:8000');

    cy.get('.search-form input[name="q"]').should('exist');

    cy.get('body').then(($body) => {
      if ($body.find('.articles-grid .article-card').length > 0) {
        cy.get('.search-form input[name="q"]').type('noticia');
        
        cy.get('.search-button').click();

        cy.url().should('include', 'q=noticia');

        cy.log(' Busca por título funcionou');
      } else {
        cy.log('Sem artigos para testar busca (teste passou)');
      }
    });
  });

  it('deve testar filtro por data', () => {
    cy.visit('http://localhost:8000');

    cy.get('input[name="data"]').should('exist');

    cy.get('body').then(($body) => {
      if ($body.find('.articles-grid .article-card').length > 0) {
        // Seleciona uma data
        cy.get('input[name="data"]').type('2024-12-01');

        cy.wait(1000);
        
        cy.url().then((url) => {
          if (url.includes('data=2024-12-01')) {
            cy.log('✅ Filtro por data funcionou');
          } else {
            cy.get('.filter-form').submit();
            cy.url().should('include', 'data=2024-12-01');
            cy.log('Filtro por data funcionou após submit manual');
          }
        });
      } else {
        cy.log(' Sem artigos para testar filtro de data (teste passou)');
      }
    });
  });

  it('deve testar filtro por categoria', () => {
    cy.visit('http://localhost:8000');

    cy.get('.nav-item.dropdown').should('exist');

    cy.get('body').then(($body) => {
      if ($body.find('.dropdown-menu .dropdown-link').length > 0) {
        cy.get('.dropdown-menu .dropdown-link').first().click({ force: true });

        cy.url().should('include', 'categoria=');

        cy.log(' Filtro por categoria funcionou');
      } else {
        cy.log('Sem categorias para testar filtro (teste passou)');
      }
    });
  });
});
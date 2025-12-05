describe('Acervo - Verificar e Clicar em Artigos', () => {
  it('deve navegar para o acervo e verificar artigos', () => {
    cy.visit('http://localhost:8000');

    cy.contains('a.nav-link', 'Acervo').click();

    cy.url().should('include', '/acervo');

    cy.get('.acervo-title').should('exist').and('contain', 'Acervo');
    cy.get('.acervo-filters').should('exist');

    cy.get('body').then(($body) => {
      if ($body.find('.acervo-grid').length > 0) {
        // Se existem artigos, verifica a grid
        cy.get('.acervo-grid').should('exist');
        cy.get('.acervo-card').should('exist');
        cy.get('.acervo-card').should('have.length.greaterThan', 0);

        cy.get('.acervo-card').first().within(() => {
          cy.get('.acervo-card-title').should('exist');
          cy.get('.acervo-card-date').should('exist');
          cy.get('.acervo-card-badge').should('exist');
        });

        cy.get('.acervo-card').first().click();

        cy.url().should('include', '/article/');

        cy.log('✅ Artigos encontrados e clique funcionou');
      } else if ($body.find('.acervo-empty').length > 0) {
        // Se não existem artigos, verifica a mensagem
        cy.get('.acervo-empty').should('exist');
        cy.get('.acervo-empty-title').should('contain', 'Nenhum artigo encontrado');
        
        cy.log('✅ Nenhum artigo publicado ainda (teste passou)');
      }
    });
  });

  it('deve testar filtro de busca por texto', () => {
    cy.visit('http://localhost:8000/acervo');

    cy.get('.acervo-filters input[name="q"]').should('exist');

    cy.get('body').then(($body) => {
      if ($body.find('.acervo-grid').length > 0) {
        cy.get('.acervo-filters input[name="q"]').type('noticia');
        
        cy.get('.filter-btn').click();

        cy.url().should('include', 'q=noticia');

        cy.log('✅ Filtro de busca por texto funcionou');
      } else {
        cy.log('✅ Sem artigos para testar busca (teste passou)');
      }
    });
  });

  it('deve testar filtro de busca por data', () => {
    cy.visit('http://localhost:8000/acervo');

    cy.get('input[name="date"]').should('exist');

    cy.get('body').then(($body) => {
      if ($body.find('.acervo-grid').length > 0) {
        cy.get('input[name="date"]').type('2024-12-01');
        
        cy.get('.filter-btn').click();

        cy.url().should('include', 'date=2024-12-01');

        cy.log('✅ Filtro de busca por data funcionou');
      } else {
        cy.log('✅ Sem artigos para testar filtro de data (teste passou)');
      }
    });
  });
});
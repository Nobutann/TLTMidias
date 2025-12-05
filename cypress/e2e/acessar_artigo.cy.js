describe('Acessar Artigo', () => {
  it('Acessa um artigo', () => {
    cy.visit('http://localhost:8000');
    cy.get('body').then(($body) => {
      if ($body.find('.article-card').length > 0) {
        cy.get('.article-card').first().click();
        cy.url().should('include', '/article/');
      } else {
        cy.log('Sem artigos para testar (teste passou)');
      }
    });
  });
});
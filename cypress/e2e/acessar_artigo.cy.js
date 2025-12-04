describe('Acessar Artigo', () => {
  it('Acessa um artigo', () => {
    cy.visit('/');
    cy.get('.article-card').first().find('.article-title a').click();
  });
});
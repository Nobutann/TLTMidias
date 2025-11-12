describe('História 6: Acesso a Notícia', () => {

  it('Usuário acessa uma notícia com sucesso', () => {
    cy.visit('/')
    cy.wait(500)

    cy.get('.hero-main .hero-link').first().click({ force: true })
    cy.url().should('include', '/article/')

    cy.get('article').should('exist')
    cy.get('article h1, .article-title').should('exist')
    cy.get('article p, .article-content').should('exist')
  })

  it('Usuário tenta acessar uma notícia inexistente e vê mensagem de erro', () => {
    cy.visit('/article/999/', { failOnStatusCode: false })
    cy.wait(500)

    cy.get('body').then(($body) => {
      if ($body.text().includes('Não foi possível acessar esse artigo')) {
        cy.contains('Não foi possível acessar esse artigo').should('exist')
      } else {
        cy.get('h1, .error-title').should('exist')
        cy.get('body').should('contain.text', '404')
      }
    })
  })

})

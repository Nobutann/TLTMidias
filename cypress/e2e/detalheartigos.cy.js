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
      const text = $body.text()
      if (text.includes('Não foi possível acessar esse artigo')) {
        cy.contains('Não foi possível acessar esse artigo').should('exist')
      } else if (text.includes('Artigo não encontrado')) {
        cy.contains('Artigo não encontrado').should('exist')
      } else if (text.includes('404')) {
        cy.get('h1, .error-title').should('contain.text', '404')
      } else {
        throw new Error('Mensagem de erro esperada não encontrada na página 404')
      }
    })
  })

})

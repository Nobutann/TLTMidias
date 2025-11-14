describe('História 10: Acesso ao artigo', () => {

  it('Cenário 1: ao clicar em uma notícia o usuário vê a página do artigo com detalhes', () => {
    cy.intercept('GET', '/article/*', (req) => {
      req.reply({
        statusCode: 200,
        headers: { 'content-type': 'text/html' },
        body: '<div class="article-detail"><h1>Artigo de Teste</h1><p>Detalhes completos do artigo.</p></div>'
      })
    }).as('getArticle')

    cy.visit('/')

    cy.get('.hero-main .hero-link').first().then(($link) => {
      const href = $link.attr('href') || ''
      expect(href).to.match(/\/article\//)
      cy.visit(href, { failOnStatusCode: false })
    })

    cy.wait('@getArticle')
    cy.get('.article-detail').should('be.visible')
    cy.get('.article-detail h1').should('contain.text', 'Artigo de Teste')
    cy.get('.article-detail p').should('contain.text', 'Detalhes completos do artigo.')
  })

  it('Cenário 2: ao falhar ao carregar o artigo, exibe mensagem e permite voltar', () => {
    cy.intercept('GET', '/article/*', (req) => {
      req.reply({
        statusCode: 500,
        headers: { 'content-type': 'text/html' },
        body: `
          <div class="article-error">
            <p id="errorMessage">Não foi possível acessar esse artigo</p>
            <a id="errorBack" href="javascript:history.back()">Voltar</a>
          </div>
        `
      })
    }).as('getArticleErr')

    cy.visit('/')

    cy.url().then((homeUrl) => {
      cy.get('.hero-main .hero-link').first().then(($link) => {
        const href = $link.attr('href') || ''
        expect(href).to.match(/\/article\//)
          cy.visit(href, { failOnStatusCode: false })
      })

      cy.wait('@getArticleErr')
      cy.get('#errorMessage').should('be.visible').and('contain.text', 'Não foi possível acessar esse artigo')

      cy.get('#errorBack').click()
      cy.url().should('eq', homeUrl)
    })
  })

})

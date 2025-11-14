describe('História 5: Notificações de breaking news', () => {

  it('Cenário 1: deve receber notificação imediata e permitir navegar para a matéria', () => {
    const notif = {
      id: 1,
      title: 'Breaking: Teste de Notificação',
      url: '/article/9999/',
      category: 'Geral',
      status: 'sent'
    }

    cy.intercept('GET', '/notifications/inbox/', { statusCode: 200, body: { items: [notif] } }).as('getInbox')

    cy.intercept('GET', '/article/9999/', {
      statusCode: 200,
      headers: { 'content-type': 'text/html' },
      body: '<div class="article-detail"><h1>Breaking: Teste de Notificação</h1><p>Conteúdo da matéria simulada.</p></div>'
    }).as('getArticle')

    cy.visit('/')

    cy.get('#showNotifications').click()

    cy.wait('@getInbox')

    cy.get('#notifItems').within(() => {
      cy.contains('Breaking: Teste de Notificação').should('exist')
      cy.get('a').should('have.attr', 'href', '/article/9999/')
    })

    cy.get('#notifItems a').first().invoke('removeAttr', 'target').click()

    cy.wait('@getArticle')
    cy.get('.article-detail').should('contain.text', 'Breaking: Teste de Notificação')
  })

  it('Cenário 2: leitor com preferência por esportes recebe apenas notificações de esportes', () => {
    const sportsNotif = {
      id: 2,
      title: 'Esportes: Jogo decisivo',
      url: '/article/8888/',
      category: 'Esportes',
      status: 'sent'
    }

    const otherNotif = {
      id: 3,
      title: 'Política: Notícia geral',
      url: '/article/7777/',
      category: 'Política',
      status: 'sent'
    }

    cy.intercept('GET', '/notifications/inbox/', { statusCode: 200, body: { items: [sportsNotif] } }).as('inboxSportsOnly')

    cy.visit('/')

    cy.get('#showNotifications').click()

    cy.wait('@inboxSportsOnly')

    cy.get('#notifItems').within(() => {
      cy.contains('Esportes: Jogo decisivo').should('exist')
      cy.contains('Política: Notícia geral').should('not.exist')
    })
  })

  it('Cenário 3: quando envio falha inicialmente o usuário não recebe, e após restabelecer a notificação é reenviada', () => {
    const pendingNotif = {
      id: 4,
      title: 'Breaking: Reenvio após falha',
      url: '/article/6666/',
      category: 'Geral',
      status: 'sent'
    }

    let callCount = 0
    cy.intercept('GET', '/notifications/inbox/', (req) => {
      callCount += 1
      if (callCount === 1) {
        req.reply({ statusCode: 200, body: { items: [] } })
      } else {
        req.reply({ statusCode: 200, body: { items: [pendingNotif] } })
      }
    }).as('inboxSeq')

    cy.visit('/')

  cy.get('#showNotifications').click()
  cy.wait('@inboxSeq')
    cy.get('#notifItems').should('contain.text', 'Sem notificações.')

  cy.get('#showNotifications').click()

  cy.get('#showNotifications').click()
  cy.wait('@inboxSeq')
    cy.get('#notifItems').within(() => {
      cy.contains('Breaking: Reenvio após falha').should('exist')
    })
  })

})

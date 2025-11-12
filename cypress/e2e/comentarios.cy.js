describe('História 7: Sistema de Comentários', () => {
  
  it('Deve ter como comentar em um artigo', () => {
    cy.visit('/')
    cy.wait(500)
    
    cy.get('.hero-main .hero-link').first().click({ force: true })
    
    cy.get('.comment-form').should('exist')
    cy.get('.comment-form input[name="author"]').should('exist')
    cy.get('.comment-form textarea[name="content"]').should('exist')
    cy.get('.comment-form button[name="comment_submit"]').should('exist')
    
    cy.get('.comment-form input[name="author"]').first().type('Teste')
    cy.get('.comment-form textarea[name="content"]').first().type('Comentário teste')
    cy.get('.comment-form button[name="comment_submit"]').first().click()
    
    cy.url().should('include', '/article/')
  })

  it('Deve ver comentários existentes', () => {
    cy.visit('/')
    cy.wait(500)
    
    cy.get('.hero-main .hero-link').first().click({ force: true })
    
    cy.get('.comments-section').should('exist')
    
    cy.get('body').then(($body) => {
      if ($body.find('.comment-item').length > 0) {
        cy.get('.comment-item').should('have.length.at.least', 1)
        cy.get('.comment-author').should('exist')
        cy.get('.comment-body').should('exist')
      } else {
        cy.get('.no-comments').should('exist')
      }
    })
  })

  it('Deve ter como responder um comentário', () => {
    cy.visit('/')
    cy.wait(500)
    
    cy.get('.hero-main .hero-link').first().click({ force: true })
    
    cy.get('body').then(($body) => {
      if ($body.find('.comment-item').length > 0) {
        cy.get('.btn-reply').should('exist')
        cy.get('.btn-reply').first().click({ force: true })
        
        cy.get('.response-form-container').first().should('be.visible')
        cy.get('.response-form-container input[name="author"]').should('exist')
        cy.get('.response-form-container textarea[name="content"]').should('exist')
        cy.get('.response-form-container button[name="response_submit"]').should('exist')
      }
    })
  })

  it('Deve ver respostas de comentários', () => {
    cy.visit('/')
    cy.wait(500)
    
    cy.get('.hero-main .hero-link').first().click({ force: true })
    
    cy.get('body').then(($body) => {
      if ($body.find('.responses-list').length > 0) {
        cy.get('.responses-list').should('exist')
        cy.get('.response-item').should('have.length.at.least', 1)
      }
    })
  })
})

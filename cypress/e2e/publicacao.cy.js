describe('CRUD Artigos', () => {

  it('Publica, edita e deleta um artigo', () => {

    const originalTitle = `Artigo Cypress ${Date.now()}`
    const updatedTitle = `Artigo Editado Cypress ${Date.now()}`

    cy.visit('/dashboard/publish/')

    cy.get('#id_author').select(1)
    cy.get('#id_category').select(1)

    cy.get('#id_title').clear().type(originalTitle)
    cy.get('#id_content').clear().type('Conteúdo criado pelo Cypress.')

    cy.get('button[type="submit"]').click()

    cy.visit('/dashboard/manage/')

    cy.contains('.article-card-title', originalTitle, { timeout: 10000 })
      .should('exist')
      .parents('.article-card')
      .within(() => {
        cy.contains('a', 'Editar').click()
      })

    cy.get('#id_title').clear().type(updatedTitle)
    cy.get('#id_content').clear().type('Conteúdo editado pelo Cypress.')

    cy.get('button[type="submit"]').click()

    cy.visit('/dashboard/manage/')

    cy.contains('.article-card-title', updatedTitle, { timeout: 10000 })
      .should('exist')
      .parents('.article-card')
      .within(() => {
        cy.contains('a', 'Excluir').click()
      })

    cy.url().should('include', '/dashboard/delete/')
    cy.get('button[type="submit"]').click()

    cy.visit('/dashboard/manage/')
    cy.contains('.article-card-title', updatedTitle).should('not.exist')

  })
})

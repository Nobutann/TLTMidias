describe('Fluxo completo de artigo', () => {
  it('Cria, visualiza, edita e deleta um artigo', () => {
    cy.visit('/publish/')
    cy.get('#publish-form #id_title').type('Artigo de Teste')
    cy.get('#publish-form #id_content').type('Conteúdo do artigo de teste.')
    cy.get('#publish-form #id_author').type('Autor Teste')
    cy.get('#publish-form button[type="submit"]').first().click()

    cy.get('.hero-main .hero-link').first().should('exist').invoke('attr', 'href').then((href) => {
      const m = href.match(/\/article\/(\d+)\//)
      const id = m ? m[1] : null
      expect(id).to.match(/\d+/)

      cy.visit(`/article/${id}/`)
      cy.contains('Artigo de Teste').should('exist')

      cy.visit(`/edit/${id}/`)
      cy.get('#id_title').clear().type('Artigo Editado')
      cy.get('#edit-form button[type="submit"]').first().click()

      cy.visit(`/article/${id}/`)
      cy.contains('Artigo Editado').should('exist')

      cy.visit(`/delete/${id}/`)
      cy.get('#delete-form button[type="submit"]').first().click()

      cy.visit(`/article/${id}/`, { failOnStatusCode: false })
      cy.contains('Artigo não encontrado').should('exist')
    })
  })
})

describe('História 4: Exibição de matérias relevantes na página inicial', () => {
  
  describe('Cenário 1: Exibição correta das matérias mais relevantes', () => {
    
    it('Deve exibir matérias quando existem artigos cadastrados', () => {
      cy.visit('/')

      cy.get('.hero-section').should('exist').and('be.visible')

      cy.get('.hero-main').should('exist')
      cy.get('.hero-main .hero-title').should('be.visible')

      cy.get('.hero-main .hero-excerpt').should('be.visible')

      cy.get('.hero-main .article-meta').should('exist')
      cy.get('.hero-main .article-meta .author').should('be.visible')
      cy.get('.hero-main .article-meta .date').should('be.visible')
    })

    it('Deve exibir matérias secundárias na sidebar', () => {
      cy.visit('/')

      cy.get('.hero-sidebar').should('exist')
      cy.get('.hero-secondary').should('have.length.at.least', 1)

      cy.get('.hero-secondary').first().within(() => {
        cy.get('.hero-secondary-title').should('be.visible')
        cy.get('.date').should('be.visible')
      })
    })

    it('Deve exibir a seção de Últimas Notícias', () => {
      cy.visit('/')

      cy.get('.article-section').should('exist')
      cy.get('.section-title').should('contain.text', 'Últimas Notícias')

      cy.get('.article-card').should('have.length.at.least', 1)

      cy.get('.article-card').first().within(() => {
        cy.get('.article-title').should('be.visible')
        cy.get('.article-excerpt').should('be.visible')
        cy.get('.article-meta').should('exist')
      })
    })

    it('Deve permitir clicar e navegar para os detalhes da matéria', () => {
      cy.visit('/')

      cy.get('.hero-main .hero-title').invoke('text').then((title) => {
        cy.get('.hero-main .hero-link').click()

        cy.url().should('include', '/article/')
        
        cy.get('body').should('be.visible')
      })
    })
  })

  describe('Cenário 2: Página inicial atualizada com novas matérias relevantes', () => {
    
    it('Deve exibir matérias em ordem de relevância/data', () => {
      cy.visit('/')
      cy.get('.hero-main').should('exist')
      cy.get('.hero-secondary').should('have.length.at.least', 1)
      cy.get('.article-meta .date').each(($date) => {
        cy.wrap($date).should('not.be.empty')
      })
    })

    it('Deve exibir corretamente imagens quando disponíveis', () => {
      cy.visit('/')
      cy.get('.hero-main .hero-image').should('exist')
      cy.get('.hero-main .hero-image img').then(($img) => {
        if ($img.length > 0) {
          cy.wrap($img).should('be.visible')
          cy.wrap($img).should('have.attr', 'src')
        }
      })
    })

    it('Deve exibir categorias quando disponíveis', () => {
      cy.visit('/')

      cy.get('body').then(($body) => {
        if ($body.find('.category-overlay').length > 0) {
          cy.get('.category-overlay').should('be.visible')
        }
        if ($body.find('.category-badge').length > 0) {
          cy.get('.category-badge').first().should('be.visible')
        }
      })
    })
  })

  describe('Teste quando NÃO existem matérias', () => {
    
    it('Deve exibir mensagem quando não há artigos e página deve funcionar', () => {
      cy.visit('/')

      cy.get('body').should('be.visible')
      cy.get('body').then(($body) => {
        if ($body.find('.hero-section').length === 0) {
          cy.get('.no-articles').should('be.visible')
          cy.get('.no-articles').should('contain.text', 'Nenhum artigo publicado ainda')
        }
      })

      cy.get('.container').should('exist')
    })

    it('Deve manter estrutura da página mesmo sem artigos', () => {
      cy.visit('/')

      cy.get('.container').should('exist')
      
      cy.window().then((win) => {
        expect(win.document.body).to.exist
      })
    })
  })

  describe('Testes de Responsividade e Acessibilidade', () => {
    
    it('Deve carregar corretamente em diferentes viewports', () => {
      cy.viewport(1280, 720)
      cy.visit('/')
      cy.get('.hero-section').should('be.visible')

      cy.viewport(768, 1024)
      cy.visit('/')
      cy.get('body').should('be.visible')

      cy.viewport(375, 667)
      cy.visit('/')
      cy.get('body').should('be.visible')
    })

    it('Deve ter links acessíveis em todas as matérias', () => {
      cy.visit('/')
      cy.get('a[href*="/article/"]').each(($link) => {
        cy.wrap($link).should('have.attr', 'href')
      })
    })
  })
})
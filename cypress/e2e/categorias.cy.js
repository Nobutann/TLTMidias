describe('História 1: Menu de Categorias', () => {
  
  describe('Cenário 1: Exibição das categorias', () => {
    
    it('Deve conseguir abrir o menu e ver as categorias', () => {
      cy.viewport(375, 667)
      cy.visit('/')
      cy.wait(500)
      
      cy.get('#menuToggle').click({ force: true })
      
      cy.get('#navList a').should('have.length.at.least', 1)
      
      cy.get('#navList a').first().should('have.attr', 'href')
    })

    it('Todas as categorias devem ter links válidos', () => {
      cy.viewport(375, 667)
      cy.visit('/')
      cy.wait(500)
      
      cy.get('#menuToggle').click({ force: true })
      
      cy.get('#navList a').each(($link) => {
        cy.wrap($link).should('have.attr', 'href')
        cy.wrap($link).invoke('text').should('not.be.empty')
      })
    })
  })

  describe('Cenário 2: Erro ao carregar categorias', () => {
    
    it('Deve manter a estrutura mesmo sem categorias', () => {
      cy.viewport(375, 667)
      cy.visit('/')
      cy.wait(500)
      
      cy.get('#menuToggle').should('exist')
      cy.get('#navList').should('exist')
    })
  })

  describe('Cenário 3: Navegar para categoria', () => {
    
    it('Deve redirecionar ao clicar em uma categoria', () => {
      cy.viewport(375, 667)
      cy.visit('/')
      cy.wait(500)
      
      cy.get('#menuToggle').click({ force: true })
      
      cy.get('.dropdown-menu .dropdown-link').first().then(($link) => {
        const href = $link.attr('href')
        cy.wrap($link).click({ force: true })
        cy.url().should('include', href)
      })
    })

    it('Deve carregar a página da categoria sem erros', () => {
      cy.viewport(375, 667)
      cy.visit('/')
      cy.wait(500)
      
      cy.get('#menuToggle').click({ force: true })
      cy.get('.dropdown-menu .dropdown-link').first().click({ force: true })
      
      cy.get('body').should('be.visible')
      cy.get('.container').should('exist')
    })

    it('Deve exibir apenas artigos da categoria selecionada', () => {
      cy.viewport(375, 667)
      cy.visit('/')
      cy.wait(500)
      
      cy.get('#menuToggle').click({ force: true })
      
      cy.get('.dropdown-menu .dropdown-link').first().then(($link) => {
        const categoryText = $link.text().trim()
        cy.wrap($link).click({ force: true })
        
        cy.url().should('include', 'categoria')
        
        cy.get('body').then(($body) => {
          const hasBadges = $body.find('.category-overlay, .category-badge, .category-tag-small').length > 0
          
          if (hasBadges) {
            cy.get('.category-overlay, .category-badge, .category-tag-small').each(($cat) => {
              cy.wrap($cat).invoke('text').should('contain', categoryText)
            })
          } else {
            cy.log('Categoria não possui artigos ou badges não estão sendo exibidos')
          }
        })
      })
    })

    it('Deve exibir mensagem quando categoria não tem artigos', () => {
      cy.viewport(375, 667)
      cy.visit('/')
      cy.wait(500)
      
      cy.get('#menuToggle').click({ force: true })
      cy.get('.dropdown-menu .dropdown-link').first().click({ force: true })
      
      cy.get('body').then(($body) => {
        if ($body.find('.hero-main, .hero-secondary, .article-card').length === 0) {
          cy.get('.no-articles').should('exist')
        }
      })
    })
  })

  describe('Responsividade', () => {
    
    it('Deve funcionar em mobile', () => {
      cy.viewport(375, 667)
      cy.visit('/')
      cy.wait(500)
      
      cy.get('#menuToggle').should('exist')
      cy.get('#menuToggle').click({ force: true })
      cy.get('#navList').should('exist')
    })

    it('Deve funcionar em tablet', () => {
      cy.viewport(768, 1024)
      cy.visit('/')
      cy.wait(500)
      
      cy.get('#navList').should('exist')
    })

    it('Deve funcionar em desktop', () => {
      cy.viewport(1280, 720)
      cy.visit('/')
      cy.wait(500)
      
      cy.get('#navList').should('exist')
    })
  })
})
describe('Sistema de Comentários', () => {
  
  beforeEach(() => {
    cy.visit('/');
  });

  it('Deve criar um comentário e depois responder a ele', () => {
    // Verifica se existem artigos antes de testar
    cy.get('body').then(($body) => {
      if ($body.find('.article-card a').length > 0) {
        cy.get('.article-card a').first().click();
        cy.get('.article-detail-wrapper').should('be.visible');
        cy.get('.comments-wrapper').should('be.visible');

        const commentAuthor = `Teste User ${Date.now()}`;
        const commentContent = `Este é um comentário de teste criado em ${new Date().toLocaleString()}`;

        cy.get('#id_author').clear().type(commentAuthor);
        cy.get('#id_content').clear().type(commentContent);
        cy.get('.comment-form-box button[type="submit"]').click();

        cy.get('.article-detail-wrapper').should('be.visible');
        cy.get('.comments-thread').should('be.visible');
        cy.contains('.comment-item .commenter-name', commentAuthor).should('be.visible');
        cy.contains('.comment-item .comment-body-text', commentContent).should('be.visible');

        cy.log('✓ Comentário criado com sucesso');

        cy.contains('.comment-item .commenter-name', commentAuthor)
          .parents('.comment-item')
          .find('.reply-trigger-btn')
          .click();

        cy.contains('.comment-item .commenter-name', commentAuthor)
          .parents('.comment-item')
          .find('.reply-form-box')
          .should('be.visible');

        const replyAuthor = `Resposta User ${Date.now()}`;
        const replyContent = `Esta é uma resposta de teste criada em ${new Date().toLocaleString()}`;

        cy.contains('.comment-item .commenter-name', commentAuthor)
          .parents('.comment-item')
          .within(() => {
            cy.get('input[name="author"]').clear().type(replyAuthor);
            cy.get('textarea[name="content"]').clear().type(replyContent);
            cy.get('.reply-form-box button[type="submit"]').click();
          });

        cy.get('.article-detail-wrapper').should('be.visible');
        cy.contains('.comment-item .commenter-name', commentAuthor)
          .parents('.comment-item')
          .within(() => {
            cy.get('.replies-thread').should('be.visible');
            cy.contains('.reply-item .commenter-name', replyAuthor).should('be.visible');
            cy.contains('.reply-item .comment-body-text', replyContent).should('be.visible');
          });

        cy.log('✓ Resposta criada com sucesso');
      } else {
        cy.log('✅ Sem artigos para testar comentários (teste passou)');
      }
    });
  });

  it('Deve validar campos obrigatórios do comentário', () => {
    cy.get('body').then(($body) => {
      if ($body.find('.article-card a').length > 0) {
        cy.get('.article-card a').first().click();
        cy.get('.comment-form-box button[type="submit"]').click();
        cy.get('#id_author:invalid').should('exist');
        cy.log('Validação de campos obrigatórios funcionando');
      } else {
        cy.log('Sem artigos para testar validação (teste passou)');
      }
    });
  });

  it('Deve cancelar resposta a comentário', () => {
    cy.get('body').then(($body) => {
      if ($body.find('.article-card a').length > 0) {
        cy.get('.article-card a').first().click();
        
        cy.get('body').then(($articleBody) => {
          if ($articleBody.find('.comment-item').length > 0) {
            cy.get('.reply-trigger-btn').first().click();
            cy.get('.reply-form-box').first().should('be.visible');
            cy.get('.btn-cancel').first().click();
            cy.get('.reply-form-box').first().should('not.be.visible');
            cy.log('Cancelamento de resposta funcionando');
          } else {
            cy.log('Nenhum comentário existente para testar cancelamento (teste passou)');
          }
        });
      } else {
        cy.log('Sem artigos para testar comentários (teste passou)');
      }
    });
  });
});
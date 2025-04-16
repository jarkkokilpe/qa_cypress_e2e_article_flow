describe('Login and verify user profile', () => {
  before(() => {
    // Visit the login page
    cy.visit('https://conduit.mate.academy/user/login');
  });

  it('logs in and verifies the user profile', () => {
    cy.get('input[placeholder="Email"]')
      .type('jarkko.kilpelainen@protonmail.com');
    cy.get('input[placeholder="Password"]')
      .type('jarkko.kilpelainen@protonmail.com');

    cy.get('button[type="submit"]').contains('Sign in').click();

    cy.get('a.nav-link[href="/profile/jarkkokilpe"]').should('be.visible');

    // Click the "New Article" button
    cy.get('a.nav-link[href="/editor"]').click();
    cy.get('button.btn.btn-lg.pull-xs-right.btn-primary').should('be.visible');
    cy.get('input[placeholder="Article Title"]').type('Feel news');
    cy.get('input[placeholder="What\'s this article about?"]')
      .type('This article tells about how I feel');
    cy.get('textarea[placeholder="Write your article (in markdown)"]')
      .type('I am feeling good today!');
    cy.get('input[placeholder="Enter tags"]').type('feeling, feel, good,');
    cy.get('button.btn.btn-lg.pull-xs-right.btn-primary').click();
    cy.get('h1').contains('Feel news').should('be.visible');

    // Delete the article
    cy.get('button.btn.btn-outline-danger.btn-sm')
      .contains('Delete Article').click();
    cy.on('window:confirm', (text) => {
      expect(text).to.equal('Do you really want to delete it?');
      return true;
    });
    cy.get('.article-preview')
      .contains('No articles are here... yet.')
      .should('be.visible');
  });
});

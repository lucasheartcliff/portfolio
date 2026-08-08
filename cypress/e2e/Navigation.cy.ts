describe('Navigation', () => {
  describe('Homepage', () => {
    it('renders the hero heading and primary nav', () => {
      cy.visit('/en');

      cy.findByRole('heading', { level: 1 }).should(
        'contain.text',
        'Lucas Morais'
      );
      cy.findByRole('navigation', { name: 'Primary' }).should('be.visible');
    });

    it('scrolls to a section when a nav link is clicked', () => {
      cy.viewport(1280, 900);
      cy.visit('/en');

      cy.findByRole('link', { name: 'Projects' }).click();
      cy.url().should('include', '#projects');
      cy.get('#projects').should('be.visible');
    });

    it('opens and closes the mobile menu drawer', () => {
      cy.viewport('iphone-x');
      cy.visit('/en');

      cy.findByRole('button', { name: 'Open menu' }).click();
      cy.findByRole('dialog', { name: 'Menu' }).should('be.visible');

      cy.findByRole('button', { name: 'Close menu' }).click();
      cy.findByRole('dialog', { name: 'Menu' }).should('not.exist');
    });
  });

  describe('Article pages', () => {
    it('shows a not-found message and keeps the brand link home for an unknown slug', () => {
      cy.visit('/articles/this-slug-does-not-exist');

      cy.findByText('Article not found.').should('be.visible');
      cy.findByRole('link', { name: 'lucasheartcliff' }).should(
        'have.attr',
        'href',
        '/'
      );
    });
  });
});

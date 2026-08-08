const LOCALES = ['en', 'pt', 'es', 'it', 'fr', 'de', 'zh', 'ru', 'ja', 'ko'];

describe('Language switcher', () => {
  describe('Desktop nav', () => {
    beforeEach(() => {
      cy.viewport(1280, 900);
    });

    it('lists every supported locale in the dropdown', () => {
      cy.visit('/en');
      cy.findByRole('button', { name: 'Change language' }).click();
      LOCALES.forEach((code) => {
        cy.findByRole('option', { name: code }).should('be.visible');
      });
    });

    it('switches locale, updates the URL, and renders translated chrome', () => {
      cy.visit('/en');
      cy.findByRole('link', { name: 'About' }).should('be.visible');

      cy.findByRole('button', { name: 'Change language' }).click();
      cy.findByRole('option', { name: 'es' }).click();

      cy.url().should('include', '/es');
      cy.findByRole('button', { name: 'Change language' }).should(
        'contain.text',
        'es'
      );
      cy.findByRole('link', { name: 'Sobre mí' }).should('be.visible');
    });

    it('switches into a non-Latin script locale and renders translated chrome', () => {
      cy.visit('/en');
      cy.findByRole('button', { name: 'Change language' }).click();
      cy.findByRole('option', { name: 'ja' }).click();

      cy.url().should('include', '/ja');
      cy.findByRole('link', { name: '自己紹介' }).should('be.visible');
    });
  });

  describe('Mobile drawer', () => {
    beforeEach(() => {
      cy.viewport('iphone-x');
    });

    it('switches locale from the drawer, opening the dropdown upward without clipping or overflowing the drawer', () => {
      cy.visit('/en');
      cy.findByRole('button', { name: 'Open menu' }).click();
      cy.findByRole('dialog', { name: 'Menu' }).should('be.visible');

      cy.findByRole('button', { name: 'Change language' }).click();
      cy.findByRole('option', { name: 'ko' }).should('be.visible');

      // The toggle button sits at the drawer's left edge, so the dropdown
      // must open toward the drawer's interior — not toward the backdrop
      // outside it.
      cy.findByRole('dialog', { name: 'Menu' }).then(($dialog) => {
        const dialogLeft = $dialog[0]!.getBoundingClientRect().left;
        cy.findByRole('listbox', { name: 'Language' }).then(($listbox) => {
          const listboxLeft = $listbox[0]!.getBoundingClientRect().left;
          expect(listboxLeft).to.be.at.least(dialogLeft - 1);
        });
      });

      cy.findByRole('option', { name: 'ko' }).click();
      cy.url().should('include', '/ko');
    });
  });
});

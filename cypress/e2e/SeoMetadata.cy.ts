describe('Seo metadata', () => {
  it('renders a non-empty title and description on the homepage', () => {
    cy.visit('/en');

    cy.title().should('not.be.empty');
    cy.get('head meta[name="description"]')
      .invoke('attr', 'content')
      .should('not.be.empty');
  });

  describe('locale-aware meta tags', () => {
    const cases: [locale: string, descriptionStart: string][] = [
      ['en', 'I am a Software Engineer'],
      ['pt', 'Sou Engenheiro de Software'],
      ['es', 'Soy Ingeniero de Software'],
      ['ja', '私はフルスタック開発に強みを持つ'],
    ];

    cases.forEach(([locale, descriptionStart]) => {
      it(`sets og:locale and a translated description on /${locale}`, () => {
        cy.visit(`/${locale}`);

        cy.get('head meta[property="og:locale"]').should(
          'have.attr',
          'content',
          locale
        );
        cy.get('head meta[name="description"]')
          .invoke('attr', 'content')
          .should('include', descriptionStart);
      });
    });
  });
});

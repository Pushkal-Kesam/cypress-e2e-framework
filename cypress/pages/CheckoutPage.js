class CheckoutPage {
  elements = {
    firstName: () => cy.get('[data-test="firstName"]'),
    lastName: () => cy.get('[data-test="lastName"]'),
    postalCode: () => cy.get('[data-test="postalCode"]'),
    continue: () => cy.get('[data-test="continue"]'),
    error: () => cy.get('[data-test="error"]'),
    summaryTotal: () => cy.get('[data-test="total-label"]'),
    summarySubtotal: () => cy.get('[data-test="subtotal-label"]'),
    finish: () => cy.get('[data-test="finish"]'),
    completeHeader: () => cy.get('[data-test="complete-header"]'),
  };

  fillInformation({ firstName, lastName, postalCode }) {
    if (firstName) this.elements.firstName().type(firstName);
    if (lastName) this.elements.lastName().type(lastName);
    if (postalCode) this.elements.postalCode().type(postalCode);
    this.elements.continue().click();
    return this;
  }

  finishOrder() {
    this.elements.finish().click();
    return this;
  }
}

module.exports = new CheckoutPage();

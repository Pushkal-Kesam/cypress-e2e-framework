class CartPage {
  elements = {
    items: () => cy.get('[data-test="inventory-item"]'),
    names: () => cy.get('[data-test="inventory-item-name"]'),
    checkout: () => cy.get('[data-test="checkout"]'),
    continueShopping: () => cy.get('[data-test="continue-shopping"]'),
  };

  startCheckout() {
    this.elements.checkout().click();
    return this;
  }
}

module.exports = new CartPage();

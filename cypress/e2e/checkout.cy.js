const Inventory = require("../pages/InventoryPage");
const Cart = require("../pages/CartPage");
const Checkout = require("../pages/CheckoutPage");

describe("Checkout", () => {
  beforeEach(function () {
    cy.fixture("users").as("users");
    cy.login("standard");
    Inventory.visit();
  });

  it("completes an end-to-end purchase", function () {
    Inventory.addToCart("sauce-labs-backpack").addToCart("sauce-labs-onesie").openCart();
    Cart.elements.items().should("have.length", 2);
    Cart.startCheckout();

    Checkout.fillInformation(this.users.checkoutInfo);
    Checkout.elements.summarySubtotal().should("contain.text", "$37.98"); // 29.99 + 7.99
    Checkout.finishOrder();

    Checkout.elements.completeHeader().should("have.text", "Thank you for your order!");
  });

  it("shows the chosen products in the cart", () => {
    Inventory.addToCart("sauce-labs-bolt-t-shirt").openCart();
    Cart.elements.names().should("have.length", 1).first().should("have.text", "Sauce Labs Bolt T-Shirt");
  });

  it("validates required checkout fields", () => {
    Inventory.addToCart("sauce-labs-backpack").openCart();
    Cart.startCheckout();

    Checkout.fillInformation({ lastName: "Kesam", postalCode: "500081" });
    Checkout.elements.error().should("contain.text", "First Name is required");
  });
});

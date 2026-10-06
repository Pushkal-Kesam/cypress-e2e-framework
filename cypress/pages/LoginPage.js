class LoginPage {
  elements = {
    username: () => cy.get('[data-test="username"]'),
    password: () => cy.get('[data-test="password"]'),
    submit: () => cy.get('[data-test="login-button"]'),
    error: () => cy.get('[data-test="error"]'),
  };

  visit() {
    cy.visit("/");
    return this;
  }

  loginAs({ username, password }) {
    if (username) this.elements.username().type(username);
    if (password) this.elements.password().type(password, { log: false });
    this.elements.submit().click();
    return this;
  }

  assertError(message) {
    this.elements.error().should("be.visible").and("contain.text", message);
    return this;
  }
}

module.exports = new LoginPage();

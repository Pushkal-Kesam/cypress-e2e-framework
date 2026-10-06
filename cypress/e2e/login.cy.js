const LoginPage = require("../pages/LoginPage");

describe("Login", () => {
  beforeEach(function () {
    cy.fixture("users").as("users");
    LoginPage.visit();
  });

  it("logs a valid user into the product catalogue", function () {
    LoginPage.loginAs(this.users.standard);
    cy.url().should("include", "/inventory.html");
    cy.get('[data-test="title"]').should("have.text", "Products");
  });

  it("rejects a wrong password", function () {
    LoginPage.loginAs(this.users.invalid).assertError(
      "Username and password do not match any user in this service"
    );
    cy.url().should("not.include", "/inventory.html");
  });

  it("blocks a locked-out user", function () {
    LoginPage.loginAs(this.users.lockedOut).assertError("this user has been locked out");
  });

  it("requires a username", () => {
    LoginPage.loginAs({ password: "secret_sauce" }).assertError("Username is required");
  });

  it("requires a password", () => {
    LoginPage.loginAs({ username: "standard_user" }).assertError("Password is required");
  });

  it("does not expose the catalogue to anonymous visitors", () => {
    cy.visit("/inventory.html", { failOnStatusCode: false });
    LoginPage.assertError("You can only access '/inventory.html' when you are logged in.");
  });
});

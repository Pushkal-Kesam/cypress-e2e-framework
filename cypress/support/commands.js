/**
 * cy.login(user)
 * Logs in once per user and caches the session, so only the login specs
 * pay the cost of the UI login flow.
 */
Cypress.Commands.add("login", (user = "standard") => {
  cy.fixture("users").then((users) => {
    const { username, password } = users[user];
    cy.session(
      [user],
      () => {
        cy.visit("/");
        cy.get('[data-test="username"]').type(username);
        cy.get('[data-test="password"]').type(password, { log: false });
        cy.get('[data-test="login-button"]').click();
        cy.url().should("include", "/inventory.html");
      },
      {
        validate: () => {
          cy.getCookie("session-username").should("exist");
        },
      }
    );
  });
});

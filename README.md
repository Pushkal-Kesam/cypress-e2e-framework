# Cypress E2E Framework

[![Cypress E2E](https://github.com/Pushkal-Kesam/cypress-e2e-framework/actions/workflows/ci.yml/badge.svg)](https://github.com/Pushkal-Kesam/cypress-e2e-framework/actions/workflows/ci.yml)
![Cypress](https://img.shields.io/badge/Cypress-13-17202C?logo=cypress&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)

An end-to-end UI test framework for the public demo shop [saucedemo.com](https://www.saucedemo.com),
written with **Cypress** and the **Page Object pattern**. It covers login, catalogue behaviour and a full
purchase flow, and runs in GitHub Actions and in Docker.

## What it shows

| Practice | Where |
|---|---|
| Page Object Model: selectors and actions live in one place, specs read like user stories | `cypress/pages/` |
| Stable selectors via `data-test` attributes, never brittle CSS chains | all page objects |
| Custom command with `cy.session()` so login is done once and cached | `cypress/support/commands.js` |
| Test data in fixtures, not hard-coded in specs | `cypress/fixtures/users.json` |
| Positive, negative and access-control scenarios | `cypress/e2e/login.cy.js` |
| Assertions on behaviour (sort order, cart badge, order totals), not just element presence | `inventory.cy.js`, `checkout.cy.js` |
| Retries only in headless runs, so flakiness is absorbed in CI but never hidden locally | `cypress.config.js` |
| CI with failure screenshots uploaded as artifacts, plus a weekly scheduled run | `.github/workflows/ci.yml` |
| Reproducible containerised run | `Dockerfile` |

## Coverage (14 tests)

- **Login:** valid login, wrong password, locked-out user, missing username, missing password, anonymous access blocked
- **Inventory:** product count, name sort (Z to A), price sort (low to high), cart badge add/remove, logout
- **Checkout:** full purchase with order total check, cart contents, required-field validation

## Run it

```bash
npm install
npm run cy:open          # interactive runner
npm test                 # headless, all specs
npm run test:login       # a single spec
```

Against another environment:

```bash
BASE_URL=https://staging.example.com npm test
```

In Docker:

```bash
docker build -t cypress-e2e .
docker run --rm cypress-e2e
```

## Project layout

```
cypress/
├── e2e/        specs: login, inventory, checkout
├── pages/      page objects (Login, Inventory, Cart, Checkout)
├── fixtures/   test data
└── support/    custom commands
```

## Notes

The credentials in `users.json` are the public demo accounts published on the login page of saucedemo.com.
The site is a single-page app that answers deep links such as `/inventory.html` with an HTTP 404 while still
rendering them, which is why `InventoryPage.visit()` sets `failOnStatusCode: false`.

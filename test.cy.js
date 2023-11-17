describe("Test Suite", () => {
  let dynamicEmail; // Variável para armazenar o e-mail dinâmico

  beforeEach(() => {
    cy.visit("https://magento.softwaretestingboard.com/");
  });

  // Scenario 1: User creates a new account successfully
  it("[Happy Path] - Should create a new account", () => {
    cy.contains("Create an Account").click({ force: true });
    cy.wait(1000);
    cy.contains("Create New Customer Account");

    const timestamp = new Date().getTime();
    dynamicEmail = `test${timestamp}@success.com`; // Atribui o e-mail dinâmico à variável

    cy.get("#firstname").type("Test");
    cy.get("#lastname").type("One");
    cy.get("#email_address").type(dynamicEmail);
    cy.get("#password").type("test123@");
    cy.get("#password-confirmation").type("test123@");
    cy.get("#form-validate > div > div.primary > button").click({
      force: true,
    });
    cy.wait(1000);
    cy.contains("Thank you for registering with Main Website Store.");
  });

  // Scenario 2: User successfully creates an account with a one-character first and last name
  it("[Happy Path] - Should create an account with a one-character first and last name", () => {
    cy.contains("Create an Account").click({ force: true });
    cy.wait(1000);
    cy.contains("Create New Customer Account");

    const timestamp = new Date().getTime();
    const email = `test${timestamp}@onecharacter.com`;

    cy.get("#firstname").type("A");
    cy.get("#lastname").type("B");
    cy.get("#email_address").type(email);
    cy.get("#password").type("test123@");
    cy.get("#password-confirmation").type("test123@");
    cy.get("#form-validate > div > div.primary > button").click({
      force: true,
    });
    cy.wait(1000);
    cy.contains("Thank you for registering with Main Website Store.");
  });

  // Scenario 3: User unsuccessfully creates an account with a special character in first and last name
  it("[Bad Path] - Should not create an account with a special character in first and last name", () => {
    cy.contains("Create an Account").click({ force: true });
    cy.wait(1000);
    cy.contains("Create New Customer Account");

    const timestamp = new Date().getTime();
    const email = `test${timestamp}@specialcharacter.com`;

    cy.get("#firstname").type("@$Test");
    cy.get("#lastname").type("@$One");
    cy.get("#email_address").type(email);
    cy.get("#password").type("test123@");
    cy.get("#password-confirmation").type("test123@");
    cy.get("#form-validate > div > div.primary > button").click({
      force: true,
    });
    cy.wait(1000);
    cy.contains("First Name is not valid! Last Name is not valid!");
  });

  // Scenario 4: User successfully creates an account with a number in first and last name
  it("[Happy Path] - Should create an account with a number in first and last name", () => {
    cy.contains("Create an Account").click({ force: true });
    cy.wait(1000);
    cy.contains("Create New Customer Account");

    const timestamp = new Date().getTime();
    const email = `test${timestamp}@numb.com`;

    cy.get("#firstname").type("123Test");
    cy.get("#lastname").type("Numb123One");
    cy.get("#email_address").type(email);
    cy.get("#password").type("test123@");
    cy.get("#password-confirmation").type("test123@");
    cy.get("#form-validate > div > div.primary > button").click({
      force: true,
    });
    cy.wait(1000);
    cy.contains("Thank you for registering with Main Website Store.");
  });

  // Scenario 5: User attempts to create an account without filling required fields
  it("[Bad Path] - Should show error message when attempting to create an account without filling required fields", () => {
    cy.contains("Create an Account").click({ force: true });
    cy.wait(1000);
    cy.contains("Create New Customer Account");
    cy.get("#form-validate > div > div.primary > button").click({
      force: true,
    });
    cy.wait(1000);
    cy.contains("This is a required field");
  });

  // Scenario 6: User logs in successfully
  it("[Happy Path] - Should log in successfully", () => {
    cy.contains("Sign In").click({ force: true });
    cy.contains("Customer Login");
    cy.get("#email").type(dynamicEmail);
    cy.get("#pass").type("test123@");
    cy.get("#send2").click({ force: true });
    cy.wait(1000);
    cy.contains("Welcome,").click({ force: true });
    cy.contains("My Account");
    cy.contains("My Wish List ");
    cy.contains("Sign Out");
  });

  // Scenario 7: User Logs In Successfully and Signs Out
  it("[Happy Path] - Should log in successfully and log out", () => {
    cy.contains("Sign In").click({ force: true });
    cy.contains("Customer Login");
    cy.get("#email").type("test@log.com");
    cy.get("#pass").type("teste123@");
    cy.get("#send2").click({ force: true });
    cy.contains("Welcome,").click({ force: true });
    cy.contains("My Account");
    cy.contains("My Wish List ");
    cy.contains("Sign Out");
    cy.contains("Sign Out").click({ force: true });
    cy.wait(1000);
    cy.contains("You are signed out");
    cy.wait(1000);
  });

  // Scenario 8: User attempts to log in with invalid credentials
  it("[Bad Path] - Should show error message when attempting to log in with invalid credentials", () => {
    it("[Happy Path] - Should log in successfully", () => {
      cy.contains("Sign In").click({ force: true });
      cy.contains("Customer Login");
      cy.get("#email").type(dynamicEmail); // Utiliza o e-mail dinâmico capturado no Cenário 1
      cy.get("#pass").type("123test$$$");
      cy.get("#send2").click({ force: true });
      cy.wait(1000);
      cy.contains(
        "The account sign-in was incorrect or your account is disabled temporarily. Please wait and try again later"
      );
    });
  });

  // Scenario 9: User successfully resets password
  it("[Happy Path] - Should successfully reset password", () => {
    cy.contains("Sign In").click({ force: true });
    cy.contains("Customer Login");
    cy.contains("Forgot Your Password?").click({ force: true });
    cy.contains("Forgot Your Password?");
    cy.get("#email_address").type(dynamicEmail);
    cy.get("#form-validate > div > div.primary > button").click({
      force: true,
    });
    cy.wait(1000);
    cy.contains("If there is an account associated with");
  });

  // Scenario 10: User does not fill in the email field
  it("[Bad Path] - Should show error message when not filling in the email field during password reset", () => {
    cy.contains("Sign In").click({ force: true });
    cy.contains("Customer Login");
    cy.contains("Forgot Your Password?").click({ force: true });
    cy.contains("Forgot Your Password?");
    cy.get("#form-validate > div > div.primary > button").click({
      force: true,
    });
    cy.wait(1000);
    cy.contains("Please enter your email.");
  });

  // Scenario 11: User enters an invalid email format
  it("[Bad Path] - Should show error message when entering an invalid email format during password reset", () => {
    cy.contains("Sign In").click({ force: true });
    cy.contains("Customer Login");
    cy.contains("Forgot Your Password?").click({ force: true });
    cy.contains("Forgot Your Password?");
    cy.get("#email_address").type("test.com.br");
    cy.get("#form-validate > div > div.primary > button").click({
      force: true,
    });
    cy.wait(1500);
  });

  // Scenario 12: User enters an email that is not registered
  it("[Bad Path] - Should show message when entering an email that is not registered during password reset", () => {
    cy.contains("Sign In").click({ force: true });
    cy.contains("Customer Login");
    cy.contains("Forgot Your Password?").click({ force: true });
    cy.contains("Forgot Your Password?");
    cy.get("#email_address").type(dynamicEmail);
    cy.get("#form-validate > div > div.primary > button").click({
      force: true,
    });
    cy.wait(1000);
    cy.contains("If there is an account associated with");
  });

  // Scenario 13: User adds a product to the cart with size and color selected
  it("[Happy Path] - Should add a product to the cart with size and color selected", () => {
    cy.get(
      "#maincontent > div.columns > div > div.widget.block.block-static-block > div.blocks-promo > a > img"
    ).click({ force: true });
    cy.get("#option-label-size-143-item-173").click({ force: true });
    cy.get("#option-label-color-93-item-56").click({ force: true });
    cy.get(
      "#maincontent > div.columns > div.column.main > div.products.wrapper.grid.products-grid > ol > li:nth-child(2) > div > div > div.product-item-inner > div > div.actions-primary > form > button"
    ).click({ force: true });
    cy.wait(1000);
    cy.contains("to your shopping cart.");
  });

  // Scenario 14: User tries to add a product without selecting a color
  it("[Bad Path] - Should show message when trying to add a product without selecting a color", () => {
    cy.get(
      "#maincontent > div.columns > div > div.widget.block.block-static-block > div.blocks-promo > a > img"
    ).click({ force: true });
    cy.get("#option-label-size-143-item-173").click({ force: true });
    cy.get(
      "#maincontent > div.columns > div.column.main > div.products.wrapper.grid.products-grid > ol > li:nth-child(2) > div > div > div.product-item-inner > div > div.actions-primary > form > button"
    ).click({ force: true });
    cy.wait(1000);
    cy.contains("You need to choose options for your item.");
  });

  // Scenario 15: User tries to add a product without selecting a size
  it("[Bad Path] - Should show message when trying to add a product without selecting a size", () => {
    cy.get(
      "#maincontent > div.columns > div > div.widget.block.block-static-block > div.blocks-promo > a > img"
    ).click({ force: true });
    cy.get("#option-label-color-93-item-56").click({ force: true });
    cy.get(
      "#maincontent > div.columns > div.column.main > div.products.wrapper.grid.products-grid > ol > li:nth-child(2) > div > div > div.product-item-inner > div > div.actions-primary > form > button"
    ).click({ force: true });
    cy.wait(1000);
    cy.contains("You need to choose options for your item.");
  });

  // Scenario 16: User explores product details and adds to cart
  it("[Happy Path] - Should explore product details and successfully add to cart", () => {
    cy.get(
      "#maincontent > div.columns > div > div.widget.block.block-static-block > div.blocks-promo > a > img"
    ).click({ force: true });
    cy.get(
      "#maincontent > div.columns > div.column.main > div.products.wrapper.grid.products-grid > ol > li:nth-child(3) > div > a > span > span > img"
    ).click({ force: true });
    cy.wait(1000);
    cy.get("#option-label-size-143-item-173").click({ force: true });
    cy.get("#option-label-color-93-item-58").click({ force: true });
    cy.get("#qty").type("2");
    cy.get("#product-addtocart-button").click({ force: true });
    cy.contains("You added");
  });

  // Scenario 17: View and manage items in the shopping cart
  it("[Happy Path] - View and manage items in the shopping cart", () => {
    cy.get(
      "#maincontent > div.columns > div > div.widget.block.block-static-block > div.blocks-promo > div > a.block-promo.home-t-shirts > span.image > img"
    ).click({ force: true });
    cy.get(
      "#maincontent > div.columns > div.column.main > div.products.wrapper.grid.products-grid > ol > li:nth-child(1) > div > a > span > span > img"
    ).click({ force: true });
    cy.get("#option-label-size-143-item-168").click({ force: true });
    cy.get("#option-label-color-93-item-56").click({ force: true });
    cy.get("#product-addtocart-button").click({ force: true });
    cy.contains("You added");
    cy.get(
      "body > div.page-wrapper > header > div.header.content > div.minicart-wrapper > a"
    ).click({ force: true });
    cy.contains("Proceed to Checkout");
  });

  // Scenario 18: Verify an empty shopping cart
  it("[Happy Path] - Verify an empty shopping cart", () => {
    cy.get(
      "body > div.page-wrapper > header > div.header.content > div.minicart-wrapper > a"
    ).click({ force: true });
    cy.contains("You have no items in your shopping cart.");
  });
});

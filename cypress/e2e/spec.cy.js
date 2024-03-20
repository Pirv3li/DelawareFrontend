describe("Home page", () => {
  it("draait de applicatie", () => {
    cy.visit('http://localhost:5173');
    cy.get("img").should("exist");
  });
});

describe("Leveranicer Login", () => {  
  beforeEach(() => {
    cy.loginLeverancier('leverancier2', '12345678'); 
  });
  it("should logout", () => {
    cy.logout();
  });
})

describe("Klant Login", () => {  
  beforeEach(() => {
    cy.loginKlant('klant2', '12345678'); 
  });
  it("should logout", () => {
    cy.logout();
  });
})
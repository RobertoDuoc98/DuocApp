
// PRUEBA 1 CREDENCIALES INCORRECTAS
it('Verificar login con credenciales incorrectas', () => {
  cy.wait(3000);
  cy.visit('http://localhost:8100').then(() => {
    cy.get('#correo').invoke('val', 'correo-inexistente@duocuc.cl');
    cy.get('#password').invoke('val', '1234');
    cy.wait(3000);
    cy.contains('Ingresar').click();
  });
});

// PRUEBA 2 CREDENCIALES CORRECTAS
it('Verificar login con credenciales correctas', () => {
  cy.visit('http://localhost:8100').then(() => {
    cy.get('#correo').invoke('val', 'atorres@duocuc.cl');
    cy.get('#password').invoke('val', '1234');
    cy.contains('Ingresar').click();
  });
});


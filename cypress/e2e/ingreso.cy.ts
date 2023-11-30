describe('Realización de pruebas de ingreso', () => {


  // PRUEBA 1 CREDENCIALES INCORRECTAS
  it('Verificar login con credenciales incorrectas', () => {
    cy.visit('http://localhost:8100/ingreso').then(() => {
      cy.wait(2000);
      cy.get('#correo').invoke('val', '');
      cy.get('#correo').type('correo-inexistente@duocuc.cl');
      cy.get('#password').invoke('val', '');
      cy.get('#password').type('1234');
      cy.wait(2000);
      cy.contains('Ingresar').click();
    });
  });

// PRUEBA 2 CREDENCIALES CORRECTAS
it('Verificar login con credenciales correctas', () => {
  cy.visit('http://localhost:8100/ingreso').then(() => {
    cy.get('#correo').invoke('val', '');
    cy.get('#correo').type('admin@duocuc.cl');
    cy.get('#password').invoke('val', '');
    cy.get('#password').type('admin');
    cy.wait(1500);
    cy.contains('Ingresar').click();
    cy.wait(3000)
  });
});

});
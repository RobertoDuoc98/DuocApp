describe('Realización de pruebas en Mis Datos', () => {
  it(` Verificar la validación de todos los campos del componente de Mis Datos `, () => {
    cy.visit('http://localhost:8100/ingreso').then(() => {
      cy.wait(1500);

      cy.get('#correo').invoke('val', '');
      cy.get('#correo').type('admin@duocuc.cl');
      cy.get('#password').invoke('val', '');
      cy.get('#password').type('admin');
      cy.contains('Ingresar').click();
      cy.intercept('/inicio').as('route').then(() => {
        cy.get('[ng-reflect-value="misdatos"]').click();
        cy.wait(1500);
        cy.get('#nombre').invoke('val', '');
        cy.wait(1500);
        cy.get('#nombre').invoke('val', 'AdminEitor');
        cy.wait(1500);
        cy.get('#apellidos').invoke('val', '');
        cy.wait(1500);
        cy.get('#apellidos').invoke('val', 'Del Sistem');
        cy.wait(1500);
        cy.get('#pregunta').invoke('val', '');
        cy.wait(1500);
        cy.get('#pregunta').invoke('val', 'Mi cargo');
        cy.wait(1500);
        cy.get('#respuesta').invoke('val', '');
        cy.wait(1500);
        cy.get('#respuesta').invoke('val', 'Administrador');
        cy.wait(1500);
        cy.get('#contraseña').invoke('val', '');
        cy.wait(1500);
        cy.get('#contraseña').invoke('val', 'admin2.0');
        cy.wait(1500);
        cy.get('#contraseña2').invoke('val', '');
        cy.wait(1500);
        cy.get('#contraseña2').invoke('val', 'admin2.0');
        cy.wait(2000);
        cy.contains('Actualizar').click();
        cy.wait(1500);
      });
    });
  })
});
describe('Realizacion de pruebas en FORO', () => {

  const numero = Math.floor(Math.random() * 1000000) + 1;

  it('Verificar publicación en foro', () => {
    cy.visit('http://localhost:8100/ingreso').then(() => {
      cy.wait(1500);
      cy.get('#correo').invoke('val', '');
      cy.get('#correo').type('admin@duocuc.cl');
      cy.get('#password').invoke('val', '');
      cy.get('#password').type('admin');
      cy.contains('Ingresar').click();
      cy.intercept('/inicio').as('route').then(() => {
        cy.get('[ng-reflect-value="foro"]').click();
        cy.get('#titulo').type(`Título de prueba ${numero}`);
        cy.get('#contenido').type(`Contenido de prueba ${numero}`);
        cy.contains('Guardar').click();
        cy.wait(3000);
        cy.contains(`Título de prueba ${numero}`).should('exist');
        cy.wait(3000);
      });
    });
  })
  
  it(`Verificar eliminación en foro de la última publicación con el título que contiene ${numero}`, () => {
    cy.visit('http://localhost:8100/ingreso').then(() => {
      cy.wait(1500);
      cy.get('#correo').invoke('val', '');
      cy.get('#correo').type('atorres@duocuc.cl');
      cy.get('#password').invoke('val', '');
      cy.get('#password').type('1234');
      cy.contains('Ingresar').click();
      cy.intercept('/inicio').as('route').then(() => {
        cy.get('[ng-reflect-value="foro"]').click();
        cy.contains('Borrar').click();
        cy.wait(3000);
        cy.contains('Aceptar').click();
        cy.wait(3000);
        cy.contains(`Título de prueba ${numero}`).should('not.exist');
        cy.wait(3000);
      });
    });
  })

  

});
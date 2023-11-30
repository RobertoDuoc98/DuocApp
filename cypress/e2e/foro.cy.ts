describe('Realizacion de pruebas en FORO', () => {
  let customText = 'para foro'; // 

  it('Verificar publicación en foro', () => {
    cy.visit('http://localhost:8100/ingreso').then(() => {
      cy.wait(1500);
      cy.get('#correo').invoke('val', '');
      cy.get('#correo').type('admin@duocuc.cl');
      cy.get('#password').invoke('val', '');
      cy.get('#password').type('admin');
      cy.contains('Ingresar').click();
      cy.intercept('/inicio').as('route').then(() => {
        cy.get('#foro').click();
        cy.get('#titulo').type(`Título de prueba ${customText}`);
        cy.get('#contenido').type(`Contenido de prueba ${customText}`);
        cy.contains('Guardar').click();
        cy.wait(3000);
        cy.contains(`Título de prueba ${customText}`).should('exist');
        cy.wait(3000);
      });
    });
  });

  it('Verificar eliminación en foro de la última publicación', () => {
    cy.visit('http://localhost:8100/ingreso').then(() => {
      cy.wait(1500);
      cy.log(`Deleting post with title: ${customText}`);
      cy.wait(3000);
      cy.get('#eliminar').click();
      cy.wait(3000);
      cy.contains(`Título de prueba ${customText}`).should('not.exist');
      cy.wait(3000);
    });
  });
});

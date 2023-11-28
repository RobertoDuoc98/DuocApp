
// PRUEBAS EN COMPONENTE FORO
it('Verificar publicación en foro', () => {
  cy.wait(3000);
  cy.visit('http://localhost:8100/inicio').then(() => {
    cy.wait(2000);
    cy.contains('foro').click();
    cy.wait(2000);
      cy.get('#titulop').invoke('val', 'Hola');
      cy.wait(2000);
      cy.get('#contenido').invoke('val', 'Esta es mi primera publicacion');
      cy.wait(2000);
      cy.contains('Guardar').click();
    cy.wait(20000);
  
    });
  });


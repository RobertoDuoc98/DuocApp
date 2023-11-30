describe('Realización de pruebas en Mis Datos', () => {

 

  it(`5) Verificar la validación de todos los campos del componente de Mis Datos }`, () => {
    cy.visit('http://localhost:8100/ingreso').then(() => {
      cy.wait(1500);

      cy.get('#correo').invoke('val', '');
      cy.get('#correo').type('atorres@duocuc.cl');
      cy.get('#password').invoke('val', '');
      cy.get('#password').type('1234');
      cy.contains('Ingresar').click();
      cy.intercept('/inicio').as('route').then(() => {
        cy.get('[ng-reflect-value="misdatos"]').click();
        cy.wait(1500);
        //SE LIMPIAN TODOS LOS CAMPOS
        cy.get('#nombre').type('{selectall}{backspace}');
        cy.get('#apellidos').type('{selectall}{backspace}');
        cy.get('#pregunta').type('{selectall}{backspace}');
        cy.get('#respuesta').type('{selectall}{backspace}');
        cy.get('#contraseña').type('{selectall}{backspace}');
        cy.get('#contraseñaRepetida').type('{selectall}{backspace}');
        cy.wait(2000);
        //SE PRUEBA QUE NO SE PUEDEN GUARDAR REGISTROS VACIOS EN "NOMBRE"
        cy.contains('Actualizar').click();
        cy.wait(1500);
        cy.contains('Aceptar').click();
        cy.get('#nombre').type('Ana');
        //SE PRUEBA QUE NO SE PUEDEN GUARDAR REGISTROS VACIOS EN "APELLIDOS"
        cy.contains('Actualizar').click();
        cy.wait(1500);
        cy.contains('Aceptar').click();
        cy.get('#apellidos').type('Torres');
        //SE PRUEBA QUE NO SE PUEDEN GUARDAR REGISTROS VACIOS EN "PREGUNTA SECRETA"
        cy.contains('Actualizar').click();
        cy.wait(1500);
        cy.contains('Aceptar').click();
        cy.get('#pregunta').type('Nombre de mi mascota');
        //SE PRUEBA QUE NO SE PUEDEN GUARDAR REGISTROS VACIOS EN "RESPUESTA SECRETA"
        cy.contains('Actualizar').click();
        cy.wait(1500);
        cy.contains('Aceptar').click();
        cy.get('#respuesta').type('gato');
        //SE PRUEBA QUE NO SE PUEDE DEJAR CONTRASEÑA Y REPETIR CONTRASEÑA DISTINTOS VALORES"
        cy.get('#contraseña').type('11111');
        cy.get('#contraseñaRepetida').type('22222');
        cy.contains('Actualizar').click();
        cy.wait(1500);
        cy.contains('Aceptar').click();
        cy.wait(1500);
        cy.contains('Cerrar Sesión').click();
        cy.wait(3000);

      });
    });
  })


  it(`6) Verificar que Mis Datos actualice la información }`, () => {
    cy.visit('http://localhost:8100/ingreso').then(() => {
      cy.wait(1500);

      cy.get('#correo').invoke('val', '');
      cy.get('#correo').type('atorres@duocuc.cl');
      cy.get('#password').invoke('val', '');
      cy.get('#password').type('1234');
      cy.contains('Ingresar').click();
      cy.intercept('/inicio').as('route').then(() => {
        cy.get('[ng-reflect-value="misdatos"]').click();
        cy.wait(1500);
        //SE AGREGA SEGUNDO APELLIDO AL ORIGINAL
        cy.get('#apellidos').type(' Castillo');
        cy.wait(2000);
        cy.contains('Actualizar').click();
        cy.wait(1500);
        //SE CORROBORA QUE EL SEGUNDO APELLIDO SE CAMBIO
        cy.get('[ng-reflect-value="qr"]').click();
        cy.wait(3000);
        cy.contains('Cerrar Sesión').click();
        cy.wait(3000);

      });
    });
  })
});
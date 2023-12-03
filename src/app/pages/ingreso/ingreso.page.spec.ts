import { ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';
import { IngresoPage } from './ingreso.page';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { Storage } from '@ionic/storage-angular';

describe('IngresoPage', () => {
  let component: IngresoPage;
  let fixture: ComponentFixture<IngresoPage>;
  let authService: AuthService;
  let router: Router;
  let storage: Storage;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [IngresoPage],
      imports: [IonicModule.forRoot()],
      providers: [
        AuthService,
        Router,
        {
          provide: Storage,
          useFactory: () => {
            const storage = new Storage();
            storage.create();
            return storage;
          }
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(IngresoPage);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService);
    router = TestBed.inject(Router);
    storage = TestBed.inject(Storage);
    fixture.detectChanges();
  });

  it('debería crearse', () => {
    expect(component).toBeTruthy();
  });

  it('debería tener valores iniciales vacíos para correo y contraseña', () => {
    expect(component.correo).toEqual('');
    expect(component.password).toEqual('');
  });

  it('debería actualizar correo y contraseña cuando cambian los inputs', () => {
    const nuevoCorreo = 'test@test.com';
    const nuevaContraseña = 'password123';

    component.correo = nuevoCorreo;
    component.password = nuevaContraseña;

    expect(component.correo).toEqual(nuevoCorreo);
    expect(component.password).toEqual(nuevaContraseña);
  });

  it('debería navegar a /correo en recuperar()', () => {
    const navigateSpy = spyOn(router, 'navigate');
  
    component.recuperar();
  
    expect(navigateSpy).toHaveBeenCalledWith(['correo']);
  });

  it('debería navegar a /registrarme en registrarme()', () => {
    const navigateSpy = spyOn(router, 'navigate');
  
    component.registrarme();
  
    expect(navigateSpy).toHaveBeenCalledWith(['registrarme']);
  });

  it('debería llamar a authService.login() en ingresar()', fakeAsync(() => {
    const loginSpy = spyOn(authService, 'login').and.returnValue(Promise.resolve());

    component.correo = 'test@test.com';
    component.password = 'password123';
    component.ingresar();

    tick();

    expect(loginSpy).toHaveBeenCalledWith('test@test.com', 'password123');
  }));
});

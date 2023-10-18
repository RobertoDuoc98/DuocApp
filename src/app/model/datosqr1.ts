
export class datosqr1{
    public datbloqueInicio: number;
    public datbloqueTermino: number;
    public datdia: string;
    public dathoraFin: string;
    public dathoraInicio: string;
    public datidAsignatura: string;
    public datnombreAsignatura: string;
    public datnombreProfesor: string;
    public datseccion: string;
    public datsede: string;


    constructor() {
        this.datbloqueInicio = 0;
        this.datbloqueTermino = 0;
        this.datdia = '';
        this.dathoraFin = '';
        this.dathoraInicio = '';
        this.datidAsignatura = '';
        this.datnombreAsignatura = '';
        this.datnombreProfesor = '';
        this.datseccion = '';
        this.datsede = '';
    }

    public setdatosqr1(
        bloqueInicio: number,
        bloqueTermino: number,
        dia: string,
        horaFin: string,
        horaInicio: string,
        idAsignatura: string,
        nombreAsignatura: string,
        nombreProfesor: string,
        seccion: string,
        sede: string): void
    {
        this.datbloqueInicio = bloqueInicio;
        this.datbloqueTermino = bloqueTermino;
        this.datdia = dia;
        this.dathoraFin = horaFin;
        this.dathoraInicio = horaInicio;
        this.datidAsignatura = idAsignatura;
        this.datnombreAsignatura = nombreAsignatura;
        this.datnombreProfesor = nombreProfesor;
        this.datseccion = seccion;
        this.datsede = sede;
    }
}
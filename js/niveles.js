export class Nivel {
  constructor() {
    this.nivelActual = 1;
  }

  subirNivel() {
    this.nivelActual++;
  }

  getDificultad() {
    return this.nivelActual;
  }
}
export const niveles = [
  { nombre: 'Fase I', cantidadMicrobios: 5, tiposPermitidos: ['bacteria'] },
  { nombre: 'Fase II', cantidadMicrobios: 10, tiposPermitidos: ['bacteria', 'virus'] },
  { nombre: 'Fase III', cantidadMicrobios: 15, tiposPermitidos: ['bacteria', 'virus', 'hongo'] },
];

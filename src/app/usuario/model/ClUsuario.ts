export class ClUsuario {
    id: string;
    nombre: string;
    email: string;
    password: string;

    // Constructor para inicializar los valores
  constructor(obj: any) {
    this.id = obj && obj.id || null;
    this.nombre = obj && obj.nombre || null;
    this.email = obj && obj.email || null;
    this.password = obj && obj.password || null;
  }
  }
  
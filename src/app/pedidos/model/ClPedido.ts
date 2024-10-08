export class ClPedido {
    id?: number; //Id opcional
    nombre_cliente: string;
    direccion: string;
    detalle_pedido: string;
    total_a_pagar: number;
    horario_entrega: string;
    telefono: number;
    medio_pago: string;
  
    // Constructor para inicializar los valores
    constructor(obj: any) {
      this.nombre_cliente = obj && obj.nombre_cliente || null;
      this.direccion = obj && obj.direccion || null;
      this.detalle_pedido = obj && obj.detalle_pedido || null;
      this.total_a_pagar = obj && obj.total_a_pagar || null;
      this.horario_entrega = obj && obj.horario_entrega || null;
      this.telefono = obj && obj.telefono || null;
      this.medio_pago = obj && obj.medio_pago || null;
    }
  }
  
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MostrarPedidosPage } from './mostrar-pedidos.page';

describe('MostrarPedidosPage', () => {
  let component: MostrarPedidosPage;
  let fixture: ComponentFixture<MostrarPedidosPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(MostrarPedidosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

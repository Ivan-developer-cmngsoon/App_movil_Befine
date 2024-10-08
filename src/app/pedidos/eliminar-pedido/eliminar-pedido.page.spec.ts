import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EliminarPedidoPage } from './eliminar-pedido.page';

describe('EliminarPedidoPage', () => {
  let component: EliminarPedidoPage;
  let fixture: ComponentFixture<EliminarPedidoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(EliminarPedidoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

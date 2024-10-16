import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EliminarUsuarioPage } from './eliminar-usuario.page';

describe('EliminarUsuarioPage', () => {
  let component: EliminarUsuarioPage;
  let fixture: ComponentFixture<EliminarUsuarioPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(EliminarUsuarioPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

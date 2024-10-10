import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'pedidos',
    loadChildren: () => import('./pedidos/pedidos.module').then( m => m.PedidosPageModule)
  },
  {
    path: 'bodega',
    loadChildren: () => import('./bodega/bodega.module').then( m => m.BodegaPageModule)
  },
  {
    path: 'perfil-empleado',
    loadChildren: () => import('./perfil-empleado/perfil-empleado.module').then( m => m.PerfilEmpleadoPageModule)
  },
  {
    path: 'agregar-pedido',  // Ruta para la página de agregar pedido
    loadChildren: () => import('./pedidos/agregar-pedido/agregar-pedido.module').then( m => m.AgregarPedidoPageModule)
  },
  {
    path: 'modificar-pedido/:id',  // Ruta para la página de modificar pedido
    loadChildren: () => import('./pedidos/modificar-pedido/modificar-pedido.module').then( m => m.ModificarPedidoPageModule)
  },
  {
    path: 'mostrar-pedidos',  // Ruta para la página de mostrar pedidos
    loadChildren: () => import('./pedidos/mostrar-pedidos/mostrar-pedidos.module').then( m => m.MostrarPedidosPageModule)
  },
  {
    path: 'eliminar-pedido',  // Ruta para la página de eliminar pedido
    loadChildren: () => import('./pedidos/eliminar-pedido/eliminar-pedido.module').then( m => m.EliminarPedidoPageModule)
  }

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

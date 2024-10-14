import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';  // Importar el AuthGuard

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule),
    canActivate: [AuthGuard]  // Proteger la ruta con AuthGuard
  },
  {
    path: 'pedidos',
    loadChildren: () => import('./pedidos/pedidos.module').then(m => m.PedidosPageModule),
    canActivate: [AuthGuard]  // Proteger la ruta con AuthGuard
  },
  {
    path: 'bodega',
    loadChildren: () => import('./bodega/bodega.module').then(m => m.BodegaPageModule),
    canActivate: [AuthGuard]  // Proteger la ruta con AuthGuard
  },
  {
    path: 'perfil-empleado',
    loadChildren: () => import('./perfil-empleado/perfil-empleado.module').then(m => m.PerfilEmpleadoPageModule),
    canActivate: [AuthGuard]  // Proteger la ruta con AuthGuard
  },
  {
    path: 'agregar-pedido',
    loadChildren: () => import('./pedidos/agregar-pedido/agregar-pedido.module').then(m => m.AgregarPedidoPageModule),
    canActivate: [AuthGuard]  // Proteger la ruta con AuthGuard
  },
  {
    path: 'modificar-pedido/:id',
    loadChildren: () => import('./pedidos/modificar-pedido/modificar-pedido.module').then(m => m.ModificarPedidoPageModule),
    canActivate: [AuthGuard]  // Proteger la ruta con AuthGuard
  },
  {
    path: 'mostrar-pedidos',
    loadChildren: () => import('./pedidos/mostrar-pedidos/mostrar-pedidos.module').then(m => m.MostrarPedidosPageModule),
    canActivate: [AuthGuard]  // Proteger la ruta con AuthGuard
  },
  {
    path: 'eliminar-pedido',
    loadChildren: () => import('./pedidos/eliminar-pedido/eliminar-pedido.module').then(m => m.EliminarPedidoPageModule),
    canActivate: [AuthGuard]  // Proteger la ruta con AuthGuard
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

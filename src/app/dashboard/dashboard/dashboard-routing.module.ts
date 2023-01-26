import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from 'src/app/common/auth-guard.service';
import { OrderModule } from 'src/app/order/order.module';
import { DashboardComponent } from './dashboard.component';

const routes: Routes = [
  {
    path:'',
    component:DashboardComponent,
    canActivate:[AuthGuardService],
    children: [
      { path: '', redirectTo: 'order', pathMatch: 'full' },
      {
      path: 'order',
      loadChildren: () => import('src/app/order/order.module').then(m => m.OrderModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }

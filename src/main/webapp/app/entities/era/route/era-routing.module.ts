import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { EraComponent } from '../list/era.component';
import { EraDetailComponent } from '../detail/era-detail.component';
import { EraUpdateComponent } from '../update/era-update.component';
import { EraRoutingResolveService } from './era-routing-resolve.service';

const eraRoute: Routes = [
  {
    path: '',
    component: EraComponent,
    data: {
      defaultSort: 'id,asc',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: EraDetailComponent,
    resolve: {
      era: EraRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: EraUpdateComponent,
    resolve: {
      era: EraRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: EraUpdateComponent,
    resolve: {
      era: EraRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(eraRoute)],
  exports: [RouterModule],
})
export class EraRoutingModule {}

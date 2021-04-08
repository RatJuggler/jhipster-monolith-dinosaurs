import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { DinosaurComponent } from '../list/dinosaur.component';
import { DinosaurDetailComponent } from '../detail/dinosaur-detail.component';
import { DinosaurUpdateComponent } from '../update/dinosaur-update.component';
import { DinosaurRoutingResolveService } from './dinosaur-routing-resolve.service';

const dinosaurRoute: Routes = [
  {
    path: '',
    component: DinosaurComponent,
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: DinosaurDetailComponent,
    resolve: {
      dinosaur: DinosaurRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: DinosaurUpdateComponent,
    resolve: {
      dinosaur: DinosaurRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: DinosaurUpdateComponent,
    resolve: {
      dinosaur: DinosaurRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(dinosaurRoute)],
  exports: [RouterModule],
})
export class DinosaurRoutingModule {}

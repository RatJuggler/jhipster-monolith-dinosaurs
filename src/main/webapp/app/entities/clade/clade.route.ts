import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Clade } from 'app/shared/model/clade.model';
import { CladeService } from './clade.service';
import { CladeComponent } from './clade.component';
import { CladeDetailComponent } from './clade-detail.component';
import { CladeUpdateComponent } from './clade-update.component';
import { CladeDeletePopupComponent } from './clade-delete-dialog.component';
import { IClade } from 'app/shared/model/clade.model';

@Injectable({ providedIn: 'root' })
export class CladeResolve implements Resolve<IClade> {
  constructor(private service: CladeService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IClade> {
    const id = route.params['id'] ? route.params['id'] : null;
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<Clade>) => response.ok),
        map((clade: HttpResponse<Clade>) => clade.body)
      );
    }
    return of(new Clade());
  }
}

export const cladeRoute: Routes = [
  {
    path: '',
    component: CladeComponent,
    resolve: {
      pagingParams: JhiResolvePagingParams
    },
    data: {
      authorities: ['ROLE_USER'],
      defaultSort: 'id,asc',
      pageTitle: 'Clades'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: CladeDetailComponent,
    resolve: {
      clade: CladeResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Clades'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: CladeUpdateComponent,
    resolve: {
      clade: CladeResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Clades'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: CladeUpdateComponent,
    resolve: {
      clade: CladeResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Clades'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const cladePopupRoute: Routes = [
  {
    path: ':id/delete',
    component: CladeDeletePopupComponent,
    resolve: {
      clade: CladeResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Clades'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];

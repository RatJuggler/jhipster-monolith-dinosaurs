import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IEra, Era } from 'app/shared/model/era.model';
import { EraService } from './era.service';
import { EraComponent } from './era.component';
import { EraDetailComponent } from './era-detail.component';
import { EraUpdateComponent } from './era-update.component';

@Injectable({ providedIn: 'root' })
export class EraResolve implements Resolve<IEra> {
  constructor(private service: EraService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IEra> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((era: HttpResponse<Era>) => {
          if (era.body) {
            return of(era.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Era());
  }
}

export const eraRoute: Routes = [
  {
    path: '',
    component: EraComponent,
    data: {
      authorities: [Authority.USER],
      defaultSort: 'id,asc',
      pageTitle: 'Eras',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: EraDetailComponent,
    resolve: {
      era: EraResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'Eras',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: EraUpdateComponent,
    resolve: {
      era: EraResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'Eras',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: EraUpdateComponent,
    resolve: {
      era: EraResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'Eras',
    },
    canActivate: [UserRouteAccessService],
  },
];

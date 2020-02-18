import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IDinosaur, Dinosaur } from 'app/shared/model/dinosaur.model';
import { DinosaurService } from './dinosaur.service';
import { DinosaurComponent } from './dinosaur.component';
import { DinosaurDetailComponent } from './dinosaur-detail.component';
import { DinosaurUpdateComponent } from './dinosaur-update.component';

@Injectable({ providedIn: 'root' })
export class DinosaurResolve implements Resolve<IDinosaur> {
  constructor(private service: DinosaurService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IDinosaur> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((dinosaur: HttpResponse<Dinosaur>) => {
          if (dinosaur.body) {
            return of(dinosaur.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Dinosaur());
  }
}

export const dinosaurRoute: Routes = [
  {
    path: '',
    component: DinosaurComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Dinosaurs'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: DinosaurDetailComponent,
    resolve: {
      dinosaur: DinosaurResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Dinosaurs'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: DinosaurUpdateComponent,
    resolve: {
      dinosaur: DinosaurResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Dinosaurs'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: DinosaurUpdateComponent,
    resolve: {
      dinosaur: DinosaurResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Dinosaurs'
    },
    canActivate: [UserRouteAccessService]
  }
];

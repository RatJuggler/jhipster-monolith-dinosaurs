import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IDinosaur, Dinosaur } from '../dinosaur.model';
import { DinosaurService } from '../service/dinosaur.service';

@Injectable({ providedIn: 'root' })
export class DinosaurRoutingResolveService implements Resolve<IDinosaur> {
  constructor(protected service: DinosaurService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IDinosaur> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((dinosaur: HttpResponse<Dinosaur>) => {
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

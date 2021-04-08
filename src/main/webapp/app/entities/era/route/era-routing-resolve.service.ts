import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IEra, Era } from '../era.model';
import { EraService } from '../service/era.service';

@Injectable({ providedIn: 'root' })
export class EraRoutingResolveService implements Resolve<IEra> {
  constructor(protected service: EraService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IEra> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((era: HttpResponse<Era>) => {
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

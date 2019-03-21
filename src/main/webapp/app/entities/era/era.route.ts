import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Era } from 'app/shared/model/era.model';
import { EraService } from './era.service';
import { EraComponent } from './era.component';
import { EraDetailComponent } from './era-detail.component';
import { EraUpdateComponent } from './era-update.component';
import { EraDeletePopupComponent } from './era-delete-dialog.component';
import { IEra } from 'app/shared/model/era.model';

@Injectable({ providedIn: 'root' })
export class EraResolve implements Resolve<IEra> {
    constructor(private service: EraService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IEra> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<Era>) => response.ok),
                map((era: HttpResponse<Era>) => era.body)
            );
        }
        return of(new Era());
    }
}

export const eraRoute: Routes = [
    {
        path: '',
        component: EraComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            defaultSort: 'id,asc',
            pageTitle: 'Eras'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/view',
        component: EraDetailComponent,
        resolve: {
            era: EraResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Eras'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'new',
        component: EraUpdateComponent,
        resolve: {
            era: EraResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Eras'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/edit',
        component: EraUpdateComponent,
        resolve: {
            era: EraResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Eras'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const eraPopupRoute: Routes = [
    {
        path: ':id/delete',
        component: EraDeletePopupComponent,
        resolve: {
            era: EraResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Eras'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];

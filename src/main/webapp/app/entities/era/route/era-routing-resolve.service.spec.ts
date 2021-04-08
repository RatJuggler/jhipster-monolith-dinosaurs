jest.mock('@angular/router');

import { TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { of } from 'rxjs';

import { IEra, Era } from '../era.model';
import { EraService } from '../service/era.service';

import { EraRoutingResolveService } from './era-routing-resolve.service';

describe('Service Tests', () => {
  describe('Era routing resolve service', () => {
    let mockRouter: Router;
    let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
    let routingResolveService: EraRoutingResolveService;
    let service: EraService;
    let resultEra: IEra | undefined;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        providers: [Router, ActivatedRouteSnapshot],
      });
      mockRouter = TestBed.inject(Router);
      mockActivatedRouteSnapshot = TestBed.inject(ActivatedRouteSnapshot);
      routingResolveService = TestBed.inject(EraRoutingResolveService);
      service = TestBed.inject(EraService);
      resultEra = undefined;
    });

    describe('resolve', () => {
      it('should return IEra returned by find', () => {
        // GIVEN
        service.find = jest.fn(id => of(new HttpResponse({ body: { id } })));
        mockActivatedRouteSnapshot.params = { id: 123 };

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultEra = result;
        });

        // THEN
        expect(service.find).toBeCalledWith(123);
        expect(resultEra).toEqual({ id: 123 });
      });

      it('should return new IEra if id is not provided', () => {
        // GIVEN
        service.find = jest.fn();
        mockActivatedRouteSnapshot.params = {};

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultEra = result;
        });

        // THEN
        expect(service.find).not.toBeCalled();
        expect(resultEra).toEqual(new Era());
      });

      it('should route to 404 page if data not found in server', () => {
        // GIVEN
        spyOn(service, 'find').and.returnValue(of(new HttpResponse({ body: null })));
        mockActivatedRouteSnapshot.params = { id: 123 };

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultEra = result;
        });

        // THEN
        expect(service.find).toBeCalledWith(123);
        expect(resultEra).toEqual(undefined);
        expect(mockRouter.navigate).toHaveBeenCalledWith(['404']);
      });
    });
  });
});

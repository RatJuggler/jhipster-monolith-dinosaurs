jest.mock('@angular/router');

import { TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { of } from 'rxjs';

import { IDinosaur, Dinosaur } from '../dinosaur.model';
import { DinosaurService } from '../service/dinosaur.service';

import { DinosaurRoutingResolveService } from './dinosaur-routing-resolve.service';

describe('Service Tests', () => {
  describe('Dinosaur routing resolve service', () => {
    let mockRouter: Router;
    let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
    let routingResolveService: DinosaurRoutingResolveService;
    let service: DinosaurService;
    let resultDinosaur: IDinosaur | undefined;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        providers: [Router, ActivatedRouteSnapshot],
      });
      mockRouter = TestBed.inject(Router);
      mockActivatedRouteSnapshot = TestBed.inject(ActivatedRouteSnapshot);
      routingResolveService = TestBed.inject(DinosaurRoutingResolveService);
      service = TestBed.inject(DinosaurService);
      resultDinosaur = undefined;
    });

    describe('resolve', () => {
      it('should return IDinosaur returned by find', () => {
        // GIVEN
        service.find = jest.fn(id => of(new HttpResponse({ body: { id } })));
        mockActivatedRouteSnapshot.params = { id: 123 };

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultDinosaur = result;
        });

        // THEN
        expect(service.find).toBeCalledWith(123);
        expect(resultDinosaur).toEqual({ id: 123 });
      });

      it('should return new IDinosaur if id is not provided', () => {
        // GIVEN
        service.find = jest.fn();
        mockActivatedRouteSnapshot.params = {};

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultDinosaur = result;
        });

        // THEN
        expect(service.find).not.toBeCalled();
        expect(resultDinosaur).toEqual(new Dinosaur());
      });

      it('should route to 404 page if data not found in server', () => {
        // GIVEN
        spyOn(service, 'find').and.returnValue(of(new HttpResponse({ body: null })));
        mockActivatedRouteSnapshot.params = { id: 123 };

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultDinosaur = result;
        });

        // THEN
        expect(service.find).toBeCalledWith(123);
        expect(resultDinosaur).toEqual(undefined);
        expect(mockRouter.navigate).toHaveBeenCalledWith(['404']);
      });
    });
  });
});

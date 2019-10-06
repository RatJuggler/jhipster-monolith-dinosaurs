import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { take, map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { DinosaurService } from 'app/entities/dinosaur/dinosaur.service';
import { IDinosaur, Dinosaur } from 'app/shared/model/dinosaur.model';
import { Diet } from 'app/shared/model/enumerations/diet.model';

describe('Service Tests', () => {
  describe('Dinosaur Service', () => {
    let injector: TestBed;
    let service: DinosaurService;
    let httpMock: HttpTestingController;
    let elemDefault: IDinosaur;
    let expectedResult;
    let currentDate: moment.Moment;
    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule]
      });
      expectedResult = {};
      injector = getTestBed();
      service = injector.get(DinosaurService);
      httpMock = injector.get(HttpTestingController);
      currentDate = moment();

      elemDefault = new Dinosaur(0, 'AAAAAAA', 0, 0, Diet.HERBIVORE, currentDate, currentDate);
    });

    describe('Service methods', () => {
      it('should find an element', () => {
        const returnedFromService = Object.assign(
          {
            insertDt: currentDate.format(DATE_TIME_FORMAT),
            modifiedDt: currentDate.format(DATE_TIME_FORMAT)
          },
          elemDefault
        );
        service
          .find(123)
          .pipe(take(1))
          .subscribe(resp => (expectedResult = resp));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject({ body: elemDefault });
      });

      it('should create a Dinosaur', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
            insertDt: currentDate.format(DATE_TIME_FORMAT),
            modifiedDt: currentDate.format(DATE_TIME_FORMAT)
          },
          elemDefault
        );
        const expected = Object.assign(
          {
            insertDt: currentDate,
            modifiedDt: currentDate
          },
          returnedFromService
        );
        service
          .create(new Dinosaur(null))
          .pipe(take(1))
          .subscribe(resp => (expectedResult = resp));
        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject({ body: expected });
      });

      it('should update a Dinosaur', () => {
        const returnedFromService = Object.assign(
          {
            name: 'BBBBBB',
            weight: 1,
            length: 1,
            diet: 'BBBBBB',
            insertDt: currentDate.format(DATE_TIME_FORMAT),
            modifiedDt: currentDate.format(DATE_TIME_FORMAT)
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            insertDt: currentDate,
            modifiedDt: currentDate
          },
          returnedFromService
        );
        service
          .update(expected)
          .pipe(take(1))
          .subscribe(resp => (expectedResult = resp));
        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject({ body: expected });
      });

      it('should return a list of Dinosaur', () => {
        const returnedFromService = Object.assign(
          {
            name: 'BBBBBB',
            weight: 1,
            length: 1,
            diet: 'BBBBBB',
            insertDt: currentDate.format(DATE_TIME_FORMAT),
            modifiedDt: currentDate.format(DATE_TIME_FORMAT)
          },
          elemDefault
        );
        const expected = Object.assign(
          {
            insertDt: currentDate,
            modifiedDt: currentDate
          },
          returnedFromService
        );
        service
          .query(expected)
          .pipe(
            take(1),
            map(resp => resp.body)
          )
          .subscribe(body => (expectedResult = body));
        const req = httpMock.expectOne({ method: 'GET' });
        req.flush([returnedFromService]);
        httpMock.verify();
        expect(expectedResult).toContainEqual(expected);
      });

      it('should delete a Dinosaur', () => {
        service.delete(123).subscribe(resp => (expectedResult = resp.ok));

        const req = httpMock.expectOne({ method: 'DELETE' });
        req.flush({ status: 200 });
        expect(expectedResult);
      });
    });

    afterEach(() => {
      httpMock.verify();
    });
  });
});

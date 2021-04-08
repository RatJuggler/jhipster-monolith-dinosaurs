import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import * as dayjs from 'dayjs';

import { DATE_TIME_FORMAT } from 'app/config/input.constants';
import { Diet } from 'app/entities/enumerations/diet.model';
import { IDinosaur, Dinosaur } from '../dinosaur.model';

import { DinosaurService } from './dinosaur.service';

describe('Service Tests', () => {
  describe('Dinosaur Service', () => {
    let service: DinosaurService;
    let httpMock: HttpTestingController;
    let elemDefault: IDinosaur;
    let expectedResult: IDinosaur | IDinosaur[] | boolean | null;
    let currentDate: dayjs.Dayjs;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
      });
      expectedResult = null;
      service = TestBed.inject(DinosaurService);
      httpMock = TestBed.inject(HttpTestingController);
      currentDate = dayjs();

      elemDefault = {
        id: 0,
        name: 'AAAAAAA',
        weight: 0,
        length: 0,
        diet: Diet.HERBIVORE,
        insertDt: currentDate,
        modifiedDt: currentDate,
      };
    });

    describe('Service methods', () => {
      it('should find an element', () => {
        const returnedFromService = Object.assign(
          {
            insertDt: currentDate.format(DATE_TIME_FORMAT),
            modifiedDt: currentDate.format(DATE_TIME_FORMAT),
          },
          elemDefault
        );

        service.find(123).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(elemDefault);
      });

      it('should create a Dinosaur', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
            insertDt: currentDate.format(DATE_TIME_FORMAT),
            modifiedDt: currentDate.format(DATE_TIME_FORMAT),
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            insertDt: currentDate,
            modifiedDt: currentDate,
          },
          returnedFromService
        );

        service.create(new Dinosaur()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a Dinosaur', () => {
        const returnedFromService = Object.assign(
          {
            id: 1,
            name: 'BBBBBB',
            weight: 1,
            length: 1,
            diet: 'BBBBBB',
            insertDt: currentDate.format(DATE_TIME_FORMAT),
            modifiedDt: currentDate.format(DATE_TIME_FORMAT),
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            insertDt: currentDate,
            modifiedDt: currentDate,
          },
          returnedFromService
        );

        service.update(expected).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should partial update a Dinosaur', () => {
        const patchObject = Object.assign(
          {
            name: 'BBBBBB',
            weight: 1,
            diet: 'BBBBBB',
            insertDt: currentDate.format(DATE_TIME_FORMAT),
            modifiedDt: currentDate.format(DATE_TIME_FORMAT),
          },
          new Dinosaur()
        );

        const returnedFromService = Object.assign(patchObject, elemDefault);

        const expected = Object.assign(
          {
            insertDt: currentDate,
            modifiedDt: currentDate,
          },
          returnedFromService
        );

        service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PATCH' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of Dinosaur', () => {
        const returnedFromService = Object.assign(
          {
            id: 1,
            name: 'BBBBBB',
            weight: 1,
            length: 1,
            diet: 'BBBBBB',
            insertDt: currentDate.format(DATE_TIME_FORMAT),
            modifiedDt: currentDate.format(DATE_TIME_FORMAT),
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            insertDt: currentDate,
            modifiedDt: currentDate,
          },
          returnedFromService
        );

        service.query().subscribe(resp => (expectedResult = resp.body));

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

      describe('addDinosaurToCollectionIfMissing', () => {
        it('should add a Dinosaur to an empty array', () => {
          const dinosaur: IDinosaur = { id: 123 };
          expectedResult = service.addDinosaurToCollectionIfMissing([], dinosaur);
          expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(dinosaur);
        });

        it('should not add a Dinosaur to an array that contains it', () => {
          const dinosaur: IDinosaur = { id: 123 };
          const dinosaurCollection: IDinosaur[] = [
            {
              ...dinosaur,
            },
            { id: 456 },
          ];
          expectedResult = service.addDinosaurToCollectionIfMissing(dinosaurCollection, dinosaur);
          expect(expectedResult).toHaveLength(2);
        });

        it("should add a Dinosaur to an array that doesn't contain it", () => {
          const dinosaur: IDinosaur = { id: 123 };
          const dinosaurCollection: IDinosaur[] = [{ id: 456 }];
          expectedResult = service.addDinosaurToCollectionIfMissing(dinosaurCollection, dinosaur);
          expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(dinosaur);
        });

        it('should add only unique Dinosaur to an array', () => {
          const dinosaurArray: IDinosaur[] = [{ id: 123 }, { id: 456 }, { id: 23282 }];
          const dinosaurCollection: IDinosaur[] = [{ id: 123 }];
          expectedResult = service.addDinosaurToCollectionIfMissing(dinosaurCollection, ...dinosaurArray);
          expect(expectedResult).toHaveLength(3);
        });

        it('should accept varargs', () => {
          const dinosaur: IDinosaur = { id: 123 };
          const dinosaur2: IDinosaur = { id: 456 };
          expectedResult = service.addDinosaurToCollectionIfMissing([], dinosaur, dinosaur2);
          expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(dinosaur);
          expect(expectedResult).toContain(dinosaur2);
        });

        it('should accept null and undefined values', () => {
          const dinosaur: IDinosaur = { id: 123 };
          expectedResult = service.addDinosaurToCollectionIfMissing([], null, dinosaur, undefined);
          expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(dinosaur);
        });
      });
    });

    afterEach(() => {
      httpMock.verify();
    });
  });
});

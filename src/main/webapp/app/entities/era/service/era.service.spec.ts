import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IEra, Era } from '../era.model';

import { EraService } from './era.service';

describe('Service Tests', () => {
  describe('Era Service', () => {
    let service: EraService;
    let httpMock: HttpTestingController;
    let elemDefault: IEra;
    let expectedResult: IEra | IEra[] | boolean | null;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
      });
      expectedResult = null;
      service = TestBed.inject(EraService);
      httpMock = TestBed.inject(HttpTestingController);

      elemDefault = {
        id: 0,
        name: 'AAAAAAA',
        fromMa: 0,
        toMa: 0,
      };
    });

    describe('Service methods', () => {
      it('should find an element', () => {
        const returnedFromService = Object.assign({}, elemDefault);

        service.find(123).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(elemDefault);
      });

      it('should create a Era', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.create(new Era()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a Era', () => {
        const returnedFromService = Object.assign(
          {
            id: 1,
            name: 'BBBBBB',
            fromMa: 1,
            toMa: 1,
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.update(expected).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should partial update a Era', () => {
        const patchObject = Object.assign(
          {
            fromMa: 1,
            toMa: 1,
          },
          new Era()
        );

        const returnedFromService = Object.assign(patchObject, elemDefault);

        const expected = Object.assign({}, returnedFromService);

        service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PATCH' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of Era', () => {
        const returnedFromService = Object.assign(
          {
            id: 1,
            name: 'BBBBBB',
            fromMa: 1,
            toMa: 1,
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.query().subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush([returnedFromService]);
        httpMock.verify();
        expect(expectedResult).toContainEqual(expected);
      });

      it('should delete a Era', () => {
        service.delete(123).subscribe(resp => (expectedResult = resp.ok));

        const req = httpMock.expectOne({ method: 'DELETE' });
        req.flush({ status: 200 });
        expect(expectedResult);
      });

      describe('addEraToCollectionIfMissing', () => {
        it('should add a Era to an empty array', () => {
          const era: IEra = { id: 123 };
          expectedResult = service.addEraToCollectionIfMissing([], era);
          expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(era);
        });

        it('should not add a Era to an array that contains it', () => {
          const era: IEra = { id: 123 };
          const eraCollection: IEra[] = [
            {
              ...era,
            },
            { id: 456 },
          ];
          expectedResult = service.addEraToCollectionIfMissing(eraCollection, era);
          expect(expectedResult).toHaveLength(2);
        });

        it("should add a Era to an array that doesn't contain it", () => {
          const era: IEra = { id: 123 };
          const eraCollection: IEra[] = [{ id: 456 }];
          expectedResult = service.addEraToCollectionIfMissing(eraCollection, era);
          expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(era);
        });

        it('should add only unique Era to an array', () => {
          const eraArray: IEra[] = [{ id: 123 }, { id: 456 }, { id: 49317 }];
          const eraCollection: IEra[] = [{ id: 123 }];
          expectedResult = service.addEraToCollectionIfMissing(eraCollection, ...eraArray);
          expect(expectedResult).toHaveLength(3);
        });

        it('should accept varargs', () => {
          const era: IEra = { id: 123 };
          const era2: IEra = { id: 456 };
          expectedResult = service.addEraToCollectionIfMissing([], era, era2);
          expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(era);
          expect(expectedResult).toContain(era2);
        });

        it('should accept null and undefined values', () => {
          const era: IEra = { id: 123 };
          expectedResult = service.addEraToCollectionIfMissing([], null, era, undefined);
          expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(era);
        });
      });
    });

    afterEach(() => {
      httpMock.verify();
    });
  });
});

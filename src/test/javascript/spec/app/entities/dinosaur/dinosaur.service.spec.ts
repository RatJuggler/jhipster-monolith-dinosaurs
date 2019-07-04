/* tslint:disable max-line-length */
import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { of } from 'rxjs';
import { take, map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { DinosaurService } from 'app/entities/dinosaur/dinosaur.service';
import { IDinosaur, Dinosaur, Diet } from 'app/shared/model/dinosaur.model';

describe('Service Tests', () => {
    describe('Dinosaur Service', () => {
        let injector: TestBed;
        let service: DinosaurService;
        let httpMock: HttpTestingController;
        let elemDefault: IDinosaur;
        let currentDate: moment.Moment;
        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [HttpClientTestingModule]
            });
            injector = getTestBed();
            service = injector.get(DinosaurService);
            httpMock = injector.get(HttpTestingController);
            currentDate = moment();

            elemDefault = new Dinosaur(0, 'AAAAAAA', 0, 0, Diet.HERBIVORE, currentDate, currentDate);
        });

        describe('Service methods', async () => {
            it('should find an element', async () => {
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
                    .subscribe(resp => expect(resp).toMatchObject({ body: elemDefault }));

                const req = httpMock.expectOne({ method: 'GET' });
                req.flush(JSON.stringify(returnedFromService));
            });

            it('should create a Dinosaur', async () => {
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
                    .subscribe(resp => expect(resp).toMatchObject({ body: expected }));
                const req = httpMock.expectOne({ method: 'POST' });
                req.flush(JSON.stringify(returnedFromService));
            });

            it('should update a Dinosaur', async () => {
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
                    .subscribe(resp => expect(resp).toMatchObject({ body: expected }));
                const req = httpMock.expectOne({ method: 'PUT' });
                req.flush(JSON.stringify(returnedFromService));
            });

            it('should return a list of Dinosaur', async () => {
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
                    .subscribe(body => expect(body).toContainEqual(expected));
                const req = httpMock.expectOne({ method: 'GET' });
                req.flush(JSON.stringify([returnedFromService]));
                httpMock.verify();
            });

            it('should delete a Dinosaur', async () => {
                const rxPromise = service.delete(123).subscribe(resp => expect(resp.ok));

                const req = httpMock.expectOne({ method: 'DELETE' });
                req.flush({ status: 200 });
            });
        });

        afterEach(() => {
            httpMock.verify();
        });
    });
});

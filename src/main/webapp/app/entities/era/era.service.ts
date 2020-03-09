import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IEra } from 'app/shared/model/era.model';

type EntityResponseType = HttpResponse<IEra>;
type EntityArrayResponseType = HttpResponse<IEra[]>;

@Injectable({ providedIn: 'root' })
export class EraService {
  public resourceUrl = SERVER_API_URL + 'api/eras';

  constructor(protected http: HttpClient) {}

  create(era: IEra): Observable<EntityResponseType> {
    return this.http.post<IEra>(this.resourceUrl, era, { observe: 'response' });
  }

  update(era: IEra): Observable<EntityResponseType> {
    return this.http.put<IEra>(this.resourceUrl, era, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IEra>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IEra[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}

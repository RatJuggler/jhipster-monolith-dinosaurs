import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IClade } from 'app/shared/model/clade.model';

type EntityResponseType = HttpResponse<IClade>;
type EntityArrayResponseType = HttpResponse<IClade[]>;

@Injectable({ providedIn: 'root' })
export class CladeService {
  public resourceUrl = SERVER_API_URL + 'api/clades';

  constructor(protected http: HttpClient) {}

  create(clade: IClade): Observable<EntityResponseType> {
    return this.http.post<IClade>(this.resourceUrl, clade, { observe: 'response' });
  }

  update(clade: IClade): Observable<EntityResponseType> {
    return this.http.put<IClade>(this.resourceUrl, clade, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IClade>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IClade[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}

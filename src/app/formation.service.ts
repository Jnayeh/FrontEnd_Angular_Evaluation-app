import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Formation {
  id: Number,
  theme: String,
  isUpdating: boolean
}

const API_URL: string = 'http://localhost:8000';

@Injectable({
  providedIn: 'root'
})
export class FormationService {

  private headers: Headers;

  constructor( private http: Http) {
    this.init();
  }

  async init() {
    this.headers = new Headers({
        Authorization: 'Bearer'
    });
  }

  getFormations(): Observable<Formation[]> {
    return this.http.get(API_URL + '/formation/formations',
        new RequestOptions({ headers: this.headers })
    )
    .map(res => {
        let modifiedResult = res.json();
        modifiedResult = modifiedResult.map(function(formation: { isUpdating: boolean; }) {
            formation.isUpdating = false;
            return formation;
        });
        return modifiedResult;
    });
  }

  editFormation(id,formation: { theme: any; }): Observable<Formation> {
    return this.http.post(API_URL + '/formation/' + id + '/edit', formation,
        new RequestOptions({ headers: this.headers })
    ).map(res => res.json());
  }

  removeFormation(id: string): Observable<Formation> {
    return this.http.post(API_URL + '/formation/' + id,
        new RequestOptions({ headers: this.headers })
    ).map(res => res.json());
  }

  addFormation(formation: { theme: any; }): Observable<Formation> {
    return this.http.post(API_URL + '/formation/formations/add', formation, 
        new RequestOptions({ headers: this.headers })
    ).map(res => res.json());
  }

}

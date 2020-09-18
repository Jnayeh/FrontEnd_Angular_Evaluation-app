import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';

export interface Etablissement {
  id: Number,
  nom: String,
  type: String,
  isUpdating: boolean
}
export interface TypeEtablissement {
  id: Number,
  type: String,
  isUpdating: boolean
}

const API_URL: string = 'http://localhost:8000';

@Injectable({
  providedIn: 'root'
})

export class EtablissementService {

  private headers;

  constructor( private http: Http) {
    this.init();
  }

  async init() {
    this.headers = new Headers({
        Authorization: 'Bearer'
    });
  }

  getEtablissements(): Observable<Etablissement[]> {
    return this.http.get(API_URL + '/etablissement/etablissements',
        new RequestOptions({ headers: this.headers })
    )
    .map(res => {
        let modifiedResult = res.json();
        modifiedResult = modifiedResult.map(function(etablissement) {
            etablissement.isUpdating = false;
            return etablissement;
        });
        return modifiedResult;
    });
  }

  getTypes(): Observable<TypeEtablissement[]> {
    return this.http.get(API_URL + '/types',
        new RequestOptions({ headers: this.headers })
    )
    .map(res => {
        let modifiedResult = res.json();
        modifiedResult = modifiedResult.map(function(type_etab) {
          type_etab.isUpdating = false;
            return type_etab;
        });
        return modifiedResult;
    });
  }

  editEtablissement(id,etablissement: { 
    nom: String;
    type: String;
  }): Observable<Etablissement> {
    return this.http.post(API_URL + '/etablissement/' + id +'/edit', etablissement,
        new RequestOptions({ headers: this.headers })
    ).map(res => res.json());
  }

  removeEtablissement(id): Observable<Etablissement> {
    return this.http.post(API_URL + '/etablissement/' + id,
        new RequestOptions({ headers: this.headers })
    ).map(res => res.json());
  }

  addEtablissement(etablissement: {
    nom: String;
    type: String;
  }): Observable<Etablissement> {
    return this.http.post(API_URL + '/etablissement/etablissements/add', etablissement, 
        new RequestOptions({ headers: this.headers })
    ).map(res => res.json());
  }
}

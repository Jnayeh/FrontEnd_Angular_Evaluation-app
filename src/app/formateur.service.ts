import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';

export interface Formateur {
  id: Number,
  nom: String,
  prenom: String,
  sexe: String,
  telephone: Number,
  email,
  isUpdating: boolean
}

const API_URL: string = 'http://localhost:8000';

@Injectable({
  providedIn: 'root'
})
export class FormateurService {

  private headers;

  constructor( private http: Http) {
    this.init();
  }

  async init() {
    this.headers = new Headers({
        Authorization: 'Bearer'
    });
  }

  getFormateurs(): Observable<Formateur[]> {
    return this.http.get(API_URL + '/formateur/formateurs',
        new RequestOptions({ headers: this.headers })
    )
    .map(res => {
        let modifiedResult = res.json();
        modifiedResult = modifiedResult.map(function(formateur) {
            formateur.isUpdating = false;
            return formateur;
        });
        return modifiedResult;
    });
  }

  editFormateur(id,formateur: { 
    nom: String;
    prenom: String;
    sexe: String;
    telephone: Number;
    email;
  }): Observable<Formateur> {
    return this.http.post(API_URL + '/formateur/' + id +'/edit', formateur,
        new RequestOptions({ headers: this.headers })
    ).map(res => res.json());
  }

  removeFormateur(id): Observable<Formateur> {
    return this.http.post(API_URL + '/formateur/' + id,
        new RequestOptions({ headers: this.headers })
    ).map(res => res.json());
  }

  addFormateur(formateur: {
    nom: String;
    prenom: String;
    sexe: String;
    telephone: Number;
    email:String;
  }): Observable<Formateur> {
    return this.http.post(API_URL + '/formateur/formateurs/add', formateur, 
        new RequestOptions({ headers: this.headers })
    ).map(res => res.json());
  }
}
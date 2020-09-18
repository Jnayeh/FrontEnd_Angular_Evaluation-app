import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
import { Formateur } from './formateur.service';
import { Etablissement } from './etablissement.service';
import { Formation } from './formation.service';

export interface Evaluation {
  Formation:String,
  Participant:String,
  id: Number,
  id_formateur: Number,
  id_etablissement: Number,
  id_formation: Number,
  date_formation: Date,
  nomParticipant: String,
  prenomParticipant: String,
  telephone: Number,
  email,
  Q1: Number, Q2: Number, Q3: Number, Q4: Number, Q5: Number,
  suggestion: String,
  isUpdating: boolean
}

const API_URL: string = 'http://localhost:8000';

@Injectable({
  providedIn: 'root'
})
export class EvaluationService {

  private headers;

  constructor( private http: Http) {
    this.init();
  }

  async init() {
    this.headers = new Headers({
        Authorization: 'Bearer'
    });
  }

  getEvaluations(): Observable<Evaluation[]> {
    return this.http.get(API_URL + '/satisfaction/forms',
        new RequestOptions({ headers: this.headers })
    )
    .map(res => {
        let modifiedResult = res.json();
        modifiedResult = modifiedResult.map(function(evaluation) {
            evaluation.isUpdating = false;
            return evaluation;
        });
        return modifiedResult;
    });
  }
  addEvaluation(evaluation: {
    id_formateur: Number,
    id_etablissement: Number,
    id_formation: Number,
    date_formation: Date,
    nomParticipant: String,
    prenomParticipant: String,
    telephone: Number,
    email,
    Q1: Number, Q2: Number, Q3: Number, Q4: Number, Q5: Number,
    suggestion: String,
  }): Observable<Evaluation> {
    return this.http.post(API_URL + '/satisfaction/forms/add', evaluation, 
        new RequestOptions({ headers: this.headers })
    ).map(res => res.json());
  }
}

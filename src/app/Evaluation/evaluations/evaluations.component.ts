import { Component, OnInit } from '@angular/core';
import { Evaluation, EvaluationService } from '../../evaluation.service';
import { Etablissement, EtablissementService } from '../../etablissement.service';
import { Formateur, FormateurService } from '../../formateur.service';
import { Formation, FormationService } from '../../formation.service';
import 'rxjs/Rx';
import { Router } from '@angular/router';

@Component({
  selector: 'app-evaluations',
  templateUrl: './evaluations.component.html',
  styleUrls: ['./evaluations.component.css']
})
export class EvaluationsComponent implements OnInit {

  evaluations: Evaluation[];
  isLoading: boolean = true;

  constructor(private evaluationService: EvaluationService,public router: Router) {}

  ngOnInit(): void {
    this.getEvaluations();
  }
  getEvaluations() {
    this.evaluationService
    .getEvaluations()
    .subscribe(
        evaluations => {
            this.evaluations = evaluations;
            this.isLoading = false;
        }
        );
  }
}

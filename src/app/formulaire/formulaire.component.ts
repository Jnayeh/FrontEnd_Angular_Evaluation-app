import { Component, OnInit } from '@angular/core';
import { TypeEtablissement, EtablissementService, Etablissement } from '../etablissement.service';
import { Evaluation, EvaluationService } from '../evaluation.service';
import { Formateur, FormateurService } from '../formateur.service';
import { Formation, FormationService } from '../formation.service';
import { Router } from '@angular/router';
import 'rxjs/Rx';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-formulaire',
  templateUrl: './formulaire.component.html',
  styleUrls: ['./formulaire.component.css']
})
export class FormulaireComponent implements OnInit {

  f = {
      nom: '',
      prenom: '',
      telephone: null,
      email: '',
      type:'',
      fNom:'',
      etNom:'',
      theme:'',
      suggestion: '',
    };
  date_formation: Date;
  formateur: Formateur;
  etablissement: Etablissement;
  formation: Formation;
  types_etab:TypeEtablissement[];
  evaluations: Evaluation[];
  etablissements: Etablissement[];
  formations: Formation[];
  formateurs: Formateur[];
  etabspartype: Etablissement[];
  Q1=null; Q2=null; Q3=null; Q4=null; Q5=null;
  exist=false;
  error=false;
  isLoading: boolean = true;
  errors='';
  constructor(private etablissementService: EtablissementService,private evaluationService: EvaluationService,private formationService: FormationService,private formateurService: FormateurService,public router: Router) { }

  ngOnInit(): void {
    this.getEtablissements();
    this.getTypes();
    this.getFormations();
    this.getFormateurs();
    this.getEvaluations();
  }
  
  getEtablissements() {
    this.etablissementService
    .getEtablissements()
    .subscribe(
        etablissements => {
            this.etablissements = etablissements;
            this.isLoading = false;
        }
        );
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

  getFormations() {
    this.formationService
    .getFormations()
    .subscribe(
        formations => {
            this.formations = formations;
            this.isLoading = false;
        }
        );
  }

  getFormateurs() {
    this.formateurService
    .getFormateurs()
    .subscribe(
        formateurs => {
            this.formateurs = formateurs;
            this.isLoading = false;
        }
        );
  }

  getTypes() {
    this.etablissementService
    .getTypes()
    .subscribe(
        types_etab => {
            this.types_etab = types_etab;
        }
        );
  }

  findEtablissementspartype(type): Etablissement[] {
    this.etabspartype=[];
    for (let et of this.etablissements){
      if (et.type==type)
      {
        this.etabspartype.push(et);
      }
    }
    return this.etabspartype;
  }

  findEtablissementparnom(nom):Etablissement{
    let etab=null;
    this.etablissements.forEach(element => {
      if(element.nom==nom){
        etab=element;
      }
    });
    return etab;
  }

  findFormationpartheme(theme):Formation{
    let etab=null;
    this.formations.forEach(element => {
      if(element.theme==theme){
        etab=element;
      }
    });
    return etab;
  }

  findFormateurparnom(nom):Formateur{
    let etab=null;
    this.formateurs.forEach(element => {
      if(element.nom+' '+element.prenom==nom){
        etab=element;
      }
    });
    return etab;
  }
  
  addEvaluation(nom,prenom,telephone,email) {
    
    this.formateur=this.findFormateurparnom(this.f.fNom);
    this.formation=this.findFormationpartheme(this.f.theme);
    this.etablissement=this.findEtablissementparnom(this.f.etNom);

    this.exist=false;
    for(let ev of this.evaluations){
        if(ev.email==email && this.date_formation==ev.date_formation && ev.Formation==this.formation.theme){
            this.exist=true;
            this.errors="Vous avez la possibilié d'une seulle evaluation de cette formation dans le jour donné";
        }
        else if(ev.email==email && ev.Participant!=prenom+' '+nom){
          this.errors="Cet email a été utilisé par un autre participant, veuillez le changer";
          this.exist=true;
        }
  }
    if(this.exist==false){
      this.isLoading = true;
      this.evaluationService
        .addEvaluation({
          id_formateur:this.formateur.id,
          id_etablissement:this.etablissement.id,
          id_formation:this.formation.id,
          date_formation:this.date_formation,
          nomParticipant: nom,
          prenomParticipant: prenom,
          telephone: telephone,
          email: email,
          suggestion:this.f.suggestion,
          Q1: this.Q1, Q2: this.Q2, Q3: this.Q3, Q4: this.Q4, Q5: this.Q5,
        })
        .subscribe(
          evaluation => {
                this.isLoading = false;
                this.error=false;
                evaluation.isUpdating = false;
                this.errors='';
                this.router.navigate(['/submitted']);
            }
        );
    }
    else this.error=true;
  }

}
import { Component, OnInit, EventEmitter, Output, Input  } from '@angular/core';
import { TypeEtablissement,Etablissement, EtablissementService } from '../../etablissement.service';
import 'rxjs/Rx';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-etablissement-form',
  templateUrl: './etablissement-form.component.html',
  styleUrls: ['./etablissement-form.component.css']
})
export class EtablissementFormComponent implements OnInit {
  @Input() etablissement: Etablissement;
    etablissements: Etablissement[];
    types_etab:TypeEtablissement[];
    errorMessage: string;
    isLoading: boolean = true;
    f = {
        nom: '',
        type: ''
      };
      exist=false;
      error=false;

    constructor(private etablissementService: EtablissementService,public router: Router) { }

    @Output()
    etablissementAdded: EventEmitter<Etablissement> = new EventEmitter<Etablissement>();
    @Output() toggle = new EventEmitter<boolean>();

    
        ngOnInit(): void {
            this.getEtablissements();
            this.getTypes();
        }
        
        isUpdating(id): boolean {
        return this.etablissement.isUpdating;
        }
        getEtablissements() {
            this.etablissementService
            .getEtablissements()
            .subscribe(
                etablissements => {
                    this.etablissements = etablissements;
                    this.isLoading = false;
                },
                error => this.errorMessage = <any>error
                );
        }
        getTypes() {
          this.etablissementService
          .getTypes()
          .subscribe(
              types_etab => {
                  this.types_etab = types_etab;
              },
              error => this.errorMessage = <any>error
              );
      }
        findEtablissement(id): Etablissement {
            return this.etablissements.find(etablissement => etablissement.id === id);
        }

        editEtablissement(id,nom,type) {
            this.exist=false;
            let etablissement = this.findEtablissement(id);
            for(let et of this.etablissements){
                if((et.nom.toLowerCase()==this.etablissement.nom.toLowerCase())&& et.id!=id){
                    this.exist=true;
                }
            }
            if(this.exist==false)
            {
            etablissement.isUpdating = true;
            this.etablissementService
                .editEtablissement(id,
                    {
                        nom: nom,
                        type: type,
                    }
                )
                .subscribe(
                    response => {
                        etablissement.isUpdating = false;
                        this.error=false;
                    },
                    error => {
                        this.errorMessage = <any>error;
                        etablissement.isUpdating = false;
                    }
                );
            this.router.navigate(['/etablissement/consult']);
            }
            else this.error=true;
        }
        
        addEtablissement(nom,type) {
            this.exist=false;
            this.isLoading = true;
            for(let et of this.etablissements){
                if(et.nom.toLowerCase()==this.f.nom.toLowerCase()){
                    this.exist=true;
                }
            }
            if(this.exist==false)
            {
            this.etablissementService
                .addEtablissement({
                    nom: nom,
                    type: type
                })
                .subscribe(
                    etablissement => {
                        this.isLoading = false;
                        etablissement.isUpdating = false;
                        this.error=false;
                        this.etablissementAdded.emit(etablissement);
                        this.toggle.emit(true);
                    }
                );
            }
            else this.error=true;
        }

}

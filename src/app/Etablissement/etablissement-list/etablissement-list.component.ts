import { Component, OnInit } from '@angular/core';
import { Etablissement, EtablissementService } from '../../etablissement.service';
import 'rxjs/Rx';
import { Router } from '@angular/router';

@Component({
  selector: 'app-etablissement-list',
  templateUrl: './etablissement-list.component.html',
  styleUrls: ['./etablissement-list.component.css']
})
export class EtablissementListComponent implements OnInit {

    etablissements: Etablissement[];
    errorMessage: string;
    isLoading: boolean = true;
    public show:boolean = false;
    public btName:any = 'Ajouter';

    constructor(private etablissementService: EtablissementService,public router: Router) {}

    ngOnInit() {
        this.getEtablissements();
    }

    toggle(show) {
        this.show = !show;
        // CHANGE THE NAME OF THE BUTTON.
        if(this.show)  
            this.btName = "Annuler";
        else
            this.btName = "Ajouter";
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
    findEtablissement(id): Etablissement {
        return this.etablissements.find(etablissement => etablissement.id === id);
    }
    isUpdating(id): boolean {
        return this.findEtablissement(id).isUpdating;
    }

    removeEtablissement(id) {
        let etablissement = this.findEtablissement(id);
        etablissement.isUpdating = true;
        this.etablissementService
            .removeEtablissement(id)
            .subscribe(
                response => {
                    var index = this.etablissements.indexOf(etablissement);
                    this.etablissements.splice(index, 1);  
                    etablissement.isUpdating = false;
                },
                error => {
                    this.errorMessage = <any>error;
                    etablissement.isUpdating = false;
                }
            );
    }
    
    appendEtablissement(etablissement: Etablissement) {
        this.etablissements.push(etablissement);
    }

}

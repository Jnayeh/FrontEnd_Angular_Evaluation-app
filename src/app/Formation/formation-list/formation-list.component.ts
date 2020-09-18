import { Component, OnInit } from '@angular/core';
import { Formation, FormationService } from '../../formation.service';
import 'rxjs/Rx';
import { Router } from '@angular/router';

@Component({
    selector: 'app-formation-list',
    templateUrl: './formation-list.component.html',
    styleUrls: ['./formation-list.component.css']
})

export class FormationListComponent implements OnInit {

    formations: Formation[];
    isLoading: boolean = true;
    public show:boolean = false;
    public btName:any = 'Ajouter';

    constructor(private formationService: FormationService,public router: Router) {}

    ngOnInit() {
        this.getFormations();
    }

    toggle(show) {
        this.show = !show;
        // CHANGE THE NAME OF THE BUTTON.
        if(this.show)  
            this.btName = "Annuler";
        else
            this.btName = "Ajouter";
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
    findFormation(id): Formation {
        return this.formations.find(formation => formation.id === id);
    }
    isUpdating(id): boolean {
        return this.findFormation(id).isUpdating;
    }

    removeFormation(id) {
        let formation = this.findFormation(id);
        formation.isUpdating = true;
        this.formationService
            .removeFormation(id)
            .subscribe(
                response => {
                    var index = this.formations.indexOf(formation);
                    this.formations.splice(index, 1);  
                    formation.isUpdating = false;
                },
                error => {
                    formation.isUpdating = false;
                }
            );
    }
    
    appendFormation(formation: Formation) {
        this.formations.push(formation);
    }

}
import { Component, OnInit } from '@angular/core';
import { Formateur, FormateurService } from '../../formateur.service';
import 'rxjs/Rx';
import { Router } from '@angular/router';

@Component({
    selector: 'app-formateur-list',
    templateUrl: './formateur-list.component.html',
    styleUrls: ['./formateur-list.component.css']
})

export class FormateurListComponent implements OnInit {

    formateurs: Formateur[];
    isLoading= true;
    public show= false;
    public btName = 'Ajouter';

    constructor(private formateurService: FormateurService,public router: Router) {}

    ngOnInit() {
        this.getFormateurs();
    }

    toggle(show) {
        this.show = !show;
        // CHANGE THE NAME OF THE BUTTON.
        if(this.show)  
            this.btName = "Annuler";
        else
            this.btName = "Ajouter";
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
    findFormateur(id): Formateur {
        return this.formateurs.find(formateur => formateur.id === id);
    }
    isUpdating(id): boolean {
        return this.findFormateur(id).isUpdating;
    }

    removeFormateur(id) {
        let formateur = this.findFormateur(id);
        formateur.isUpdating = true;
        this.formateurService
            .removeFormateur(id)
            .subscribe(
                response => {
                    var index = this.formateurs.indexOf(formateur);
                    this.formateurs.splice(index, 1);  
                    formateur.isUpdating = false;
                },
                error => {
                    formateur.isUpdating = false;
                }
            );
    }
    
    appendFormateur(formateur: Formateur) {
        this.formateurs.push(formateur);
    }

}
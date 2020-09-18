import { Component, OnInit, EventEmitter, Output, Input  } from '@angular/core';
import { Formateur, FormateurService } from '../../formateur.service';
import 'rxjs/Rx';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
    selector: 'app-formateur-form',
    templateUrl: './formateur-form.component.html',
    styleUrls: ['./formateur-form.component.css']
})

export class FormateurFormComponent implements OnInit {
    @Input() formateur: Formateur;
    formateurs: Formateur[];
    isLoading: boolean = true;
    f = {
        nom: '',
        prenom: '',
        sexe: '',
        telephone: null,
        email: '',
       
      };
    exist=false;
    error=false;

    constructor(private formateurService: FormateurService,public router: Router) { }

    @Output()
    formateurAdded: EventEmitter<Formateur> = new EventEmitter<Formateur>();
    @Output() toggle = new EventEmitter<boolean>();
    
        ngOnInit(): void {
            this.getFormateurs();
        }
        
        isUpdating(id): boolean {
        return this.formateur.isUpdating;
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

        editFormateur(id,nom,prenom,sexe,telephone,email) {
            this.exist=false;
            let formateur = this.findFormateur(id);
            this.change(id);
            if(this.exist==false)
            {
            formateur.isUpdating = true;
            this.formateurService
                .editFormateur(id,
                    {
                        nom: nom,
                        prenom: prenom,
                        sexe: sexe,
                        telephone: telephone,
                        email: email,
                    }
                )
                .subscribe(
                    response => {
                        formateur.isUpdating = false;
                        this.error=false;
                    },
                    error => {
                        formateur.isUpdating = false;
                    }
                );
            this.router.navigate(['/formateur/consult']);
            }
            else this.error=true;
        }
        
        change(id):void{
            for(let fer of this.formateurs){
                if(((fer.email==this.formateur.email)||(fer.nom.toLowerCase()==this.formateur.nom.toLowerCase() && fer.prenom.toLowerCase()==this.formateur.prenom.toLowerCase()))&& fer.id!=id){
                    this.exist=true;
                }
            }
        }

        addFormateur(nom,prenom,sexe,telephone,email) {
            this.exist=false;
            for(let fer of this.formateurs){
                if((fer.email.toLowerCase()==this.f.email.toLowerCase())||(fer.nom.toLowerCase()==this.f.nom.toLowerCase() && fer.prenom.toLowerCase()==this.f.prenom.toLowerCase())){
                    this.exist=true;
                }
            }
            if(this.exist==false){
            this.isLoading = true;
            this.formateurService
                .addFormateur({
                    nom: nom,
                    prenom: prenom,
                    sexe: sexe,
                    telephone: telephone,
                    email: email,
                })
                .subscribe(
                    formateur => {
                        this.isLoading = false;
                        this.error=false;
                        formateur.isUpdating = false;
                        this.formateurAdded.emit(formateur);
                        this.toggle.emit(true);
                    }
                );
            }
            else this.error=true;
        }
    

}


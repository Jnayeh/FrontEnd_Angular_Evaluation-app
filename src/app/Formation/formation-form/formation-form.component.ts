import { Component, OnInit, EventEmitter, Output, Input  } from '@angular/core';
import { Formation, FormationService } from '../../formation.service';
import 'rxjs/Rx';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
    selector: 'app-formation-form',
    templateUrl: './formation-form.component.html',
    styleUrls: ['./formation-form.component.css']
})

export class FormationFormComponent implements OnInit {
    @Input() formation:Formation;
    formations: Formation[];
    isLoading: boolean = true;
    errors: string = '';
    error=false;
    exist=false;
    theme='';


    constructor(private formationService: FormationService,public router: Router) { }

    @Output()
    formationAdded: EventEmitter<Formation> = new EventEmitter<Formation>();
    @Output() toggle = new EventEmitter<boolean>();
    

    
        ngOnInit(): void {
            this.getFormations();
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
            return this.formation;
        }

        isUpdating(id): boolean {
        return this.findFormation(id).isUpdating;
        }

        editFormation(id,theme) {
            let formation = this.findFormation(id);
            this.exist=false;
            for(let et of this.formations){
                if((et.theme.toLowerCase()==this.formation.theme.toLowerCase())&& et.id!=id){
                    this.exist=true;
                }
            }
            if(this.exist==false)
            {
            formation.isUpdating = true;
            this.formationService
                .editFormation(id,
                    {
                        theme: theme
                    }
                )
                .subscribe(
                    formation => {
                        formation.isUpdating = false;
                        this.formationAdded.emit(formation);
                        this.error=false;
                    },
                    error => {
                        formation.isUpdating = false;
                    }
                );
                this.router.navigate(['/formation/consult']);
            }
            else this.error=true;
        }
        addFormation(theme) {
            this.exist=false;
            for(let et of this.formations){
                if(et.theme.toLowerCase()==this.theme.toLowerCase()){
                    this.exist=true;
                }
            }
            if(this.exist==false)
            {
            this.isLoading = true;
            this.formationService
                .addFormation({
                    theme: theme
                })
                .subscribe(
                    formation => {
                        this.isLoading = false;
                        formation.isUpdating = false;
                        this.error=false;
                        this.formationAdded.emit(formation);
                        this.toggle.emit(true);
                    },
                    error => {
                        this.isLoading = false;
                    }
                );
            }
            else this.error=true;
        }
    

}


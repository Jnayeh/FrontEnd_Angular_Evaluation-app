import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import 'rxjs/Rx';
import { Formateur, FormateurService } from '../../formateur.service';

@Component({
  selector: 'app-formateur-edit',
  templateUrl: './formateur-edit.component.html',
  styleUrls: ['./formateur-edit.component.css']
})
export class FormateurEditComponent implements OnInit {

    formateurs: Formateur[];
    isLoading: boolean = true;

  constructor(private formateurService: FormateurService, private active:ActivatedRoute) { }
  id:Number;

  ngOnInit(): void {
    this.id = this.active.snapshot.params['id'];
    this.getFormateurs();
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
  

}
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import 'rxjs/Rx';
import { Formation, FormationService } from '../../formation.service';

@Component({
  selector: 'app-formation-edit',
  templateUrl: './formation-edit.component.html',
  styleUrls: ['./formation-edit.component.css']
})
export class FormationEditComponent implements OnInit {

  formations: Formation[];
  errorMessage: string;
  isLoading: boolean = true;

  constructor(private formationService: FormationService, private active:ActivatedRoute) { }
  id:Number;

  ngOnInit(): void {
    this.id = this.active.snapshot.params['id'];
    this.getFormations();
  }

  getFormations() {
      this.formationService
      .getFormations()
      .subscribe(
          formations => {
              this.formations = formations;
              this.isLoading = false;
          },
          error => this.errorMessage = <any>error
          );
  }
  findFormation(id): Formation {
      return this.formations.find(formation => formation.id === id);
  }
  isUpdating(id): boolean {
    return this.findFormation(id).isUpdating;
  }

}
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Etablissement, EtablissementService } from '../../etablissement.service';
import 'rxjs/Rx';

@Component({
  selector: 'app-etablissement-edit',
  templateUrl: './etablissement-edit.component.html',
  styleUrls: ['./etablissement-edit.component.css']
})
export class EtablissementEditComponent implements OnInit {
    etablissements: Etablissement[];
    errorMessage: string;
    isLoading: boolean = true;

    constructor(private etablissementService: EtablissementService, private active:ActivatedRoute) {}
    id:Number;
  
    ngOnInit(): void {
      this.id = this.active.snapshot.params['id'];
      this.getEtablissements();
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
}

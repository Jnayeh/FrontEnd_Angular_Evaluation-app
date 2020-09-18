import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { Routes, RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { FormsModule }   from '@angular/forms';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { FormationListComponent } from './Formation/formation-list/formation-list.component';
import { FormationFormComponent } from './Formation/formation-form/formation-form.component';
import { FormationEditComponent } from './Formation/formation-edit/formation-edit.component';
import { FormateurListComponent } from './Formateur/formateur-list/formateur-list.component';
import { FormateurFormComponent } from './Formateur/formateur-form/formateur-form.component';
import { FormateurEditComponent } from './Formateur/formateur-edit/formateur-edit.component';
import { FormateurConsultComponent } from './Formateur/formateur-consult/formateur-consult.component';
import { FormationConsultComponent } from './Formation/formation-consult/formation-consult.component';
import { EtablissementListComponent } from './Etablissement/etablissement-list/etablissement-list.component';
import { EtablissementFormComponent } from './Etablissement/etablissement-form/etablissement-form.component';
import { EtablissementConsultComponent } from './Etablissement/etablissement-consult/etablissement-consult.component';
import { EtablissementEditComponent } from './Etablissement/etablissement-edit/etablissement-edit.component';
import { EvaluationsComponent } from './Evaluation/evaluations/evaluations.component';
import { FormulaireComponent } from './formulaire/formulaire.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AdminComponent } from './admin/admin.component';
import { SubmittedComponent } from './formulaire/submitted/submitted.component';
import { LoginComponent } from './login/login.component';
import { NotfoundComponent } from './notfound/notfound.component';

const routes: Routes = [
    { path: '', component: HomeComponent, pathMatch: 'full' },
    { path: 'formations', component: FormationListComponent },
    { path: 'formation/edit/:id', component: FormationEditComponent },
    { path: 'formation/consult', component: FormationConsultComponent },
    { path: 'formateurs', component: FormateurListComponent },
    { path: 'formateur/edit/:id', component: FormateurEditComponent },
    { path: 'formateur/consult', component: FormateurConsultComponent },
    { path: 'etablissements', component: EtablissementListComponent },
    { path: 'etablissement/edit/:id', component: EtablissementEditComponent },
    { path: 'etablissement/consult', component: EtablissementConsultComponent },
    { path: 'evaluations', component: EvaluationsComponent },
    { path: 'form', component: FormulaireComponent },
    { path: 'submitted', component: SubmittedComponent },
    { path: 'login', component: LoginComponent },
    { path: '**', component: NotfoundComponent, pathMatch: 'full' }
];
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    FormationListComponent,
    FormationFormComponent,
    FormationEditComponent,
    FormationConsultComponent,
    FormateurListComponent,
    FormateurFormComponent,
    FormateurEditComponent,
    FormateurConsultComponent,
    FormationConsultComponent,
    EtablissementListComponent,
    EtablissementFormComponent,
    EtablissementConsultComponent,
    EtablissementEditComponent,
    EvaluationsComponent,
    FormulaireComponent,
    AdminComponent,
    SubmittedComponent,
    LoginComponent,
    NotfoundComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    RouterModule.forRoot(routes),
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

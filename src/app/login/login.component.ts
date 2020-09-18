import { Component, OnInit, EventEmitter, Output  } from '@angular/core';
import { AdminService} from '../admin.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  nom='';
  password='';
  admins=[];
  exist: boolean;
  constructor(private adminService: AdminService, private router: Router) { }
  
    @Output() authorized = new EventEmitter<boolean>();
    @Output() user = new EventEmitter<string>();
  
  ngOnInit(): void {
    this.admins=this.adminService.admins;
  }
  Log_In(nom:string,password){
    this.exist=false;
    for(let ad of this.admins){
      console.log(ad);
      if(ad[0]==nom && ad[1]==password){
        this.exist=true;
        this.authorized.emit(true);
        this.user.emit(nom);
        this.router.navigate(['/']);
      }
    }
    if(!this.exist){
      window.alert(" Il n'y a aucun admin avec ces informations ");
    }
  }

}

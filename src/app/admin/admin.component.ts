import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor(public  router: Router) { }
  
  @Output() authorized = new EventEmitter<boolean>();

  @Input() user:string;

  ngOnInit(): void {
  }
  open=false;
  toggle(){
    var open=!this.open;
    this.open=open;
    if(open==true){
      this.openNav();
    }
    else {this.closeNav()};
  }
  openNav() {
    document.getElementById("mySidebar").style.width = "250px";
    document.getElementById("main").style.marginLeft = "250px";
  }

  closeNav() {
    document.getElementById("mySidebar").style.width = "0";
    document.getElementById("main").style.marginLeft= "0";
  }
  
  click(){
    const dropdown = document.getElementsByClassName("dropdown-btn");
    var i: number;
    
    for (i = 0; i < dropdown.length; i++) {
      dropdown[i].addEventListener("click", function() {
      this.classList.toggle("active");
      var dropdownContent = this.nextElementSibling;
      
      if (dropdownContent.style.display === "block") {
      dropdownContent.style.display = "none";
      } else {
      dropdownContent.style.display = "block";
      }
      });
    }
  }
  LogOut(){
    this.authorized.emit(false);
  }
}

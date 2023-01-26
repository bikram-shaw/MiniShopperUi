import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/common/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  user: any;

  constructor(private router:Router,private authService:AuthService) { }

  ngOnInit(): void {
    this.user=this.authService.getUserData();
  }
  logout(){
   this.authService.logout();
  }
}

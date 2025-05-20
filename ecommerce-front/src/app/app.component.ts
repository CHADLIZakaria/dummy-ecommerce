import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from "./shared/navbar/navbar.component";
import { HomeComponent } from "./pages/home/home.component";
import { CommonModule } from '@angular/common';
import { LoginService } from './pages/login/services/login.service';
import { CategoriesComponent } from "./admin/pages/categories/categories.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent, CategoriesComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  loginService = inject(LoginService)
  
  ngOnInit(): void {
    this.loginService.getUser().subscribe(data => {
      console.log(data)
    })
  }  

}

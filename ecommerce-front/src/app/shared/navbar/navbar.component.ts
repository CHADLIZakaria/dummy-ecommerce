import { Component, inject } from '@angular/core';
import { LoginService } from '../../pages/login/services/login.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'ecom-navbar',
  imports: [RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  loginService = inject(LoginService)

}

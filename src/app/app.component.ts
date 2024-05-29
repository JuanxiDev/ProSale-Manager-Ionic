import { Component } from '@angular/core';
import { LoginService } from './Services/auth/login.service';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Inicio', url: '/home', icon: 'home' },
    { title: 'Productos', url: '/producto-lista', icon: 'basket' },
    { title: 'Proveedores', url: '/proveedor-lista', icon: 'cart' },
    { title: 'Usuarios', url: '/user-lista', icon: 'people' },
  ]; 
  userLoginOn: boolean = false;

  constructor(private loginService: LoginService) { }


  ngOnInit(): void {
    this.loginService.userLogued.subscribe(
      {
        next: (userLoginOn) => {
          this.userLoginOn = userLoginOn;
        }
      }
    )
  }


  logout() {
    this.loginService.userLogued.next(false)
    console.log("llega")
  }


}

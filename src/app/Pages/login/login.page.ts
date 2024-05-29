import { Component, OnInit, Injectable } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/Services/auth/login.service';
import { LoginRequest } from 'src/app/Services/auth/login.request';
import { User } from 'src/app/user';
import { UsuarioService } from 'src/app/Services/user/usuario.service';
import { UserService } from 'src/app/Services/user/userlog.service';

@Injectable({
  providedIn: 'root'
})

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  errorLogin: boolean = false;
  loginError: string = '';

  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private loginService: LoginService,
    private usuarioServicio: UsuarioService,
    private userService: UserService,
  ) { this.usuarios = []; }


  ngOnInit() {
    this.usuarioServicio.obtenerUsuariosLista().subscribe(
      (datos => {
        this.usuarios = datos;
      })
    );
  }

  //Alerta de usuario

  mostrarAlertaInactivo() {
    window.alert('Tu usuario se encuentra inactivo por favor comunicate con el administrador.');
  }

  //prueba base de datos

  usuarios: User[];
  username: string = "";
  passcode: string = "";
  userNotFound: boolean = false;
  passNotFound: boolean = false;
  userlog: any = {};


  login2(username: string, passcode: string) {
    this.userlog = this.usuarios.find(usuarios => usuarios.name === this.username)
    if (this.userlog) {
      console.log("userlog es: ", username, this.userlog.password, passcode);
      this.userService.setUserlog(this.userlog)
      if (this.passcode === this.userlog.password) {
        console.log("contraseña correcta");
        if (this.userlog.status === "Activo") {
          this.loginService.login({ username, passcode } as unknown as LoginRequest).subscribe({
            next: (userData) => {
              console.log(userData)
            },
            error: (errorData) => {
              console.error("algo anda mal...", errorData);
              this.userNotFound = true;
            },
            complete: () => {
              console.info("Login correcto");
              this.username = " "
              this.passcode = " "
              this.router.navigateByUrl('/home')
            }
          })
        }
        else {
          this.mostrarAlertaInactivo();
          console.log("usuario inactivo");
        }
      } else {
        console.log(" contraseña incorrecta");
        this.passNotFound = true
      }
    } else {
      console.log(" usuario no encontrado");

      this.userNotFound = true;
    }

    return this.username;
  }

  getUserLog() {
    return this.userlog;
  }


}

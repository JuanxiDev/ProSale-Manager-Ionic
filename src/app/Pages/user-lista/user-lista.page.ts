import { Component, OnInit, Injectable } from '@angular/core';
import { UsuarioService } from 'src/app/Services/user/usuario.service';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from 'src/app/Services/auth/login.service';
import { User } from 'src/app/user';
import { UserService } from 'src/app/Services/user/userlog.service';

@Injectable({
  providedIn: 'root'
})

@Component({
  selector: 'app-user-lista',
  templateUrl: './user-lista.page.html',
  styleUrls: ['./user-lista.page.scss'],
})
export class UserListaPage implements OnInit {
  usuarios: User[];
  userLoginOn: boolean = false;
  userData?: User;
  userlog: any;

  modalAdd: boolean = false
  modalEdit: boolean = false

  setAdd(isOpen: boolean) {
    this.modalAdd = isOpen
  }

  setEdit(isOpen: boolean) {
    this.modalEdit = isOpen
  }

  constructor(private usuarioServicio: UsuarioService,
    private enrutador: Router,
    private ruta: ActivatedRoute,
    private loginService: LoginService,
    private userService: UserService
  ) { }


  salida(): void {
    console.log("si xd.")
    this.userLoginOn = false;
  }



  ngOnInit() {

    this.loginService.userLogued.subscribe({
      next: (userLoginOn) => {
        this.userLoginOn = userLoginOn;
      }
    });

    this.userlog = this.userService.getUserlog();
    console.log(this.userlog);

    this.loginService.loguedUserData.subscribe({
      next: (userData) => {
        this.userData = userData
      }
    });
    this.obtenerUsuarios()
  }

  private obtenerUsuarios() {
    //Consumir datos del observable (se suscribe)
    this.usuarioServicio.obtenerUsuariosLista().subscribe(
      (datos => {
        this.usuarios = datos;
      })
    );
  }


  //Editar Producto
  id: number;
  userEdit: any = {};

  cancel() {
    this.obtenerUsuarios()
    this.modalEdit = false
  }

  editarUsuario(id: number) {
    this.id = id;
    this.userEdit = this.usuarios.find(usuarios => usuarios.idUser === id)
    console.log("editarProducto ", id, this.userEdit);
    return id;
  }


  onSubmitEdit(id: number) {
    this.guardarUsuario(this.id);
    console.log("onSubmitEdit", this.id, this.userEdit);
    this.modalEdit = false
  }

  guardarUsuario(id: number): void {
    this.usuarioServicio.actualizarUsuario(this.id, this.userEdit).subscribe(
    );
    console.log("guardarProducto: ", this.id, this.userEdit);
  }




  //TS Agregar usuario
  usuario: User = new User();

  onSubmitUss() {
    this.modalEdit = false
    this.usuarioServicio.agregarUsuario(this.usuario).subscribe(
      {
        next: (datos) => this.obtenerUsuarios(),
        error: (errores) => console.log(errores)
      }
    )

  }

  //TS Eliminar Producto

  eliminarUsuario(id: number) {
    this.usuarioServicio.eliminarUsuario(id).subscribe(
      {
        next: (datos) => this.obtenerUsuarios(),
        error: (errores) => console.log(errores)
      }
    )
  }


}
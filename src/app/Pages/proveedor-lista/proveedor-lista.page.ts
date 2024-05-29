import { Component, OnInit, Injectable } from '@angular/core';
import { Proveedor } from 'src/app/proveedor';
import { ProveedorService } from 'src/app/Services/proveed/proveedor.service';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from 'src/app/Services/auth/login.service';
import { User } from 'src/app/user';
import { LoginPage } from '../login/login.page';
import { UserService } from 'src/app/Services/user/userlog.service';

@Injectable({
  providedIn: 'root'
})

@Component({
  selector: 'app-proveedor-lista',
  templateUrl: './proveedor-lista.page.html',
  styleUrls: ['./proveedor-lista.page.scss'],
})
export class ProveedorListaPage implements OnInit {
  proveedores: Proveedor[];
  userLoginOn: boolean = false;
  userData?: User;
  user: any = this.loginComp.userlog;
  userlog: any;

  modalAdd: boolean = false
  modalEdit: boolean = false

  setAdd(isOpen:boolean){
    this.modalAdd = isOpen  
  }

  setEdit(isOpen:boolean){
    this.modalEdit = isOpen  
  }

  constructor(private proveedorServicio: ProveedorService,
    private enrutador: Router,
    private ruta: ActivatedRoute,
    private loginService: LoginService,
    private loginComp: LoginPage,
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
    this.obtenerProveedores()
    this.userlog = this.userService.getUserlog();
    console.log(this.userlog);
  }

  obtenerProveedores() {
    //Consumir datos del observable (se suscribe)

    this.proveedorServicio.obtenerProveedorLista().subscribe(
      (datos => {
        this.proveedores = datos;
      }
      ));
  }


  //Editar Proveedor
  id: number;
  proveedorEdit: any = {};

  cancel() {
    this.obtenerProveedores()
    this.modalEdit = false
  }

  editarProveedor(id: number) {
    this.id = id;
    this.proveedorEdit = this.proveedores.find(proveedores => proveedores.idProveedor === id)
    console.log("editarProveedor ", id, this.proveedorEdit);
    return id;
  }


  onSubmitEdit(id: number) {
    this.guardarProveedor(this.id);
    console.log("onSubmitEdit", this.id, this.proveedorEdit);
    this.modalEdit = false
  }

  guardarProveedor(id: number): void {
    this.proveedorServicio.actualizarProveedor(this.id, this.proveedorEdit).subscribe(
    );
    console.log("guardarProveedor: ", this.id, this.proveedorEdit);
  }




  //TS Agregar Proveedor
  proveedor: Proveedor = new Proveedor();

  onSubmitProv() {
    this.modalEdit = false
    this.proveedorServicio.agregarProveedor(this.proveedor).subscribe(
      {
        next: (datos) => this.obtenerProveedores(),
        error: (errores) => console.log(errores)
      }
    )    
  }

  //TS Eliminar Proveedor

  eliminarProveedor(id: number) {
    this.proveedorServicio.eliminarProveedor(id).subscribe(
      {
        next: (datos) => this.obtenerProveedores(),
        error: (errores) => console.log(errores)
      }
    )
  }

}


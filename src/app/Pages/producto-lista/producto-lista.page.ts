import { Component, OnInit, Injectable } from '@angular/core';
import { Producto } from 'src/app/producto';
import { ProductoService } from 'src/app/Services/produc/producto.service';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from 'src/app/Services/auth/login.service';
import { User } from 'src/app/user';
import { Proveedor } from 'src/app/proveedor';
import { LoginPage } from '../login/login.page';
import { ProveedorListaPage } from '../proveedor-lista/proveedor-lista.page';
import { ProveedorService } from 'src/app/Services/proveed/proveedor.service';

@Injectable({
  providedIn: 'root'
})

@Component({
  selector: 'app-producto-lista',
  templateUrl: './producto-lista.page.html',
  styleUrls: ['./producto-lista.page.scss'],
})
export class ProductoListaPage implements OnInit {
  productos: Producto[];
  proveedores: Proveedor[];
  userLoginOn: boolean = false;
  userData?: User;
  user: any = this.loginComp.userlog;

  gananciaTotal: number;
  porcentajeGanancia: number;


  modalAdd: boolean = false
  modalEdit: boolean = false

  setAdd(isOpen:boolean){
    this.modalAdd = isOpen  
  }

  setEdit(isOpen:boolean){
    this.modalEdit = isOpen  
  }
  
  

  constructor(private productoServicio: ProductoService,
    private enrutador: Router,
    private ruta: ActivatedRoute,
    private loginService: LoginService,
    private loginComp: LoginPage,
    private proveedorServicio: ProveedorService
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
    this.obtenerProductos()
    this.obtenerProveedores()

    //Porcentaje de ganancia
    this.gananciaTotal = this.producto.precio - this.producto.precioprov
    this.porcentajeGanancia = (this.gananciaTotal / this.producto.precioprov) * 100;

  }

  private obtenerProductos() {
    //Consumir datos del observable (se suscribe)
    this.productoServicio.obtenerProductosLista().subscribe(
      (datos => {
        this.productos = datos;
      }
      ));
  }

  obtenerProveedores() {
    //Consumir datos del observable (se suscribe)

    this.proveedorServicio.obtenerProveedorLista().subscribe(
      (datos => {
        this.proveedores = datos;
      }
      ));
  }


  //Editar Producto
  id: number;
  productoEdit: any = {};

  cancel() {
    this.obtenerProductos()
    this.modalEdit = false
  }

  editarProducto(id: number) {
    this.id = id;
    this.productoEdit = this.productos.find(productos => productos.idProducto === id)
    console.log(this.productoEdit, id);
    return id;
  }

  guardarProducto(id: number): void {
    this.productoServicio.actualizarProducto(this.id, this.productoEdit).subscribe(
      {
        next: (datos) => this.obtenerProductos(),
        error: (errores) => console.log(errores)
      }
    );
    this.modalEdit = false
  }




  //TS Agregar producto
  producto: Producto = new Producto();
  selectedProveedor: string;
  addProv: any = {}


  onSubmitAdd() {
    this.modalEdit = false
    this.addProv = this.proveedores.find(proveedores => proveedores.nombreProveedor === this.selectedProveedor)
    this.producto.proveedor = this.addProv
    this.productoServicio.agregarProducto(this.producto).subscribe(
      {
        next: (datos) => this.obtenerProductos(),
        error: (errores) => console.log(errores)
      }
    )
  }

  //TS Eliminar Producto

  eliminarProducto(id: number) {
    this.productoServicio.eliminarProducto(id).subscribe(
      {
        next: (datos) => this.obtenerProductos(),
        error: (errores) => console.log(errores)
      }
    )
  }


}




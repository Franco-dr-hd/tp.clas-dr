import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Producto } from 'src/app/models/producto';
import { CrudService } from 'src/app/modules/admin/services/crud.service';
import { CarritoService } from 'src/app/modules/carrito/services/carrito.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent {
  // Definimos colección local de productos
  coleccionProductos: Producto[] = [];

  // Variable local para obtener producto seleccionado
  productoSeleccionado!: Producto;

  // Variable para manejar estado de un modal
  modalVisible: boolean = false;

  //Booleano para manejar la visibilidad de "Ultima Compra"
  compraVisible:boolean = false;

  //Directivas para comunicarse con el componente padre
  @Input() productoReciente: string = '';

  //Output sera definido como un nuevo evento
  @Output() productoAgregado = new EventEmitter<Producto>;

  stock:number = 0;

  constructor(
    public servicioCrud: CrudService,
    public servicioCarrito:CarritoService
  ){}
  
  ngOnInit(): void{
    this.servicioCrud.obtenerProducto().subscribe(producto => {
      this.coleccionProductos = producto;
    })
  }

  // Función para modal que muestre la información de un producto en específico
  mostrarVer(info: Producto){
    // Habilita visibilidad del modal
    this.modalVisible = true;

    // Guarda información de un producto elegido por el usuario
    this.productoSeleccionado = info;
  }

  agregarProducto(info:Producto){
    this.productoAgregado.emit(info);

    this.compraVisible = true;

    const stockDeseado = Math.trunc(this.stock)

    // Controla el stock que desea el comprador
    if(stockDeseado<=0 || stockDeseado > info.stock){
       Swal.fire({
        title:'Error al agregar el producto',
        text:'El stock deseado no es valido, por favor ingresar un valor valido',
        icon:'error'
      })
    }else{
      this.servicioCarrito.crearPedido(info,stockDeseado);
    }
  }
}

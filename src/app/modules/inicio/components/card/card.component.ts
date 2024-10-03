import { Component } from '@angular/core';
// IMPORTAMOS INTERFAZ
import { Animal } from 'src/app/models/animal';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent {
  // PROPIEDAD PÚBLICA (TIPO ARRAY)
  public info: Animal[];

  constructor(){
    this.info = [
      {
        id: "",
        nombre: "Chanchito",
        edad: 5,
        imagen: "https://i1.sndcdn.com/artworks-000190784980-i4qoly-t500x500.jpg",
        alt: "Un chanchito"
      },
      {
        id: "",
        nombre: "Caballo",
        edad: 7,
        imagen: "https://concepto.de/wp-content/uploads/2021/07/caballos-e1626738224231.jpg",
        alt: "Un caballo"
      },
      {
        id: "",
        nombre: "Carpincho",
        edad: 10,
        imagen: "https://eraverde.com.ar/wp-content/uploads/2018/08/carpincho_roger.jpg",
        alt: "Un carpincho"
      }
    ]
  }
}

import { Component } from '@angular/core';
import { AuthService } from 'src/app/modules/autentificacion/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  logueado = true; // variable booleana para el botón de Registro e Inicio de Sesión
  deslogueado = false; // variable booleana para el botón de Cerrar Sesión

  constructor(
    public servicioAuth: AuthService,
    public servicioRutas: Router
  ){}

  // Cambia los valores de logueado y deslogueado para ocultar los primeros y mostrar el último
  iniciar(){
    this.logueado = false;
    this.deslogueado = true;
  }

  cerrarSesion(){
    this.deslogueado = false;
    // va a eliminar el "token" actual del usuario
    // token: estado actual del usuario en el navegador para mantener la sesión abierta
    this.servicioAuth.cerrarSesion();

    this.servicioRutas.navigate(['/']); // redigirimos a la raíz de la página
    this.logueado = true;
  }
  //Funcion Para Modo Oscuro

  cambiarFondo(){
    let toggle: HTMLInputElement | null = document.getElementById('toggle') as HTMLInputElement
    let label_toggle:HTMLElement | null = document.getElementById('label_toggle') as HTMLElement

    if(toggle){
      let checked: boolean = toggle.checked;
      document.body.classList.toggle('dark',checked)

      if(checked){
        label_toggle!.innerHTML ='<i class="fa-solid fa-sun"></i>';
      }else{
        label_toggle!.innerHTML ='<i class="fa-solid fa-moon"></i>'
      }
    }
  }
}

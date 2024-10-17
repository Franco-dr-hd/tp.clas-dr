import { CanActivateFn } from '@angular/router';

// Inyección de servicios
import { inject } from '@angular/core';

import { AuthService } from '../modules/autentificacion/services/auth.service';

import { Router } from '@angular/router';

// Operadores de tipo OBSERVABLES
import{ map, switchMap, of, from} from 'rxjs';

export const rutaProtegidaGuard: CanActivateFn = (route, state) => {
  // Inyectamos/ instanciamos servicio de autentificación 
  const servicioAuth = inject(AuthService);

  // Inyectamos/ instanciamos servicio de rutas
  const servicioRutas = inject(Router);

  // Especificamos el rol esperado por el guardián 
  const rolEsperado = "admin";
  
  return from (servicioAuth.obtenerUid()).pipe(
    switchMap(uid => {
      if (uid){
        return servicioAuth.obtenerRol(uid).pipe(
          map(rol => {
            if (rol === rolEsperado) {
              // Si coincide el rol esperado, habilita acceso al usuario 
              console.log("Usuario verificado como administrador.");
              
              return true;
            } else{
              // Caso contrario, deniega el acceso
              return false
            }
          })
        )
      } else {
        // Ej: No está registrado o es de tipo "visitante"
        console.log("Usuario no validado. Permisos insuficientes.");

        //Redirecciona a inicio para usuarios no validados o sin permiso de admin
        return of(servicioRutas.createUrlTree(["/inicio"]))
      }
    })
  )
};

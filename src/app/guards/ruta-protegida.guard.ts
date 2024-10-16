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
  
  return true;
};

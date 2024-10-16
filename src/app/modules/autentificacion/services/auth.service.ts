import { Injectable } from '@angular/core';
// Servicio de AUTENTIFICACIÓN de FIREBASE
import { AngularFireAuth } from '@angular/fire/compat/auth';

//Servicio de COLECCIONES DE FIREBASE
import { AngularFirestore } from '@angular/fire/compat/firestore';

// Observará los cambios
import { Observable } from 'rxjs';

// Itera la colección leyendo su información actual
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  //Propiedad privada para el manejo del rol del usuario 
  private rolUsuario: string | null = null;

  // Referenciar Auth de Firebase para inicializarlo
  constructor(
    private auth: AngularFireAuth,
    private servicioFirestore: AngularFirestore
  ) { }

  // Función para REGISTRO
  registrar(email: string, password: string){
    // Retorna nueva información de EMAIL y CONTRASEÑA
    return this.auth.createUserWithEmailAndPassword(email, password);
  }

  // Función para INICIO DE SESIÓN
  iniciarSesion(email: string, password: string){
    // Validar el email y la contraseña
    return this.auth.signInWithEmailAndPassword(email, password);
  }

  // Función para CERRAR SESIÓN
  cerrarSesion(){
    // Devolver una promesa vacía
    return this.auth.signOut();
  }

  // Función para tomar UID
  async obtenerUid(){
    // Nos va a generar una promesa, y la constante la va a capturar
    const user = await this.auth.currentUser;

    /*
      Si el usuario no respeta la estructura de la interfaz /
      Si tuvo problemas para el registro -> ej.: mal internet
    */
    if(user == null){
      return null;
    } else {
      return user.uid;
    }
  }

  // Función que busca un usuario en la colección de 'usuarios' cuyo correo electrónico coincida con el valor proporcionado
  obtenerUsuario(email: string){
    return this.servicioFirestore.collection('usuarios', ref => ref.where('email', '==', email)).get().toPromise();
  }

  // FUNCIÓN PARA RECUPERAR EL ROL DE USUARIO
  obtenerRol(uid: string): Observable <string | null> {
    /*Retornamos del servicio de Firestore la colección de usuarios, buscando por un UID
    Observamos cambios en valores, mapeamos el documento de 'usuario' e identificamos el atributo de rol (aún si este es nulo)
    */
    return this.servicioFirestore.collection('usuarios').doc(uid).valueChanges().pipe(map((usuario: any) => usuario? usuario.rol : null))
  }

  // Obtiene el rol de la primera función y lo asigna a la propiedad privada local  
  enviarRolUsuario(rol: string){
    this.rolUsuario = rol;
  }

  // Obtiene el rol y lo retorna (ya sean alfanumericos o nulos)
  obtenerRolUsuario(): string | null {
    return this.rolUsuario;
  }
}

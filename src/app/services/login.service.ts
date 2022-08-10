import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from '@firebase/app-compat';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  user:any

  constructor(private _auth:AngularFireAuth) {
    _auth.onAuthStateChanged(user => {
      if(user) this.user = user
      else this.user = null
    })    
  }

  async logIn(){  
    return await this._auth.signInWithPopup( new firebase.auth.GoogleAuthProvider()).then(
      res => Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Sesión iniciada',
          showConfirmButton: false,
          timer: 1500
        }),
      err => console.log('Error: ', err)
    )
  }

  async logOut(){
    return await this._auth.signOut().then(
      res => Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Sesión cerrada',
        showConfirmButton: false,
        timer: 1500
      }),err => console.log(err)
    )
  }

  checkUser(){
    if(this.user != undefined){
      if(this.user.email == 'js.solarte29@gmail.com') return true
    }
    return false
  }
}

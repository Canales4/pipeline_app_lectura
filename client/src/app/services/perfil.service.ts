import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Profile } from '../models/Profile';

@Injectable({
  providedIn: 'root'
})
export class PerfilService {
  API_URI = 'https://applectura-server.eu-gb.mybluemix.net';

  // DEFINIR

  public profile = {
    codUsuario: null,
    nomUsuario: null,
    apellido1: null,
    apellido2: null,
    visibilidad: null,
    email: null,
    bio: null,
    sexo: null,
    alias: null,
  }

  // RECOGE EL PERFIL Y SUS DATOS

  constructor( private http: HttpClient) { }
  getProfile(codUsuario: string){
    return this.http.get(`${this.API_URI}/home/${codUsuario}`);
  }

  // ELIMINAR PERFIL

  deleteProfile(codUsuario: string) {
    return this.http.delete(`${this.API_URI}/delete/${codUsuario}`);
  }

  // MODIFICAR PERFIL

  public updateProfile(codUsuario: number, nomUsuario: string, apellido1: string, apellido2: string, visibilidad: string, email: string, bio: string, sexo: string, alias: string): Observable<any> {

    // DEFINIR
    this.profile.codUsuario = codUsuario;
    this.profile.nomUsuario = nomUsuario;
    this.profile.apellido1 = apellido1;
    this.profile.apellido2 = apellido2;
    this.profile.visibilidad = visibilidad;
    this.profile.email = email;
    this.profile.bio = bio;
    this.profile.sexo = sexo;
    this.profile.alias = alias;
    console.log(this.profile);
    return this.http.put<any>(this.API_URI + `/profile/modify/${codUsuario}`, this.profile);
  }
}

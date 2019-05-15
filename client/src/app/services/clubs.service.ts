import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

//Para crear un objeto club con las propiedades del club
export interface Club {
  codClub?: number; //se le pone ? para decir que el campo es opcional
  presidente: number;
  nomClub: string;
  desClub?: string;
}


@Injectable({
  providedIn: 'root'
})
export class ClubsService {
  public clubes = {
    presidente: null,
    nomClub: null,
    desClub: null,
  }

  API_URI = 'http://localhost:3000/club'

  constructor(private http: HttpClient) { }

  //para obtener los clubs que hay
  getClubs() {
    return this.http.get(`${this.API_URI}/`);
  }

  //para obtener un club especifico
  getClub(id: string) {
    return this.http.get(`${this.API_URI}/${id})`);
  }

  //para guardar el club, decimos que va a ser un objeto club de tipo club que hemos especificado en al interface de arriba
  saveClub(presidente: number, nomClub: string, desClub: string) {
    this.clubes.presidente = presidente;
    this.clubes.nomClub = nomClub;
    this.clubes.desClub = desClub;
    console.log(this.clubes);
    return this.http.post(`${this.API_URI}/`, this.clubes);
  }

  //para borrar un club
  deleteClub(id: string) {
    return this.http.delete(`${this.API_URI}/${id}`);
  }

  //actualizar un club
  updateClub(id: string, updateClub: Club) {
    return this.http.put(`${this.API_URI}/${id}`, updateClub);
  }
}


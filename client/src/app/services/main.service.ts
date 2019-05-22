import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MainService {

API_URI = 'https://applectura-server.eu-gb.mybluemix.net';

  constructor(private http: HttpClient) { }

  // Devolvemos la información de un libro obtenido de nuestra base de datos para el libro más vendido.

  getBooks() {
    return this.http.get(`${this.API_URI}/books`);
  }

  // Devolvemos la información del libro con la mayor puntuación de nuestra base de datos.

  getBestBook() {
    return this.http.get(`${this.API_URI}/bestbook`);
  }

  getNewClub() {
    return this.http.get(`${this.API_URI}/newClub`);
  }

  mandoFavorito(codLibro, codUsuario) {

    //Creo el objeto con los datos que recibo del component

    let data = {
      codLibro: codLibro,
      codUsuario: codUsuario
    };

    //Por el return mando el post indicando la ruta y el objeto que le paso,esto va dirigido al homeRouter.js

    return this.http.post(`${this.API_URI}/favoritos`, data);
  }

}

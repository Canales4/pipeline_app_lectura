import { Component, OnInit } from "@angular/core";
import { ApiBooksService } from "src/app/services/api-books.service";
import { ServerService } from "src/app/services/server.service";
import {
  AuthenticationService,
  UserDetails
} from "src/app/services/authentication.service";
import { NavbarService } from "src/app/services/navbar.service";
import { MainService } from "src/app/services/main.service";

@Component({
  selector: "app-main",
  templateUrl: "./main.component.html",
  styleUrls: ["./main.component.css"]
})
export class MainComponent implements OnInit {
  books;
  bestBookInfo;
  bestBook;
  details: UserDetails; //identificar al usuario que hay logueado
  currentRate = 0; // utilizamos el current para los corazones, lo inicializamos aquí.
  clubMasNuevo;
  codLibro: string;
  codUsuario: number;
  agregado: boolean;

  constructor(
    private bookservice: ApiBooksService,
    private serverservice: ServerService,
    private mainservice: MainService,
    public auth: AuthenticationService,
    public nav: NavbarService
  ) {}

  // información que va a aparecer nada mas se cargue la pagina

  ngOnInit() {
    this.nav.show();
    this.getBooks();
    this.getBestBookInfo();
    this.getNewClub();
    this.auth.profile().subscribe(
      user => {
        this.details = user;
      },
      err => {
        console.error(err);
      }
    );
  }

  //Método para extraer la información de la api a partir del nombre del libro.
  //Está en proceso a la espera de encontrar una que nos muestre el más vendido.

  getBooks() {
    this.bookservice.getBooksByTitle("Las hijas del Capitán").subscribe(
      res => {
        this.books = res;
        console.log(this.books);
      },
      err => console.log(err)
    );
  }

  // Método para obtener los puntos del libro con mayor puntuación de nuestra aplicación

  getBestBookInfo() {
    this.mainservice.getBestBook().subscribe(
      res => {
        this.bestBookInfo = res;
        console.log(res);
        this.currentRate = this.bestBookInfo[0].puntos;
        this.codLibro = this.bestBookInfo[0].idLibro;

        this.getBestBook();
      },
      err => console.log(err)
    );
  }
  // Una vez obtenido el libro con mayor puntuación en el método de arriba, lo utilizamos para buscar su información en la api.

  getBestBook() {
    console.log(this.bestBookInfo[0].ISBN);
    this.bookservice.getBooksByISBN(this.bestBookInfo[0].ISBN).subscribe(
      res => {
        this.bestBook = res;
        console.log(res);
      },
      err => console.log(err)
    );
  }

  getNewClub() {
    this.mainservice.getNewClub().subscribe(
      res => {
        this.clubMasNuevo = res;
        console.log(res);
      },
      err => console.log(err)
    );
  }

  // FUNCION PARA GUARDAR LOS LIBROS EN FAVORITOS,coge los datos de arriba, me creo las variables y le asigno los valores.
  favoritos() {
    this.agregado = true;
    this.codUsuario = this.details.codUsuario;
    this.mainservice.mandoFavorito(this.codLibro, this.codUsuario)
     //Mando la información a mi mainService a mi función mandoFavorito
      .subscribe( res => {}, err => console.log(err) ); 
      //Necesito el observable para que funcione y me mande la información. 
  }
}

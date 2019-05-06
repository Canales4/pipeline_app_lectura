import { Component, OnInit } from '@angular/core';
import { ApiBooksService } from 'src/app/services/api-books.service';
import { ServerService } from 'src/app/services/server.service';
import { AuthenticationService, UserDetails } from 'src/app/services/authentication.service';
import { NavbarService } from 'src/app/services/navbar.service';
import { MainService } from 'src/app/services/main.service';


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  books;
  bestBookInfo;
  bestBook;
  details: UserDetails; //identificar al usuario que hay logueado
  currentRate = 0; // utilizamos el current para los corazones, lo inicializamos aquí.
  constructor(
    private bookservice: ApiBooksService,
    private serverservice: ServerService,
    private mainservice: MainService,
    public auth: AuthenticationService,
    public nav: NavbarService 
  ) {}

  ngOnInit() {
    this.nav.show();
    this.getBooks();
    this.getBestBookInfo();
    this.auth.profile().subscribe(
      user => {
        this.details = user;
      },
      err => {
        console.error(err);
      }
    );
  }

  getBooks() {
    this.bookservice.getBooksByTitle('Las hijas del Capitán').subscribe(
      res => {
        this.books = res;
        console.log(this.books);
      },
      err => console.log(err)
    );
  }

  getBestBookInfo() {
    this.mainservice.getBestBook().subscribe(
      res => {
        this.bestBookInfo = res;
        console.log(res);
        this.currentRate = this.bestBookInfo[0].puntos;
        this.getBestBook();
      },
      err => console.log(err)
    );
  }

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
}

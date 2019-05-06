import { Book } from './../models/Book';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ServerService {

  API_URI = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  getHome() {
    return this.http.get(`${this.API_URI}/home`);
  }

  getBooks() {
    return this.http.get(`${this.API_URI}/books`);
  }

  saveBook(book: Book) {
    return this.http.post(`${this.API_URI}/books`, book);
  }

  getBookByISBN(isbn: string) {
    return this.http.get(`${this.API_URI}/books/isbn/${isbn}`);
  }

}

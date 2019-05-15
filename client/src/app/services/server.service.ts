import { Book } from './../models/Book';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Data } from '../models/Data';

@Injectable({
  providedIn: 'root'
})
// service for the api rest server
export class ServerService {

  API_URI = 'http://localhost:3000';

  constructor(private http: HttpClient, ) { }

  getHome() {
    return this.http.get(`${this.API_URI}/home`);
  }

  getBooks(data: Data) {
    return this.http.get(`${this.API_URI}/books/${data.codUser}`);
  }

  saveBook(book: Book) {
    return this.http.post(`${this.API_URI}/books`, book);
  }

  getBookByISBN(isbn: string) {
    return this.http.get(`${this.API_URI}/books/isbn/${isbn}`);
  }

}

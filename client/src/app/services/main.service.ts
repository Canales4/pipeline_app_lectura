import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MainService {

API_URI = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  getBooks() {
    return this.http.get(`${this.API_URI}/books`);
  }

  getBestBook() {
    return this.http.get(`${this.API_URI}/bestbook`);
  }
 

}

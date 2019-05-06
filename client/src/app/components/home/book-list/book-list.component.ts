import { ApiBooksService } from './../../../services/api-books.service';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ServerService } from 'src/app/services/server.service';
import { NgbPopover, NgbPopoverConfig } from '@ng-bootstrap/ng-bootstrap';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import { formatNumber } from '@angular/common';
import { NavbarService } from 'src/app/services/navbar.service';



@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css'],
  encapsulation: ViewEncapsulation.None,
  providers: [NgbPopoverConfig]
})
export class BookListComponent implements OnInit {

  books;

// tslint:disable-next-line: max-line-length
  constructor(private bookService: ServerService, private bookApi: ApiBooksService, private config: NgbPopoverConfig, public nav: NavbarService) { }

  getBooks() {
    this.bookService.getBooks()
      .subscribe(
        res => {
          this.books = res;
          console.log(this.books);
        },
        err => console.log(err)
      );
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.books, event.previousIndex, event.currentIndex);
    console.log(this.books);
  }

  sendBook(book: any) {
    this.bookApi.receiveBookId(book);
  }

  ngOnInit() {
    this.getBooks();
    this.nav.show();
  }

}

import { FormsModule, ReactiveFormsModule, } from '@angular/forms';
import { NavbarComponent } from './../../shared/navbar/navbar.component';
import { NgbModule, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PerfilComponent } from './perfil/perfil.component';
import { BookSearchComponent } from './book-search/book-search.component';
import { BrowserModule } from '@angular/platform-browser';
import { BookListComponent } from './book-list/book-list.component';
import { RouterModule } from '@angular/router';

import { BookDetailsComponent } from './book-details/book-details.component';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {MatRadioModule} from '@angular/material/radio';
import {MatInputModule} from '@angular/material/input';
import { ClubComponent } from './clubs/club/club.component';
import { ClubInfoComponent } from './clubs/club-info/club-info.component';



@NgModule({
  declarations: [
    PerfilComponent,
    BookSearchComponent,
    BookListComponent,
    BookDetailsComponent,
    ClubComponent,
    ClubInfoComponent,
  ],
  imports: [
    CommonModule,
    NgbModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    DragDropModule,
    MatRadioModule,
    MatInputModule
  ],
  providers: []
})
export class HomeModule { }

import { BookDetailsComponent } from './components/home/book-details/book-details.component';
import { BookListComponent } from './components/home/book-list/book-list.component';
import { BookSearchComponent } from './components/home/book-search/book-search.component';
import { MainComponent } from './components/home/main/main.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PerfilComponent } from './components/home/perfil/perfil.component';
import { UsuarioComponent } from './components/loginPage/usuario/usuario.component';
import { RegisterComponent } from './components/loginPage/usuario/register/register.component';
import { LoginComponent } from './components/loginPage/usuario/login/login.component';
import { ClubComponent } from './components/home/clubs/club/club.component';
import { ClubInfoComponent } from './components/home/clubs/club-info/club-info.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: MainComponent
  },
  {
    path: 'home/profile',
    component: PerfilComponent
  },
  {
    path: 'home/search',
    component: BookSearchComponent
  },
  {
    path: 'home/list',
    component: BookListComponent
  },
  {
    path: 'home/book/details',
    component: BookDetailsComponent
  },
  // Login
  {
    path: 'signup', component: UsuarioComponent,
    children: [{ path: '', component: RegisterComponent }]
  },
  {
    path: 'home/club',
    component: ClubComponent 
  },
  {
    path: 'home/club/info/:id',
    component: ClubInfoComponent 
  },

  {
    path: 'login', component: UsuarioComponent,
    children: [{ path: '', component: LoginComponent }]
  },
  // { path: '', redirectTo: '/login', pathMatch: 'full' },

  // { path: 'home', component: MainComponent, canActivate: [AuthGuardService] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

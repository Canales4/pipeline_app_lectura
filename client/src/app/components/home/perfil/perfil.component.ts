import { Component, TemplateRef, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { AuthenticationService, UserDetails } from 'src/app/services/authentication.service';
import { PerfilService } from '../../../services/perfil.service';
import { NavbarService } from 'src/app/services/navbar.service';
import { Profile } from '../../../models/Profile';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})

export class PerfilComponent implements OnInit {

  // DEFINIR
  modalRef: BsModalRef;
  details: UserDetails;
  visi = 'Elegir una visibilidad';
  sex = 'Elegir sexo';

  profile: Profile = {
    codUsuario: 0,
    nomUsuario: '',
    apellido1: '',
    apellido2: '',
    contrasena: '',
    email: '',
    visibilidad: '',
    bio: '',
    sexo: '',
    alias: '',
    icono: ''
  };

  constructor(private modalService: BsModalService, private router: Router, private activatedRoute: ActivatedRoute,
              public auth: AuthenticationService, private perfilService: PerfilService, public nav: NavbarService) {

  }

  ngOnInit() {
    // VER LA NAVBAR SIEMPRE
    this.nav.show();

    // TRAER LOS DATOS DE USERDETAILS
    this.auth.profile().subscribe(
      user => {
        this.details = user;
      },
      err => {
        console.error(err);
      }
    )

  }

  // PARA EL FUNCIONAMIENTO DE LOS MODALES, ABRIR Y CERRAR

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  closeModal(template: TemplateRef<any>) {
    this.modalRef.hide();
  }

  // VER, ELIMINAR Y MODIFICAR PERFIL

  getProfile(codUsuario: string) {
    this.perfilService.getProfile(codUsuario).subscribe(
      res => {
        this.profile = res;
      },
      err => console.log(err)
    );
  }

  deleteProfile(codUsuario: string) {
    this.perfilService.deleteProfile(codUsuario).subscribe(
      res => {
        console.log(res);
        console.log('perfil eliminado');
      },
      err => console.log(err)
    );
  }

  updateProfile(codUsuario: number, nomUsuario: string, apellido1: string, apellido2: string, visibilidad: string, email: string,
                bio: string, sexo: string, alias: string) {

    console.log(codUsuario);
    console.log(nomUsuario);

    // SI LOS DATOS SE MANDAN VACÍOS, SE QUEDAN LOS QUE YA ESTABAN

    if (nomUsuario === ''){
      nomUsuario = this.details.nomUsuario;
    }

    if (apellido1 === ''){
      apellido1 = this.details.apellido1;
    }

    if (apellido2 === ''){
      apellido2 = this.details.apellido2;
    }

    if (visibilidad === ''){
      visibilidad = this.details.visibilidad;
    }

    if (email === ''){
      email = this.details.email;
    }

    if (bio === ''){
      bio = this.details.bio;
    }

    if (sexo === ''){
      sexo = this.details.sexo;
    }

    if (alias === ''){
      alias = this.details.alias;
    }

    // MANDA LOS DATOS PARA MODIFICAR

    this.perfilService.updateProfile(codUsuario, nomUsuario, apellido1, apellido2, visibilidad, email, bio, sexo, alias).subscribe(
      res => {
        console.log(res);
        this.router.navigate(['/home/profile']);
      },
      err => console.error(err)
    )

  }

  // ELEGIR VISIBILIDAD

  // VISI: COMO SE VE, VISIBILIDAD: COMO ESTÁ EN LA BBDD
  select(type: string): void {
    if (type === 'Público') {
      this.profile.visibilidad = 'Público';
      this.visi = 'Visible para todos';
    }
    if (type === 'Solo Club') {
      this.profile.visibilidad = 'Solo Club';
      this.visi = 'Solo para mis clubs';
    }
    if (type === 'Privado') {
      this.profile.visibilidad = 'Privado';
      this.visi = 'Solo para mí';
    }
  }

  // ELEGIR SEXO

  select2(type: string): void {
    if (type === 'Mujer') {
      this.profile.sexo = 'Mujer';
      this.sex = 'Mujer';
    }
    if (type === 'Hombre') {
      this.profile.sexo = 'Hombre';
      this.sex = 'Hombre';
    }
    if (type === 'Otro') {
      this.profile.sexo = 'Otro';
      this.sex = 'Otro';
    }
  }


}

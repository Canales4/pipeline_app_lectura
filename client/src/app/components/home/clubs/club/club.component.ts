import { Component, OnInit, TemplateRef } from '@angular/core';
import { ClubsService, Club } from '../../../../services/clubs.service';
import { NavbarService } from '../../../../services/navbar.service';
import { PerfilService } from 'src/app/services/perfil.service';
import { AuthenticationService, UserDetails } from 'src/app/services/authentication.service';
import { BsModalService, BsModalRef } from "ngx-bootstrap/modal";

@Component({
  selector: 'app-club',
  templateUrl: './club.component.html',
  styleUrls: ['./club.component.css']
})
export class ClubComponent implements OnInit {

  details: UserDetails;
  modalRef: BsModalRef;
  //array para almacenar los clubs que nos trae la consulta
  clubs: any = [];

  // Creamos un objeto Club con todos sus elementos
  club: Club = {
    presidente: 0,
    nomClub: '',
    desClub: '',
    // create_at: new Date(),
  };

  constructor(private modalService: BsModalService, private clubsService: ClubsService, private nav: NavbarService, public auth: AuthenticationService, private perfilService: PerfilService) { }

  ngOnInit() {
    //Activar el mostrar los clubs que existen
    this.getClubs();
    //Muestra barra de navegacion
    this.nav.show();

    // PARA COGER LOS ELEMENTOS DEL USUARIO
    this.auth.profile().subscribe(
      user => {
        this.details = user;
      },
      err => {
        console.error(err);
      }
    )
  }

  //PARA COGER LOS ELEMENTOS DE UN CLUB
  getClubs() {
    this.clubsService.getClubs().subscribe(
      res => {
        console.log(res);
        this.clubs = res;
      },
      err => console.error(err)
    );
  }

  // Para crear un club
  saveNewClub(presidente: number, nomClub: string, desClub: string) {
    presidente = this.details.codUsuario;
    nomClub = this.club.nomClub;
    desClub = this.club.desClub;
    this.clubsService.saveClub(presidente, nomClub, desClub).subscribe(
      res => {
        console.log(res);
        this.getClubs(); //recarga el club 
      },
      err => console.error(err)
    )
  }

  // PARA EL FUNCIONAMIENTO DE LOS MODALES, ABRIR Y CERRAR
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }
  closeModal(template: TemplateRef<any>) {
    this.modalRef.hide();
  }
}




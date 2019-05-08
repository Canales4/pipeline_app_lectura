import { Component, OnInit, TemplateRef } from '@angular/core';
import { ClubsService, Club } from 'src/app/services/clubs.service';
import { NavbarService } from 'src/app/services/navbar.service';
import { AuthenticationService, UserDetails } from 'src/app/services/authentication.service';
import { PerfilService } from 'src/app/services/perfil.service';
import { BsModalService, BsModalRef } from "ngx-bootstrap/modal";
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-club-info',
  templateUrl: './club-info.component.html',
  styleUrls: ['./club-info.component.css']
})
export class ClubInfoComponent implements OnInit {
  details: UserDetails;
  modalRef: BsModalRef;

  clubs: any = [];

  constructor(private activedRoute: ActivatedRoute, private modalService: BsModalService, private clubsService: ClubsService, private nav: NavbarService, public auth: AuthenticationService, private perfilService: PerfilService) { }

  ngOnInit() {
    //para mostrar la barra de navegacion
    this.nav.show();
    //para coger los elementos del club
    //this.activedRoute.snapshot.params; para coger los parametros que nos trae la ruta activa
    const params = this.activedRoute.snapshot.params;
    //si la ruta activa nos da algun parametro que contenga id usamos el metodo getclub
    if (params.id) {
      this.clubsService.getClub(params.id)
        .subscribe(
          res => {
            this.clubs = res;
          },
          err => console.error(err)
        )
    }

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

  //BORRAR UN CLUB
  deleteClub(codClub: string) {
    this.clubsService.deleteClub(codClub).subscribe(
      res => {
        console.log(res);
      },
      err => {
        console.error(err)
      }
    )
    console.log(codClub)
  }

   //ACTUALIZAR UN CLUB
   updateClub() {
     this.clubsService.updateClub(this.clubs.codClub,this.clubs,)
        console.log("este club mola" +this.clubs);
  }

  // PARA EL FUNCIONAMIENTO DE LOS MODALES, ABRIR Y CERRAR
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }
  closeModal(template: TemplateRef<any>) {
    this.modalRef.hide();
  }

}

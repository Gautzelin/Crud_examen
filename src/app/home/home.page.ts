import { ChangeDetectorRef, Component } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { DataService, Juego } from '../services/data.service';
import { ModalPage } from '../modal/modal.page';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})//dd
export class HomePage {
  notes: Juego[] = [];

  constructor(
    private dataService: DataService,
    private cd: ChangeDetectorRef,
    private alertCtrl: AlertController,
    private modalCtrl: ModalController,
    private router: Router
  ) {
    this.dataService.getNotes().subscribe(res => {
      this.notes = res;
      this.cd.detectChanges();
    });
  }

  

  async addNote() {
    const alert = await this.alertCtrl.create({
      header: 'Registrar',
      inputs: [
        {
          name: 'nombre',
          placeholder: 'Nombre',
          type: 'text'
        },
        {
          name: 'Caracteristicas',
          placeholder: 'Caracteristicas',
          type: 'text'
        },
        {
          name: 'Modo_Historia',
          placeholder: 'Modo_Historia',
          type: 'text'
        },
        {
          name: 'Modo_Cooperativo',
          placeholder: 'Modo_Cooperativo',
          type: 'text'
        },
        {
          name: 'Limite_de_edad',
          placeholder: 'Limite_de_edad',
          type: 'text'
        },
        {
          name: 'Tipo_de_juego',
          placeholder: 'Tipo_de_juego',
          type: 'text'
        },
  
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        }, {
          text: 'Agregar',
          handler: res => {
            const NombreJuego = String(res.NombreJuego);
            const Caracteristicas = String(res.Caracteristicas);
            const Modo_Historia = String(res.Modo_Historia);
            const Modo_Cooperativo = String(res.Modo_Cooperativo);
            const Limite_de_edad = String(res.Limite_de_edad);
            const Tipo_de_juego = String(res.Tipo_de_juego);
            
          
            this.dataService.addNote({
              nombre: res.NombreJuego,
              Caracteristicas: Caracteristicas,
              Modo_Historia: Modo_Historia,
              Modo_Cooperativo: Modo_Cooperativo,
              Limite_de_edad: Limite_de_edad,
              Tipo_de_juego: Tipo_de_juego
            });
          }
        }
      ]
    });

    await alert.present();
  }

  async openNote(note: Juego) {
    
    const modal = await this.modalCtrl.create({
      component: ModalPage,
      componentProps: { id: note.id },
      breakpoints: [0, 0.5, 0.8],
      initialBreakpoint: 0.9
    });

    await modal.present();
  }

  async logout() {
    // Aquí puedes realizar las acciones necesarias para cerrar la sesión, como limpiar el almacenamiento local, eliminar tokens, etc.

    // Después de cerrar la sesión, redirige al usuario a otra página, por ejemplo, la página de inicio de sesión.
    this.router.navigate(['/login']);
    
  }
  
}
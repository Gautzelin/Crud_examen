import { Component, Input, OnInit } from '@angular/core';
import { Juego } from '../services/data.service'; // Importa la clase Note
import { DataService } from '../services/data.service'; // Importa el servicio DataService

import { ModalController, ToastController } from '@ionic/angular';
//dd
@Component({
  selector: 'app-modal',
  templateUrl: './modal.page.html',
  styleUrls: ['./modal.page.scss'],
})
export class ModalPage implements OnInit {
  @Input() id?: string;
  note: Juego = {} as Juego;

  constructor(
    private dataService: DataService,
    private modalCtrl: ModalController,
    private toastCtrl: ToastController
  ) {}

  ngOnInit() {
    if (this.id !== undefined) {
      this.dataService.getNoteById(this.id).subscribe((res) => {
        this.note = res;
      });
    }
  }

  async deleteNote() {
    await this.dataService.deleteNote(this.note);
    this.modalCtrl.dismiss();
  }

  async updateNote() {
    const NombreJuego = this.note.nombre;
    const Caracteristicas = this.note.Caracteristicas;
    const Modo_Historia = this.note.Modo_Historia;
    const Modo_Cooperativo = this.note.Modo_Cooperativo;
    const Limite_de_edad = this.note.Limite_de_edad;
    const Tipo_de_juego = this.note.Tipo_de_juego;
    await this.dataService.updateNote(this.note);

    const toast = await this.toastCtrl.create({
      message: 'Nota Actualizada!.',
      duration: 2000,
    });
    toast.present();
  }
}

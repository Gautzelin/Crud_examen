import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData, doc, docData, addDoc, deleteDoc, updateDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

export interface Juego {
  id?: string;
  nombre: string;
  Caracteristicas: string;
  Modo_Historia: string;
  Modo_Cooperativo: string;
  Limite_de_edad: string;
  Tipo_de_juego: string;
}

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private firestore: Firestore) { }

  getNotes(): Observable<Juego[]> {
    const notesRef = collection(this.firestore, 'notes');
    return collectionData(notesRef, { idField: 'id'}) as Observable<Juego[]>;
  }

  getNoteById(id: string): Observable<Juego> {
    const noteDocRef = doc(this.firestore, `notes/${id}`);
    return docData(noteDocRef, { idField: 'id' }) as Observable<Juego>;
  }

  addNote(note: Juego) {
    const notesRef = collection(this.firestore, 'notes');
    return addDoc(notesRef, note);
  }

  deleteNote(note: Juego) {
    const noteDocRef = doc(this.firestore, `notes/${note.id}`);
    return deleteDoc(noteDocRef);
  }

  updateNote(note: Juego) {
    const noteDocRef = doc(this.firestore, `notes/${note.id}`);
    return updateDoc(noteDocRef, { NombreJuego: note.nombre, Caracteristicas: note.Caracteristicas, Modo_Historia: note.Modo_Historia, Modo_Cooperativo: note.Modo_Cooperativo, 
      Limite_de_edad: note.Limite_de_edad, Tipo_de_juego:note.Tipo_de_juego });
  }
  
}

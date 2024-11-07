import { Component } from '@angular/core';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';

@Component({
  selector: 'app-perfil-empleado',
  templateUrl: './perfil-empleado.page.html',
  styleUrls: ['./perfil-empleado.page.scss'],
})
export class PerfilEmpleadoPage {
  profileImage: string | null = null;

  constructor() {}

  async takeProfilePhoto() {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.DataUrl,
      source: CameraSource.Camera
    });

    this.profileImage = image.dataUrl ?? null;
  }
}

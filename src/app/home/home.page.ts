import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { AnimationController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements AfterViewInit {
  @ViewChild('welcomeMessage', { read: ElementRef, static: true }) welcomeMessage!: ElementRef;
  username: string = 'Usuario'; // Valor por defecto

  constructor(
    private animationCtrl: AnimationController,
    private router: Router,
    private activeroute: ActivatedRoute,
    private storage: Storage
  ) {}

  async ngOnInit() {
    try {
      // Recuperar el username desde el Storage
      const savedUsername = await this.storage.get('username');
      if (savedUsername) {
        this.username = savedUsername;
      } else {
        // Si no está en el Storage, buscarlo en el estado de navegación
        const navigation = this.router.getCurrentNavigation();
        if (navigation && navigation.extras.state && navigation.extras.state['username']) {
          this.username = navigation.extras.state['username'];
        }
      }
    } catch (error) {
      console.error('Error recuperando el username:', error);
    }

    console.log('Username:', this.username);
  }

  ngAfterViewInit() {
    // Animación para el mensaje de bienvenida
    if (this.welcomeMessage) {
      const welcomeAnimation = this.animationCtrl
        .create()
        .addElement(this.welcomeMessage.nativeElement)
        .duration(1500)
        .easing('ease-out')
        .fromTo('transform', 'translateY(-50px)', 'translateY(0)')
        .fromTo('opacity', '0', '1');

      welcomeAnimation.play().catch((err) =>
        console.error('Error reproduciendo la animación:', err)
      );
    } else {
      console.warn('Elemento de bienvenida no encontrado.');
    }
  }
}

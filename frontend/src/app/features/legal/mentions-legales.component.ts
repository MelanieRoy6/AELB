import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-mentions-legales',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="container">
      <h1>Mentions Légales</h1>
      <section>
        <h2>Éditeur du site</h2>
        <p>AEL Brains (Amicale de l'École Laïque de Brains)</p>
        <p>7 rue Jules Verne, 44830 Brains</p>
        <p>Téléphone : 07 67 77 58 67</p>
      </section>
      <section>
        <h2>Hébergement</h2>
        <p>Ce site est hébergé par [Votre Hébergeur]</p>
      </section>
      <section>
        <h2>Propriété intellectuelle</h2>
        <p>L'ensemble de ce site relève de la législation française et internationale sur le droit d'auteur et la propriété intellectuelle.</p>
      </section>
    </div>
  `,
  styles: [`.container { padding: 40px; max-width: 800px; margin: auto; }`]
})
export class MentionsLegalesComponent {}

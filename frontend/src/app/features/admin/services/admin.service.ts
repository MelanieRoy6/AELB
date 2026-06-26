import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';
import { MembreEquipe, Media } from '../../../core/models';

const MOCK_ADHERENTS = [
  { id: 1,  nom: 'Aubert',   prenom: 'Lucas',    email: 'lucas.aubert@email.com',    telephone: '06 11 22 33 44', section: 'Robotique', dateNaissance: '2001-03-15', anneeAdhesion: 2022, cotisationPayee: true,  anneeCotisation: 2026, actif: true  },
  { id: 2,  nom: 'Beaumont', prenom: 'Chloé',    email: 'chloe.beaumont@email.com',  telephone: '06 22 33 44 55', section: 'IA',        dateNaissance: '2000-07-22', anneeAdhesion: 2023, cotisationPayee: false, anneeCotisation: 2025, actif: true  },
  { id: 3,  nom: 'Cadet',    prenom: 'Thomas',   email: 'thomas.cadet@email.com',    telephone: '',               section: 'Web',       dateNaissance: '1999-11-08', anneeAdhesion: 2021, cotisationPayee: true,  anneeCotisation: 2026, actif: true  },
  { id: 4,  nom: 'Dubois',   prenom: 'Emma',     email: 'emma.dubois@email.com',     telephone: '07 33 44 55 66', section: 'Robotique', dateNaissance: '2002-05-30', anneeAdhesion: 2024, cotisationPayee: true,  anneeCotisation: 2026, actif: true  },
  { id: 5,  nom: 'Ferrand',  prenom: 'Noah',     email: 'noah.ferrand@email.com',    telephone: '06 44 55 66 77', section: 'IA',        dateNaissance: '2001-09-12', anneeAdhesion: 2023, cotisationPayee: false, anneeCotisation: 2026, actif: false },
  { id: 6,  nom: 'Garcia',   prenom: 'Inès',     email: 'ines.garcia@email.com',     telephone: '07 55 66 77 88', section: 'Web',       dateNaissance: '2000-01-25', anneeAdhesion: 2022, cotisationPayee: true,  anneeCotisation: 2026, actif: true  },
  { id: 7,  nom: 'Hubert',   prenom: 'Mathieu',  email: 'mathieu.hubert@email.com',  telephone: '',               section: 'Réseaux',   dateNaissance: '1998-06-03', anneeAdhesion: 2020, cotisationPayee: true,  anneeCotisation: 2026, actif: true  },
  { id: 8,  nom: 'Imbert',   prenom: 'Léa',      email: 'lea.imbert@email.com',      telephone: '06 66 77 88 99', section: 'Robotique', dateNaissance: '2003-04-18', anneeAdhesion: 2024, cotisationPayee: false, anneeCotisation: 2025, actif: true  },
  { id: 9,  nom: 'Joubert',  prenom: 'Antoine',  email: 'antoine.joubert@email.com', telephone: '07 77 88 99 00', section: 'IA',        dateNaissance: '2001-12-07', anneeAdhesion: 2022, cotisationPayee: true,  anneeCotisation: 2026, actif: true  },
  { id: 10, nom: 'Klein',    prenom: 'Camille',  email: 'camille.klein@email.com',   telephone: '06 88 99 00 11', section: 'Web',       dateNaissance: '1999-08-14', anneeAdhesion: 2021, cotisationPayee: true,  anneeCotisation: 2026, actif: true  },
  { id: 11, nom: 'Laurent',  prenom: 'Romain',   email: 'romain.laurent@email.com',  telephone: '',               section: 'Réseaux',   dateNaissance: '2000-02-28', anneeAdhesion: 2023, cotisationPayee: false, anneeCotisation: 2026, actif: true  },
  { id: 12, nom: 'Martin',   prenom: 'Jade',     email: 'jade.martin@email.com',     telephone: '07 99 00 11 22', section: 'Robotique', dateNaissance: '2002-10-05', anneeAdhesion: 2024, cotisationPayee: true,  anneeCotisation: 2026, actif: true  },
  { id: 13, nom: 'Nguyen',   prenom: 'Paul',     email: 'paul.nguyen@email.com',     telephone: '06 00 11 22 33', section: 'IA',        dateNaissance: '2001-07-19', anneeAdhesion: 2022, cotisationPayee: false, anneeCotisation: 2025, actif: false },
  { id: 14, nom: 'Olivier',  prenom: 'Sarah',    email: 'sarah.olivier@email.com',   telephone: '07 11 22 33 44', section: 'Web',       dateNaissance: '1999-03-11', anneeAdhesion: 2021, cotisationPayee: true,  anneeCotisation: 2026, actif: true  },
  { id: 15, nom: 'Petit',    prenom: 'Hugo',     email: 'hugo.petit@email.com',      telephone: '06 22 33 44 55', section: 'Réseaux',   dateNaissance: '2000-11-20', anneeAdhesion: 2023, cotisationPayee: true,  anneeCotisation: 2026, actif: true  },
];

const MOCK_RESERVATIONS = [
  // ── 2026 ─────────────────────────────────────────────────────────
  { id: 101, nomDemandeur: 'Dupont Marie',                email: 'marie.dupont@email.com',         telephone: '06 11 22 33 44', dateDebut: '2026-01-10T09:00', dateFin: '2026-01-11T20:00', motif: 'Anniversaire 40 ans',            statut: 'CONFIRMEE' },
  { id: 102, nomDemandeur: 'Association Scoutisme Loire', email: 'contact@scoutisme-loire.fr',      telephone: '02 98 11 22 33', dateDebut: '2026-01-17T08:00', dateFin: '2026-01-18T18:00', motif: 'Camp préparatoire jeunes',       statut: 'CONFIRMEE' },
  { id: 103, nomDemandeur: 'Garcia Sofia',                email: 'sofia.garcia@gmail.com',          telephone: '07 22 33 44 55', dateDebut: '2026-02-07T14:00', dateFin: '2026-02-07T22:00', motif: 'Réunion de travail associatif',  statut: 'CONFIRMEE' },
  { id: 104, nomDemandeur: 'Club Rugby Brest',            email: 'rugby.brest@sport.fr',            telephone: '02 98 33 44 55', dateDebut: '2026-02-21T09:00', dateFin: '2026-02-22T17:00', motif: 'Tournoi jeunes – catégorie U14', statut: 'CONFIRMEE' },
  { id: 105, nomDemandeur: 'Bernard Jean-Luc',            email: 'jlbernard@entreprise.com',        telephone: '06 44 55 66 77', dateDebut: '2026-03-07T09:00', dateFin: '2026-03-08T18:00', motif: 'Séminaire interne entreprise',   statut: 'CONFIRMEE' },
  { id: 106, nomDemandeur: 'École Sainte-Marie',          email: 'direction@ecole-saintemarie.fr',  telephone: '02 98 55 66 77', dateDebut: '2026-03-21T14:00', dateFin: '2026-03-22T22:00', motif: 'Spectacle de fin de trimestre',  statut: 'CONFIRMEE' },
  { id: 107, nomDemandeur: 'Moreau Isabelle',             email: 'isabelle.moreau@gmail.com',       telephone: '06 66 77 88 99', dateDebut: '2026-04-04T15:00', dateFin: '2026-04-05T00:00', motif: 'Baby shower',                   statut: 'CONFIRMEE' },
  { id: 108, nomDemandeur: 'Comité des Fêtes Plouzané',   email: 'comite.fetes@plouzane.bzh',       telephone: '02 98 66 77 88', dateDebut: '2026-04-18T09:00', dateFin: '2026-04-19T20:00', motif: 'Réunion annuelle et fête',       statut: 'CONFIRMEE' },
  { id: 109, nomDemandeur: 'Thomas Kevin',                email: 'kevin.thomas@gmail.com',          telephone: '07 77 88 99 00', dateDebut: '2026-05-02T18:00', dateFin: '2026-05-03T02:00', motif: 'Soirée privée',                 statut: 'REFUSEE'   },
  { id: 110, nomDemandeur: 'Association Danse Fusion',    email: 'danse.fusion@gmail.com',          telephone: '06 88 99 00 11', dateDebut: '2026-05-23T10:00', dateFin: '2026-05-24T19:00', motif: 'Répétition chorégraphie gala',  statut: 'CONFIRMEE' },
  { id: 111, nomDemandeur: 'Bouchard Famille',            email: 'famille.bouchard@orange.fr',      telephone: '06 99 00 11 22', dateDebut: '2026-06-06T12:00', dateFin: '2026-06-07T22:00', motif: 'Réunion de famille',            statut: 'CONFIRMEE' },
  { id: 112, nomDemandeur: 'Centre Social Le Relais',     email: 'contact@lerelais-brest.fr',       telephone: '02 98 77 88 99', dateDebut: '2026-06-20T09:00', dateFin: '2026-06-21T17:00', motif: 'Atelier parents-enfants',       statut: 'CONFIRMEE' },
  { id: 113, nomDemandeur: 'Leblanc Pierre',              email: 'pierre.leblanc@hotmail.fr',       telephone: '07 00 11 22 33', dateDebut: '2026-07-04T10:00', dateFin: '2026-07-05T20:00', motif: 'Exposition photographique',     statut: 'CONFIRMEE' },
  { id: 114, nomDemandeur: 'Club Échecs Brest',           email: 'echecs.brest@club.fr',            telephone: '02 98 88 99 00', dateDebut: '2026-07-18T09:00', dateFin: '2026-07-19T18:00', motif: 'Tournoi régional juniors',      statut: 'CONFIRMEE' },
  { id: 115, nomDemandeur: 'Meunier Laure',               email: 'laure.meunier@gmail.com',         telephone: '06 11 33 55 77', dateDebut: '2026-08-01T17:00', dateFin: '2026-08-02T01:00', motif: 'Retraite surprise',             statut: 'EN_ATTENTE'},
  { id: 116, nomDemandeur: 'Association Handisport 29',   email: 'handisport29@asso.fr',            telephone: '02 98 12 34 56', dateDebut: '2026-08-22T09:00', dateFin: '2026-08-23T18:00', motif: 'Journée d\'intégration sport',  statut: 'CONFIRMEE' },
  { id: 117, nomDemandeur: 'Petit Hugo',                  email: 'hugo.petit@email.com',            telephone: '06 22 33 44 55', dateDebut: '2026-09-05T14:00', dateFin: '2026-09-06T23:00', motif: 'Répétition concert amateur',    statut: 'CONFIRMEE' },
  { id: 118, nomDemandeur: 'Tribu Kervenal',              email: 'tribu.kervenal@gmail.com',        telephone: '07 33 44 55 66', dateDebut: '2026-09-19T11:00', dateFin: '2026-09-20T21:00', motif: 'Fête de quartier annuelle',     statut: 'CONFIRMEE' },
  { id: 119, nomDemandeur: 'Conseil Municipal Plouzané',  email: 'mairie@plouzane.bzh',             telephone: '02 98 45 67 89', dateDebut: '2026-10-03T09:00', dateFin: '2026-10-04T17:00', motif: 'Assemblée plénière',           statut: 'REFUSEE'   },
  { id: 120, nomDemandeur: 'Club Photo Bretagne',         email: 'clubphoto.bzh@gmail.com',         telephone: '06 44 55 66 88', dateDebut: '2026-10-17T10:00', dateFin: '2026-10-18T19:00', motif: 'Exposition printanière',        statut: 'CONFIRMEE' },
  { id: 121, nomDemandeur: 'Fontaine Nathalie',           email: 'nathalie.fontaine@asso.org',      telephone: '06 55 66 77 99', dateDebut: '2026-11-07T09:00', dateFin: '2026-11-08T18:00', motif: 'Conférence bénévolat local',   statut: 'EN_ATTENTE'},
  { id: 122, nomDemandeur: 'Association Parents d\'Élèves', email: 'ape.plouzane@gmail.com',       telephone: '02 98 56 78 90', dateDebut: '2026-11-21T14:00', dateFin: '2026-11-22T20:00', motif: 'Réunion et marché de Noël',    statut: 'CONFIRMEE' },
  { id: 123, nomDemandeur: 'Jazz Club Brestois',          email: 'jazzclub.brest@music.fr',         telephone: '07 66 77 88 00', dateDebut: '2026-12-05T19:00', dateFin: '2026-12-06T02:00', motif: 'Bal de fin d\'année',          statut: 'CONFIRMEE' },
  { id: 124, nomDemandeur: 'Girard Thomas',               email: 'thomas.girard@gmail.com',         telephone: '06 77 88 99 11', dateDebut: '2026-12-19T18:00', dateFin: '2026-12-20T03:00', motif: 'Réveillon associatif',         statut: 'CONFIRMEE' },
  { id: 125, nomDemandeur: 'Association Solidarité 29',   email: 'solidarite29@gmail.com',          telephone: '02 98 67 89 01', dateDebut: '2026-12-26T11:00', dateFin: '2026-12-27T20:00', motif: 'Repas de Noël solidaire',      statut: 'CONFIRMEE' },
  // ── 2027 ─────────────────────────────────────────────────────────
  { id: 126, nomDemandeur: 'Chevalier Emma',              email: 'emma.chevalier@gmail.com',        telephone: '06 88 99 00 22', dateDebut: '2027-01-09T10:00', dateFin: '2027-01-10T19:00', motif: 'Défi sportif hivernal',         statut: 'CONFIRMEE' },
  { id: 127, nomDemandeur: 'Collectif Artistique BZH',    email: 'collectif.artistique@bzh.fr',     telephone: '07 99 00 11 33', dateDebut: '2027-01-23T10:00', dateFin: '2027-01-24T20:00', motif: 'Exposition collective',        statut: 'CONFIRMEE' },
  { id: 128, nomDemandeur: 'Marchand Sophie',             email: 'sophie.marchand@gmail.com',       telephone: '06 00 22 44 66', dateDebut: '2027-02-06T09:00', dateFin: '2027-02-07T18:00', motif: 'Atelier créatif',              statut: 'REFUSEE'   },
  { id: 129, nomDemandeur: 'Dupuis Bernard',              email: 'bernard.dupuis@pro.fr',           telephone: '06 11 33 55 88', dateDebut: '2027-02-20T14:00', dateFin: '2027-02-21T22:00', motif: 'Conférence citoyenne',         statut: 'CONFIRMEE' },
  { id: 130, nomDemandeur: 'Loisirs Nature Plouzané',     email: 'loisirs.nature@plouzane.bzh',     telephone: '02 98 78 90 12', dateDebut: '2027-03-06T09:00', dateFin: '2027-03-07T18:00', motif: 'Journée nature et randonnée',  statut: 'CONFIRMEE' },
  { id: 131, nomDemandeur: 'Laurent Romain',              email: 'romain.laurent@email.com',        telephone: '07 22 44 66 88', dateDebut: '2027-03-20T15:00', dateFin: '2027-03-21T23:00', motif: 'Soirée jeux de société',       statut: 'EN_ATTENTE'},
  { id: 132, nomDemandeur: 'Association Nature et Vie',   email: 'nature.et.vie@asso.fr',           telephone: '02 98 89 01 23', dateDebut: '2027-04-03T09:00', dateFin: '2027-04-04T18:00', motif: 'Conférence écologie locale',   statut: 'EN_ATTENTE'},
  // ── 2028 ─────────────────────────────────────────────────────────
  { id: 133, nomDemandeur: 'Renaud Florian',              email: 'florian.renaud@gmail.com',        telephone: '06 33 55 77 99', dateDebut: '2028-01-01T21:00', dateFin: '2028-01-02T04:00', motif: 'Soirée du Nouvel An',          statut: 'CONFIRMEE' },
  { id: 134, nomDemandeur: 'Club Théâtre Amateur',        email: 'theatre.amateur@brest.fr',        telephone: '07 44 66 88 00', dateDebut: '2028-01-08T14:00', dateFin: '2028-01-09T22:00', motif: 'Répétition générale',          statut: 'EN_ATTENTE'},
];

@Injectable({ providedIn: 'root' })
export class AdminService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  // Réservations
  getAdminReservations(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/admin/reservations`).pipe(
      map(data => data?.length ? data : MOCK_RESERVATIONS),
      catchError(() => of(MOCK_RESERVATIONS))
    );
  }

  updateReservationStatut(id: number, statut: string, commentaire?: string): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/admin/reservations/${id}/statut`, { statut, commentaire });
  }

  createAdminReservation(reservation: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/admin/reservations`, reservation);
  }

  // Adhérents
  getAdherents(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/admin/adherents`).pipe(
      map(data => data?.length ? data : MOCK_ADHERENTS),
      catchError(() => of(MOCK_ADHERENTS))
    );
  }

  createAdherent(adherent: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/admin/adherents`, adherent);
  }

  updateAdherent(id: number, adherent: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/admin/adherents/${id}`, adherent);
  }

  deleteAdherent(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/admin/adherents/${id}`);
  }

  getAdherentEmails(): Observable<string[]> {
    return this.http.get<string[]>(`${this.apiUrl}/admin/adherents/emails`).pipe(
      catchError(() => of([]))
    );
  }

  importAdherentsExcel(file: File): Observable<any> {
    const fd = new FormData();
    fd.append('file', file);
    return this.http.post<any>(`${this.apiUrl}/admin/adherents/import`, fd);
  }

  exportAdherentsExcel(): Observable<Blob> {
    return this.http.get(`${this.apiUrl}/admin/adherents/export/excel`, { responseType: 'blob' });
  }

  sendEmailGroupe(sujet: string, corps: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/admin/adherents/email-groupe`, { sujet, corps });
  }

  // Médias
  getMedias(): Observable<Media[]> {
    return this.http.get<Media[]>(`${this.apiUrl}/medias`).pipe(
      catchError(() => of([]))
    );
  }

  uploadMedia(file: File, categorie: string, legende?: string): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('categorie', categorie);
    if (legende) formData.append('legende', legende);
    return this.http.post<any>(`${this.apiUrl}/admin/medias/upload`, formData);
  }

  deleteMedia(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/admin/medias/${id}`);
  }

  // Équipe (admin)
  getAdminEquipe(): Observable<MembreEquipe[]> {
    return this.http.get<MembreEquipe[]>(`${this.apiUrl}/admin/equipe`).pipe(
      catchError(() => of([]))
    );
  }

  createMembre(membre: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/admin/equipe`, membre);
  }

  updateMembre(id: number, membre: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/admin/equipe/${id}`, membre);
  }

  deleteMembre(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/admin/equipe/${id}`);
  }
}

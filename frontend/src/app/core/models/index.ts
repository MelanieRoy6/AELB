export interface Evenement {
  id?: number;
  titre: string;
  description: string;
  dateDebut: string;
  dateFin?: string;
  type: 'THEATRE' | 'CONCERT' | 'BROCANTE' | 'ACTU' | 'AUTRE';
  imageUrl?: string;
  publie: boolean;
}

export interface MembreEquipe {
  id?: number;
  nom: string;
  prenom: string;
  role: string;
  bio: string;
  photoUrl: string;
  ordre: number;
}

export interface Media {
  id?: number;
  url: string;
  legende?: string;
  categorie: 'GALERIE' | 'EQUIPE' | 'SALLE';
  dateUpload?: string;
}

export interface FacebookPost {
  id: string;
  message: string;
  fullPicture: string;
  createdTime: string;
  permalinkUrl: string;
}

CREATE TABLE evenements (
    id BIGSERIAL PRIMARY KEY,
    titre VARCHAR(255) NOT NULL,
    description TEXT,
    date_debut TIMESTAMP NOT NULL,
    date_fin TIMESTAMP,
    type VARCHAR(50) NOT NULL,
    image_url VARCHAR(255),
    publie BOOLEAN DEFAULT FALSE
);

CREATE TABLE reservations (
    id BIGSERIAL PRIMARY KEY,
    date_debut TIMESTAMP NOT NULL,
    date_fin TIMESTAMP NOT NULL,
    nom_demandeur VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    telephone VARCHAR(50),
    motif TEXT,
    statut VARCHAR(50) NOT NULL,
    date_creation TIMESTAMP NOT NULL,
    commentaire_admin TEXT
);

CREATE TABLE adherents (
    id BIGSERIAL PRIMARY KEY,
    nom VARCHAR(255) NOT NULL,
    prenom VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    telephone VARCHAR(50),
    section VARCHAR(255),
    date_adhesion DATE,
    actif BOOLEAN DEFAULT TRUE
);

CREATE TABLE medias (
    id BIGSERIAL PRIMARY KEY,
    url VARCHAR(255) NOT NULL,
    legende VARCHAR(255),
    categorie VARCHAR(50) NOT NULL,
    date_upload TIMESTAMP NOT NULL
);

CREATE TABLE membres_equipe (
    id BIGSERIAL PRIMARY KEY,
    nom VARCHAR(255) NOT NULL,
    prenom VARCHAR(255) NOT NULL,
    role VARCHAR(255),
    bio TEXT,
    photo_url VARCHAR(255),
    ordre_affichage INTEGER
);

CREATE TABLE utilisateurs (
    id BIGSERIAL PRIMARY KEY,
    username VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role VARCHAR(50) NOT NULL
);

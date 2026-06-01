INSERT INTO evenements (titre, description, date_debut, date_fin, type, publie) VALUES 
('Théâtre de Printemps', 'Une pièce de théâtre locale.', '2026-04-15 20:00:00', '2026-04-15 22:30:00', 'THEATRE', true),
('Concert d été', 'Musique en plein air.', '2026-07-10 19:00:00', '2026-07-10 23:00:00', 'CONCERT', true);

INSERT INTO membres_equipe (nom, prenom, role, bio, ordre_affichage) VALUES 
('Dupont', 'Jean', 'Président', 'Passionné d art et de culture.', 1),
('Martin', 'Alice', 'Secrétaire', 'Engagement associatif de longue date.', 2);

INSERT INTO utilisateurs (username, password_hash, role) VALUES 
('admin', '$2a$10$8.UnVuG9HHgffUDAlk8qfOuVGkqRzgVymGe07xd00DMxs.TVuHOnu', 'ADMIN'); -- password: admin

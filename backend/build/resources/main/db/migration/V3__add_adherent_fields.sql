ALTER TABLE adherents
    ADD COLUMN IF NOT EXISTS date_naissance     DATE,
    ADD COLUMN IF NOT EXISTS annee_adhesion     INTEGER,
    ADD COLUMN IF NOT EXISTS cotisation_payee   BOOLEAN DEFAULT FALSE,
    ADD COLUMN IF NOT EXISTS annee_cotisation   INTEGER;

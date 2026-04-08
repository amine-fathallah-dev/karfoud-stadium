-- Table des réservations
CREATE TABLE reservations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  date DATE NOT NULL,
  start_time TIME NOT NULL,
  end_time TIME NOT NULL,
  client_name TEXT NOT NULL,
  client_phone TEXT NOT NULL,
  note TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index pour les requêtes par date
CREATE INDEX idx_reservations_date ON reservations(date);

-- Row Level Security
ALTER TABLE reservations ENABLE ROW LEVEL SECURITY;

-- Lecture publique (affichage du planning)
CREATE POLICY "Public read" ON reservations
  FOR SELECT USING (true);

-- Écriture réservée aux admins authentifiés
CREATE POLICY "Admin insert" ON reservations
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Admin delete" ON reservations
  FOR DELETE USING (auth.role() = 'authenticated');

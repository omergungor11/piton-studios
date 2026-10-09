export interface Scene {
  id: string;
  label: string;
  hash: string;
}

/** Gezinti icin kucuk metadata; portfolyo/hizmet verisini istemciye tasimaz. */
export const SCENES: Scene[] = [
  { id: 'hero', label: 'Ana Sayfa', hash: 'hero' },
  { id: 'spark', label: 'Hemen Başla', hash: 'spark' },
  { id: 'work', label: 'Projeler', hash: 'projects' },
  { id: 'note', label: 'Hakkımızda', hash: 'note' },
  { id: 'services', label: 'Hizmetler', hash: 'services' },
  { id: 'contact', label: 'İletişim', hash: 'contact' },
];

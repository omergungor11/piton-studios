import { notFound } from 'next/navigation';

// Hicbir rotayla eslesmeyen yol dilin kendi not-found.tsx'ine duser
// (aksi halde Next kok 404'e gider ve sayfa hep Turkce gorunur).
export default function CatchAllNotFound() {
  notFound();
}

import {
  Archivo_Black, Audiowide, Bricolage_Grotesque, Chakra_Petch, Dela_Gothic_One,
  DM_Serif_Display, Exo_2, Fraunces, Gabarito, Geologica, Manrope, Montserrat,
  Orbitron, Outfit, Plus_Jakarta_Sans, Poppins, Rajdhani, Righteous, Sora, Syne,
  Unbounded, Urbanist,
} from 'next/font/google';
import localFont from 'next/font/local';
import { nippo } from '@/lib/fonts';

const qurova = localFont({
  src: '../../../lib/fonts/qurova-demo-bold.otf',
  weight: '700', style: 'normal', display: 'swap', preload: false,
});
const goticoAntiqua = localFont({
  src: './assets/gotico-antiqua-durandus.otf',
  weight: '400', style: 'normal', display: 'swap', preload: false,
});

const outfit = Outfit({ subsets: ['latin'], weight: '700', display: 'swap', preload: false });
const sora = Sora({ subsets: ['latin'], weight: '700', display: 'swap', preload: false });
const syne = Syne({ subsets: ['latin'], weight: '700', display: 'swap', preload: false });
const unbounded = Unbounded({ subsets: ['latin'], weight: '700', display: 'swap', preload: false });
const bricolage = Bricolage_Grotesque({ subsets: ['latin'], weight: '700', display: 'swap', preload: false });
const manrope = Manrope({ subsets: ['latin'], weight: '700', display: 'swap', preload: false });
const urbanist = Urbanist({ subsets: ['latin'], weight: '700', display: 'swap', preload: false });
const jakarta = Plus_Jakarta_Sans({ subsets: ['latin'], weight: '700', display: 'swap', preload: false });
const poppins = Poppins({ subsets: ['latin'], weight: '700', display: 'swap', preload: false });
const montserrat = Montserrat({ subsets: ['latin'], weight: '700', display: 'swap', preload: false });
const geologica = Geologica({ subsets: ['latin'], weight: '700', display: 'swap', preload: false });
const gabarito = Gabarito({ subsets: ['latin'], weight: '700', display: 'swap', preload: false });
const righteous = Righteous({ subsets: ['latin'], weight: '400', display: 'swap', preload: false });
const audiowide = Audiowide({ subsets: ['latin'], weight: '400', display: 'swap', preload: false });
const orbitron = Orbitron({ subsets: ['latin'], weight: '700', display: 'swap', preload: false });
const chakra = Chakra_Petch({ subsets: ['latin'], weight: '700', display: 'swap', preload: false });
const exo = Exo_2({ subsets: ['latin'], weight: '700', display: 'swap', preload: false });
const rajdhani = Rajdhani({ subsets: ['latin'], weight: '700', display: 'swap', preload: false });
const archivo = Archivo_Black({ subsets: ['latin'], weight: '400', display: 'swap', preload: false });
const dela = Dela_Gothic_One({ subsets: ['latin'], weight: '400', display: 'swap', preload: false });
const fraunces = Fraunces({ subsets: ['latin'], weight: '700', display: 'swap', preload: false });
const dmSerif = DM_Serif_Display({ subsets: ['latin'], weight: '400', display: 'swap', preload: false });

export const FONT_CATEGORIES = [
  { id: 'all', name: 'Tümü' },
  { id: 'modern', name: 'Modern' },
  { id: 'character', name: 'Karakterli' },
  { id: 'tech', name: 'Teknolojik' },
  { id: 'serif', name: 'Serif' },
] as const;

export type FontCategory = (typeof FONT_CATEGORIES)[number]['id'];

export const FONT_OPTIONS = [
  { id: 'gotico-antiqua', name: 'Gotico Antiqua', description: 'Gotik detaylar, tarihi bir imza.', family: goticoAntiqua.style.fontFamily, weight: 400, category: 'serif', badge: 'Yeni' },
  { id: 'qurova', name: 'Qurova', description: 'Kalın, yumuşak ve karakterli.', family: qurova.style.fontFamily, weight: 700, category: 'character', badge: 'Kayıtlı' },
  { id: 'nippo', name: 'Nippo', description: 'Köşeli detaylar, teknik bir imza.', family: nippo.style.fontFamily, weight: 700, category: 'character', badge: 'Seçilen' },
  { id: 'outfit', name: 'Outfit', description: 'Yuvarlak, sade ve dengeli.', family: outfit.style.fontFamily, weight: 700, category: 'modern', badge: '' },
  { id: 'sora', name: 'Sora', description: 'Geometrik ve teknolojik.', family: sora.style.fontFamily, weight: 700, category: 'modern', badge: '' },
  { id: 'syne', name: 'Syne', description: 'Geniş ve tasarım odaklı.', family: syne.style.fontFamily, weight: 700, category: 'character', badge: '' },
  { id: 'unbounded', name: 'Unbounded', description: 'Güçlü ve fütüristik.', family: unbounded.style.fontFamily, weight: 700, category: 'tech', badge: '' },
  { id: 'space-grotesk', name: 'Space Grotesk', description: 'Karşılaştırmak için önceki font.', family: 'var(--font-sans)', weight: 700, category: 'modern', badge: 'Önceki' },
  { id: 'bricolage', name: 'Bricolage Grotesque', description: 'Sıcak, kıvrımlı ve kişilikli.', family: bricolage.style.fontFamily, weight: 700, category: 'character', badge: '' },
  { id: 'manrope', name: 'Manrope', description: 'Net çizgiler, sade bir duruş.', family: manrope.style.fontFamily, weight: 700, category: 'modern', badge: '' },
  { id: 'urbanist', name: 'Urbanist', description: 'İnce detaylar, geometrik denge.', family: urbanist.style.fontFamily, weight: 700, category: 'modern', badge: '' },
  { id: 'jakarta', name: 'Plus Jakarta Sans', description: 'Dostça, temiz ve çağdaş.', family: jakarta.style.fontFamily, weight: 700, category: 'modern', badge: '' },
  { id: 'poppins', name: 'Poppins', description: 'Dairesel, yumuşak ve düzenli.', family: poppins.style.fontFamily, weight: 700, category: 'modern', badge: '' },
  { id: 'montserrat', name: 'Montserrat', description: 'Keskin, güçlü ve tanıdık.', family: montserrat.style.fontFamily, weight: 700, category: 'modern', badge: '' },
  { id: 'geologica', name: 'Geologica', description: 'Dengeli, sağlam ve okunaklı.', family: geologica.style.fontFamily, weight: 700, category: 'modern', badge: '' },
  { id: 'gabarito', name: 'Gabarito', description: 'Kompakt, canlı ve samimi.', family: gabarito.style.fontFamily, weight: 700, category: 'modern', badge: '' },
  { id: 'righteous', name: 'Righteous', description: 'Retro çizgiler, belirgin karakter.', family: righteous.style.fontFamily, weight: 400, category: 'character', badge: '' },
  { id: 'audiowide', name: 'Audiowide', description: 'Yuvarlatılmış, uzay çağı hissi.', family: audiowide.style.fontFamily, weight: 400, category: 'tech', badge: '' },
  { id: 'orbitron', name: 'Orbitron', description: 'Köşeli, dijital ve fütüristik.', family: orbitron.style.fontFamily, weight: 700, category: 'tech', badge: '' },
  { id: 'chakra', name: 'Chakra Petch', description: 'Teknik çizgiler, mekanik ritim.', family: chakra.style.fontFamily, weight: 700, category: 'tech', badge: '' },
  { id: 'exo', name: 'Exo 2', description: 'Teknolojik ama akıcı.', family: exo.style.fontFamily, weight: 700, category: 'tech', badge: '' },
  { id: 'rajdhani', name: 'Rajdhani', description: 'Dar, dikey ve dinamik.', family: rajdhani.style.fontFamily, weight: 700, category: 'tech', badge: '' },
  { id: 'archivo', name: 'Archivo Black', description: 'Tok, yoğun ve iddialı.', family: archivo.style.fontFamily, weight: 400, category: 'character', badge: '' },
  { id: 'dela', name: 'Dela Gothic One', description: 'Çok kalın, geniş ve çarpıcı.', family: dela.style.fontFamily, weight: 400, category: 'character', badge: '' },
  { id: 'fraunces', name: 'Fraunces', description: 'Organik detaylar, editoryal his.', family: fraunces.style.fontFamily, weight: 700, category: 'serif', badge: '' },
  { id: 'dm-serif', name: 'DM Serif Display', description: 'Zarif, kontrastlı ve klasik.', family: dmSerif.style.fontFamily, weight: 400, category: 'serif', badge: '' },
] as const;

export type FontId = (typeof FONT_OPTIONS)[number]['id'];

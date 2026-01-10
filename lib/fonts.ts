import { 
  Saira, Fira_Code, Inter, Roboto, Open_Sans, Poppins, Lato, 
  JetBrains_Mono, Source_Code_Pro, Nunito, Montserrat, Work_Sans,
  DM_Sans, Source_Sans_3, Rubik, Ubuntu, Fira_Sans, Manrope,
  Plus_Jakarta_Sans, Merriweather, Playfair_Display, Lora,
  Source_Serif_4, PT_Serif, Crimson_Text, Libre_Baskerville,
  Cormorant_Garamond, IBM_Plex_Mono, Roboto_Mono, Space_Mono,
  Space_Grotesk, Oswald, Raleway, Bebas_Neue, Dancing_Script,
  Great_Vibes, Pacifico, Outfit,
} from "next/font/google";
import { fontConfig } from "../customize/fonts/font-config";

// Configure fonts with Next.js optimization
export const saira = Saira({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-saira',
});

export const firaCode = Fira_Code({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-fira-code',
});

export const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const roboto = Roboto({
  weight: ['100', '300', '400', '500', '700', '900'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-roboto',
});

export const openSans = Open_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-open-sans',
});

export const poppins = Poppins({
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-poppins',
});

export const lato = Lato({
  weight: ['100', '300', '400', '700', '900'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-lato',
});

export const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-jetbrains-mono',
});

export const sourceCodePro = Source_Code_Pro({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-source-code-pro',
});

// Additional popular fonts
export const nunito = Nunito({
  weight: ['200', '300', '400', '500', '600', '700', '800', '900'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-nunito',
});

export const montserrat = Montserrat({
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-montserrat',
});

export const workSans = Work_Sans({
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-work-sans',
});

export const dmSans = DM_Sans({
  weight: ['400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-dm-sans',
});

export const sourceSansPro = Source_Sans_3({
  weight: ['200', '300', '400', '600', '700', '900'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-source-sans-pro',
});

export const rubik = Rubik({
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-rubik',
});

export const ubuntu = Ubuntu({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-ubuntu',
});

export const firaSans = Fira_Sans({
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-fira-sans',
});

export const manrope = Manrope({
  weight: ['200', '300', '400', '500', '600', '700', '800'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-manrope',
});

export const plusJakartaSans = Plus_Jakarta_Sans({
  weight: ['200', '300', '400', '500', '600', '700', '800'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-plus-jakarta-sans',
});

export const outfit = Outfit({
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-outfit',
});

// Serif fonts
export const merriweather = Merriweather({
  weight: ['300', '400', '700', '900'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-merriweather',
});

export const playfairDisplay = Playfair_Display({
  weight: ['400', '500', '600', '700', '800', '900'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-playfair-display',
});

export const lora = Lora({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-lora',
});

export const sourceSerifPro = Source_Serif_4({
  weight: ['200', '300', '400', '600', '700', '900'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-source-serif-pro',
});

export const ptSerif = PT_Serif({
  weight: ['400', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-pt-serif',
});

export const crimsonText = Crimson_Text({
  weight: ['400', '600', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-crimson-text',
});

export const libreBaskerville = Libre_Baskerville({
  weight: ['400', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-libre-baskerville',
});

export const cormorantGaramond = Cormorant_Garamond({
  weight: ['300', '400', '500', '600', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-cormorant-garamond',
});

// Additional monospace fonts
export const ibmPlexMono = IBM_Plex_Mono({
  weight: ['100', '200', '300', '400', '500', '600', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-ibm-plex-mono',
});

export const robotoMono = Roboto_Mono({
  weight: ['100', '200', '300', '400', '500', '600', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-roboto-mono',
});

export const spaceMono = Space_Mono({
  weight: ['400', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-space-mono',
});

// Display fonts
export const spaceGrotesk = Space_Grotesk({
  weight: ['300', '400', '500', '600', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-space-grotesk',
});

export const oswald = Oswald({
  weight: ['200', '300', '400', '500', '600', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-oswald',
});

export const raleway = Raleway({
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-raleway',
});

export const bebasNeue = Bebas_Neue({
  weight: ['400'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-bebas-neue',
});

// Handwriting fonts
export const dancingScript = Dancing_Script({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-dancing-script',
});

export const greatVibes = Great_Vibes({
  weight: ['400'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-great-vibes',
});

export const pacifico = Pacifico({
  weight: ['400'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-pacifico',
});

// Font mapping for dynamic selection
export const nextFontMap = {
  'Inter': inter,
  'Saira': saira,
  'Roboto': roboto,
  'Open Sans': openSans,
  'Poppins': poppins,
  'Lato': lato,
  'Nunito': nunito,
  'Montserrat': montserrat,
  'Work Sans': workSans,
  'DM Sans': dmSans,
  'Source Sans Pro': sourceSansPro,
  'Rubik': rubik,
  'Ubuntu': ubuntu,
  'Fira Sans': firaSans,
  'Manrope': manrope,
  'Plus Jakarta Sans': plusJakartaSans,
  'Outfit': outfit,
  'Merriweather': merriweather,
  'Playfair Display': playfairDisplay,
  'Lora': lora,
  'Source Serif Pro': sourceSerifPro,
  'PT Serif': ptSerif,
  'Crimson Text': crimsonText,
  'Libre Baskerville': libreBaskerville,
  'Cormorant Garamond': cormorantGaramond,
  'JetBrains Mono': jetbrainsMono,
  'Fira Code': firaCode,
  'Source Code Pro': sourceCodePro,
  'IBM Plex Mono': ibmPlexMono,
  'Roboto Mono': robotoMono,
  'Space Mono': spaceMono,
  'Space Grotesk': spaceGrotesk,
  'Oswald': oswald,
  'Raleway': raleway,
  'Bebas Neue': bebasNeue,
  'Dancing Script': dancingScript,
  'Great Vibes': greatVibes,
  'Pacifico': pacifico,
} as const;

// Get font classes for current configuration
export function getFontClasses() {
  const primaryFont = nextFontMap[fontConfig.primaryFont as keyof typeof nextFontMap];
  const headingFont = nextFontMap[fontConfig.headingFont as keyof typeof nextFontMap];
  const monoFont = nextFontMap[fontConfig.monoFont as keyof typeof nextFontMap];
  
  const classes = [];
  
  if (primaryFont) classes.push(primaryFont.variable);
  if (headingFont && headingFont !== primaryFont) classes.push(headingFont.variable);
  if (monoFont) classes.push(monoFont.variable);
  
  // Fallback to default fonts if not found in nextFontMap
  if (!primaryFont) classes.push(saira.variable);
  if (!monoFont) classes.push(firaCode.variable);
  
  return classes.join(' ');
}

// Get individual font variable
export function getFontVariable(fontName: string): string {
  const font = nextFontMap[fontName as keyof typeof nextFontMap];
  return font?.variable || '';
}

// Available fonts for easy switching
export const availableFonts = nextFontMap;

// Legacy font configuration for backward compatibility
export const fontConfigLegacy = {
  primary: saira,
  heading: saira,
  mono: firaCode,
}; 
import { NetflixIcon } from "@/components/ui/svgs/netflixIcon";
import { Spotify } from "@/components/ui/svgs/spotify";
import { Youtube } from "@/components/ui/svgs/youtube";
import { CursorDark } from "@/components/ui/svgs/cursorDark";
import { Figma } from "@/components/ui/svgs/figma";
import { Vercel } from "@/components/ui/svgs/vercel";
import { HelpCircle } from "lucide-react";

const logoMap: Record<string, React.FC<React.SVGProps<SVGSVGElement>>> = {
  netflix: NetflixIcon,
  spotify: Spotify,
  youtube: Youtube,
  cursor: CursorDark,
  vercel: Vercel,
  figma: Figma,
};

/**
 * Obtiene el componente del logo asociado a un nombre de suscripción.
 * Retorna un logo por defecto (HelpCircle) si no se encuentra el logo.
 * @param name El nombre de la suscripción (ej: "Netflix", "spotify").
 * @returns El componente React del logo.
 */
export const getLogoByName = (
  name: string
): React.FC<React.SVGProps<SVGSVGElement>> => {
  const formattedName = name.toLowerCase();
  const LogoComponent = logoMap[formattedName];
  return LogoComponent || HelpCircle;
};

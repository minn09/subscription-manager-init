import { NetflixIcon } from "@/components/ui/svgs/netflixIcon";
import { Spotify } from "@/components/ui/svgs/spotify";
import { Youtube } from "@/components/ui/svgs/youtube";
import { CursorDark } from "@/components/ui/svgs/cursorDark";
import { Figma } from "@/components/ui/svgs/figma";
import { Vercel } from "@/components/ui/svgs/vercel";

export const LOGOS: Record<string, React.ComponentType<{ className?: string }>> = {
  netflix: NetflixIcon,
  spotify: Spotify,
  youtube: Youtube,
  cursor: CursorDark,
  vercel: Vercel,
  figma: Figma,
};

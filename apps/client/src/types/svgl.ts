// `https://api.svgl.app/?search=${name}`
export type ThemeOptions = {
  dark: string;
  light: string;
};

export interface SVG {
  id: number;
  title: string;
  category: string | string[];
  route: string | ThemeOptions;
  url: string;
  wordmark?: string | ThemeOptions;
  brandUrl?: string;
}

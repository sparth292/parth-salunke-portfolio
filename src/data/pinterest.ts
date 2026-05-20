import pinsData from "./pinterest-pins.json";

export interface PinterestPin {
  id: string;
  url: string;
  width?: number;
  height?: number;
  aspect: "vertical" | "horizontal" | "square";
  title: string;
  pinUrl: string;
  featured?: boolean;
}

export interface PinterestBoard {
  boardUrl: string;
  boardTitle: string;
  username: string;
  pinterestBoardLink: string;
  fetchedAt: string;
  source?: string;
  totalOnPinterest?: number;
  pins: PinterestPin[];
}

export const pinterestBoard = pinsData as PinterestBoard;

/** First 3 vertical pins for landing preview (9:16) */
export function getFeaturedPins(pins: PinterestPin[]): PinterestPin[] {
  const vertical = pins.filter((p) => p.aspect === "vertical");
  const opium = pins.find((p) => p.id === "967359194985722547");
  const rest = vertical.filter((p) => p.id !== opium?.id);
  const featured: PinterestPin[] = [];
  if (opium) featured.push(opium);
  for (const p of rest) {
    if (featured.length >= 3) break;
    if (!featured.find((f) => f.id === p.id)) featured.push(p);
  }
  return featured.slice(0, 3);
}

import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";
import { ArtistEvent } from "./types";

export const favoritesAtom = atomWithStorage<
  (ArtistEvent & { artist_name: string })[]
>("favorites", []);

export const detailsAtom = atom<
  (ArtistEvent & { artist_name?: string }) | undefined
>(undefined);

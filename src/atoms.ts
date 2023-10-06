import { atomWithStorage } from "jotai/utils";
import { ArtistEvent } from "./types";

export const favoritesAtom = atomWithStorage<ArtistEvent[]>("favorites", []);

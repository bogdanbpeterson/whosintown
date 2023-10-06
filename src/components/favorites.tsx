"use client";

import { favoritesAtom } from "@/atoms";
import { useAtom } from "jotai";
import Event from "./event";

export default function Favorites() {
  const [favorites, setFavorites] = useAtom(favoritesAtom);

  const removeEvent = (eventId: string) => {
    setFavorites(favorites.filter((event) => event.id !== eventId));
  };

  return favorites.length ? (
    favorites.map((event) => (
      <div key={event.id}>
        <Event event={event} />
        <button
          onClick={() => {
            removeEvent(event.id);
          }}
        >
          unlike
        </button>
      </div>
    ))
  ) : (
    <p>no favorites yet</p>
  );
}

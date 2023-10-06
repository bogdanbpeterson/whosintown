"use client";

import { detailsAtom, favoritesAtom } from "@/atoms";
import { useAtom, useSetAtom } from "jotai";
import Event from "./event";

export default function Favorites() {
  const [favorites, setFavorites] = useAtom(favoritesAtom);
  const setDetails = useSetAtom(detailsAtom);

  const removeEvent = (eventId: string) => {
    setFavorites(favorites.filter((event) => event.id !== eventId));
  };

  return (
    <div className="flex h-full w-96 flex-col gap-3">
      <h3 className="text-3xl font-bold">Your events</h3>
      {favorites.length ? (
        favorites.map((event) => (
          <div
            className="cursor-pointer"
            key={event.id}
            onClick={() => {
              setDetails(event);
              window.scrollTo(0, 0);
            }}
          >
            <div className="bg-black px-2 pt-1 italic text-white">
              {event.artist_name}
            </div>
            <div className="flex items-start justify-between border-2 border-black p-2">
              <Event event={event} />
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  removeEvent(event.id);
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="h-6 w-6"
                >
                  <path d="M3.53 2.47a.75.75 0 00-1.06 1.06l18 18a.75.75 0 101.06-1.06l-18-18zM20.25 5.507v11.561L5.853 2.671c.15-.043.306-.075.467-.094a49.255 49.255 0 0111.36 0c1.497.174 2.57 1.46 2.57 2.93zM3.75 21V6.932l14.063 14.063L12 18.088l-7.165 3.583A.75.75 0 013.75 21z" />
                </svg>
              </button>
            </div>
          </div>
        ))
      ) : (
        <p>no favorites yet</p>
      )}
    </div>
  );
}

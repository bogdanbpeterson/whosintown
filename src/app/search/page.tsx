"use client";

import { favoritesAtom } from "@/atoms";
import Event from "@/components/event";
import { Artist, ArtistEvent } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { useAtom } from "jotai";
import Image from "next/image";

export default function Search({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const input = searchParams.q as string;

  const artistUrl = `https://rest.bandsintown.com/artists/${encodeURIComponent(
    input
  )}?app_id=123`;
  const artistEventsUrl = `https://rest.bandsintown.com/artists/${encodeURIComponent(
    input
  )}/events?app_id=123`;

  const {
    data: artist,
    isLoading: isArtistLoading,
    error: artistError,
  } = useQuery({
    queryKey: [input],
    queryFn: async () => {
      try {
        const response = await fetch(artistUrl);
        const result = (await response.json()) as Artist;
        return result;
      } catch (error) {
        return null;
      }
    },
  });

  const {
    data: events,
    isLoading: isEventsLoading,
    error: eventsError,
  } = useQuery({
    queryKey: [`${input}-events`],
    queryFn: async () => {
      try {
        const response = await fetch(artistEventsUrl);
        const result = (await response.json()) as ArtistEvent[];
        return result;
      } catch (error) {
        return null;
      }
    },
  });

  const [favorites, setFavorites] = useAtom(favoritesAtom);

  if (isArtistLoading || isEventsLoading) return "loading";

  if (artistError || eventsError) return <>{artistError || eventsError}</>;

  return (
    <>
      <form method="get" action="/search">
        <input
          className="text-black"
          type="text"
          name="q"
          placeholder="Search for artists"
          defaultValue={input}
        />
        <button type="submit">search</button>
      </form>
      <h2>{artist!.name}</h2>
      <Image
        src={artist!.image_url}
        width={200}
        height={200}
        alt={artist!.name}
      />
      <p>
        {artist!.upcoming_event_count === 0
          ? "No upcoming events"
          : `${artist?.upcoming_event_count} events`}
        {/* TODO: pluralize */}
      </p>
      {artist?.links
        ? artist.links.map((link) => (
            <a key={link.type} href={link.url}>
              {link.type}
            </a>
          ))
        : null}
      {events!.map((event) => (
        <div key={event.id} className="px-4 py-2">
          <Event event={event} />
          <button
            onClick={() => {
              setFavorites([...favorites, event]);
            }}
          >
            like
          </button>
        </div>
      ))}
    </>
  );
}

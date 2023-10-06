"use client";

import { detailsAtom, favoritesAtom } from "@/atoms";
import Event from "@/components/event";
import { Artist, ArtistEvent } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { useAtom } from "jotai";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Search({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const router = useRouter();

  const input = searchParams.q as string;

  if (!input) router.replace("/");

  const artistUrl = `https://rest.bandsintown.com/artists/${encodeURIComponent(
    input,
  )}?app_id=123`;
  const artistEventsUrl = `https://rest.bandsintown.com/artists/${encodeURIComponent(
    input,
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
        const result = (await response.json()) as Artist | { error: string };
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
        const result = (await response.json()) as
          | ArtistEvent[]
          | { errorMessage: string };
        return result;
      } catch (error) {
        return null;
      }
    },
  });

  const [favorites, setFavorites] = useAtom(favoritesAtom);
  const [details, setDetails] = useAtom(detailsAtom);

  return (
    <>
      <div className="flex w-1/3 flex-col gap-4">
        <form
          className="flex w-full"
          method="get"
          action="/search"
          autoComplete="off"
        >
          <input
            className="w-full border-2 border-black p-2 placeholder:text-black"
            type="text"
            name="q"
            placeholder="Search for artists"
            defaultValue={input}
            required
          />
          <button className="bg-black p-2 text-white" type="submit">
            search
          </button>
        </form>
        {(() => {
          if (isArtistLoading) return <p>loading</p>;

          if (artistError) return <p>{artistError.toString()}</p>;

          if (artist && "error" in artist) return <p>{artist.error}</p>;

          if (artist)
            return (
              <div className="flex flex-col gap-3">
                <div className="flex gap-5">
                  <Image
                    src={artist.image_url}
                    alt={artist.name}
                    width={128}
                    height={128}
                    priority
                  />
                  <h2 className="text-5xl font-bold">{artist.name}</h2>
                </div>
                {artist?.links ? (
                  <div className="mt-2 flex gap-2">
                    {artist.links
                      .filter((link) =>
                        [
                          "website",
                          "amazon",
                          "twitter",
                          "spotify",
                          "itunes",
                          "youtube",
                          "instagram",
                          "facebook",
                          "soundcloud",
                        ].includes(link.type),
                      )
                      .map((link) => {
                        return (
                          <a key={link.type} href={link.url}>
                            <Image
                              src={`/logo-${link.type}.svg`}
                              alt={link.type}
                              width={24}
                              height={24}
                            />
                          </a>
                        );
                      })}
                  </div>
                ) : null}
                {artist.upcoming_event_count === 0 ? (
                  <p className="p-1">No upcoming events</p>
                ) : null}
              </div>
            );

          return <p className="text-red uppercase italic">unknown error</p>;
        })()}

        {(() => {
          if (isEventsLoading) return <p>loading</p>;

          if (eventsError)
            return (
              <p className="text-red uppercase italic">
                {eventsError.toString()}
              </p>
            );

          if (events && "errorMessage" in events)
            return <p>{events.errorMessage}</p>;

          if (events)
            return (
              <div className="flex flex-wrap gap-2">
                {events.map((event) => (
                  <div
                    key={event.id}
                    className="flex w-96 cursor-pointer items-start justify-between border-2 border-black px-2 py-2"
                    onClick={() => {
                      setDetails(event);
                      window.scrollTo(0, 0);
                    }}
                  >
                    <Event event={event} />
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        if (
                          !favorites.find(
                            (favorite) => event.id === favorite.id,
                          )
                        ) {
                          setFavorites([
                            ...favorites,
                            { ...event, artist_name: (artist as Artist).name },
                          ]);
                        } else {
                          setFavorites(
                            favorites.filter(
                              (favorite) => event.id !== favorite.id,
                            ),
                          );
                        }
                      }}
                    >
                      {favorites.find(
                        (favorite) => event.id === favorite.id,
                      ) ? (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="h-6 w-6"
                        >
                          <path d="M3.53 2.47a.75.75 0 00-1.06 1.06l18 18a.75.75 0 101.06-1.06l-18-18zM20.25 5.507v11.561L5.853 2.671c.15-.043.306-.075.467-.094a49.255 49.255 0 0111.36 0c1.497.174 2.57 1.46 2.57 2.93zM3.75 21V6.932l14.063 14.063L12 18.088l-7.165 3.583A.75.75 0 013.75 21z" />
                        </svg>
                      ) : (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="h-6 w-6"
                        >
                          <path
                            fillRule="evenodd"
                            d="M6.32 2.577a49.255 49.255 0 0111.36 0c1.497.174 2.57 1.46 2.57 2.93V21a.75.75 0 01-1.085.67L12 18.089l-7.165 3.583A.75.75 0 013.75 21V5.507c0-1.47 1.073-2.756 2.57-2.93z"
                            clipRule="evenodd"
                          />
                        </svg>
                      )}
                    </button>
                  </div>
                ))}
              </div>
            );

          return <p className="text-red uppercase italic">unknown error</p>;
        })()}
      </div>
      <div className="sticky top-0 w-1/3">
        {details ? (
          <>
            {details.artist_name &&
            details.artist_name !== (artist as Artist).name ? (
              <p className="italic">{details.artist_name}</p>
            ) : null}
            <Event event={details} />
            {details.lineup ? (
              <p>
                Lineup:{" "}
                {details.lineup.map((artistInLine, idx) => (
                  <>
                    <a
                      className="underline"
                      key={artistInLine}
                      href={`/search?q=${artistInLine}`}
                    >
                      {artistInLine}
                    </a>
                    {idx !== details.lineup.length - 1 ? ", " : null}
                  </>
                ))}
              </p>
            ) : null}
            {details.offers.length ? (
              <a
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 block w-full bg-black p-2 text-center text-white"
                href={details.offers[0].url}
              >
                buy tickets
              </a>
            ) : null}
          </>
        ) : null}
      </div>
    </>
  );
}

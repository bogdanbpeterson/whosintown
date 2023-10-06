import { ArtistEvent } from "@/types";
import { normalizeDatetime } from "@/utils";

export default function Event({ event }: { event: ArtistEvent }) {
  return (
    <>
      <p>{normalizeDatetime(event.datetime)?.join(" ")}</p>
      <h3>{event.venue.name}</h3>
      <p>
        {event.venue.city}, {event.venue.region || event.venue.country}
      </p>
    </>
  );
}

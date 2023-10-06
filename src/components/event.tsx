import { ArtistEvent } from "@/types";
import { normalizeDatetime, pluralize } from "@/utils";

export default function Event({ event }: { event: ArtistEvent }) {
  const [month, day] = normalizeDatetime(event.datetime) ?? [];

  return (
    <div className="flex items-center gap-3">
      <div className="flex flex-col items-center bg-black p-2 pb-1 font-semibold uppercase text-white">
        <p className="text-sm">{month}</p>
        <p className="text-2xl">{day}</p>
      </div>
      <div>
        <h3 className="w-64 overflow-hidden text-ellipsis whitespace-nowrap text-xl font-bold">
          {event.venue.name}
        </h3>
        <p>
          {event.venue.city}, {event.venue.region || event.venue.country}
        </p>
        <p className="text-xs text-gray-700">
          {event.offers.length
            ? `${pluralize("offer", event.offers.length)} available`
            : "No tickets available"}
        </p>
      </div>
    </div>
  );
}

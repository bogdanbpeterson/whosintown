export type Artist = {
  id: string;
  name: string;
  image_url: string;
  upcoming_event_count: number;
  links?: {
    type:
      | "website"
      | "amazon"
      | "twitter"
      | "spotify"
      | "itunes"
      | "youtube"
      | "instagram"
      | "facebook";
    url: string;
  }[];
};

export type ArtistEvent = {
  id: string;
  datetime: string;
  title: string;
  description: string;
  venue: {
    location: string;
    name: string;
    street_address: string;
    city: string;
    region?: string;
    country: string;
  };
};

const monthNames = [
  "jan",
  "feb",
  "mar",
  "apr",
  "may",
  "jun",
  "jul",
  "aug",
  "sep",
  "oct",
  "nov",
  "dec",
];

export const normalizeDatetime = (datetime: string) => {
  const match = /(\d{4})-(\d{2})-(\d{2})T/.exec(datetime);

  if (!match) return null;

  const month = parseInt(match[2], 10) - 1;
  const day = parseInt(match[3], 10);

  return [monthNames[month], day];
};

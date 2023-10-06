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

export const pluralize = (word: string, count: number): string => {
  if (count === 1) {
    return `1 ${word}`;
  }

  if (
    word.endsWith("s") ||
    word.endsWith("sh") ||
    word.endsWith("ch") ||
    word.endsWith("x") ||
    word.endsWith("z")
  ) {
    return `${count} ${word}es`;
  }
  if (
    word.endsWith("y") &&
    !word.endsWith("ay") &&
    !word.endsWith("ey") &&
    !word.endsWith("oy") &&
    !word.endsWith("iy") &&
    !word.endsWith("uy")
  ) {
    return `${count} ${word.slice(0, -1)}ies`;
  }
  return `${count} ${word}s`;
};

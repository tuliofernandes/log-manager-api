export const parseDatetime = (dateStr: string, timeStr: string): Date => {
  const [day, monthAbbrev, year] = dateStr.split("-");
  const [hours, minutes, seconds] = timeStr.split(":");

  const monthAbbreviations: { [key: string]: number } = {
    Jan: 0,
    Feb: 1,
    Mar: 2,
    Apr: 3,
    May: 4,
    Jun: 5,
    Jul: 6,
    Aug: 7,
    Sep: 8,
    Oct: 9,
    Nov: 10,
    Dec: 11,
  };

  const month = monthAbbreviations[monthAbbrev];

  return new Date(
    parseInt(year),
    month,
    parseInt(day),
    parseInt(hours),
    parseInt(minutes),
    parseInt(seconds)
  );
};

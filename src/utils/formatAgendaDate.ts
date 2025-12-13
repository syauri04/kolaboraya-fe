export function formatAgendaDate(startDate: string, endDate?: string | null) {
  const start = new Date(startDate);
  const end = endDate ? new Date(endDate) : null;

  // ==== Fallback jika tanggal invalid ====
  const isStartValid = !isNaN(start.getTime());
  const isEndValid = end ? !isNaN(end.getTime()) : true;

  if (!isStartValid) {
    return {
      dayLabel: "Tanggal tidak valid",
      dateLabel: "-",
    };
  }

  // ==== Format nama hari ====
  const dayStart = new Intl.DateTimeFormat("id-ID", {
    weekday: "long",
  }).format(start);

  const dayEnd =
    end && isEndValid
      ? new Intl.DateTimeFormat("id-ID", { weekday: "long" }).format(end)
      : null;

  // ==== Format tanggal (2 digit) =====
  const startDay = String(start.getDate()).padStart(2, "0");
  const endDay =
    end && isEndValid ? String(end.getDate()).padStart(2, "0") : null;

  // ==== Format bulan + tahun ====
  const monthYear = new Intl.DateTimeFormat("id-ID", {
    month: "long",
    year: "numeric",
  }).format(start);

  // ==== Final Label ====
  const dayLabel = dayEnd ? `${dayStart} - ${dayEnd}` : dayStart;

  const dateLabel = dayEnd
    ? `${startDay}-${endDay} ${monthYear}`
    : `${startDay} ${monthYear}`;

  return {
    dayLabel,
    dateLabel,
  };
}

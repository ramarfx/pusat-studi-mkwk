export const deadlineFormat = (date: string) => {
	const rawDate = date;
	const [year, month, day] = rawDate.split('-').map(Number);

	// Buat tanggal jam 00:00 lokal
	return new Date(year, month - 1, day, 0, 0, 0);
};

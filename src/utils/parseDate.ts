export default (date: Date, sep: string = '/') => {
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear();

  return `${day}${sep}${month}${sep}${year}`;
};

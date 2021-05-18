export default function (text: string, abbrNumber: number = 2) {
  const splittedText = text.split(' ');

  return splittedText
    .map((w, i) => {
      if (i + 1 > abbrNumber) return '';

      return w[0];
    })
    .join('');
}

import parseDate from './parseDate';

describe('Parse date util', () => {
  it('should date in Date format returns "DD/MM/YYYY" formatted string', () => {
    const date = new Date('02-16-1998');

    const parsedDate = parseDate(date);

    expect(parsedDate).toEqual('16/02/1998');
  });
});

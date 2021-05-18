import parseTime from './parseTime';

describe('Test parseTime', () => {
  it('should parseTime with date as parameter return time on HH:MM:SS format', () => {
    const date = new Date('2020-12-29 05:05:05');

    const parsedTime = parseTime(date);

    expect(parsedTime).toEqual('05:05:05');

    const parsedTime2 = parseTime(date, false);

    expect(parsedTime2).toEqual('05:05');
  });
});

import abbrfy from './abbrfy';

describe('Abbreviate a text', () => {
  it('should abbrfy(text, abbrNumber) abbreviate a text with default amount of letters', () => {
    const text = 'Dalton Felipe Silva Varao';
    const abbreviatedText = abbrfy(text);
    expect(abbreviatedText).toEqual('DF');
  });

  it('should abbrfy(text, abbrNumber) abbreviate a text with defined amount of letters', () => {
    const text = 'Dalton Felipe Silva Varao';
    const abbreviatedText = abbrfy(text, 3);
    expect(abbreviatedText).toEqual('DFS');
  });
});

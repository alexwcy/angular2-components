import 'es6-shim';
import 'reflect-metadata';

import { LinkyPipe } from './linky-pipe';

describe('LinkyPipe', () => {
  let pipe: LinkyPipe;

  beforeAll(() => {
    pipe = new LinkyPipe();
  });

  it('should linkify the web urls', () => {
    var result = pipe.transform('google.com can search trough www.ebay.com and http://www.amazon.com');

    expect(result).toBe('<a href="http://google.com" target="_blank" rel="noopener noreferrer">google.com</a> can search trough <a href="http://www.ebay.com" target="_blank" rel="noopener noreferrer">ebay.com</a> and <a href="http://www.amazon.com" target="_blank" rel="noopener noreferrer">amazon.com</a>');
  });

  it('should correctly accept args', () => {
    var result = pipe.transform('google.com should be opened in the same window', { newWindow: false });

    expect(result).toBe('<a href="http://google.com">google.com</a> should be opened in the same window');
  });
});

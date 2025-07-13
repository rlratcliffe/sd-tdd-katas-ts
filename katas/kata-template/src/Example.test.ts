import { Example } from './Example';

describe('Example', () => {
  let example: Example;

  beforeEach(() => {
    example = new Example();
  });

  it('should greet with provided name', () => {
    const result = example.greet('World');
    expect(result).toBe('Hello, World!');
  });
});
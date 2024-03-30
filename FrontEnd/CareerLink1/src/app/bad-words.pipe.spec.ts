import { BadWordsPipe } from './bad-words.pipe';

describe('BadWordsPipe', () => {
  it('create an instance', () => {
    const pipe = new BadWordsPipe();
    expect(pipe).toBeTruthy();
  });
});

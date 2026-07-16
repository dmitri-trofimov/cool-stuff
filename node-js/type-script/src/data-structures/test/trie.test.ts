import { Trie } from '../trie';

describe('Trie', () => {
  let trie: Trie;

  beforeEach(() => {
    trie = new Trie();
  });

  it('should return false for an empty trie search', () => {
    expect(trie.search('hello')).toBe(false);
  });

  it('should insert and search for exact words', () => {
    trie.insert('hello');
    trie.insert('help');

    expect(trie.search('hello')).toBe(true);
    expect(trie.search('help')).toBe(true);
    expect(trie.search('hel')).toBe(false);
    expect(trie.search('helloo')).toBe(false);
  });

  it('should correctly identify existing prefixes', () => {
    trie.insert('hello');
    trie.insert('helium');

    expect(trie.startsWith('he')).toBe(true);
    expect(trie.startsWith('hel')).toBe(true);
    expect(trie.startsWith('hello')).toBe(true);
    expect(trie.startsWith('hey')).toBe(false);
    expect(trie.startsWith('helloo')).toBe(false);
  });

  it('should return the longest matching prefix with stored words', () => {
    trie.insert('flower');
    trie.insert('flow');
    trie.insert('flight');

    expect(trie.longestCommonPrefix('floral')).toBe('flo');
    expect(trie.longestCommonPrefix('flowing')).toBe('flow');
    expect(trie.longestCommonPrefix('dog')).toBe('');
  });

  it('should support inserting and searching for words that are prefixes of other words', () => {
    trie.insert('cat');
    trie.insert('catalog');

    expect(trie.search('cat')).toBe(true);
    expect(trie.search('catalog')).toBe(true);
    expect(trie.startsWith('cata')).toBe(true);
    expect(trie.longestCommonPrefix('caterpillar')).toBe('cat');
  });

  it('should return all words that start with a specified prefix', () => {
    trie.insert('app');
    trie.insert('apple');
    trie.insert('application');
    trie.insert('banana');
    trie.insert('band');

    expect(trie.findWordsWithPrefix('app')).toEqual(['app', 'apple', 'application']);
    expect(trie.findWordsWithPrefix('ban')).toEqual(['banana', 'band']);
    expect(trie.findWordsWithPrefix('bana')).toEqual(['banana']);
    expect(trie.findWordsWithPrefix('z')).toEqual([]);
    expect(trie.findWordsWithPrefix('')).toEqual(['app', 'apple', 'application', 'banana', 'band']);
  });

  it('should handle repeated insertions of the same word', () => {
    trie.insert('repeat');
    trie.insert('repeat');

    expect(trie.search('repeat')).toBe(true);
    expect(trie.startsWith('rep')).toBe(true);
    expect(trie.longestCommonPrefix('repetition')).toBe('repe');
  });

  it('should treat an empty string as a valid inserted word if inserted', () => {
    trie.insert('');

    expect(trie.search('')).toBe(true);
    expect(trie.startsWith('')).toBe(true);
    expect(trie.longestCommonPrefix('anything')).toBe('');
  });
});

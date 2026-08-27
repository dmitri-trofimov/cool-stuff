import { describe, it, beforeEach } from 'node:test';
import assert from 'node:assert/strict';

import { Trie } from '../trie.ts';

describe('Trie', () => {
  let trie: Trie;

  beforeEach(() => {
    trie = new Trie();
  });

  it('should return false for an empty trie search', () => {
    assert.strictEqual(trie.search('hello'), false);
  });

  it('should insert and search for exact words', () => {
    trie.insert('hello');
    trie.insert('help');

    assert.strictEqual(trie.search('hello'), true);
    assert.strictEqual(trie.search('help'), true);
    assert.strictEqual(trie.search('hel'), false);
    assert.strictEqual(trie.search('helloo'), false);
  });

  it('should correctly identify existing prefixes', () => {
    trie.insert('hello');
    trie.insert('helium');

    assert.strictEqual(trie.startsWith('he'), true);
    assert.strictEqual(trie.startsWith('hel'), true);
    assert.strictEqual(trie.startsWith('hello'), true);
    assert.strictEqual(trie.startsWith('hey'), false);
    assert.strictEqual(trie.startsWith('helloo'), false);
  });

  it('should return the longest matching prefix with stored words', () => {
    trie.insert('flower');
    trie.insert('flow');
    trie.insert('flight');

    assert.strictEqual(trie.longestCommonPrefix('floral'), 'flo');
    assert.strictEqual(trie.longestCommonPrefix('flowing'), 'flow');
    assert.strictEqual(trie.longestCommonPrefix('dog'), '');
  });

  it('should support inserting and searching for words that are prefixes of other words', () => {
    trie.insert('cat');
    trie.insert('catalog');

    assert.strictEqual(trie.search('cat'), true);
    assert.strictEqual(trie.search('catalog'), true);
    assert.strictEqual(trie.startsWith('cata'), true);
    assert.strictEqual(trie.longestCommonPrefix('caterpillar'), 'cat');
  });

  it('should return all words that start with a specified prefix', () => {
    trie.insert('app');
    trie.insert('apple');
    trie.insert('application');
    trie.insert('banana');
    trie.insert('band');

    assert.deepStrictEqual(trie.findWordsWithPrefix('app'), ['app', 'apple', 'application']);
    assert.deepStrictEqual(trie.findWordsWithPrefix('ban'), ['banana', 'band']);
    assert.deepStrictEqual(trie.findWordsWithPrefix('bana'), ['banana']);
    assert.deepStrictEqual(trie.findWordsWithPrefix('z'), []);
    assert.deepStrictEqual(trie.findWordsWithPrefix(''), ['app', 'apple', 'application', 'banana', 'band']);
  });

  it('should handle repeated insertions of the same word', () => {
    trie.insert('repeat');
    trie.insert('repeat');

    assert.strictEqual(trie.search('repeat'), true);
    assert.strictEqual(trie.startsWith('rep'), true);
    assert.strictEqual(trie.longestCommonPrefix('repetition'), 'repe');
  });

  it('should treat an empty string as a valid inserted word if inserted', () => {
    trie.insert('');

    assert.strictEqual(trie.search(''), true);
    assert.strictEqual(trie.startsWith(''), true);
    assert.strictEqual(trie.longestCommonPrefix('anything'), '');
  });
});

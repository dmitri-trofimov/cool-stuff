/**
 * Represents a single node within a Trie structure.
 */
export class TrieNode {
  /**
   * A map containing the child nodes, keyed by their character.
   */
  children: Map<string, TrieNode> = new Map();

  /**
   * Indicates whether the path from the root to this node forms a complete word.
   */
  isEndOfWord: boolean = false;
}

/**
 * A Trie (Prefix Tree) data structure for efficient string storage and retrieval.
 */
export class Trie {
  /**
   * The root node of the Trie. Represents an empty string.
   */
  private root: TrieNode = new TrieNode();

  /**
   * Inserts a word into the Trie.
   * Time complexity: O(m) where m is the word length.
   */
  insert(word: string): void {
    let current = this.root;

    for (const char of word) {
      if (!current.children.has(char)) {
        current.children.set(char, new TrieNode());
      }

      current = current.children.get(char)!;
    }

    current.isEndOfWord = true;
  }

  /**
   * Searches for an exact word match in the Trie.
   * Time complexity: O(m) where m is the word length.
   * @param word - The exact string to search for.
   * @returns True if the exact word exists, false otherwise.
   */
  search(word: string): boolean {
    let current = this.root;

    for (const char of word) {
      if (!current.children.has(char)) {
        return false;
      }

      current = current.children.get(char)!;
    }

    return current.isEndOfWord;
  }

  /**
   * Checks if there is any word in the Trie that starts with the given prefix.
   * Time complexity: O(p) where p is the prefix length.
   * @param prefix - The prefix to check for.
   * @returns True if a matching prefix exists, false otherwise.
   */
  startsWith(prefix: string): boolean {
    let current = this.root;

    for (const char of prefix) {
      if (!current.children.has(char)) {
        return false;
      }

      current = current.children.get(char)!;
    }

    return true;
  }

  /**
   * Finds the longest common prefix between a given input string and
   * any of the words currently stored in the Trie.
   * Time complexity: O(k) where k is the length of the matching prefix.
   * @param word - The input string to compare against the Trie.
   * @returns The longest matching prefix. Returns an empty string if no match exists.
   */
  longestCommonPrefix(word: string): string {
    let current = this.root;
    let prefix = '';

    for (const char of word) {
      if (!current.children.has(char)) {
        break;
      }

      prefix += char;
      current = current.children.get(char)!;
    }

    return prefix;
  }

  /**
   * Returns all words stored in the Trie that start with the given prefix.
   * Time complexity: O(p + n) where p is prefix length and n is number of matched words.
   * @param prefix - The prefix to search for.
   * @returns Ordered array of words with the specified prefix.
   */
  findWordsWithPrefix(prefix: string): string[] {
    let current = this.root;

    for (const char of prefix) {
      if (!current.children.has(char)) {
        return [];
      }

      current = current.children.get(char)!;
    }

    const results: string[] = [];

    const collect = (node: TrieNode, path: string) => {
      if (node.isEndOfWord) {
        results.push(path);
      }

      const nextChars = Array.from(node.children.keys()).sort();
      for (const nextChar of nextChars) {
        collect(node.children.get(nextChar)!, path + nextChar);
      }
    };

    collect(current, prefix);
    return results;
  }
}

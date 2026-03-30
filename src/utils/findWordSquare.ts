export async function findWordSquare(source: string, wordList: string[]) {
  if (!source || source === "") {
    throw new Error("Invalid input, no source");
  }

  const [wordLengthStr, letterSource] = source.split(" ");
  const wordLength = Number(wordLengthStr);

  if (
    !wordLength ||
    !letterSource ||
    wordLength * wordLength !== letterSource.length
  ) {
    throw new Error("Invalid input, wrong source format");
  }

  const buildCount = (str: string) => {
    const count: Record<string, number> = {};
    for (const c of str) {
      count[c] = (count[c] || 0) + 1;
    }
    return count;
  };

  const baseLetterCount = buildCount(letterSource);

  const canBuildWord = (word: string, count: Record<string, number>) => {
    const temp = { ...count };
    for (const char of word) {
      if (!temp[char]) return false;
      temp[char]--;
    }
    return true;
  };

  const subtractWord = (word: string, count: Record<string, number>) => {
    const newCount = { ...count };
    for (const c of word) {
      newCount[c]--;
    }
    return newCount;
  };

  const possibleWords = wordList.filter(
    (word) => word.length === wordLength && canBuildWord(word, baseLetterCount),
  );

  if (possibleWords.length === 0) {
    throw new Error("No words found with matching letters");
  }

  const prefixMap: Record<string, string[]> = {};

  for (const word of possibleWords) {
    for (let i = 0; i <= wordLength; i++) {
      const prefix = word.slice(0, i);
      if (!prefixMap[prefix]) {
        prefixMap[prefix] = [];
      }
      prefixMap[prefix].push(word);
    }
  }

  const backtrack = (
    square: string[],
    remaining: Record<string, number>,
    results: string[][],
  ): string[] | null => {
    const step = square.length;

    if (step === wordLength) {
      results.push([...square]);
      return;
    }

    const prefix = square.map((w) => w[step]).join("");

    const candidates = prefixMap[prefix] || [];

    for (const word of candidates) {
      if (square.includes(word)) continue;

      const newRemaining = { ...remaining };
      let valid = true;

      for (const c of word) {
        if (!newRemaining[c]) {
          valid = false;
          break;
        }
        newRemaining[c]--;
      }

      if (!valid) continue;

      square.push(word);

      const result = backtrack(square, newRemaining, results);
      if (result) return result;

      square.pop();
    }

    return null;
  };

  const successResults: string[][] = [];

  for (const word of possibleWords) {
    const remaining = subtractWord(word, baseLetterCount);

    backtrack([word], remaining, successResults);
  }

  if (successResults.length === 0) {
    throw new Error("No valid word square found");
  }

  return successResults.map((square) => square.join(" "));
}

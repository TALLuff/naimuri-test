import { findWordSquare } from "./utils/findWordSquare";
import { wordList } from "./wordList/basicFull";

const validCases = [
  ["4 eeeeddoonnnsssrv", "rose oven send ends"],
  ["4 aaccdeeeemmnnnoo", "moan once acme need"],
  ["5 aaaeeeefhhmoonssrrrrttttw", "feast earth armor stone threw"],
  ["5 aabbeeeeeeeehmosrrrruttvv", "heart ember above revue trees"],
  [
    "7 aaaaaaaaabbeeeeeeedddddggmmlloooonnssssrrrruvvyyy",
    "bravado renamed analogy valuers amoebas degrade odyssey",
  ],
];

const invalidCases = [
  ["", "Invalid input, no source"],
  ["4", "Invalid input, wrong source format"],
  ["4 abc", "Invalid input, wrong source format"],
  ["0 abcdefgh", "Invalid input, wrong source format"],
];

describe("findWordSquare", () => {
  describe("valid inputs", () => {
    test.each(validCases)(
      `returns valid word square for input`,
      async (input, expected) => {
        const results = await findWordSquare(input, wordList);

        expect(results.length).toBeGreaterThan(0);

        expect(results).toContain(expected);
      },
    );
  });

  describe("invalid inputs", () => {
    test.each(invalidCases)(
      "throws error for invalid input",
      async (input, expected) => {
        await expect(findWordSquare(input, wordList)).rejects.toThrow(expected);
      },
    );
  });

  describe("edge cases", () => {
    test("throws when no solution exists", async () => {
      const impossibleInput = "3 abcdefghi";

      await expect(findWordSquare(impossibleInput, wordList)).rejects.toThrow(
        "No valid word square found",
      );
    });
  });
});

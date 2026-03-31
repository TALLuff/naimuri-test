import { findWordSquare } from "./utils/findWordSquare";
import { wordList } from "./wordList/basicFull";

const input = process.argv[2] + " " + process.argv[3];

if (!input) {
  console.error(
    'Please provide input, e.g: npm run solve "4 eeeeddoonnnsssrv"',
  );
  process.exit(1);
}

(async () => {
  try {
    const results = await findWordSquare(input, wordList);

    console.log("Solutions:");
    results.forEach((r, i) => {
      if (i > 0) {
        console.log();
      }
      r.split(" ").forEach((w) => console.log(w));
    });
  } catch (err) {
    console.error((err as Error).message);
  }
})();

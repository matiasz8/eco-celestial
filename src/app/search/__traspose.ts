// src/app/buscador-futurista/transpose.ts

const SPANISH_CHORDS = [
  "DO", "DO#", "RE", "RE#", "MI", "FA", "FA#", "SOL", "SOL#", "LA", "LA#", "SI",
];

const ENGLISH_CHORDS = [
  "C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B",
];

function extractRootAndSuffix(chord: string): [string, string] {
  const match = chord.match(/^((?:DO#?|RE#?|MI|FA#?|SOL#?|LA#?|SI)|(?:[A-G][#b]?))(.+)$/i);
  if (match) {
    return [match[1].toUpperCase(), match[2]];
  }
  return [chord.toUpperCase(), ""];
}

function transposeRoot(root: string, semitones: number): string {
  let index = SPANISH_CHORDS.indexOf(root);
  if (index !== -1) {
    const newIndex = (index + semitones + 12) % 12;
    return SPANISH_CHORDS[newIndex];
  }

  index = ENGLISH_CHORDS.indexOf(root);
  if (index !== -1) {
    const newIndex = (index + semitones + 12) % 12;
    return ENGLISH_CHORDS[newIndex];
  }

  return root;
}

export function transposeSong(
  lyrics: { chord: string; text: string }[],
  semitones: number
): { chord: string; text: string }[] {
  return lyrics.map(({ chord, text }) => {
    if (!chord || chord.trim() === "") return { chord, text };
    const parts = chord.split(/\s+/);
    const transposed = parts
      .map((c) => {
        const [root, suffix] = extractRootAndSuffix(c);
        const newRoot = transposeRoot(root, semitones);
        return `${newRoot}${suffix}`;
      })
      .join(" ");
    return { chord: transposed, text };
  });
}

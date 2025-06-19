
const SPANISH_CHORDS = [
  "DO", "DO#", "RE", "RE#", "MI", "FA", "FA#", "SOL", "SOL#", "LA", "LA#", "SI",
];

const ENGLISH_TO_SPANISH: Record<string, string> = {
  "C": "DO", "C#": "DO#", "D": "RE", "D#": "RE#", "E": "MI",
  "F": "FA", "F#": "FA#", "G": "SOL", "G#": "SOL#", "A": "LA", "A#": "LA#", "B": "SI"
};

const SPANISH_TO_ENGLISH: Record<string, string> = Object.fromEntries(
  Object.entries(ENGLISH_TO_SPANISH).map(([k, v]) => [v, k])
);

function extractRootAndSuffix(chord: string): [string, string] {
  const match = chord.match(/^((?:DO#?|RE#?|MI|FA#?|SOL#?|LA#?|SI)|(?:[A-G][#b]?))(.*)$/i);
  if (match) {
    return [match[1].toUpperCase(), match[2]];
  }
  return [chord.toUpperCase(), ""];
}

function normalizeToSpanish(root: string): string {
  return ENGLISH_TO_SPANISH[root] || root;
}

function transposeRoot(root: string, semitones: number): string {
  let index = SPANISH_CHORDS.indexOf(normalizeToSpanish(root));
  if (index !== -1) {
    const newIndex = (index + semitones + 12) % 12;
    return SPANISH_CHORDS[newIndex];
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

export function convertNotation(
  lyrics: { chord: string; text: string }[],
  toSpanish: boolean
): { chord: string; text: string }[] {
  return lyrics.map(({ chord, text }) => {
    if (!chord || chord.trim() === "") return { chord, text };
    const parts = chord.split(/\s+/);
    const converted = parts
      .map((c) => {
        const [root, suffix] = extractRootAndSuffix(c);
        const mapped = toSpanish
          ? ENGLISH_TO_SPANISH[root] || root
          : SPANISH_TO_ENGLISH[root] || root;
        return `${mapped}${suffix}`;
      })
      .join(" ");
    return { chord: converted, text };
  });
}

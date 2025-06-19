
const chromaticScale = [
  "C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B",
];

// Mapeo de equivalencias en español (puede expandirse)
const chordMap: Record<string, string> = {
  "DO": "C",
  "DO#": "C#",
  "RE": "D",
  "RE#": "D#",
  "MI": "E",
  "FA": "F",
  "FA#": "F#",
  "SOL": "G",
  "SOL#": "G#",
  "LA": "A",
  "LA#": "A#",
  "SI": "B",
};

const reverseChordMap = Object.fromEntries(
  Object.entries(chordMap).map(([k, v]) => [v, k])
);

function normalize(chord: string): string {
  return chordMap[chord.toUpperCase()] || chord;
}

function denormalize(chord: string): string {
  return reverseChordMap[chord.toUpperCase()] || chord;
}

export function transposeChord(chord: string, semitones: number): string {
  const parts = chord.trim().split(/\s+/);
  return parts
    .map((c) => {
      const norm = normalize(c);
      const base = chromaticScale.findIndex((n) => n === norm);
      if (base === -1) return c;
      const newIndex = (base + semitones + 12) % 12;
      return denormalize(chromaticScale[newIndex]);
    })
    .join(" ");
}

export function transposeSong(
  lyrics: { chord: string; text: string }[],
  semitones: number
) {
  return lyrics.map((line) => ({
    chord: transposeChord(line.chord, semitones),
    text: line.text,
  }));
}

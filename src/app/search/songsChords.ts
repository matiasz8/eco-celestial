export const specialOccasions = [
  "Casamientos",
  "Bautismos",
  "Comuniones",
  "Confirmaciones",
  "Primeras Comuniones",
  "Bendiciones",
  "Consagraciones",
  "Dedicaciones",
  "Aniversarios",
  "Celebraciones Especiales"
];

const songs = [
  {
    title: "Vida en abundancia",
    lyrics: [
      { chord: "C", text: "Ven Señor no tardes" },
      { chord: "G", text: "Ven que te esperamos" },
      { chord: "Am", text: "Ven pronto Señor" },
    ],
    categories: {
      massParts: ["Entrada", "Comunión"],
      liturgicalSeasons: ["Tiempo Ordinario"],
      specialOccasions: ["Casamientos"],
    },
  },
  {
    title: "Ven Señor no tardes",
    lyrics: [
      { chord: "C", text: "Ven Señor no tardes" },
      { chord: "G", text: "Ven que te esperamos" },
      { chord: "Am G7", text: "Ven pronto Señor" },
    ],
    categories: {
      massParts: ["Entrada"],
      liturgicalSeasons: ["Adviento"],
      specialOccasions: ["Bautismos", "Comuniones", "Confirmaciones"],
    },
  },
  {
    title: "Frutos de la tierra",
    lyrics: [
      { chord: "F", text: "Frutos de la tierra y del trabajo" },
      { chord: "C", text: "te presentamos Señor" },
      { chord: "G", text: "Frutos de la tierra y del trabajo" },
      { chord: "C", text: "te presentamos Señor" },
    ],
    categories: {
      massParts: ["Ofertorio"],
      liturgicalSeasons: ["Cuaresma", "Tiempo Ordinario"],
      specialOccasions: ["Bautismos", "Comuniones", "Confirmaciones"],
    },
  },
  {
    title: "Santo, Santo, Santo",
    lyrics: [
      { chord: "D", text: "Santo, Santo, Santo, Señor del universo" },
      { chord: "A", text: "Llenos están el cielo y la tierra de tu gloria" },
    ],
    categories: {
      massParts: ["Santo"],
      liturgicalSeasons: ["Tiempo Ordinario", "Pascua"],
      specialOccasions: [
        "Bautismos",
        "Comuniones",
        "Confirmaciones",
        "Casamientos",
      ],
    },
  },
];

export default songs;

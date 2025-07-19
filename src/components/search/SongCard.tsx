import React, { useState } from "react";
import {
  MusicalNoteIcon,
  EyeIcon,
  EyeSlashIcon,
  ArrowPathIcon,
  ArrowsPointingOutIcon,
  ArrowsPointingInIcon,
} from "@heroicons/react/24/outline";
import { Button } from "@/components/ui/Button";
import { convertNotation } from "@/app/search/transpose";
import { transposeSong } from "@/app/search/transpose";
import type { Song, TransposedLyricLine } from "@/types";

// Componente para mostrar etiquetas de categorías
function CategoryTags({ song }: { song: Song }) {
  if (!song.categories) return null;

  const { massParts, liturgicalSeasons, specialOccasions } = song.categories;
  const hasCategories =
    massParts?.length || liturgicalSeasons?.length || specialOccasions?.length;

  if (!hasCategories) return null;

  return (
    <div className="flex flex-wrap gap-2 mb-4">
      {/* Partes de la Misa */}
      {massParts?.map(part => (
        <span
          key={`mass-${part}`}
          className="px-2 py-1 bg-cyan-100 text-cyan-800 text-xs font-medium rounded-full border border-cyan-200"
        >
          🎵 {part}
        </span>
      ))}

      {/* Tiempo Litúrgico */}
      {liturgicalSeasons?.map(season => (
        <span
          key={`season-${season}`}
          className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full border border-blue-200"
        >
          ⏰ {season}
        </span>
      ))}

      {/* Celebraciones Especiales */}
      {specialOccasions?.map(occasion => (
        <span
          key={`occasion-${occasion}`}
          className="px-2 py-1 bg-purple-100 text-purple-800 text-xs font-medium rounded-full border border-purple-200"
        >
          🎉 {occasion}
        </span>
      ))}
    </div>
  );
}

interface SongCardProps {
  song: Song;
  transposedLyrics: TransposedLyricLine[] | null;
  showChords: boolean;
  useSpanishNotation: boolean;
  transposeOffset: number;
  onToggleChords: () => void;
  onTranspose: (delta: number) => void;
  onNotationChange: () => void;
  onClose: () => void;
  isMaximized?: boolean;
  onToggleMaximize?: () => void;
}

export function SongCard({
  song,
  transposedLyrics,
  showChords,
  useSpanishNotation,
  transposeOffset,
  onToggleChords,
  onTranspose,
  onNotationChange,
  onClose,
  isMaximized = false,
  onToggleMaximize,
}: SongCardProps) {
  const [fontSize, setFontSize] = useState<"sm" | "base" | "lg" | "xl" | "2xl">(
    "sm"
  );
  const [blockWidth, setBlockWidth] = useState<
    "narrow" | "medium" | "normal" | "wide"
  >("normal");

  // Función para cambiar el tamaño de la letra
  const changeFontSize = () => {
    const sizes: ("sm" | "base" | "lg" | "xl" | "2xl")[] = [
      "sm",
      "base",
      "lg",
      "xl",
      "2xl",
    ];
    const currentIndex = sizes.indexOf(fontSize);
    const nextIndex = (currentIndex + 1) % sizes.length;
    setFontSize(sizes[nextIndex]);
  };

  // Función para cambiar el ancho de los bloques
  const changeBlockWidth = () => {
    const widths: ("narrow" | "medium" | "normal" | "wide")[] = [
      "narrow",
      "medium",
      "normal",
      "wide",
    ];
    const currentIndex = widths.indexOf(blockWidth);
    const nextIndex = (currentIndex + 1) % widths.length;
    setBlockWidth(widths[nextIndex]);
  };

  // Función para obtener las clases de texto según el tamaño
  const getTextClasses = () => {
    switch (fontSize) {
      case "sm":
        return { chord: "text-sm", text: "text-sm" };
      case "base":
        return { chord: "text-base", text: "text-base" };
      case "lg":
        return { chord: "text-lg", text: "text-lg" };
      case "xl":
        return { chord: "text-xl", text: "text-xl" };
      case "2xl":
        return { chord: "text-2xl", text: "text-2xl" };
      default:
        return { chord: "text-lg", text: "text-lg" };
    }
  };

  // Función para obtener las clases de ancho según la preferencia
  const getBlockWidthClasses = () => {
    switch (blockWidth) {
      case "narrow":
        return {
          grid: "lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5",
          maxWidth: "max-w-sm",
        };
      case "medium":
        return {
          grid: "lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4",
          maxWidth: "max-w-md",
        };
      case "normal":
        return { grid: "lg:grid-cols-2 2xl:grid-cols-3", maxWidth: "w-full" };
      case "wide":
        return { grid: "lg:grid-cols-1 xl:grid-cols-2", maxWidth: "w-full" };
      default:
        return { grid: "lg:grid-cols-2 2xl:grid-cols-3", maxWidth: "w-full" };
    }
  };

  // Función para obtener el indicador visual del tamaño
  const getFontSizeIndicator = () => {
    switch (fontSize) {
      case "sm":
        return { small: "a", large: "A" };
      case "base":
        return { small: "a", large: "A" };
      case "lg":
        return { small: "a", large: "A" };
      case "xl":
        return { small: "a", large: "A" };
      case "2xl":
        return { small: "a", large: "A" };
      default:
        return { small: "a", large: "A" };
    }
  };

  const textClasses = getTextClasses();
  const blockWidthClasses = getBlockWidthClasses();
  const fontSizeIndicator = getFontSizeIndicator();

  // Convertir la notación según la preferencia del usuario
  const displayLyrics = transposedLyrics
    ? convertNotation(transposedLyrics, useSpanishNotation)
    : null;

  // Función para detectar estrofas de manera inteligente
  function detectVerses(lyrics: { chord: string; text: string }[]) {
    if (!lyrics || lyrics.length === 0) return [];

    const verses: { chord: string; text: string }[][] = [];
    let currentVerse: { chord: string; text: string }[] = [];
    let consecutiveEmptyLines = 0;

    for (let i = 0; i < lyrics.length; i++) {
      const line = lyrics[i];
      const isEmptyLine = !line.chord.trim() && !line.text.trim();

      if (isEmptyLine) {
        consecutiveEmptyLines++;
        // Si tenemos contenido y encontramos líneas vacías, es fin de estrofa
        if (currentVerse.length > 0 && consecutiveEmptyLines >= 1) {
          verses.push([...currentVerse]);
          currentVerse = [];
        }
      } else {
        // Si no es línea vacía, agregar a la estrofa actual
        currentVerse.push(line);
        consecutiveEmptyLines = 0;
      }
    }

    // Agregar la última estrofa si tiene contenido
    if (currentVerse.length > 0) {
      verses.push(currentVerse);
    }

    // Si no se detectaron estrofas, intentar dividir por patrones de acordes
    if (verses.length === 0) {
      return detectVersesByChordPattern(lyrics);
    }

    // Si solo hay una estrofa pero es muy larga, intentar dividir por patrones
    if (verses.length === 1 && verses[0].length > 12) {
      return detectVersesByChordPattern(lyrics);
    }

    return verses;
  }

  // Función alternativa para detectar estrofas por patrones de acordes
  function detectVersesByChordPattern(
    lyrics: { chord: string; text: string }[]
  ) {
    const verses: { chord: string; text: string }[][] = [];
    let currentVerse: { chord: string; text: string }[] = [];
    let lastChordPattern = "";
    let patternCount = 0;

    for (let i = 0; i < lyrics.length; i++) {
      const line = lyrics[i];
      const currentChordPattern = line.chord.trim();

      // Si el patrón de acordes cambia y tenemos suficiente contenido, nueva estrofa
      if (
        currentChordPattern &&
        lastChordPattern &&
        currentChordPattern !== lastChordPattern &&
        patternCount >= 1 &&
        currentVerse.length >= 4
      ) {
        // Verificar si el nuevo patrón es similar al patrón inicial de la estrofa actual
        const verseStartChord = currentVerse[0]?.chord.trim();
        if (
          currentChordPattern === verseStartChord &&
          currentVerse.length >= 6
        ) {
          verses.push([...currentVerse]);
          currentVerse = [];
          patternCount = 0;
        }
      }

      currentVerse.push(line);

      if (currentChordPattern) {
        if (currentChordPattern === lastChordPattern) {
          patternCount++;
        } else {
          patternCount = 1;
        }
        lastChordPattern = currentChordPattern;
      }
    }

    // Agregar la última estrofa
    if (currentVerse.length > 0) {
      verses.push(currentVerse);
    }

    return verses;
  }

  // Si está maximizada, mostrar vista completa
  if (isMaximized) {
    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-2">
        <div className="bg-white rounded-2xl shadow-2xl w-full h-full max-w-none max-h-none">
          {/* Header maximizado */}
          <div className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white p-4 rounded-t-2xl">
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                  <MusicalNoteIcon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold">{song.title}</h1>
                  {song.author && (
                    <p className="text-cyan-100 text-sm">Por: {song.author}</p>
                  )}
                  <CategoryTags song={song} />
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={onToggleMaximize}
                  className="text-white hover:bg-white/20"
                  aria-label="Minimizar"
                >
                  <ArrowsPointingInIcon className="w-5 h-5" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={onClose}
                  className="text-white hover:bg-white/20"
                  aria-label="Cerrar"
                >
                  ✕
                </Button>
              </div>
            </div>
          </div>

          {/* Controles maximizados */}
          <div className="p-4 border-b border-gray-200 bg-gray-50">
            <div className="flex flex-wrap items-center gap-3">
              <Button
                variant="outline"
                size="sm"
                onClick={onToggleChords}
                className="flex items-center gap-2"
              >
                {showChords ? (
                  <>
                    <EyeSlashIcon className="w-4 h-4" />
                    Ocultar Acordes
                  </>
                ) : (
                  <>
                    <EyeIcon className="w-4 h-4" />
                    Mostrar Acordes
                  </>
                )}
              </Button>

              <Button variant="outline" size="sm" onClick={onNotationChange}>
                {useSpanishNotation ? "Español" : "Inglés"}
              </Button>

              {/* Control de tamaño de letra - solo en modo maximizado */}
              <Button
                variant="outline"
                size="sm"
                onClick={changeFontSize}
                className="flex items-center gap-2"
              >
                <span className="text-xs">{fontSizeIndicator.small}</span>
                <span className="text-base">{fontSizeIndicator.large}</span>
              </Button>

              {/* Control de ancho de bloques - solo en modo maximizado */}
              <Button
                variant="outline"
                size="sm"
                onClick={changeBlockWidth}
                className="flex items-center gap-2"
              >
                <span className="text-xs">◀</span>
                <span className="text-base">▶</span>
              </Button>

              {/* Controles de transposición */}
              {showChords && (
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium text-gray-700">
                    Transposición:
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onTranspose(-2)}
                    disabled={transposeOffset <= -12}
                  >
                    ⬇️ -1
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onTranspose(-1)}
                    disabled={transposeOffset <= -12}
                  >
                    ⬇️ -½
                  </Button>
                  <span className="px-3 py-2 text-sm font-medium text-gray-800 bg-white rounded border">
                    {transposeOffset > 0
                      ? `+${transposeOffset}`
                      : transposeOffset}
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onTranspose(1)}
                    disabled={transposeOffset >= 12}
                  >
                    ⬆️ +½
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onTranspose(2)}
                    disabled={transposeOffset >= 12}
                  >
                    ⬆️ +1
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onTranspose(-transposeOffset)}
                    disabled={transposeOffset === 0}
                  >
                    Reset
                  </Button>
                </div>
              )}
            </div>
          </div>

          {/* Contenido maximizado */}
          <div className="p-6 overflow-y-auto h-[calc(100vh-140px)]">
            <div className="grid xl:grid-cols-3 gap-6">
              {/* Letra principal - 2 columnas */}
              <div className="xl:col-span-2">
                {/* Dividir letra en estrofas usando la función mejorada */}
                <div
                  className={`grid gap-6 ${song.chorus && song.chorus.length > 0 ? "lg:grid-cols-2" : blockWidthClasses.grid}`}
                >
                  {(() => {
                    // Usar estrofas pre-detectadas si están disponibles
                    if (song.verses && song.verses.length > 0) {
                      return song.verses.map((verse, verseIndex) => {
                        // Convertir las estrofas a la notación correcta
                        const transposedVerse = transposeSong(
                          verse,
                          transposeOffset
                        );
                        const displayVerse = convertNotation(
                          transposedVerse,
                          useSpanishNotation
                        );

                        return (
                          <div
                            key={verseIndex}
                            className={`bg-gray-50 rounded-lg p-6 border border-gray-200 ${blockWidthClasses.maxWidth}`}
                          >
                            <h3 className="text-lg font-semibold text-gray-700 mb-4 pb-3 border-b border-gray-300">
                              Estrofa {verseIndex + 1}
                            </h3>
                            <div className="space-y-3 font-mono">
                              {displayVerse.map((line, lineIndex) => (
                                <div key={lineIndex} className="space-y-2">
                                  {showChords && (
                                    <div
                                      className={`text-cyan-700 font-semibold ${textClasses.chord}`}
                                    >
                                      {line.chord || " "}
                                    </div>
                                  )}
                                  <div
                                    className={`text-gray-800 leading-relaxed ${textClasses.text}`}
                                  >
                                    {line.text || " "}
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        );
                      });
                    }

                    // Fallback: usar detección automática si no hay estrofas pre-detectadas
                    return detectVerses(displayLyrics || []).map(
                      (verse, verseIndex) => (
                        <div
                          key={verseIndex}
                          className={`bg-gray-50 rounded-lg p-6 border border-gray-200 ${blockWidthClasses.maxWidth}`}
                        >
                          <h3 className="text-lg font-semibold text-gray-700 mb-4 pb-3 border-b border-gray-300">
                            Estrofa {verseIndex + 1}
                          </h3>
                          <div className="space-y-3 font-mono">
                            {verse.map((line, lineIndex) => (
                              <div key={lineIndex} className="space-y-2">
                                {showChords && (
                                  <div
                                    className={`text-cyan-700 font-semibold ${textClasses.chord}`}
                                  >
                                    {line.chord || " "}
                                  </div>
                                )}
                                <div
                                  className={`text-gray-800 leading-relaxed ${textClasses.text}`}
                                >
                                  {line.text || " "}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )
                    );
                  })()}
                </div>
              </div>

              {/* Estribillo - solo mostrar si existe */}
              {song.chorus && song.chorus.length > 0 && (
                <div className="xl:col-span-1">
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 h-fit sticky top-0">
                    <h2 className="text-lg font-semibold text-blue-800 mb-4 flex items-center gap-2">
                      🔄 Estribillo
                      <ArrowPathIcon className="w-5 h-5" />
                    </h2>
                    <div className="space-y-2 font-mono text-sm">
                      {(() => {
                        // Convertir el estribillo a la notación correcta
                        const transposedChorus = transposeSong(
                          song.chorus,
                          transposeOffset
                        );
                        const displayChorus = convertNotation(
                          transposedChorus,
                          useSpanishNotation
                        );

                        return displayChorus.map((line, i) => (
                          <div key={i} className="space-y-1">
                            {showChords && (
                              <div
                                className={`text-blue-700 font-semibold ${textClasses.chord}`}
                              >
                                {line.chord || " "}
                              </div>
                            )}
                            <div
                              className={`text-blue-800 leading-relaxed ${textClasses.text}`}
                            >
                              {line.text || " "}
                            </div>
                          </div>
                        ));
                      })()}
                    </div>
                    <div className="mt-4 pt-3 border-t border-blue-200">
                      <p className="text-xs text-blue-600 italic">
                        💡 El estribillo se puede repetir según sea necesario
                        durante la interpretación
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Información adicional */}
            {(song.key || song.tempo || song.year) && (
              <div className="mt-6 pt-4 border-t border-gray-200">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">
                  ℹ️ Información
                </h3>
                <div className="flex flex-wrap gap-6 text-base text-gray-700">
                  {song.key && <span>Tonalidad: {song.key}</span>}
                  {song.tempo && <span>Tempo: {song.tempo}</span>}
                  {song.year && <span>Año: {song.year}</span>}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Vista normal (no maximizada)
  return (
    <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl border border-white/50 p-6 max-w-2xl w-full">
      {/* Header */}
      <div className="flex justify-between items-start mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center">
            <MusicalNoteIcon className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">{song.title}</h2>
            {song.author && (
              <p className="text-sm text-gray-600">Por: {song.author}</p>
            )}
            <CategoryTags song={song} />
          </div>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={onClose}
          aria-label="Cerrar"
        >
          ✕
        </Button>
      </div>

      {/* Controles */}
      <div className="space-y-4 mb-6">
        {/* Controles principales */}
        <div className="flex flex-wrap gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={onToggleChords}
            className="flex items-center gap-2"
          >
            {showChords ? (
              <>
                <EyeSlashIcon className="w-4 h-4" />
                Ocultar Acordes
              </>
            ) : (
              <>
                <EyeIcon className="w-4 h-4" />
                Mostrar Acordes
              </>
            )}
          </Button>

          <Button variant="outline" size="sm" onClick={onNotationChange}>
            {useSpanishNotation ? "Español" : "Inglés"}
          </Button>

          {onToggleMaximize && (
            <Button
              variant="outline"
              size="sm"
              onClick={onToggleMaximize}
              className="flex items-center gap-2"
            >
              <ArrowsPointingOutIcon className="w-4 h-4" />
              Maximizar
            </Button>
          )}
        </div>

        {/* Controles de transposición */}
        {showChords && (
          <div className="bg-gray-100 rounded-lg p-4">
            <h3 className="text-sm font-semibold text-gray-800 mb-3">
              🎼 Transposición
            </h3>
            <div className="flex flex-wrap gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => onTranspose(-2)}
                disabled={transposeOffset <= -12}
              >
                ⬇️ -1
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => onTranspose(-1)}
                disabled={transposeOffset <= -12}
              >
                ⬇️ -½
              </Button>
              <span className="px-3 py-2 text-sm font-medium text-gray-800 bg-white rounded border border-gray-300">
                {transposeOffset > 0 ? `+${transposeOffset}` : transposeOffset}
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => onTranspose(1)}
                disabled={transposeOffset >= 12}
              >
                ⬆️ +½
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => onTranspose(2)}
                disabled={transposeOffset >= 12}
              >
                ⬆️ +1
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onTranspose(-transposeOffset)}
                disabled={transposeOffset === 0}
              >
                Reset
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Contenido de la canción */}
      <div className="space-y-4 max-h-96 overflow-y-auto">
        {/* Letra Principal */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
            <MusicalNoteIcon className="w-5 h-5 text-cyan-600" />
            📝 Letra Principal
          </h3>
          <div className="bg-white rounded-lg p-4 border border-gray-200">
            <div className="space-y-2 font-mono text-sm">
              {(() => {
                // Usar estrofas pre-detectadas si están disponibles
                if (song.verses && song.verses.length > 0) {
                  return song.verses.map((verse, verseIndex) => {
                    // Convertir las estrofas a la notación correcta
                    const transposedVerse = transposeSong(
                      verse,
                      transposeOffset
                    );
                    const displayVerse = convertNotation(
                      transposedVerse,
                      useSpanishNotation
                    );

                    return (
                      <div key={verseIndex}>
                        {verseIndex > 0 && (
                          <div className="my-4 border-t border-gray-300 flex items-center justify-center">
                            <span className="px-3 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded-full">
                              Estrofa {verseIndex + 1}
                            </span>
                          </div>
                        )}
                        <div className="space-y-2">
                          {displayVerse.map((line, lineIndex) => (
                            <div key={lineIndex} className="space-y-1">
                              {showChords && (
                                <div className="text-cyan-700 font-semibold">
                                  {line.chord || " "}
                                </div>
                              )}
                              <div className="text-gray-800">
                                {line.text || " "}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  });
                }

                // Fallback: usar detección automática si no hay estrofas pre-detectadas
                return detectVerses(displayLyrics || []).map(
                  (verse, verseIndex) => (
                    <div key={verseIndex}>
                      {verseIndex > 0 && (
                        <div className="my-4 border-t border-gray-300 flex items-center justify-center">
                          <span className="px-3 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded-full">
                            Estrofa {verseIndex + 1}
                          </span>
                        </div>
                      )}
                      <div className="space-y-2">
                        {verse.map((line, lineIndex) => (
                          <div key={lineIndex} className="space-y-1">
                            {showChords && (
                              <div className="text-cyan-700 font-semibold">
                                {line.chord || " "}
                              </div>
                            )}
                            <div className="text-gray-800">
                              {line.text || " "}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )
                );
              })()}
            </div>
          </div>

          {/* Estribillo */}
          {song.chorus && song.chorus.length > 0 && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                <MusicalNoteIcon className="w-5 h-5 text-blue-600" />
                🔄 Estribillo
              </h3>
              <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                <div className="space-y-2 font-mono text-sm">
                  {(() => {
                    // Convertir el estribillo a la notación correcta
                    const transposedChorus = transposeSong(
                      song.chorus,
                      transposeOffset
                    );
                    const displayChorus = convertNotation(
                      transposedChorus,
                      useSpanishNotation
                    );

                    return displayChorus.map((line, lineIndex) => (
                      <div key={lineIndex} className="space-y-1">
                        {showChords && (
                          <div className="text-blue-700 font-semibold">
                            {line.chord || " "}
                          </div>
                        )}
                        <div className="text-gray-800">{line.text || " "}</div>
                      </div>
                    ));
                  })()}
                </div>
                <div className="mt-3 pt-3 border-t border-blue-200">
                  <p className="text-xs text-blue-600 italic">
                    💡 El estribillo se puede repetir según sea necesario
                    durante la interpretación
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Información adicional */}
      {(song.key || song.tempo || song.year) && (
        <div className="mt-4 pt-4 border-t border-gray-200">
          <h4 className="text-sm font-semibold text-gray-800 mb-2">
            ℹ️ Información
          </h4>
          <div className="flex flex-wrap gap-4 text-sm text-gray-700">
            {song.key && <span>Tonalidad: {song.key}</span>}
            {song.tempo && <span>Tempo: {song.tempo}</span>}
            {song.year && <span>Año: {song.year}</span>}
          </div>
        </div>
      )}
    </div>
  );
}

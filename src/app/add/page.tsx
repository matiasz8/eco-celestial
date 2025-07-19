"use client";

import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import {
  STORAGE_KEYS,
  MASS_PARTS,
  LITURGICAL_SEASONS,
  SPECIAL_OCCASIONS,
} from "@/lib/constants";
import type { Song, LyricLine } from "@/types";

interface Verse {
  id: string;
  lines: LyricLine[];
}

export default function AddSongPage() {
  const [title, setTitle] = useState("");
  const [rawText, setRawText] = useState("");
  const [hasChorus, setHasChorus] = useState(false);
  const [rawChorus, setRawChorus] = useState("");
  const [verses, setVerses] = useState<Verse[]>([{ id: "1", lines: [] }]);
  const [chorusLines, setChorusLines] = useState<LyricLine[]>([]);
  const [inputMode, setInputMode] = useState<"raw" | "structured">("raw");
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Campos de información adicional
  const [key, setKey] = useState("");
  const [tempo, setTempo] = useState("");
  const [source, setSource] = useState("");

  // Categorías de filtros
  const [selectedMassParts, setSelectedMassParts] = useState<string[]>([]);
  const [selectedLiturgicalSeasons, setSelectedLiturgicalSeasons] = useState<
    string[]
  >([]);
  const [selectedSpecialOccasions, setSelectedSpecialOccasions] = useState<
    string[]
  >([]);

  function parseRawText(raw: string): LyricLine[] {
    // Dividir por líneas individuales para preservar líneas vacías
    const lines = raw.split(/\r?\n/);
    const lyrics: LyricLine[] = [];

    console.log("🔍 Procesando texto raw:", lines.length, "líneas");
    console.log("📝 Líneas originales:", lines);

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];

      console.log(`Línea ${i}: "${line}"`);

      // Si la línea está vacía o es solo espacios, es un separador de estrofas
      if (!line.trim()) {
        console.log(`📝 Línea vacía detectada en posición ${i}`);
        lyrics.push({ chord: "", text: "" });
        continue;
      }

      // Si la línea no está vacía, procesar como par acorde/texto
      const chordLine = line;
      const textLine = lines[i + 1] || "";

      console.log(`📝 Procesando par:`, { chord: chordLine, text: textLine });

      // Solo agregar si al menos uno de los dos tiene contenido
      if (chordLine.trim() || textLine.trim()) {
        lyrics.push({ chord: chordLine.trim(), text: textLine.trim() });
      }

      // Saltar la siguiente línea ya que la procesamos como texto
      if (textLine.trim()) {
        i++;
      }
    }

    console.log("🎵 Líneas procesadas:", lyrics.length);
    console.log(
      "📋 Líneas finales:",
      lyrics.map((line, index) => `${index}: "${line.chord}" | "${line.text}"`)
    );
    return lyrics;
  }

  function parseStructuredVerses(): LyricLine[] {
    // En lugar de aplanar todas las estrofas, vamos a preservar la estructura
    // agregando líneas vacías entre estrofas
    const allLines: LyricLine[] = [];

    verses.forEach((verse, index) => {
      // Agregar las líneas de la estrofa
      allLines.push(...verse.lines);

      // Agregar una línea vacía entre estrofas (excepto después de la última)
      if (index < verses.length - 1) {
        allLines.push({ chord: "", text: "" });
      }
    });

    console.log(
      "🎵 Estructura de estrofas preservada:",
      verses.length,
      "estrofas"
    );
    return allLines;
  }

  function parseSong(): Song {
    const lyrics =
      inputMode === "raw" ? parseRawText(rawText) : parseStructuredVerses();
    const chorus = hasChorus
      ? inputMode === "raw"
        ? parseRawText(rawChorus)
        : chorusLines
      : undefined;

    // Detectar estrofas de la letra principal
    const verses = detectVersesFromLyrics(lyrics);

    console.log("🎵 Detección de estrofas:");
    console.log("📝 Líneas totales:", lyrics.length);
    console.log("🎼 Estrofas detectadas:", verses.length);
    verses.forEach((verse, index) => {
      console.log(`  Estrofa ${index + 1}:`, verse.length, "líneas");
    });

    const song: Song = {
      title: title.trim(),
      lyrics,
      verses, // Agregar las estrofas detectadas
      chorus,
      author: "Usuario",
      year: new Date().getFullYear(),
      key: key.trim() || undefined,
      tempo: tempo.trim() || undefined,
      source: source.trim() || undefined,
      categories: {
        massParts: selectedMassParts.length > 0 ? selectedMassParts : undefined,
        liturgicalSeasons:
          selectedLiturgicalSeasons.length > 0
            ? selectedLiturgicalSeasons
            : undefined,
        specialOccasions:
          selectedSpecialOccasions.length > 0
            ? selectedSpecialOccasions
            : undefined,
      },
    };

    return song;
  }

  // Función para detectar estrofas de las letras
  function detectVersesFromLyrics(lyrics: LyricLine[]): LyricLine[][] {
    if (!lyrics || lyrics.length === 0) return [];

    console.log("🔍 Detectando estrofas de las letras...");

    const verses: LyricLine[][] = [];
    let currentVerse: LyricLine[] = [];

    for (let i = 0; i < lyrics.length; i++) {
      const line = lyrics[i];
      const isEmptyLine = !line.chord.trim() && !line.text.trim();

      console.log(`Línea ${i}:`, {
        chord: line.chord,
        text: line.text,
        isEmpty: isEmptyLine,
      });

      if (isEmptyLine) {
        // Si encontramos una línea vacía y tenemos contenido, es fin de estrofa
        if (currentVerse.length > 0) {
          console.log(
            `📝 Fin de estrofa detectado por línea vacía, líneas:`,
            currentVerse.length
          );
          verses.push([...currentVerse]);
          currentVerse = [];
        }
      } else {
        // Si no es línea vacía, agregar a la estrofa actual
        currentVerse.push(line);
      }
    }

    // Agregar la última estrofa si tiene contenido
    if (currentVerse.length > 0) {
      console.log(`📝 Última estrofa, líneas:`, currentVerse.length);
      verses.push(currentVerse);
    }

    console.log("🎵 Estrofas detectadas por líneas vacías:", verses.length);

    // Si no se detectaron estrofas por líneas vacías, intentar detectar por patrones
    if (verses.length === 0 || verses.length === 1) {
      console.log(
        "🔄 No se detectaron estrofas por líneas vacías, intentando por patrones..."
      );
      return detectVersesByPattern(lyrics);
    }

    return verses;
  }

  // Función para detectar estrofas por patrones de acordes y estructura
  function detectVersesByPattern(lyrics: LyricLine[]): LyricLine[][] {
    if (!lyrics || lyrics.length === 0) return [];

    console.log("🔍 Detectando estrofas por patrones...");

    const verses: LyricLine[][] = [];
    let currentVerse: LyricLine[] = [];
    let verseCount = 0;

    // Para la canción "Dios Está Aquí", cada estrofa tiene 4 líneas
    // y comienza con el patrón "C G Am"
    const linesPerVerse = 4;

    for (let i = 0; i < lyrics.length; i++) {
      const line = lyrics[i];

      // Si encontramos el patrón inicial de una nueva estrofa
      // Y ya tenemos suficientes líneas en la estrofa actual
      if (
        line.chord.trim() === "C G Am" &&
        currentVerse.length >= linesPerVerse
      ) {
        verseCount++;
        console.log(
          `📝 Estrofa ${verseCount} detectada en línea ${i} con patrón:`,
          line.chord
        );
        console.log(`📊 Líneas en estrofa actual:`, currentVerse.length);

        // Guardar la estrofa actual
        verses.push([...currentVerse]);

        // Iniciar nueva estrofa con esta línea
        currentVerse = [line];
      } else {
        currentVerse.push(line);
      }
    }

    // Agregar la última estrofa
    if (currentVerse.length > 0) {
      verseCount++;
      console.log(
        `📝 Estrofa ${verseCount} (última) con ${currentVerse.length} líneas`
      );
      verses.push(currentVerse);
    }

    console.log("🎼 Total de estrofas detectadas:", verses.length);
    verses.forEach((verse, index) => {
      console.log(`  Estrofa ${index + 1}:`, verse.length, "líneas");
      console.log(`    Inicio:`, verse[0]?.chord, "-", verse[0]?.text);
      console.log(
        `    Fin:`,
        verse[verse.length - 1]?.chord,
        "-",
        verse[verse.length - 1]?.text
      );
    });

    // Si no se detectaron estrofas por patrón, intentar dividir por longitud
    if (verses.length === 0 || verses.length === 1) {
      console.log("🔄 Intentando división por longitud...");
      return splitByLength(lyrics);
    }

    return verses;
  }

  // Función para dividir por longitud si no se detectan patrones
  function splitByLength(lyrics: LyricLine[]): LyricLine[][] {
    if (!lyrics || lyrics.length === 0) return [];

    const totalLines = lyrics.length;
    const linesPerVerse = Math.ceil(totalLines / 3); // Intentar dividir en 3 estrofas

    const verses: LyricLine[][] = [];

    for (let i = 0; i < totalLines; i += linesPerVerse) {
      const verse = lyrics.slice(i, i + linesPerVerse);
      if (verse.length > 0) {
        verses.push(verse);
      }
    }

    return verses;
  }

  function validateForm(): boolean {
    if (!title.trim()) {
      setError("El título es requerido");
      return false;
    }

    if (inputMode === "raw") {
      if (!rawText.trim()) {
        setError("La letra de la canción es requerida");
        return false;
      }
      if (hasChorus && !rawChorus.trim()) {
        setError("Si activas el estribillo, debes incluir su contenido");
        return false;
      }
    } else {
      const hasVerses = verses.some(verse => verse.lines.length > 0);
      if (!hasVerses) {
        setError("Debes agregar al menos una estrofa");
        return false;
      }
      if (hasChorus && chorusLines.length === 0) {
        setError("Si activas el estribillo, debes incluir su contenido");
        return false;
      }
    }

    setError("");
    return true;
  }

  function handleSave() {
    if (!validateForm()) return;

    setLoading(true);

    try {
      const song = parseSong();
      const stored = JSON.parse(
        localStorage.getItem(STORAGE_KEYS.CUSTOM_SONGS) || "[]"
      );
      localStorage.setItem(
        STORAGE_KEYS.CUSTOM_SONGS,
        JSON.stringify([...stored, song])
      );

      setSaved(true);
      setRawText("");
      setRawChorus("");
      setTitle("");
      setHasChorus(false);
      setVerses([{ id: "1", lines: [] }]);
      setChorusLines([]);
      setError("");
      setKey("");
      setTempo("");
      setSource("");

      // Reset success message after 3 seconds
      setTimeout(() => setSaved(false), 3000);
    } catch (err) {
      console.error("Error saving song:", err);
      setError("Error al guardar la canción. Intenta nuevamente.");
    } finally {
      setLoading(false);
    }
  }

  function handleClear() {
    setTitle("");
    setRawText("");
    setRawChorus("");
    setHasChorus(false);
    setVerses([{ id: "1", lines: [] }]);
    setChorusLines([]);
    setError("");
    setSaved(false);
    setKey("");
    setTempo("");
    setSource("");
    setSelectedMassParts([]);
    setSelectedLiturgicalSeasons([]);
    setSelectedSpecialOccasions([]);
  }

  function handleToggleChorus() {
    setHasChorus(!hasChorus);
    if (hasChorus) {
      setRawChorus("");
      setChorusLines([]);
    }
  }

  function addVerse() {
    const newId = (verses.length + 1).toString();
    setVerses([...verses, { id: newId, lines: [] }]);
  }

  function removeVerse(index: number) {
    if (verses.length > 1) {
      setVerses(verses.filter((_, i) => i !== index));
    }
  }

  function updateVerse(index: number, rawText: string) {
    const lines = parseRawText(rawText);
    const newVerses = [...verses];
    newVerses[index].lines = lines;
    setVerses(newVerses);
  }

  function updateChorus(rawText: string) {
    const lines = parseRawText(rawText);
    setChorusLines(lines);
  }

  // Funciones para manejar filtros de categorías
  const handleMassPartToggle = (part: string) => {
    setSelectedMassParts(prev =>
      prev.includes(part) ? prev.filter(p => p !== part) : [...prev, part]
    );
  };

  const handleLiturgicalSeasonToggle = (season: string) => {
    setSelectedLiturgicalSeasons(prev => {
      if (season === "Todos") {
        // Si se selecciona "Todos", deseleccionar todo lo demás
        return prev.includes("Todos") ? [] : ["Todos"];
      } else {
        // Si se selecciona una estación específica
        if (prev.includes("Todos")) {
          // Si "Todos" estaba seleccionado, removerlo y agregar la estación específica
          return [season];
        } else {
          // Toggle normal para estaciones específicas
          return prev.includes(season)
            ? prev.filter(s => s !== season)
            : [...prev, season];
        }
      }
    });
  };

  const handleSpecialOccasionToggle = (occasion: string) => {
    setSelectedSpecialOccasions(prev =>
      prev.includes(occasion)
        ? prev.filter(o => o !== occasion)
        : [...prev, occasion]
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-blue-50 to-cyan-100 animate-gradient bg-[length:400%_400%]">
      <Header />

      <main className="flex-1 py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Agregar Nueva Canción
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Agrega tus propias canciones litúrgicas al cancionero. Incluye los
              acordes y la letra, y opcionalmente el estribillo.
            </p>
          </div>

          <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl border border-white/50 p-8">
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Formulario */}
              <div className="lg:col-span-2 space-y-6">
                <Input
                  label="Título de la canción"
                  placeholder="Ej: Gloria a Dios en las alturas"
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                  error={error && !title.trim() ? error : undefined}
                />

                {/* Selector de modo de entrada */}
                <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-amber-900 mb-4">
                    📝 Modo de Entrada
                  </h3>
                  <div className="flex gap-4">
                    <Button
                      variant={inputMode === "raw" ? "default" : "outline"}
                      onClick={() => setInputMode("raw")}
                      className={
                        inputMode === "raw"
                          ? "bg-amber-600 hover:bg-amber-700"
                          : ""
                      }
                    >
                      Texto Libre
                    </Button>
                    <Button
                      variant={
                        inputMode === "structured" ? "default" : "outline"
                      }
                      onClick={() => setInputMode("structured")}
                      className={
                        inputMode === "structured"
                          ? "bg-amber-600 hover:bg-amber-700"
                          : ""
                      }
                    >
                      Estructurado (Estrofas)
                    </Button>
                  </div>
                  <p className="text-amber-700 text-sm mt-2">
                    {inputMode === "raw"
                      ? "Pega el texto completo con acordes y letra"
                      : "Organiza la canción por estrofas individuales"}
                  </p>
                </div>

                {inputMode === "raw" ? (
                  <>
                    {/* Sección de letra principal - Modo texto libre */}
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                      <h3 className="text-lg font-semibold text-blue-900 mb-4">
                        🎵 Letra Principal
                      </h3>
                      <Textarea
                        label="Letra con acordes"
                        placeholder={`Do          Sol          La          Fa
Gloria a Dios en las alturas
Re          Sol          Do
Y paz en la tierra a los hombres

[Pega aquí el texto con acordes y letra]`}
                        value={rawText}
                        onChange={e => setRawText(e.target.value)}
                        rows={10}
                        className="font-mono text-sm"
                        error={
                          error && inputMode === "raw" && !rawText.trim()
                            ? error
                            : undefined
                        }
                        helperText="Formato: una línea para acordes, una línea para letra. Usa líneas vacías para separar estrofas."
                      />
                    </div>

                    {/* Sección de estribillo - Modo texto libre */}
                    <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold text-green-900">
                          🔄 Estribillo (Opcional)
                        </h3>
                        <Button
                          variant={hasChorus ? "default" : "outline"}
                          size="sm"
                          onClick={handleToggleChorus}
                          className={
                            hasChorus ? "bg-green-600 hover:bg-green-700" : ""
                          }
                        >
                          {hasChorus ? "Desactivar" : "Activar"}
                        </Button>
                      </div>

                      {hasChorus ? (
                        <div className="space-y-4">
                          <p className="text-green-700 text-sm">
                            El estribillo se mostrará separado de la letra
                            principal y se puede repetir fácilmente.
                          </p>
                          <Textarea
                            label="Estribillo con acordes"
                            placeholder={`Sol          Do          Re
Cristo ha resucitado
Sol          Do          Re
¡Aleluya, aleluya!`}
                            value={rawChorus}
                            onChange={e => setRawChorus(e.target.value)}
                            rows={8}
                            className="font-mono text-sm"
                            error={
                              error && hasChorus && !rawChorus.trim()
                                ? error
                                : undefined
                            }
                            helperText="Formato: una línea para acordes, una línea para letra"
                          />
                        </div>
                      ) : (
                        <div className="text-center py-8">
                          <p className="text-green-600 mb-3">
                            ¿Esta canción tiene estribillo?
                          </p>
                          <p className="text-green-500 text-sm">
                            Activa esta opción para agregar el estribillo por
                            separado
                          </p>
                        </div>
                      )}
                    </div>
                  </>
                ) : (
                  <>
                    {/* Sección de estrofas - Modo estructurado */}
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold text-blue-900">
                          🎵 Estrofas
                        </h3>
                        <Button variant="outline" size="sm" onClick={addVerse}>
                          + Agregar Estrofa
                        </Button>
                      </div>

                      <div className="space-y-4">
                        {verses.map((verse, index) => (
                          <div
                            key={verse.id}
                            className="bg-white rounded-lg p-4 border border-blue-300"
                          >
                            <div className="flex items-center justify-between mb-3">
                              <h4 className="font-semibold text-blue-800">
                                Estrofa {index + 1}
                              </h4>
                              {verses.length > 1 && (
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => removeVerse(index)}
                                  className="text-red-600 hover:text-red-700"
                                >
                                  ✕ Eliminar
                                </Button>
                              )}
                            </div>
                            <Textarea
                              placeholder={`Do          Sol          La          Fa
Gloria a Dios en las alturas
Re          Sol          Do
Y paz en la tierra a los hombres`}
                              value={verse.lines
                                .map(line => `${line.chord}\n${line.text}`)
                                .join("\n")}
                              onChange={e => updateVerse(index, e.target.value)}
                              rows={6}
                              className="font-mono text-sm"
                              helperText="Formato: una línea para acordes, una línea para letra"
                            />
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Sección de estribillo - Modo estructurado */}
                    <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold text-green-900">
                          🔄 Estribillo (Opcional)
                        </h3>
                        <Button
                          variant={hasChorus ? "default" : "outline"}
                          size="sm"
                          onClick={handleToggleChorus}
                          className={
                            hasChorus ? "bg-green-600 hover:bg-green-700" : ""
                          }
                        >
                          {hasChorus ? "Desactivar" : "Activar"}
                        </Button>
                      </div>

                      {hasChorus ? (
                        <div className="space-y-4">
                          <p className="text-green-700 text-sm">
                            El estribillo se mostrará separado de las estrofas y
                            se puede repetir fácilmente.
                          </p>
                          <Textarea
                            label="Estribillo con acordes"
                            placeholder={`Sol          Do          Re
Cristo ha resucitado
Sol          Do          Re
¡Aleluya, aleluya!`}
                            value={chorusLines
                              .map(line => `${line.chord}\n${line.text}`)
                              .join("\n")}
                            onChange={e => updateChorus(e.target.value)}
                            rows={6}
                            className="font-mono text-sm"
                            error={
                              error && hasChorus && chorusLines.length === 0
                                ? error
                                : undefined
                            }
                            helperText="Formato: una línea para acordes, una línea para letra"
                          />
                        </div>
                      ) : (
                        <div className="text-center py-8">
                          <p className="text-green-600 mb-3">
                            ¿Esta canción tiene estribillo?
                          </p>
                          <p className="text-green-500 text-sm">
                            Activa esta opción para agregar el estribillo por
                            separado
                          </p>
                        </div>
                      )}
                    </div>
                  </>
                )}

                {/* Sección de información adicional */}
                <div className="bg-purple-50 border border-purple-200 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-purple-900 mb-4">
                    ℹ️ Información Adicional (Opcional)
                  </h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <Input
                      label="Tonalidad"
                      placeholder="Ej: Do, Sol, La menor, etc."
                      value={key}
                      onChange={e => setKey(e.target.value)}
                      helperText="La tonalidad principal de la canción"
                    />
                    <Input
                      label="Tempo"
                      placeholder="Ej: 120 BPM, Lento, Moderato, etc."
                      value={tempo}
                      onChange={e => setTempo(e.target.value)}
                      helperText="El tempo o velocidad de la canción"
                    />
                  </div>
                  <div className="mt-4">
                    <Input
                      label="Fuente/Origen"
                      placeholder="Ej: Himnario, Internet, Composición propia, etc."
                      value={source}
                      onChange={e => setSource(e.target.value)}
                      helperText="De dónde proviene la canción"
                    />
                  </div>
                </div>

                {/* Sección de categorías */}
                <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-indigo-900 mb-4">
                    🏷️ Categorías (Opcional)
                  </h3>
                  <p className="text-indigo-700 text-sm mb-4">
                    Selecciona las categorías que mejor describan tu canción
                    para facilitar la búsqueda.
                  </p>

                  {/* Partes de la Misa */}
                  <div className="mb-6">
                    <h4 className="text-md font-semibold text-indigo-800 mb-3">
                      🎵 Partes de la Misa
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {MASS_PARTS.map(part => (
                        <button
                          key={part}
                          onClick={() => handleMassPartToggle(part)}
                          className={`px-3 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                            selectedMassParts.includes(part)
                              ? "bg-cyan-600 text-white shadow-md"
                              : "bg-white text-indigo-700 hover:bg-indigo-100 border border-indigo-300"
                          }`}
                        >
                          {part}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Tiempo Litúrgico */}
                  <div className="mb-6">
                    <h4 className="text-md font-semibold text-indigo-800 mb-3">
                      ⏰ Tiempo Litúrgico
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {LITURGICAL_SEASONS.map(season => (
                        <button
                          key={season}
                          onClick={() => handleLiturgicalSeasonToggle(season)}
                          className={`px-3 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                            selectedLiturgicalSeasons.includes(season)
                              ? "bg-blue-600 text-white shadow-md"
                              : "bg-white text-indigo-700 hover:bg-indigo-100 border border-indigo-300"
                          }`}
                        >
                          {season}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Celebraciones Especiales */}
                  <div>
                    <h4 className="text-md font-semibold text-indigo-800 mb-3">
                      🎉 Celebraciones Especiales
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {SPECIAL_OCCASIONS.map(occasion => (
                        <button
                          key={occasion}
                          onClick={() => handleSpecialOccasionToggle(occasion)}
                          className={`px-3 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                            selectedSpecialOccasions.includes(occasion)
                              ? "bg-purple-600 text-white shadow-md"
                              : "bg-white text-indigo-700 hover:bg-indigo-100 border border-indigo-300"
                          }`}
                        >
                          {occasion}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex gap-4">
                  <Button
                    onClick={handleSave}
                    loading={loading}
                    disabled={
                      !title.trim() ||
                      (inputMode === "raw" && !rawText.trim()) ||
                      (inputMode === "structured" &&
                        !verses.some(v => v.lines.length > 0)) ||
                      (hasChorus && inputMode === "raw" && !rawChorus.trim()) ||
                      (hasChorus &&
                        inputMode === "structured" &&
                        chorusLines.length === 0)
                    }
                    className="flex-1"
                  >
                    Guardar Canción
                  </Button>
                  <Button
                    variant="outline"
                    onClick={handleClear}
                    disabled={
                      !title.trim() &&
                      !rawText.trim() &&
                      !rawChorus.trim() &&
                      !verses.some(v => v.lines.length > 0) &&
                      chorusLines.length === 0
                    }
                  >
                    Limpiar
                  </Button>
                </div>

                {saved && (
                  <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                    <p className="text-green-800 font-medium">
                      ✅ Canción guardada correctamente
                    </p>
                    <p className="text-green-600 text-sm mt-1">
                      La canción ya está disponible en el buscador y cancionero
                    </p>
                  </div>
                )}
              </div>

              {/* Instrucciones */}
              <div className="space-y-6">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-blue-900 mb-4">
                    📝 Instrucciones
                  </h3>
                  <ul className="space-y-3 text-blue-800">
                    <li className="flex items-start">
                      <span className="font-bold mr-2">1.</span>
                      <span>Escribe el título de la canción</span>
                    </li>
                    <li className="flex items-start">
                      <span className="font-bold mr-2">2.</span>
                      <span>
                        Elige el modo de entrada (texto libre o estructurado)
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="font-bold mr-2">3.</span>
                      <span>Agrega la letra con acordes</span>
                    </li>
                    <li className="flex items-start">
                      <span className="font-bold mr-2">4.</span>
                      <span>Si tiene estribillo, actívalo y agrégalo</span>
                    </li>
                    <li className="flex items-start">
                      <span className="font-bold mr-2">5.</span>
                      <span>Haz clic en &quot;Guardar Canción&quot;</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-amber-50 border border-amber-200 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-amber-900 mb-4">
                    ⚠️ Formato Requerido
                  </h3>
                  <div className="text-amber-800 text-sm space-y-2">
                    <p>
                      <strong>Línea 1:</strong> Acordes (Do, Re, Mi, etc.)
                    </p>
                    <p>
                      <strong>Línea 2:</strong> Letra de la canción
                    </p>
                    <p>
                      <strong>Línea 3:</strong> Acordes del siguiente verso
                    </p>
                    <p>
                      <strong>Línea 4:</strong> Letra del siguiente verso
                    </p>
                    <p className="text-xs mt-3">Y así sucesivamente...</p>
                  </div>
                </div>

                <div className="bg-purple-50 border border-purple-200 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-purple-900 mb-4">
                    🎯 Modos de Entrada
                  </h3>
                  <div className="space-y-3 text-purple-800 text-sm">
                    <div>
                      <strong>Texto Libre:</strong>
                      <p>
                        Pega todo el texto de la canción. Las estrofas se
                        detectarán automáticamente por líneas vacías.
                      </p>
                    </div>
                    <div>
                      <strong>Estructurado:</strong>
                      <p>
                        Organiza la canción por estrofas individuales. Mejor
                        control sobre la estructura.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-green-900 mb-4">
                    🔄 Sobre el Estribillo
                  </h3>
                  <ul className="space-y-2 text-green-800 text-sm">
                    <li>• El estribillo es opcional</li>
                    <li>• Se mostrará separado de la letra principal</li>
                    <li>• Facilita la repetición durante la interpretación</li>
                    <li>• Mantiene la misma estructura de acordes y letra</li>
                  </ul>
                </div>

                <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    💡 Consejos
                  </h3>
                  <ul className="space-y-2 text-gray-700 text-sm">
                    <li>
                      • Usa notación musical estándar (Do, Re, Mi, Fa, Sol, La,
                      Si)
                    </li>
                    <li>• Incluye sostenidos (#) cuando sea necesario</li>
                    <li>• Mantén el formato consistente</li>
                    <li>
                      • Las canciones se guardan localmente en tu navegador
                    </li>
                    <li>
                      • El estribillo se puede transponer independientemente
                    </li>
                    <li>
                      • El modo estructurado facilita la organización por
                      estrofas
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

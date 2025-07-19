"use client";

import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { STORAGE_KEYS } from "@/lib/constants";
import type { Song, LyricLine } from "@/types";

export default function AddSongPage() {
  const [title, setTitle] = useState("");
  const [rawText, setRawText] = useState("");
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function parseSong(raw: string): Song {
    const lines = raw.trim().split(/\n+/);
    const lyrics: LyricLine[] = [];
    
    for (let i = 0; i < lines.length; i++) {
      const chordLine = lines[i];
      const textLine = lines[i + 1] || "";
      lyrics.push({ chord: chordLine.trim(), text: textLine.trim() });
      i++;
    }
    
    return { 
      title: title.trim(), 
      lyrics,
      author: "Usuario",
      year: new Date().getFullYear(),
    };
  }

  function validateForm(): boolean {
    if (!title.trim()) {
      setError("El título es requerido");
      return false;
    }
    if (!rawText.trim()) {
      setError("La letra de la canción es requerida");
      return false;
    }
    setError("");
    return true;
  }

  function handleSave() {
    if (!validateForm()) return;
    
    setLoading(true);
    
    try {
      const song = parseSong(rawText);
      const stored = JSON.parse(localStorage.getItem(STORAGE_KEYS.CUSTOM_SONGS) || "[]");
      localStorage.setItem(STORAGE_KEYS.CUSTOM_SONGS, JSON.stringify([...stored, song]));
      
      setSaved(true);
      setRawText("");
      setTitle("");
      setError("");
      
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
    setError("");
    setSaved(false);
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-blue-50 to-cyan-100 animate-gradient bg-[length:400%_400%]">
      <Header />
      
      <main className="flex-1 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Agregar Nueva Canción
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Agrega tus propias canciones litúrgicas al cancionero. 
              Incluye los acordes y la letra para que otros puedan utilizarlas.
            </p>
          </div>

          <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl border border-white/50 p-8">
            <div className="grid md:grid-cols-2 gap-8">
              {/* Formulario */}
              <div className="space-y-6">
                <Input
                  label="Título de la canción"
                  placeholder="Ej: Gloria a Dios en las alturas"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  error={error && !rawText.trim() ? error : undefined}
                />

                <Textarea
                  label="Letra con acordes"
                  placeholder={`Do          Sol          La          Fa
Gloria a Dios en las alturas
Re          Sol          Do
Y paz en la tierra a los hombres

[Pega aquí el texto con acordes y letra]`}
                  value={rawText}
                  onChange={(e) => setRawText(e.target.value)}
                  rows={12}
                  className="font-mono text-sm"
                  error={error && !title.trim() ? error : undefined}
                  helperText="Formato: una línea para acordes, una línea para letra"
                />

                <div className="flex gap-4">
                  <Button
                    onClick={handleSave}
                    loading={loading}
                    disabled={!title.trim() || !rawText.trim()}
                    className="flex-1"
                  >
                    Guardar Canción
                  </Button>
                  <Button
                    variant="outline"
                    onClick={handleClear}
                    disabled={!title.trim() && !rawText.trim()}
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
                      La canción ya está disponible en el buscador
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
                      <span>Pega la letra con acordes en el formato indicado</span>
                    </li>
                    <li className="flex items-start">
                      <span className="font-bold mr-2">3.</span>
                      <span>Haz clic en "Guardar Canción"</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-amber-50 border border-amber-200 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-amber-900 mb-4">
                    ⚠️ Formato Requerido
                  </h3>
                  <div className="text-amber-800 text-sm space-y-2">
                    <p><strong>Línea 1:</strong> Acordes (Do, Re, Mi, etc.)</p>
                    <p><strong>Línea 2:</strong> Letra de la canción</p>
                    <p><strong>Línea 3:</strong> Acordes del siguiente verso</p>
                    <p><strong>Línea 4:</strong> Letra del siguiente verso</p>
                    <p className="text-xs mt-3">
                      Y así sucesivamente...
                    </p>
                  </div>
                </div>

                <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    💡 Consejos
                  </h3>
                  <ul className="space-y-2 text-gray-700 text-sm">
                    <li>• Usa notación musical estándar (Do, Re, Mi, Fa, Sol, La, Si)</li>
                    <li>• Incluye sostenidos (#) cuando sea necesario</li>
                    <li>• Mantén el formato consistente</li>
                    <li>• Las canciones se guardan localmente en tu navegador</li>
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

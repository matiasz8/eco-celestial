import React from "react";
import { Button } from "@/components/ui/Button";
import {
  MASS_PARTS,
  LITURGICAL_SEASONS,
  SPECIAL_OCCASIONS,
} from "@/lib/constants";
import type { SearchFilters } from "@/types";

interface SearchFiltersProps {
  filters: SearchFilters;
  onFilterChange: (filters: SearchFilters) => void;
  onClose: () => void;
}

export function SearchFilters({
  filters,
  onFilterChange,
  onClose,
}: SearchFiltersProps) {
  const updateFilter = (
    filterType: keyof SearchFilters,
    value: string,
    checked: boolean
  ) => {
    const currentFilters = filters[filterType];

    if (filterType === "liturgicalSeasons" && value === "Todos") {
      // Manejo especial para "Todos" en tiempo litúrgico
      const newFilters = checked ? ["Todos"] : [];
      onFilterChange({
        ...filters,
        [filterType]: newFilters,
      });
    } else if (
      filterType === "liturgicalSeasons" &&
      filters.liturgicalSeasons.includes("Todos")
    ) {
      // Si "Todos" está seleccionado y se selecciona una estación específica
      const newFilters = checked ? [value] : [];
      onFilterChange({
        ...filters,
        [filterType]: newFilters,
      });
    } else {
      // Comportamiento normal para otros filtros
      const newFilters = checked
        ? [...currentFilters, value]
        : currentFilters.filter(item => item !== value);

      onFilterChange({
        ...filters,
        [filterType]: newFilters,
      });
    }
  };

  const clearAllFilters = () => {
    onFilterChange({
      massParts: [],
      liturgicalSeasons: [],
      specialOccasions: [],
    });
  };

  const hasActiveFilters =
    filters.massParts.length > 0 ||
    filters.liturgicalSeasons.length > 0 ||
    filters.specialOccasions.length > 0;

  return (
    <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-white/50 p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-900">Filtros de Búsqueda</h2>
        <Button variant="ghost" size="sm" onClick={onClose}>
          ✕ Cerrar
        </Button>
      </div>

      <div className="space-y-6">
        {/* Partes de la Misa */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-3">
            🎵 Partes de la Misa
          </h3>
          <div className="flex flex-wrap gap-2">
            {MASS_PARTS.map(part => (
              <button
                key={part}
                onClick={() =>
                  updateFilter(
                    "massParts",
                    part,
                    !filters.massParts.includes(part)
                  )
                }
                className={`px-3 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  filters.massParts.includes(part)
                    ? "bg-cyan-600 text-white shadow-md"
                    : "bg-gray-200 text-gray-800 hover:bg-gray-300 border border-gray-300"
                }`}
              >
                {part}
              </button>
            ))}
          </div>
        </div>

        {/* Tiempo Litúrgico */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-3">
            ⏰ Tiempo Litúrgico
          </h3>
          <div className="flex flex-wrap gap-2">
            {LITURGICAL_SEASONS.map(season => (
              <button
                key={season}
                onClick={() =>
                  updateFilter(
                    "liturgicalSeasons",
                    season,
                    !filters.liturgicalSeasons.includes(season)
                  )
                }
                className={`px-3 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  filters.liturgicalSeasons.includes(season)
                    ? "bg-blue-600 text-white shadow-md"
                    : "bg-gray-200 text-gray-800 hover:bg-gray-300 border border-gray-300"
                }`}
              >
                {season}
              </button>
            ))}
          </div>
        </div>

        {/* Celebraciones Especiales */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-3">
            🎉 Celebraciones Especiales
          </h3>
          <div className="flex flex-wrap gap-2">
            {SPECIAL_OCCASIONS.map(occasion => (
              <button
                key={occasion}
                onClick={() =>
                  updateFilter(
                    "specialOccasions",
                    occasion,
                    !filters.specialOccasions.includes(occasion)
                  )
                }
                className={`px-3 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  filters.specialOccasions.includes(occasion)
                    ? "bg-purple-600 text-white shadow-md"
                    : "bg-gray-200 text-gray-800 hover:bg-gray-300 border border-gray-300"
                }`}
              >
                {occasion}
              </button>
            ))}
          </div>
        </div>

        {/* Acciones */}
        <div className="flex gap-3 pt-4 border-t border-gray-200">
          <Button
            variant="outline"
            onClick={clearAllFilters}
            disabled={!hasActiveFilters}
            className="flex-1"
          >
            Limpiar Filtros
          </Button>
          <Button onClick={onClose} className="flex-1">
            Aplicar Filtros
          </Button>
        </div>

        {/* Información */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h4 className="text-sm font-semibold text-blue-900 mb-2">
            💡 Cómo usar los filtros
          </h4>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• Selecciona múltiples filtros para refinar tu búsqueda</li>
            <li>• Los filtros se combinan con la búsqueda por texto</li>
            <li>• Usa &quot;Limpiar Filtros&quot; para empezar de nuevo</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

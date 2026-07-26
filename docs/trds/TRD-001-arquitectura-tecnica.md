# TRD-001: Arquitectura Técnica - Eco Celestial

## Información del Documento

| Campo | Valor |
|-------|-------|
| **ID** | TRD-001 |
| **Nombre** | Arquitectura Técnica |
| **Versión** | 1.0.0 |
| **Autor** | Eco Celestial Dev Team |
| **Fecha de Creación** | 2025-07-25 |

---

## 1. Resumen de Arquitectura

Eco Celestial utiliza una arquitectura **Jamstack** con Next.js 15 App Router, renderizado híbrido (SSR/SSG/CSR), y almacenamiento local del lado del cliente.

```
┌─────────────────────────────────────────────────────────────┐
│                      PRESENTATION LAYER                      │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐         │
│  │  Page Layer  │  │   Layouts   │  │ Components  │         │
│  │  (Routes)    │  │  (Shared)   │  │  (UI/Logic) │         │
│  └─────────────┘  └─────────────┘  └─────────────┘         │
├─────────────────────────────────────────────────────────────┤
│                      BUSINESS LOGIC                          │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐         │
│  │  Transpose   │  │   Search    │  │   Storage   │         │
│  │   Engine     │  │   Engine    │  │   Manager   │         │
│  └─────────────┘  └─────────────┘  └─────────────┘         │
├─────────────────────────────────────────────────────────────┤
│                       DATA LAYER                             │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐         │
│  │    Songs     │  │   Config    │  │   User      │         │
│  │   (Static)   │  │  (Constants)│  │  (localStorage)│      │
│  └─────────────┘  └─────────────┘  └─────────────┘         │
└─────────────────────────────────────────────────────────────┘
```

---

## 2. Stack Tecnológico

### 2.1 Frontend

| Tecnología | Versión | Propósito |
|------------|---------|-----------|
| Next.js | 15.3.x | Framework React con App Router |
| React | 19.x | Librería UI con Server Components |
| TypeScript | 5.x | Tipado estático |
| Tailwind CSS | 4.x | CSS utility-first framework |

### 2.2 Herramientas de Desarrollo

| Herramienta | Propósito |
|-------------|-----------|
| ESLint | Linting de código |
| Prettier | Formateo de código |
| Jest | Testing unitario |
| Turbopack | Bundler optimizado |

### 2.3 Dependencias Principales

```json
{
  "dependencies": {
    "@heroicons/react": "^2.2.0",
    "clsx": "^2.1.1",
    "next": "15.3.3",
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "tailwind-merge": "^3.3.1"
  }
}
```

---

## 3. Estructura del Proyecto

```
eco-celestial/
├── docs/                          # Documentación del proyecto
│   ├── prds/                      # Product Requirements Documents
│   ├── trds/                      # Technical Requirements Documents
│   ├── adr/                       # Architecture Decision Records
│   ├── use-cases/                 # Casos de uso
│   └── guides/                    # Guías y tutoriales
├── public/                        # Assets estáticos
├── src/
│   ├── app/                       # Next.js App Router
│   │   ├── layout.tsx            # Layout raíz
│   │   ├── page.tsx              # Página principal (Home)
│   │   ├── globals.css           # Estilos globales
│   │   ├── search/               # Ruta de búsqueda
│   │   │   ├── page.tsx
│   │   │   ├── songsChords.ts    # Datos de canciones
│   │   │   ├── songsList.ts      # Lista de canciones
│   │   │   └── transpose.ts      # Motor de transposición
│   │   ├── lyrics/               # Ruta de letras
│   │   │   ├── page.tsx
│   │   │   └── songs.ts          # Datos de canciones
│   │   ├── add/                  # Ruta para agregar canciones
│   │   │   └── page.tsx
│   │   └── edit/                 # Ruta para editar canciones
│   │       └── page.tsx
│   ├── components/               # Componentes React
│   │   ├── layout/               # Componentes de layout
│   │   │   ├── Header.tsx
│   │   │   └── Footer.tsx
│   │   ├── search/               # Componentes de búsqueda
│   │   │   ├── SearchFilters.tsx
│   │   │   ├── SearchResults.tsx
│   │   │   └── SongCard.tsx
│   │   └── ui/                   # Componentes UI genéricos
│   │       ├── Button.tsx
│   │       ├── Input.tsx
│   │       └── Textarea.tsx
│   ├── lib/                      # Utilidades y constantes
│   │   ├── constants.ts          # Constantes de la app
│   │   └── utils.ts              # Funciones utilitarias
│   └── types/                    # Definiciones TypeScript
│       └── index.ts
├── package.json
├── tsconfig.json
├── tailwind.config.ts
└── next.config.mjs
```

---

## 4. Arquitectura de Componentes

### 4.1 Jerarquía de Componentes

```
RootLayout (src/app/layout.tsx)
├── Header (components/layout/Header.tsx)
├── [Page Content]
│   ├── Home Page
│   │   ├── HeroSection
│   │   ├── FeatureCards
│   │   └── StatsSection
│   ├── Search Page
│   │   ├── SearchFilters
│   │   ├── SearchResults
│   │   └── SongCard
│   ├── Lyrics Page
│   │   ├── SearchFilters
│   │   ├── SearchResults
│   │   └── SongCard
│   ├── Add Song Page
│   │   ├── SongForm
│   │   └── CategorySelector
│   └── Edit Page
│       └── SongTable
└── Footer (components/layout/Footer.tsx)
```

### 4.2 Modelo de Datos

```typescript
// Tipos principales
interface Song {
  title: string;
  lyrics: LyricLine[];
  verses?: LyricLine[][];
  chorus?: LyricLine[];
  categories?: SongCategories;
  key?: string;
  tempo?: string;
  author?: string;
  year?: number;
  source?: string;
}

interface LyricLine {
  chord: string;
  text: string;
}

interface SongCategories {
  massParts?: string[];
  liturgicalSeasons?: string[];
  specialOccasions?: string[];
}

interface SearchFilters {
  massParts: string[];
  liturgicalSeasons: string[];
  specialOccasions: string[];
}

// Estados de transposición
interface TransposeOptions {
  offset: number;           // -12 a +12 semitonos
  useSpanishNotation: boolean;
}
```

---

## 5. Motor de Transposición

### 5.1 Algoritmo

```typescript
// Diagrama del flujo de transposición
┌─────────────────┐
│  Input: Chord   │
│  "C" + offset 2 │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Extract Root &  │
│ Suffix          │
│ Root: "C"       │
│ Suffix: ""      │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Normalize to    │
│ Spanish         │
│ "C" → "DO"      │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Find Index in   │
│ SPANISH_CHORDS  │
│ Index: 0        │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Calculate New   │
│ Index           │
│ (0 + 2) % 12 = 2│
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Map to New      │
│ Chord           │
│ "DO" → "RE"     │
└─────────────────┘
```

### 5.2 Tabla de Mapeo

| Index | Español | Inglés |
|-------|---------|--------|
| 0 | DO | C |
| 1 | DO# | C# |
| 2 | RE | D |
| 3 | RE# | D# |
| 4 | MI | E |
| 5 | FA | F |
| 6 | FA# | F# |
| 7 | SOL | G |
| 8 | SOL# | G# |
| 9 | LA | A |
| 10 | LA# | A# |
| 11 | SI | B |

---

## 6. Estrategia de Almacenamiento

### 6.1 LocalStorage Keys

```typescript
const STORAGE_KEYS = {
  CUSTOM_SONGS: "customSongs",        // Canciones del usuario
  USER_PREFERENCES: "userPreferences", // Configuraciones
  SEARCH_HISTORY: "searchHistory"      // Historial de búsqueda
};
```

### 6.2 Flujo de Datos

```
┌─────────────────────────────────────────────────────────┐
│                    USER INTERACTION                      │
└──────────────────────────┬──────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────┐
│                      REACT STATE                         │
│  useState/useEffect hooks                               │
└──────────────────────────┬──────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────┐
│                    BUSINESS LOGIC                        │
│  Transpose, Filter, Search functions                     │
└──────────────────────────┬──────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────┐
│                   PERSISTENCE LAYER                      │
│  localStorage (read/write)                              │
└─────────────────────────────────────────────────────────┘
```

---

## 7. Estrategia de Estilos

### 7.1 Sistema de Diseño

- **Framework:** Tailwind CSS 4
- **Colores principales:** Cyan (primary), Blue (secondary)
- **Gradientes:** Uso extensivo para backgrounds modernos
- **Componentes:** Glassmorphism (backdrop-blur + transparencia)

### 7.2 Paleta de Colores

```css
/* Gradientes principales */
--gradient-primary: linear-gradient(to right, #0891b2, #2563eb);
--gradient-bg: linear-gradient(to bottom right, white, #eff6ff, #cffafe);

/* Colores de acento */
--color-cyan-500: #06b6d4;
--color-blue-600: #2563eb;
--color-green-500: #22c55e;
--color-purple-500: #a855f7;
```

---

## 8. Performance y Optimización

### 8.1 Estrategias Implementadas

| Estrategia | Implementación |
|------------|----------------|
| Code Splitting | Next.js App Router (automático) |
| Lazy Loading | Dynamic imports para componentes pesados |
| Memoization | useMemo para cálculos pesados |
| Debounce | 300ms delay en búsquedas |
| Image Optimization | Next.js Image component |

### 8.2 Métricas Objetivo

| Métrica | Objetivo | Actual |
|---------|----------|--------|
| First Contentful Paint | < 1.5s | ~1.2s |
| Largest Contentful Paint | < 2.5s | ~2.0s |
| Time to Interactive | < 3.5s | ~2.8s |
| Total Bundle Size | < 500KB | ~350KB |

---

## 9. Testing Strategy

### 9.1 Niveles de Testing

```
┌─────────────────────────────────────┐
│         E2E Tests (10%)            │
│    Cypress / Playwright            │
├─────────────────────────────────────┤
│       Integration Tests (20%)      │
│    Component + Hook testing        │
├─────────────────────────────────────┤
│         Unit Tests (70%)           │
│    Functions, Utils, Logic         │
└─────────────────────────────────────┘
```

### 9.2 Áreas Críticas de Testing

1. **Motor de transposición** - Precisión matemática
2. **Filtros de búsqueda** - Combinaciones correctas
3. **Persistencia** - Lectura/escritura en localStorage
4. **Detección de estrofas** - Algoritmo de parsing

---

## 10. Consideraciones de Seguridad

| Riesgo | Mitigación |
|--------|------------|
| XSS via localStorage | Sanitización de inputs |
| Data corruption | Validación de esquemas |
| Storage quota | Manejo de errores graceful |

---

## 11. Decisiones Técnicas Clave

Ver **ADR-001** y **ADR-002** para decisiones de arquitectura.

---

*Documento generado automáticamente - Eco Celestial Dev Team*
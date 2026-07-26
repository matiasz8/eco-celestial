# Guía de Contribución - Eco Celestial

## Bienvenido

Gracias por contribuir a Eco Celestial. Este documento describe las directrices para contribuir al proyecto.

---

## 1. Configuración del Entorno de Desarrollo

### 1.1 Prerrequisitos

- **Node.js** >= 18.0.0
- **pnpm** >= 8.0.0 (recomendado) o npm >= 9.0.0
- **Git**

### 1.2 Instalación

```bash
# Clonar el repositorio
git clone https://github.com/tu-usuario/eco-celestial.git
cd eco-celestial

# Instalar dependencias
pnpm install

# Iniciar servidor de desarrollo
pnpm dev
```

El servidor estará disponible en `http://localhost:3000`

---

## 2. Estructura del Proyecto

```
src/
├── app/              # Páginas y rutas (Next.js App Router)
├── components/       # Componentes React
│   ├── layout/      # Header, Footer
│   ├── search/      # Búsqueda y filtros
│   └── ui/          # Componentes genéricos
├── lib/             # Utilidades y constantes
└── types/           # Definiciones TypeScript
```

---

## 3. Convenciones de Código

### 3.1 Nomenclatura

| Tipo | Convención | Ejemplo |
|------|------------|--------|
| Componentes | PascalCase | `SongCard.tsx` |
| Funciones | camelCase | `transposeSong()` |
| Constantes | UPPER_SNAKE_CASE | `STORAGE_KEYS` |
| Tipos/Interfaces | PascalCase | `Song`, `SearchFilters` |
| Archivos de páginas | page.tsx | `page.tsx` |

### 3.2 Componentes

```tsx
// Componente funcional con TypeScript
interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost';
  onClick?: () => void;
}

export function Button({ children, variant = 'primary', onClick }: ButtonProps) {
  return (
    <button
      className="btn"
      data-variant={variant}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
```

### 3.3 Estilos

- Usar **Tailwind CSS** para estilos
- Evitar `!important`
- Usar `cn()` o `clsx()` para clases condicionales

```tsx
import { cn } from '@/lib/utils';

<div className={cn(
  'base-class',
  isActive && 'active-class',
  isDisabled && 'disabled-class'
)} />
```

---

## 4. Flujo de Trabajo (Git Flow)

### 4.1 Branches

| Branch | Propósito |
|--------|-----------|
| `main` | Producción estable |
| `develop` | Desarrollo integrado |
| `feature/*` | Nuevas funcionalidades |
| `fix/*` | Corrección de bugs |
| `docs/*` | Cambios de documentación |

### 4.2 Proceso

```bash
# 1. Crear branch de feature
git checkout develop
git checkout -b feature/mi-nueva-funcionalidad

# 2. Desarrollar y commitear
git add .
git commit -m "feat: descripción del cambio"

# 3. Push y crear PR
git push origin feature/mi-nueva-funcionalidad

# 4. Crear Pull Request a develop
```

### 4.3 Convención de Commits

```
tipo(alcance): descripción corta

[opcional] descripción más detallada

[opcional] notas de pie de página / referencia a issues
```

**Tipos:**
- `feat`: Nueva funcionalidad
- `fix`: Corrección de bug
- `docs`: Documentación
- `style`: Estilos (no afecta lógica)
- `refactor`: Refactorización
- `test`: Tests
- `chore`: Tareas de mantenimiento

**Ejemplos:**
- `feat(search): agregar filtro por tiempo litúrgico`
- `fix(transpose): corregir manejo de acordes con bemol`
- `docs: actualizar PRD con nuevos requisitos`

---

## 5. Tests

### 5.1 Ejecutar Tests

```bash
# Todos los tests
pnpm test

# Con coverage
pnpm test:coverage

# Watch mode
pnpm test:watch
```

### 5.2 Escribir Tests

```typescript
// src/__tests__/transpose.test.ts
import { transposeSong } from '@/app/search/transpose';

describe('transposeSong', () => {
  it('should transpose chords by semitones', () => {
    const lyrics = [
      { chord: 'C', text: 'Hello' },
      { chord: 'G', text: 'World' }
    ];
    
    const result = transposeSong(lyrics, 2);
    
    expect(result[0].chord).toBe('D');
    expect(result[1].chord).toBe('A');
  });
});
```

---

## 6. Code Review Checklist

- [ ] El código compila sin errores
- [ ] Los tests pasan
- [ ] No hay errores de TypeScript
- [ ] El código es responsive
- [ ] Se ha probado en móvil y desktop
- [ ] La accesibilidad básica está cubierta
- [ ] Los nombres son descriptivos
- [ ] No hay código duplicado

---

## 7. Issues y Bugs

### Reportar un Bug

Al reportar un bug, incluir:
1. **Descripción** clara del problema
2. **Pasos para reproducir**
3. **Comportamiento esperado** vs **actual**
4. **Capturas de pantalla** si es posible
5. **Entorno** (navegador, SO, dispositivo)

### Solicitar Feature

1. **Descripción** de la funcionalidad
2. **Justificación** (por qué es útil)
3. **Casos de uso** específicos
4. **Alternativas consideradas**

---

## 8. Recursos

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [Tailwind CSS Documentation](https://tailwindcss.com)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)

---

*Guía actualizada: 2025-07-25*
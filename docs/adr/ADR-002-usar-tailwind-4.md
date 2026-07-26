# ADR-002: Uso de Tailwind CSS 4 como Framework de Estilos

## Estado

✅ **Aceptado**

## Fecha

2025-07-25

## Contexto

El proyecto necesita un sistema de estilos moderno, mantenible y con buen rendimiento. Las opciones consideradas fueron:

1. **Tailwind CSS 4** (utility-first)
2. **CSS Modules** (estilos scoped)
3. **Styled Components** (CSS-in-JS)
4. **Sass/SCSS** (preprocesador clásico)

## Decisión

Utilizar **Tailwind CSS 4** como framework principal de estilos, complementado con CSS globals para variables y animaciones.

## Justificación

### Ventajas de Tailwind CSS 4
- ✅ **Rendimiento:** CSS purgado automáticamente, sin CSS muerto
- ✅ **Consistencia:** Sistema de diseño unificado via utility classes
- ✅ **Velocidad de desarrollo:** No cambiar entre archivos de estilos
- ✅ **Soporte Next.js:** Integración nativa con @tailwindcss/postcss
- ✅ **Modo JIT:** Compilación just-in-time más rápida
- ✅ **Novedades v4:** Mejor rendimiento, CSS-first config, oxide engine

### Comparativa

| Característica | Tailwind 4 | CSS Modules | Styled Components |
|----------------|------------|-------------|-------------------|
| Rendimiento | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐ |
| Velocidad dev | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐⭐ |
| Mantenibilidad | ⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐ |
| Curva aprendizaje | ⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐ |
| Bundle size | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐ |

## Consecuencias

### Positivas
- Desarrollo más rápido con utility classes
- Consistencia visual automática
- Mejor rendimiento en producción
- Facilita el modo oscuro futuro

### Negativas
- HTML puede volverse "sucio" con muchas clases
- Curva de aprendizaje para nuevos desarrolladores
- Dependencia de la CLI de Tailwind

## Configuración Implementada

```typescript
// tailwind.config.ts
const config: Config = {
  content: [
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#0891b2',
      },
    },
  },
  plugins: [],
}
```

## Referencias

- [Tailwind CSS 4 Docs](https://tailwindcss.com/docs/v4-beta)
- [Next.js + Tailwind](https://nextjs.org/docs/app/building-your-application/styling/tailwind-css)

---

*ADR registrado por Eco Celestial Team*
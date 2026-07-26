# Matriz de Features - Eco Celestial

## Resumen de Funcionalidades

| ID | Feature | Prioridad | Estado | Complejidad | Dependencias |
|----|---------|-----------|--------|-------------|--------------|
| F-001 | Búsqueda por título | Alta | ✅ Completo | Baja | - |
| F-002 | Filtros por parte de misa | Alta | ✅ Completo | Media | F-001 |
| F-003 | Filtros por tiempo litúrgico | Alta | ✅ Completo | Media | F-001 |
| F-004 | Filtros por celebraciones | Media | ✅ Completo | Media | F-001 |
| F-005 | Transposición de acordes | Alta | ✅ Completo | Alta | - |
| F-006 | Notación española/inglesa | Alta | ✅ Completo | Baja | F-005 |
| F-007 | Vista maximizada | Media | ✅ Completo | Baja | - |
| F-008 | Ocultar/mostrar acordes | Media | ✅ Completo | Baja | - |
| F-009 | Agregar canciones | Alta | ✅ Completo | Media | - |
| F-010 | Editar canciones | Alta | ⚠️ Parcial | Media | F-009 |
| F-011 | Eliminar canciones | Alta | ⚠️ Parcial | Baja | F-009 |
| F-012 | Detección de estrofas | Media | ✅ Completo | Alta | - |
| F-013 | Gestión de estribillo | Media | ✅ Completo | Media | - |
| F-014 | Ajuste tamaño letra | Baja | ✅ Completo | Baja | - |
| F-015 | Ajuste ancho bloques | Baja | ✅ Completo | Baja | - |
| F-016 | Persistencia localStorage | Alta | ✅ Completo | Baja | - |
| F-017 | Diseño responsive | Alta | ✅ Completo | Media | - |

---

## Matriz de Impacto vs Esfuerzo

```
                    ALTO IMPACTO
                         │
         ┌───────────────┼───────────────┐
         │   QUICK WINS   │  MAJOR PROJECTS│
         │               │               │
         │  • Filtros    │  • Transposición│
         │  • Responsive │  • Detección   │
         │  • LocalStorage│   estrofas    │
 ALTO    │               │               │
 ESFUERZO├───────────────┼───────────────┤
         │  FILL-INS     │  THANKLESS TASKS│
         │               │               │
         │  • Ajuste    │  • Edit/Eliminar│
         │   letra      │   canciones    │
         │  • Ajuste    │               │
 BAJO    │   bloques    │               │
 ESFUERZO│               │               │
         └───────────────┼───────────────┘
                         │
                    BAJO IMPACTO
```

---

## Roadmap de Implementación

### Sprint 1: Core (Completado) ✅
- [x] Estructura del proyecto
- [x] Búsqueda básica
- [x] Vista de canciones con acordes
- [x] Transposición de acordes

### Sprint 2: Features (Completado) ✅
- [x] Filtros avanzados
- [x] Agregar canciones
- [x] Persistencia localStorage
- [x] Diseño responsive

### Sprint 3: Polish (En Progreso)
- [ ] Completar Edit/Eliminar
- [ ] Mejorar accesibilidad
- [ ] Rediseño vista canciones
- [ ] Modo oscuro

### Sprint 4: Advanced (Futuro)
- [ ] Exportar/Importar
- [ ] Modo offline
- [ ] Búsqueda avanzada
- [ ] Estadísticas de uso

---

*Matriz actualizada: 2025-07-25*
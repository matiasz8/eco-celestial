# PRD-001: Cancionero Litúrgico Digital - Eco Celestial

## Información del Documento

| Campo | Valor |
|-------|-------|
| **ID** | PRD-001 |
| **Nombre** | Cancionero Litúrgico Digital |
| **Versión** | 1.0.0 |
| **Estado** | En Desarrollo |
| **Autor** | Eco Celestial Team |
| **Fecha de Creación** | 2025-07-25 |
| **Última Actualización** | 2025-07-25 |
| **Stakeholders** | Músicos litúrgicos, Comunidades religiosas, Parroquias |

---

## 1. Resumen Ejecutivo

Eco Celestial es una plataforma web digital diseñada para facilitar la gestión, búsqueda y uso de canciones litúrgicas por parte de músicos y comunidades religiosas. La herramienta permite buscar canciones por múltiples criterios, transponer acordes automáticamente y gestionar una biblioteca personal de música sacra.

---

## 2. Objetivos

### 2.1 Objetivos Principales
- **Centralizar** el repertorio litúrgico de la parroquia en una plataforma digital accesible
- **Facilitar** la búsqueda de canciones por título, parte de la misa, tiempo litúrgico y celebraciones especiales
- **Simplificar** la transposición de acordes para diferentes tonalidades y voces
- **Permitir** a los usuarios agregar y gestionar sus propias canciones

### 2.2 Objetivos Secundarios
- Mejorar la experiencia de los músicos durante las celebraciones litúrgicas
- Reducir el tiempo de preparación de ensayos
- Crear un repositorio colaborativo de música sacra
- Soportar notación musical en español e inglés

---

## 3. Alcance

### 3.1 Incluido en el Alcance (MVP)
- ✅ Búsqueda de canciones por título
- ✅ Filtros por partes de la misa (Entrada, Ofertorio, Comunión, etc.)
- ✅ Filtros por tiempo litúrgico (Adviento, Cuaresma, Pascua, Tiempo Ordinario)
- ✅ Filtros por celebraciones especiales (Bautismos, Comuniones, Casamientos, etc.)
- ✅ Transposición de acordes (semitonos completos y medios)
- ✅ Alternancia entre notación española (Do, Re, Mi) e inglesa (C, D, E)
- ✅ Visualización de acordes sobre la letra
- ✅ Opción de ocultar/mostrar acordes
- ✅ Vista maximizada para presentación
- ✅ Gestión de canciones personales (CRUD básico)
- ✅ Almacenamiento local (localStorage)
- ✅ Diseño responsive

### 3.2 Fuera del Alcance (Futuras版本)
- ❌ Autenticación de usuarios
- ❌ Base de datos en la nube
- ❌ Funcionalidad multijugador en tiempo real
- ❌ Integración con instrumentos musicales
- ❌ Exportación a PDF/impresión
- ❌ Modo offline completo (PWA)
- ❌ API pública para terceros

---

## 4. Requisitos Funcionales

### 4.1 Búsqueda y Filtros

| ID | Requisito | Prioridad | Estado |
|----|-----------|-----------|--------|
| RF-001 | Búsqueda por título con autocompletado | Alta | ✅ Implementado |
| RF-002 | Filtro por partes de la misa | Alta | ✅ Implementado |
| RF-003 | Filtro por tiempo litúrgico | Alta | ✅ Implementado |
| RF-004 | Filtro por celebraciones especiales | Media | ✅ Implementado |
| RF-005 | Búsqueda combinada con múltiples filtros | Media | ✅ Implementado |
| RF-006 | Indicador de resultados encontrados | Baja | ✅ Implementado |

### 4.2 Visualización de Canciones

| ID | Requisito | Prioridad | Estado |
|----|-----------|-----------|--------|
| RF-010 | Visualización de acordes sobre la letra | Alta | ✅ Implementado |
| RF-011 | Opción de ocultar acordes | Media | ✅ Implementado |
| RF-012 | Vista maximizada sin distracciones | Media | ✅ Implementado |
| RF-013 | Detección automática de estrofas | Media | ✅ Implementado |
| RF-014 | Visualización separada del estribillo | Media | ✅ Implementado |
| RF-015 | Ajuste de tamaño de letra | Baja | ✅ Implementado |
| RF-016 | Ajuste de ancho de bloques | Baja | ✅ Implementado |

### 4.3 Transposición Musical

| ID | Requisito | Prioridad | Estado |
|----|-----------|-----------|--------|
| RF-020 | Transposición por semitonos completos (+/- 1) | Alta | ✅ Implementado |
| RF-021 | Transposición por medios semitonos (+/- 0.5) | Alta | ✅ Implementado |
| RF-022 | Rango de transposición: -12 a +12 semitonos | Alta | ✅ Implementado |
| RF-023 | Notación española (Do, Re, Mi, Fa, Sol, La, Si) | Alta | ✅ Implementado |
| RF-024 | Notación inglesa (C, D, E, F, G, A, B) | Alta | ✅ Implementado |
| RF-025 | Indicador visual del offset actual | Media | ✅ Implementado |
| RF-026 | Botón de reset para volver a tonalidad original | Media | ✅ Implementado |

### 4.4 Gestión de Canciones

| ID | Requisito | Prioridad | Estado |
|----|-----------|-----------|--------|
| RF-030 | Agregar nuevas canciones | Alta | ✅ Implementado |
| RF-031 | Modo de entrada: texto libre | Alta | ✅ Implementado |
| RF-032 | Modo de entrada: estructurado por estrofas | Alta | ✅ Implementado |
| RF-033 | Agregar estribillo opcional | Media | ✅ Implementado |
| RF-034 | Información adicional: tonalidad, tempo, fuente | Media | ✅ Implementado |
| RF-035 | Categorización con tags de filtros | Media | ✅ Implementado |
| RF-036 | Edición de canciones existentes | Alta | ⚠️ Parcial |
| RF-037 | Eliminación de canciones | Alta | ⚠️ Parcial |
| RF-038 | Persistencia en localStorage | Alta | ✅ Implementado |

---

## 5. Requisitos No Funcionales

### 5.1 Rendimiento

| ID | Requisito | Meta | Estado |
|----|-----------|------|--------|
| RNF-001 | Tiempo de carga inicial | < 3 segundos | ✅ Cumplido |
| RNF-002 | Tiempo de respuesta de búsqueda | < 300ms | ✅ Cumplido |
| RNF-003 | Tamaño del bundle inicial | < 500KB | ✅ Cumplido |

### 5.2 Usabilidad

| ID | Requisito | Meta | Estado |
|----|-----------|------|--------|
| RNF-010 | Compatibilidad con dispositivos móviles | 100% responsive | ✅ Cumplido |
| RNF-011 | Accesibilidad básica (WCAG 2.1 AA) | Parcial | ⚠️ En progreso |
| RNF-012 | Navegación intuitiva | Sin tutorial necesario | ✅ Cumplido |

### 5.3 Seguridad

| ID | Requisito | Meta | Estado |
|----|-----------|------|--------|
| RNF-020 | Almacenamiento seguro de datos locales | XSS protection | ✅ Cumplido |
| RNF-021 | Validación de entrada | Todas las entradas validadas | ✅ Cumplido |

---

## 6. User Stories

### 6.1 Músico Litúrgico

**Como músico litúrgico, quiero:**

1. **US-001:** Buscar rápidamente una canción por su título para encontrarla en segundos antes de la misa
   - *Criterio de aceptación:* La búsqueda muestra resultados en menos de 300ms

2. **US-002:** Filtrar canciones por parte de la misa (ej: "Comunión") para preparar el repertorio del domingo
   - *Criterio de aceptación:* Los filtros se aplican instantáneamente y muestran canciones relevantes

3. **US-003:** Transponer una canción a mi tonalidad (ej: de Do a Re) para adaptarla a mi voz
   - *Criterio de aceptación:* La transposición actualiza todos los acordes correctamente

4. **US-004:** Ver solo la letra sin acordes para cantar sin distracciones
   - *Criterio de aceptación:* Un botón toggle oculta/muestra los acordes

5. **US-005:** Maximizar la canción para proyectar en pantalla durante el ensayo
   - *Criterio de aceptación:* La vista maximizada ocupa toda la pantalla sin elementos distractores

### 6.2 Coordinador Musical

**Como coordinador musical, quiero:**

1. **US-010:** Agregar nuevas canciones al repertorio de la parroquia
   - *Criterio de aceptación:* El formulario permite ingresar título, letra, acordes y categorías

2. **US-011:** Organizar canciones por tiempo litúrgico para planificar el año litúrgico
   - *Criterio de aceptación:* Las categorías se aplican correctamente y son filtrables

3. **US-012:** Compartir el cancionero con otros músicos de la comunidad
   - *Criterio de aceptación:* (Futuro) Exportar/importar canciones

### 6.3 Músico Novato

**Como músico novato, quiero:**

1. **US-020:** Ver los acordes de manera clara sobre la letra para aprender la canción
   - *Criterio de aceptación:* Los acordes están alineados con la sílaba correspondiente

2. **US-021:** Cambiar la notación entre español e inglés según lo que esté acostumbrado
   - *Criterio de aceptación:* Un botón alterna entre "Do" y "C"

---

## 7. Métricas de Éxito

### 7.1 Métricas de Uso
- **DAU (Daily Active Users):** 50+ usuarios diarios en el primer mes
- **Tasa de Retención:** 60% de usuarios retornan después de 7 días
- **Tiempo Promedio de Sesión:** 5+ minutos

### 7.2 Métricas Técnicas
- **Lighthouse Score:** > 90 en todas las categorías
- **Tasa de Errores:** < 1% de sesiones con error
- **Tiempo de Carga:** < 2 segundos en 4G

---

## 8. Roadmap

### Fase 1: MVP (Completado)
- [x] Estructura base del proyecto
- [x] Búsqueda y filtros
- [x] Transposición de acordes
- [x] Gestión básica de canciones
- [x] Diseño responsive

### Fase 2: Mejoras UX (En Progreso)
- [ ] Rediseño de la vista de canciones (mejor legibilidad)
- [ ] Modo oscuro
- [ ] Accesibilidad mejorada (ARIA labels, navegación por teclado)
- [ ] Animaciones de transición suaves

### Fase 3: Funcionalidades Avanzadas (Futuro)
- [ ] Exportación a PDF para impresión
- [ ] Modo offline con Service Worker
- [ ] Sincronización entre dispositivos
- [ ] Compartir canciones vía enlace

### Fase 4: Escalabilidad (Futuro)
- [ ] Autenticación de usuarios
- [ ] Base de datos en la nube
- [ ] API REST para integraciones
- [ ] Aplicación móvil (React Native)

---

## 9. Restricciones y Dependencias

### 9.1 Restricciones Técnicas
- Datos almacenados solo en localStorage (sin persistencia en servidor)
- Límite de ~5MB en localStorage del navegador
- Sin soporte para multimedia (audio/video)

### 9.2 Dependencias Externas
- Next.js 15 (framework principal)
- React 19 (librería UI)
- Tailwind CSS 4 (estilos)
- Heroicons (iconos)

---

## 10. Glossario

| Término | Definición |
|---------|------------|
| **Transposición** | Proceso de cambiar la tonalidad de una canción moviendo todos los acordes por el mismo número de semitonos |
| **Tono** | Nota musical que funciona como centro de gravedad armónica de una canción |
| **Semitono** | La distancia más pequeña entre dos notas en la música occidental |
| **Estrofa** | Conjunto de versos que forman una unidad musical |
| **Estribillo** | Parte de la canción que se repite después de cada estrofa |
| **Tiempo Litúrgico** | Períodos del calendario litúrgico (Adviento, Navidad, Cuaresma, Pascua, Tiempo Ordinario) |
| **Parte de la Misa** | Secciones de la celebración eucarística (Entrada, Ofertorio, Comunión, etc.) |

---

## 11. Historial de Versiones

| Versión | Fecha | Cambios |
|---------|-------|---------|
| 1.0.0 | 2025-07-25 | Versión inicial con MVP completo |

---

*Documento generado automáticamente por Eco Celestial Team*
*Última actualización: 2025-07-25*
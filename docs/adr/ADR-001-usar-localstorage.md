# ADR-001: Uso de localStorage para Persistencia de Datos

## Estado

✅ **Aceptado**

## Fecha

2025-07-25

## Contexto

Eco Celestial necesita almacenar canciones personalizadas de los usuarios. Las opciones consideradas fueron:

1. **Base de datos en la nube** (Firebase, Supabase, MongoDB Atlas)
2. **localStorage del navegador**
3. **IndexedDB**
4. **JSON estático con API**

## Decisión

Utilizar **localStorage** como mecanismo principal de persistencia para datos de usuario (canciones personalizadas, preferencias).

## Justificación

### Ventajas
- ✅ **Simplicidad:** No requiere backend ni configuración de servidor
- ✅ **Costo cero:** Sin infraestructura ni servicios de terceros
- ✅ **Offline-first:** Funciona sin conexión a internet
- ✅ **Privacidad:** Los datos nunca salen del dispositivo del usuario
- ✅ **Velocidad:** Acceso sincrónico y rápido

### Desventajas
- ❌ **Límite de ~5MB** por dominio
- ❌ **Sin sincronización** entre dispositivos
- ❌ **Sin backup** automático
- ❌ **Se pierde** al limpiar datos del navegador

## Consecuencias

### Positivas
- Despliegue simplificado (solo archivos estáticos en Vercel)
- Sin costos de infraestructura backend
- Mayor privacidad para los usuarios

### Negativas
- Los usuarios pueden perder datos si limpian el navegador
- No hay forma de compartir canciones entre usuarios
- No hay backup automático

## Alternativas Consideradas

### Firebase (Rechazada)
- **Pros:** Sincronización en tiempo real, autenticación
- **Contras:** Vendor lock-in, costo a escala, complejidad innecesaria para MVP

### IndexedDB (Rechazada)
- **Pros:** Mayor capacidad, soporte para archivos grandes
- **Contras:** API más compleja, asíncrona, overkill para el caso de uso

## Mitigaciones

1. **Exportar/Importar JSON:** Funcionalidad futura para backup manual
2. **Documentación clara:** Informar a usuarios sobre la naturaleza del almacenamiento local
3. **Migración futura:** Arquitectura permite cambiar a backend sin refactor mayor

---

*ADR registrado por Eco Celestial Team*
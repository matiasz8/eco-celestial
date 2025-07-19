# Eco Celestial - Cancionero Litúrgico Digital

Una aplicación web moderna para buscar y gestionar canciones litúrgicas, desarrollada con Next.js 15 y TypeScript.

## 🎵 Características

- **Búsqueda inteligente**: Encuentra canciones por título, parte de la misa, tiempo litúrgico y celebraciones especiales
- **Transposición musical**: Transpone acordes automáticamente para adaptar las canciones a diferentes tonalidades
- **Notación dual**: Soporte para notación musical en español e inglés
- **Gestión personal**: Agrega y guarda tus propias canciones
- **Interfaz moderna**: Diseño responsive con animaciones suaves
- **Filtros avanzados**: Filtra por categorías litúrgicas específicas

## 🚀 Tecnologías

- **Framework**: Next.js 15 con App Router
- **Lenguaje**: TypeScript
- **Estilos**: Tailwind CSS v4
- **Iconos**: Heroicons
- **Estado**: React Hooks
- **Almacenamiento**: LocalStorage

## 📦 Instalación

1. **Clona el repositorio**

   ```bash
   git clone <repository-url>
   cd eco-celestial
   ```

2. **Instala las dependencias**

   ```bash
   pnpm install
   ```

3. **Ejecuta el servidor de desarrollo**

   ```bash
   pnpm dev
   ```

4. **Abre tu navegador**
   Navega a [http://localhost:3000](http://localhost:3000)

## 🛠️ Scripts Disponibles

```bash
pnpm dev          # Servidor de desarrollo con Turbopack
pnpm build        # Construcción para producción
pnpm start        # Servidor de producción
pnpm lint         # Verificación de código
pnpm format       # Formateo con Prettier
pnpm test         # Ejecutar tests
```

## 📁 Estructura del Proyecto

```
src/
├── app/
│   ├── layout.tsx          # Layout principal
│   ├── globals.css         # Estilos globales
│   ├── page.tsx            # Página principal
│   ├── search/             # Buscador de canciones
│   ├── add/                # Agregar canciones
│   └── lyrics/             # Vista de letras
├── components/             # Componentes reutilizables
├── lib/                    # Utilidades y helpers
├── types/                  # Definiciones de tipos
└── data/                   # Datos de canciones
```

## 🎼 Uso

### Buscar Canciones

1. Navega a la página principal
2. Escribe el nombre de la canción en el buscador
3. Usa los filtros para refinar la búsqueda por:
   - Partes de la misa (Entrada, Perdón, Aleluya, etc.)
   - Tiempo litúrgico (Adviento, Cuaresma, etc.)
   - Celebraciones especiales (Bautismos, Comuniones, etc.)

### Transponer Acordes

1. Selecciona una canción
2. Usa los botones de transposición para cambiar la tonalidad
3. Cambia entre notación española e inglesa

### Agregar Canciones

1. Ve a la página "Agregar Canción"
2. Completa el título y pega la letra con acordes
3. Guarda la canción para uso personal

## 🤝 Contribuir

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📝 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 🙏 Agradecimientos

- Comunidad litúrgica por las canciones
- Next.js por el framework
- Tailwind CSS por los estilos
- Heroicons por los iconos

---

Desarrollado con ❤️ para la comunidad litúrgica

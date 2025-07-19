import Link from "next/link";
import { MusicalNoteIcon } from "@heroicons/react/24/outline";

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-lg flex items-center justify-center">
                <MusicalNoteIcon className="w-4 h-4 text-white" />
              </div>
              <h3 className="text-xl font-bold">Eco Celestial</h3>
            </div>
            <p className="text-gray-400">
              Herramienta digital para la gestión y búsqueda de música litúrgica, 
              diseñada para músicos y comunidades religiosas.
            </p>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Navegación</h4>
            <ul className="space-y-2">
              <li><Link href="/search" className="text-gray-400 hover:text-white transition-colors">Buscar Canciones</Link></li>
              <li><Link href="/add" className="text-gray-400 hover:text-white transition-colors">Agregar Canción</Link></li>
              <li><Link href="/lyrics" className="text-gray-400 hover:text-white transition-colors">Ver Letras</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Tecnologías</h4>
            <ul className="space-y-2 text-gray-400">
              <li>Next.js 15</li>
              <li>TypeScript</li>
              <li>Tailwind CSS</li>
              <li>React 19</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2025 Eco Celestial. Desarrollado con ❤️ para la comunidad litúrgica.</p>
        </div>
      </div>
    </footer>
  );
} 
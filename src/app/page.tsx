import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import Link from 'next/link';
import {
  MagnifyingGlassIcon,
  PlusIcon,
  MusicalNoteIcon,
} from '@heroicons/react/24/outline';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-blue-50 to-cyan-100 animate-gradient bg-[length:400%_400%]">
      <Header />
      {/* Hero Section */}
      <main className="relative z-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Cancionero
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-blue-600">
                {' '}
                Litúrgico Digital
              </span>
            </h2>
            <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto">
              Encuentra, transponé y gestioná canciones litúrgicas con nuestra
              herramienta moderna diseñada para músicos y comunidades
              religiosas.
            </p>
            {/* Feature Cards */}
            <div className="grid md:grid-cols-3 gap-8 mb-16">
              <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-white/50">
                <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center mb-6 mx-auto">
                  <MagnifyingGlassIcon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  Búsqueda Inteligente
                </h3>
                <p className="text-gray-600">
                  Encuentra canciones por título, parte de la misa, tiempo
                  litúrgico y celebraciones especiales con filtros avanzados.
                </p>
              </div>
              <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-white/50">
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center mb-6 mx-auto">
                  <MusicalNoteIcon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  Transposición Musical
                </h3>
                <p className="text-gray-600">
                  Transpone acordes automáticamente para adaptar las canciones a
                  diferentes tonalidades y voces.
                </p>
              </div>
              <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-white/50">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center mb-6 mx-auto">
                  <PlusIcon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  Gestión Personal
                </h3>
                <p className="text-gray-600">
                  Agrega y guarda tus propias canciones para crear tu biblioteca
                  personal de música litúrgica.
                </p>
              </div>
            </div>
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/search"
                className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                <MagnifyingGlassIcon className="w-5 h-5 mr-2" />
                Buscar Canciones
              </Link>
              <Link
                href="/add"
                className="inline-flex items-center justify-center px-8 py-4 bg-white/80 backdrop-blur-sm text-gray-900 font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-white/50"
              >
                <PlusIcon className="w-5 h-5 mr-2" />
                Agregar Canción
              </Link>
            </div>
          </div>
        </div>
        {/* Stats Section */}
        <div className="bg-white/50 backdrop-blur-sm border-t border-white/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="grid md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-3xl font-bold text-cyan-600 mb-2">
                  100+
                </div>
                <div className="text-gray-600">Canciones Disponibles</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-blue-600 mb-2">12</div>
                <div className="text-gray-600">Categorías Litúrgicas</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-green-600 mb-2">24</div>
                <div className="text-gray-600">Tonalidades</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-purple-600 mb-2">∞</div>
                <div className="text-gray-600">Canciones Personales</div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

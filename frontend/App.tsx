import { useState } from 'react'
import DakarMap from './components/Map/DakarMap'
import RidersList from './components/RidersList'
import './index.css'

function App() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [showSidebar, setShowSidebar] = useState(true)

  const categories = [
    { id: 'all', name: 'Todos', emoji: '🏁' },
    { id: 'bike', name: 'Motos', emoji: '🏍️' },
    { id: 'car', name: 'Autos', emoji: '🚗' },
    { id: 'truck', name: 'Camiones', emoji: '🚛' },
    { id: 'quad', name: 'Quads', emoji: '🏎️' },
    { id: 'ssv', name: 'SSV', emoji: '🚙' }
  ]

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Header */}
      <header className="bg-gradient-to-r from-gray-800 to-gray-900 text-white p-4 shadow-2xl border-b border-gray-700">
        <div className="container mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-2">
              🏁 Dakar Live Tracker
            </h1>
            <p className="text-gray-400 text-sm">Open Source Real-time Rally Tracking</p>
          </div>
          
          <button
            onClick={() => setShowSidebar(!showSidebar)}
            className="lg:hidden bg-gray-700 px-4 py-2 rounded-lg hover:bg-gray-600 transition"
          >
            {showSidebar ? '✕' : '☰'} Pilotos
          </button>
        </div>
      </header>

      {/* Filtros de categoría */}
      <div className="bg-gray-800 border-b border-gray-700">
        <div className="container mx-auto px-4 py-3">
          <div className="flex gap-2 overflow-x-auto">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-all ${
                  selectedCategory === cat.id
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                <span className="mr-2">{cat.emoji}</span>
                {cat.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="container mx-auto p-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          {/* Mapa */}
          <div className={`${showSidebar ? 'lg:col-span-8' : 'lg:col-span-12'} transition-all`}>
            <div className="bg-gray-800 rounded-lg shadow-xl overflow-hidden">
              <div className="p-4 border-b border-gray-700">
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  🗺️ Mapa en Vivo - Etapa 1
                </h2>
                <p className="text-sm text-gray-400">Yanbu → Yanbu (29 km)</p>
              </div>
              <DakarMap height="calc(100vh - 300px)" />
            </div>
          </div>

          {/* Sidebar de pilotos */}
          {showSidebar && (
            <div className="lg:col-span-4">
              <div className="bg-gray-800 rounded-lg shadow-xl p-4 h-full">
                <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                  👥 Pilotos
                </h2>
                <div className="overflow-y-auto" style={{ maxHeight: 'calc(100vh - 320px)' }}>
                  <RidersList selectedCategory={selectedCategory} />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Warning */}
        <div className="mt-6 bg-yellow-900 bg-opacity-20 border border-yellow-600 rounded-lg p-4">
          <p className="text-yellow-200 text-sm flex items-center gap-2">
            <span>⚠️</span>
            <strong>Proyecto en desarrollo:</strong> Tracker no oficial del Dakar Rally. 
            Los datos se actualizarán cuando conectemos el scraper en vivo.
          </p>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-gray-400 text-center p-6 mt-8 border-t border-gray-700">
        <p className="mb-2">
          <strong className="text-white">Open Source Project</strong> | 
          No affiliated with ASO or Dakar Rally
        </p>
        <p className="text-sm">
          Built with ❤️ by the motorsport community | 
          <a href="#" className="text-blue-400 hover:text-blue-300 ml-2">GitHub</a>
        </p>
      </footer>
    </div>
  )
}

export default App

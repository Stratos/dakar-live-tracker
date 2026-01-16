import { useState } from 'react'
import DakarMap from './components/Map/DakarMap'
import RidersList from './components/RidersList'
import './index.css'

function App() {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [sidebarOpen, setSidebarOpen] = useState(true)

  const categories = [
    { id: 'all', name: 'Todos', emoji: '🏁', color: 'bg-gray-600' },
    { id: 'bike', name: 'Motos', emoji: '🏍️', color: 'bg-orange-500' },
    { id: 'car', name: 'Autos', emoji: '🚗', color: 'bg-blue-500' },
    { id: 'truck', name: 'Camiones', emoji: '🚛', color: 'bg-green-500' },
  ]

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      <header className="bg-white border-b border-gray-200 shadow-sm z-50">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-4">
            <h1 className="text-2xl font-bold text-gray-900">
              🏁 Dakar Live Tracker
            </h1>
            <span className="text-sm text-gray-500 hidden md:block">
              Open Source Real-time Rally Tracking
            </span>
          </div>
          
          <div className="flex items-center gap-4">
            <button className="text-sm text-gray-600 hover:text-gray-900">
              Contact Us
            </button>
            <button className="text-sm text-gray-600 hover:text-gray-900">
              Login
            </button>
          </div>
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden">
        {/* MAPA - Lado izquierdo */}
        <div className="flex-1 relative" style={{ minHeight: '500px' }}>
          <div className="absolute top-4 left-4 z-10 bg-white rounded-lg shadow-lg p-2 flex gap-2">
            <button className="px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded hover:bg-gray-50">
              Map
            </button>
            <button className="px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 rounded">
              Satellite
            </button>
          </div>

          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="absolute top-4 right-4 z-10 bg-white rounded-lg shadow-lg p-3 hover:bg-gray-50"
          >
            {sidebarOpen ? '▶' : '◀'}
          </button>

          {/* EL MAPA */}
          <div className="w-full h-full">
            <DakarMap height="100%" />
          </div>
        </div>

        {/* SIDEBAR - Lado derecho */}
        <div
          className={`bg-white border-l border-gray-200 shadow-xl transition-all duration-300 ${
            sidebarOpen ? 'w-96' : 'w-0 overflow-hidden'
          }`}
        >
          {sidebarOpen && (
            <div className="h-full flex flex-col">
              <div className="p-4 border-b border-gray-200">
                <input
                  type="text"
                  placeholder="Buscar piloto, equipo..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="flex-1 overflow-y-auto">
                <div className="p-4 border-b border-gray-200">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold text-gray-900">
                      👥 Pilotos
                    </h3>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {categories.map((cat) => (
                      <button
                        key={cat.id}
                        onClick={() => setSelectedCategory(cat.id)}
                        className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                          selectedCategory === cat.id
                            ? `${cat.color} text-white`
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                      >
                        <span className="mr-1">{cat.emoji}</span>
                        {cat.name}
                      </button>
                    ))}
                  </div>

                  <RidersList selectedCategory={selectedCategory} />
                </div>

                <div className="p-4 border-b border-gray-200">
                  <h3 className="font-semibold text-gray-900 mb-3">📍 Etapa Actual</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Etapa:</span>
                      <span className="font-medium">Prologue - Stage 1</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Ruta:</span>
                      <span className="font-medium">Yanbu → Yanbu</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Distancia:</span>
                      <span className="font-medium">29 km</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-yellow-50 border-t border-yellow-200">
                <p className="text-xs text-yellow-800">
                  ⚠️ Tracker no oficial. Datos en vivo durante el rally.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default App

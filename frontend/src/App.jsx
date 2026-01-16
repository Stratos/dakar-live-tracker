import { useState } from 'react'
import DakarMap from './components/Map/DakarMap'
import RidersList from './components/RidersList'
import './index.css'

function App() {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)

  const categories = [
    { id: 'all', name: 'All', icon: '🏁' },
    { id: 'bike', name: 'Bikes', icon: '🏍️' },
    { id: 'car', name: 'Cars', icon: '🚗' },
    { id: 'truck', name: 'Trucks', icon: '🚛' },
  ]

  return (
    <div className="h-screen flex flex-col">
      {/* Top Navigation - Tema Dakar (naranja/amarillo del desierto) */}
      <nav className="bg-gradient-to-r from-orange-600 to-amber-600 text-white px-6 py-3 flex items-center justify-between shadow-lg">
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-md">
              <span className="text-2xl">🏁</span>
            </div>
            <div>
              <span className="font-bold text-xl tracking-wide">DAKAR LIVE</span>
              <div className="text-xs text-orange-100">Rally Tracker 2027</div>
            </div>
          </div>
          
          <div className="hidden md:flex items-center gap-6 text-sm">
            <a href="#" className="hover:text-orange-100 transition">Live Standings</a>
            <a href="#" className="hover:text-orange-100 transition">Stage Results</a>
          </div>
        </div>

        <div className="flex items-center gap-4 text-sm">
          <button className="hover:text-orange-100 transition">Contact</button>
          <button className="bg-white text-orange-600 px-4 py-1.5 rounded-lg font-semibold hover:bg-orange-50 transition">
            Login
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Map Section */}
        <div className="flex-1 relative bg-gray-100">
          {/* Map Controls */}
          <div className="absolute top-4 left-4 z-[1000] bg-white rounded-lg shadow-lg">
            <div className="flex">
              <button className="px-4 py-2 text-sm font-medium bg-white text-gray-900 rounded-l-lg border-r border-gray-200 hover:bg-gray-50">
                Map
              </button>
              <button className="px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 rounded-r-lg">
                Satellite
              </button>
            </div>
          </div>

          {/* Toggle Sidebar */}
          <button
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className="absolute top-4 right-4 z-[1000] bg-white rounded-lg shadow-lg px-4 py-2 hover:bg-gray-50 text-gray-700 font-medium text-sm"
          >
            {sidebarCollapsed ? '◀ Show' : 'Hide ▶'}
          </button>

          {/* Map */}
          <div className="w-full h-full">
            <DakarMap height="100%" />
          </div>
        </div>

        {/* Sidebar */}
        <div 
          className={`bg-white border-l border-gray-200 shadow-xl transition-all duration-300 ${
            sidebarCollapsed ? 'w-0' : 'w-96'
          } overflow-hidden`}
        >
          <div className="h-full flex flex-col">
            {/* Search */}
            <div className="p-4 border-b border-gray-200 bg-gray-50">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search rider, team, number..."
                  className="w-full pl-4 pr-16 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
                <button className="absolute right-2 top-1/2 -translate-y-1/2 bg-orange-600 text-white px-4 py-1.5 rounded font-medium hover:bg-orange-700 transition text-sm">
                  Go
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto">
              {/* Riders */}
              <div className="border-b border-gray-200">
                <div className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-bold text-gray-900 flex items-center gap-2">
                      <span className="text-lg">📋</span>
                      <span>Riders</span>
                    </h3>
                    <button className="text-gray-400 hover:text-gray-600">
                      <span className="text-xl">−</span>
                    </button>
                  </div>

                  {/* Categories */}
                  <div className="flex items-center gap-2 mb-4">
                    {categories.map((cat) => (
                      <button
                        key={cat.id}
                        onClick={() => setSelectedCategory(cat.id)}
                        className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-semibold transition ${
                          selectedCategory === cat.id
                            ? 'bg-orange-600 text-white shadow-md'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        <span>{cat.icon}</span>
                        <span>{cat.name}</span>
                      </button>
                    ))}
                  </div>

                  <RidersList selectedCategory={selectedCategory} />
                </div>
              </div>

              {/* Stage Info */}
              <div className="border-b border-gray-200">
                <div className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-bold text-gray-900 flex items-center gap-2">
                      <span className="text-lg">📍</span>
                      <span>Current Stage</span>
                    </h3>
                    <button className="text-gray-400 hover:text-gray-600">
                      <span className="text-xl">−</span>
                    </button>
                  </div>

                  <div className="bg-gradient-to-r from-orange-50 to-amber-50 rounded-lg p-3 border border-orange-200">
                    <div className="font-bold text-gray-900 mb-1">Stage 1 - Prologue</div>
                    <div className="text-gray-600 text-sm">Yanbu → Yanbu</div>
                    <div className="text-gray-500 text-xs mt-2">Distance: 29 km</div>
                  </div>
                </div>
              </div>

              {/* Compare */}
              <div className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-bold text-gray-900 flex items-center gap-2">
                    <span className="text-lg">⚖️</span>
                    <span>Compare</span>
                  </h3>
                </div>

                <div className="bg-gray-50 rounded-lg p-4 text-center border border-gray-200">
                  <p className="text-sm text-gray-500 mb-2">No riders selected</p>
                  <button className="text-sm text-orange-600 font-semibold hover:text-orange-700">
                    Compare Favorites
                  </button>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="p-4 bg-yellow-50 border-t border-yellow-200">
              <p className="text-xs text-yellow-900">
                ⚠️ <strong>Unofficial Tracker</strong> - Data updates when scraper is live
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App

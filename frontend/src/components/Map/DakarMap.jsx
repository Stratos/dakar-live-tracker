import { useEffect, useState } from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import L from 'leaflet'
import { supabase } from '../../lib/supabase'
import 'leaflet/dist/leaflet.css'

// Fix iconos de Leaflet
delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
})

export default function DakarMap({ height = '600px' }) {
  const [positions, setPositions] = useState([])
  const [riders, setRiders] = useState(new Map())
  const [loading, setLoading] = useState(true)
  
  const stadiaApiKey = import.meta.env.VITE_STADIA_API_KEY

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    try {
      setLoading(true)
      
      const { data: ridersData } = await supabase.from('riders').select('*')
      const ridersMap = new Map()
      ridersData?.forEach(rider => ridersMap.set(rider.id, rider))
      setRiders(ridersMap)

      const { data: positionsData } = await supabase.from('latest_positions').select('*')
      setPositions(positionsData || [])
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div 
      style={{ height, width: '100%', position: 'relative' }} 
      className="rounded-lg overflow-hidden shadow-2xl"
    >
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-900 bg-opacity-75 z-[1000]">
          <div className="text-white text-xl">🏁 Cargando...</div>
        </div>
      )}
      
      <MapContainer
        center={[23.8859, 45.0792]}
        zoom={7}
        scrollWheelZoom={true}
        style={{ height: '100%', width: '100%' }}
        className="z-0"
      >
        <TileLayer
          url={`https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png?api_key=${stadiaApiKey}`}
          attribution='&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>'
          maxZoom={20}
          tileSize={256}
        />

        {positions.map((pos) => {
          const rider = riders.get(pos.rider_id)
          return (
            <Marker key={pos.id} position={[pos.latitude, pos.longitude]}>
              <Popup>
                <div className="p-2">
                  {rider && (
                    <>
                      <p className="font-bold text-lg">
                        #{rider.race_number} {rider.first_name} {rider.last_name}
                      </p>
                      <p className="text-xs uppercase text-gray-600">{rider.category}</p>
                      <hr className="my-1" />
                    </>
                  )}
                  <p><strong>⚡</strong> {pos.speed_kmh?.toFixed(1)} km/h</p>
                  <p className="text-xs text-gray-500">
                    {new Date(pos.timestamp).toLocaleTimeString('es-ES')}
                  </p>
                </div>
              </Popup>
            </Marker>
          )
        })}
      </MapContainer>

      <div className="absolute bottom-4 left-4 bg-black bg-opacity-90 text-white px-4 py-2 rounded-lg z-[1000] shadow-xl">
        <p className="font-bold">📍 {positions.length} pilotos</p>
      </div>
    </div>
  )
}

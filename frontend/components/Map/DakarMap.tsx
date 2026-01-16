import { useEffect, useState } from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import L from 'leaflet'
import { supabase } from '../../lib/supabase'

// Fix para los iconos de Leaflet
import icon from 'leaflet/dist/images/marker-icon.png'
import iconShadow from 'leaflet/dist/images/marker-shadow.png'

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41]
})

L.Marker.prototype.options.icon = DefaultIcon

interface Position {
  id: string
  rider_id: string
  latitude: number
  longitude: number
  timestamp: string
  speed_kmh?: number
}

interface DakarMapProps {
  stageId?: string
  height?: string
}

export default function DakarMap({ stageId, height = '600px' }: DakarMapProps) {
  const [positions, setPositions] = useState<Position[]>([])
  const [loading, setLoading] = useState(true)

  // Cargar posiciones iniciales
  useEffect(() => {
    loadPositions()
  }, [stageId])

  const loadPositions = async () => {
    try {
      setLoading(true)
      const query = supabase
        .from('latest_positions')
        .select('*')
      
      if (stageId) {
        query.eq('stage_id', stageId)
      }

      const { data, error } = await query

      if (error) {
        console.error('Supabase error:', error)
        setPositions([])
      } else {
        setPositions(data || [])
      }
    } catch (error) {
      console.error('Error loading positions:', error)
      setPositions([])
    } finally {
      setLoading(false)
    }
  }

  // Centro del mapa (Arabia Saudí - zona del Dakar)
  const center: [number, number] = [23.8859, 45.0792]

  return (
    <div style={{ height, width: '100%' }} className="relative">
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-[1000]">
          <div className="text-white text-xl">Cargando mapa...</div>
        </div>
      )}
      
      <MapContainer
        center={center}
        zoom={6}
        style={{ height: '100%', width: '100%' }}
        className="z-0"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {positions.map((pos) => (
          <Marker
            key={pos.id}
            position={[pos.latitude, pos.longitude]}
          >
            <Popup>
              <div>
                <p><strong>Rider ID:</strong> {pos.rider_id}</p>
                <p><strong>Velocidad:</strong> {pos.speed_kmh?.toFixed(1)} km/h</p>
                <p><strong>Tiempo:</strong> {new Date(pos.timestamp).toLocaleTimeString()}</p>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  )
}

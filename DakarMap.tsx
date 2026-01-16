import { useEffect, useState } from 'react'
import { MapContainer, TileLayer, Marker, Popup, ZoomControl } from 'react-leaflet'
import L from 'leaflet'
import { supabase } from '../../lib/supabase'

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

interface Rider {
  id: string
  race_number: number
  first_name: string
  last_name: string
  category: string
}

interface DakarMapProps {
  stageId?: string
  height?: string
}

export default function DakarMap({ height = '600px' }: DakarMapProps) {
  const [positions, setPositions] = useState<Position[]>([])
  const [riders, setRiders] = useState<Map<string, Rider>>(new Map())
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    try {
      setLoading(true)
      
      // Cargar riders
      const { data: ridersData } = await supabase
        .from('riders')
        .select('*')
      
      const ridersMap = new Map()
      ridersData?.forEach(rider => {
        ridersMap.set(rider.id, rider)
      })
      setRiders(ridersMap)

      // Cargar posiciones
      const { data: positionsData } = await supabase
        .from('latest_positions')
        .select('*')
      
      setPositions(positionsData || [])
    } catch (error) {
      console.error('Error loading data:', error)
    } finally {
      setLoading(false)
    }
  }

  const center: [number, number] = [23.8859, 45.0792]

  return (
    <div style={{ height, width: '100%' }} className="relative rounded-lg overflow-hidden">
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-900 bg-opacity-75 z-[1000]">
          <div className="text-white text-xl">🏁 Cargando posiciones...</div>
        </div>
      )}
      
      <MapContainer
        center={center}
        zoom={7}
        style={{ height: '100%', width: '100%' }}
        zoomControl={false}
      >
        {/* Mejor tile provider - Esri World Imagery (satelite) */}
        <TileLayer
          url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
          attribution='Tiles &copy; Esri'
          maxZoom={18}
        />
        
        {/* Overlay con nombres de lugares */}
        <TileLayer
          url="https://server.arcgisonline.com/ArcGIS/rest/services/Reference/World_Boundaries_and_Places/MapServer/tile/{z}/{y}/{x}"
          attribution='Labels &copy; Esri'
          maxZoom={18}
        />

        <ZoomControl position="topright" />

        {/* Marcadores */}
        {positions.map((pos) => {
          const rider = riders.get(pos.rider_id)
          return (
            <Marker
              key={pos.id}
              position={[pos.latitude, pos.longitude]}
            >
              <Popup>
                <div className="p-2">
                  {rider && (
                    <>
                      <p className="font-bold text-lg">
                        #{rider.race_number} {rider.first_name} {rider.last_name}
                      </p>
                      <p className="text-sm text-gray-600">{rider.category.toUpperCase()}</p>
                      <hr className="my-2" />
                    </>
                  )}
                  <p><strong>Velocidad:</strong> {pos.speed_kmh?.toFixed(1)} km/h</p>
                  <p className="text-xs text-gray-500">
                    {new Date(pos.timestamp).toLocaleTimeString('es-ES')}
                  </p>
                </div>
              </Popup>
            </Marker>
          )
        })}
      </MapContainer>

      {/* Info overlay */}
      <div className="absolute bottom-4 left-4 bg-black bg-opacity-75 text-white p-3 rounded-lg z-[1000] text-sm">
        <p className="font-bold">📍 {positions.length} pilotos en el mapa</p>
        <p className="text-xs text-gray-300">Click en los marcadores para más info</p>
      </div>
    </div>
  )
}

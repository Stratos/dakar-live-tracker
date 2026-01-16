import { useEffect, useState } from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'

interface Position {
  id: string
  rider_id: string
  latitude: number
  longitude: number
  speed_kmh?: number
}

export default function DakarMap({ height = '600px' }: { height?: string }) {
  const [positions, setPositions] = useState<Position[]>([])

  useEffect(() => {
    // Datos hardcodeados de prueba
    setPositions([
      { id: '1', rider_id: 'Carlos Sainz', latitude: 23.8859, longitude: 45.0792, speed_kmh: 95.5 },
      { id: '2', rider_id: 'Nasser Al-Attiyah', latitude: 23.9200, longitude: 45.1500, speed_kmh: 102.3 },
      { id: '3', rider_id: 'Stéphane Peterhansel', latitude: 23.8500, longitude: 45.0500, speed_kmh: 98.7 },
    ])
  }, [])

  return (
    <div style={{ height, width: '100%' }}>
      <MapContainer
        center={[23.8859, 45.0792]}
        zoom={8}
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        {positions.map((pos) => (
          <Marker key={pos.id} position={[pos.latitude, pos.longitude]}>
            <Popup>
              <b>{pos.rider_id}</b>
              <br />
              {pos.speed_kmh} km/h
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  )
}

import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'

export default function RidersList({ onRiderSelect, selectedCategory }) {
  const [riders, setRiders] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadRiders()
  }, [selectedCategory])

  const loadRiders = async () => {
    try {
      setLoading(true)
      let query = supabase.from('riders').select('*').order('race_number')
      
      if (selectedCategory && selectedCategory !== 'all') {
        query = query.eq('category', selectedCategory)
      }

      const { data } = await query
      setRiders(data || [])
    } catch (error) {
      console.error('Error loading riders:', error)
    } finally {
      setLoading(false)
    }
  }

  const getCategoryColor = (category) => {
    const colors = {
      bike: 'bg-orange-500',
      car: 'bg-blue-500',
      truck: 'bg-green-500',
      quad: 'bg-purple-500',
      ssv: 'bg-pink-500'
    }
    return colors[category] || 'bg-gray-500'
  }

  const getCategoryEmoji = (category) => {
    const emojis = {
      bike: '🏍️',
      car: '🚗',
      truck: '🚛',
      quad: '🏎️',
      ssv: '🚙'
    }
    return emojis[category] || '🏁'
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-gray-600">Cargando pilotos...</div>
      </div>
    )
  }

  return (
    <div className="space-y-2">
      {riders.map((rider) => (
        <div
          key={rider.id}
          onClick={() => onRiderSelect?.(rider.id)}
          className="bg-white hover:bg-gray-50 p-3 rounded-lg cursor-pointer transition-all border border-gray-200 hover:border-gray-300 shadow-sm"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 ${getCategoryColor(rider.category)} rounded-full flex items-center justify-center text-2xl`}>
                {getCategoryEmoji(rider.category)}
              </div>
              <div>
                <p className="text-gray-900 font-semibold">
                  #{rider.race_number} {rider.first_name} {rider.last_name}
                </p>
                <p className="text-xs text-gray-500">{rider.team}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-xs text-gray-500 uppercase">{rider.category}</p>
              <p className="text-xs text-gray-400">{rider.nationality}</p>
            </div>
          </div>
        </div>
      ))}
      
      {riders.length === 0 && (
        <div className="text-center text-gray-500 py-8">
          No hay pilotos en esta categoría
        </div>
      )}
    </div>
  )
}

import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'

export default function RidersList({ selectedCategory }) {
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
      console.error('Error:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return <div className="text-center py-4 text-gray-500 text-sm">Loading riders...</div>
  }

  if (riders.length === 0) {
    return <div className="text-center py-4 text-gray-500 text-sm">No riders in this category</div>
  }

  return (
    <div className="space-y-2">
      {riders.map((rider) => (
        <div
          key={rider.id}
          className="p-3 bg-gray-50 hover:bg-gray-100 rounded-lg cursor-pointer transition border border-gray-200"
        >
          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium text-gray-900 text-sm">
                #{rider.race_number} {rider.first_name} {rider.last_name}
              </div>
              <div className="text-xs text-gray-500 mt-0.5">{rider.team}</div>
            </div>
            <div className="text-right">
              <div className="text-xs font-medium text-gray-600 uppercase">{rider.category}</div>
              <div className="text-xs text-gray-400">{rider.nationality}</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

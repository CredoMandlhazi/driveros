import React, { useState, useRef } from 'react'
import { NominatimPlace } from '../types'

interface Props { onResult: (r: NominatimPlace) => void }

const SearchBar: React.FC<Props> = ({ onResult }) => {
  const [query,   setQuery]   = useState('')
  const [results, setResults] = useState<NominatimPlace[]>([])
  const [loading, setLoading] = useState(false)
  const [open,    setOpen]    = useState(false)
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const search = (q: string) => {
    if (q.length < 2) { setResults([]); setOpen(false); return }
    setLoading(true)
    if (debounceRef.current) clearTimeout(debounceRef.current)
    debounceRef.current = setTimeout(async () => {
      try {
        const res  = await fetch(
          `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(q)}&countrycodes=za&limit=6&addressdetails=1`,
          { headers: { 'Accept-Language': 'en-ZA,en' } }
        )
        const data: NominatimPlace[] = await res.json()
        setResults(data)
        setOpen(data.length > 0)
      } catch (_) { setResults([]) }
      setLoading(false)
    }, 350)
  }

  const pick = (r: NominatimPlace) => {
    setQuery(r.display_name.split(',')[0])
    setOpen(false); setResults([])
    onResult(r)
  }

  const icon = (type: string) => {
    if (type?.includes('fuel') || type?.includes('station')) return '⛽'
    if (type?.includes('restaurant') || type?.includes('food'))  return '🍽️'
    if (type?.includes('hospital') || type?.includes('clinic'))  return '🏥'
    if (type?.includes('park') || type?.includes('parking'))     return '🅿️'
    if (type?.includes('road') || type?.includes('motorway'))    return '🛣️'
    return '📍'
  }

  return (
    <div className="relative">
      <div className="search-bar">
        {loading
          ? <svg width={18} height={18} viewBox="0 0 24 24" fill="none"
              className="stroke-gray-400 animate-spin-slow flex-shrink-0" strokeWidth={2.5} strokeLinecap="round">
              <path d="M21 12a9 9 0 1 1-6.219-8.56" />
            </svg>
          : <svg width={18} height={18} viewBox="0 0 24 24" fill="none"
              className="stroke-gray-400 flex-shrink-0" strokeWidth={2.5} strokeLinecap="round">
              <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
        }
        <input
          value={query}
          onChange={(e) => { setQuery(e.target.value); search(e.target.value) }}
          onFocus={() => results.length > 0 && setOpen(true)}
          placeholder="Hi Thabo, where to?"
          className="search-input"
        />
        {query.length > 0 && (
          <button
            onClick={() => { setQuery(''); setResults([]); setOpen(false) }}
            className="border-none bg-transparent text-gray-400 p-0 leading-none cursor-pointer"
          >
            <svg width={16} height={16} viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth={2.5} strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        )}
      </div>

      {open && (
        <div className="search-dropdown">
          {results.map((r, i) => (
            <div
              key={r.place_id}
              onClick={() => pick(r)}
              className={`search-result-row ${i < results.length - 1 ? 'border-b border-gray-100 dark:border-gray-800' : ''}`}
            >
              <span className="text-[18px] flex-shrink-0">{icon(r.type || r.class)}</span>
              <div className="flex-1 min-w-0">
                <p className="text-[14px] font-semibold text-gray-900 dark:text-white truncate">
                  {r.display_name.split(',')[0]}
                </p>
                <p className="text-[11px] text-gray-400 dark:text-gray-500 mt-0.5 truncate">
                  {r.display_name.split(',').slice(1, 3).join(',')}
                </p>
              </div>
              <svg width={12} height={12} viewBox="0 0 24 24" fill="none"
                className="stroke-gray-300 dark:stroke-gray-600" strokeWidth={2.5} strokeLinecap="round">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default SearchBar

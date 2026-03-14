import React, { useEffect, useRef } from 'react'
import { useLeaflet } from '../hooks/useLeaflet'
import { NominatimPlace } from '../types'

interface Props {
  sosActive: boolean
  sosCoords?: [number, number]
  searchResult: NominatimPlace | null
}

const LiveMap: React.FC<Props> = ({ sosActive, sosCoords, searchResult }) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const { mapRef, posRef, ready } = useLeaflet(containerRef)
  const sosLineRef    = useRef<any>(null)
  const sosMkrRef     = useRef<any>(null)
  const searchMkrRef  = useRef<any>(null)

  /* SOS route overlay */
  useEffect(() => {
    const L   = (window as any).L
    const map = mapRef.current
    if (!L || !map) return
    ;[sosLineRef, sosMkrRef].forEach((r) => {
      if (r.current) { try { map.removeLayer(r.current) } catch (_) {} r.current = null }
    })
    if (sosActive) {
      const dest: [number, number] = sosCoords || [posRef.current[0] + 0.012, posRef.current[1] + 0.012]
      sosLineRef.current = L.polyline([posRef.current, dest], {
        color: '#D0021B', weight: 4, dashArray: '8 5',
      }).addTo(map)
      sosMkrRef.current = L.marker(dest, {
        icon: L.divIcon({
          className: '',
          html: `<div style="width:28px;height:28px;border-radius:50%;background:#D0021B;
            border:3px solid white;display:flex;align-items:center;justify-content:center;">
            <svg width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='white'
              stroke-width='3' stroke-linecap='round'>
              <line x1='12' y1='5' x2='12' y2='19'/>
              <line x1='5' y1='12' x2='19' y2='12'/>
            </svg></div>`,
          iconSize: [28, 28], iconAnchor: [14, 14],
        }),
      }).addTo(map)
      map.fitBounds([posRef.current, dest], { padding: [80, 80] })
    }
  }, [sosActive, sosCoords, mapRef, posRef])

  /* Search flyTo */
  useEffect(() => {
    const L   = (window as any).L
    const map = mapRef.current
    if (!L || !map || !searchResult) return
    if (searchMkrRef.current) { try { map.removeLayer(searchMkrRef.current) } catch (_) {} searchMkrRef.current = null }
    const ll: [number, number] = [parseFloat(searchResult.lat), parseFloat(searchResult.lon)]
    searchMkrRef.current = L.marker(ll, {
      icon: L.divIcon({
        className: '',
        html: `<div style="background:#B8914E;border:2px solid white;width:14px;height:14px;
          border-radius:50%;box-shadow:0 2px 8px rgba(0,0,0,0.3)"></div>`,
        iconSize: [14, 14], iconAnchor: [7, 7],
      }),
    })
      .bindPopup(`<b style="font-family:sans-serif;font-size:13px">${searchResult.display_name.split(',')[0]}</b>`)
      .addTo(map)
    map.flyTo(ll, 15, { duration: 1.2 })
    searchMkrRef.current.openPopup()
  }, [searchResult, mapRef])

  return (
    <>
      {!ready && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-950">
          <svg width={32} height={32} viewBox="0 0 24 24" fill="none"
            className="stroke-gray-300 dark:stroke-gray-600 animate-spin-slow" strokeWidth={2} strokeLinecap="round">
            <path d="M21 12a9 9 0 1 1-6.219-8.56" />
          </svg>
        </div>
      )}
      <div ref={containerRef} className="absolute inset-0 z-0" />
    </>
  )
}

export default LiveMap

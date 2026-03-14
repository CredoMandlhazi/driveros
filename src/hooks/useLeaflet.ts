import { useEffect, useRef, useState, RefObject } from 'react'
import { useTheme } from '../context/ThemeContext'

const TILE_LIGHT = 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png'
const TILE_DARK  = 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png'

export const useLeaflet = (containerRef: RefObject<HTMLDivElement | null>) => {
  const { isDark } = useTheme()
  const mapRef     = useRef<any>(null)
  const tileRef    = useRef<any>(null)
  const markerRef  = useRef<any>(null)
  const posRef     = useRef<[number, number]>([-26.2041, 28.0473])
  const [ready, setReady] = useState(!!(window as any).L)

  /* Load Leaflet from CDN */
  useEffect(() => {
    if ((window as any).L) { setReady(true); return }
    const link   = document.createElement('link')
    link.rel     = 'stylesheet'
    link.href    = 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.css'
    document.head.appendChild(link)
    const sc     = document.createElement('script')
    sc.src       = 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.js'
    sc.onload    = () => setReady(true)
    document.head.appendChild(sc)
  }, [])

  /* Init map */
  useEffect(() => {
    const L = (window as any).L
    if (!ready || !L || !containerRef.current || mapRef.current) return

    const map = L.map(containerRef.current, { zoomControl: false, attributionControl: false })
    tileRef.current = L.tileLayer(isDark ? TILE_DARK : TILE_LIGHT, {
      maxZoom: 19, subdomains: 'abcd',
    }).addTo(map)

    const dotIcon = L.divIcon({
      className: '',
      html: `<div style="width:18px;height:18px;border-radius:50%;background:#007AFF;
        border:3px solid white;box-shadow:0 0 0 8px rgba(0,122,255,0.18);"></div>`,
      iconSize: [18, 18], iconAnchor: [9, 9],
    })

    const mk = L.marker(posRef.current, { icon: dotIcon, zIndexOffset: 1000 }).addTo(map)
    map.setView(posRef.current, 14)
    markerRef.current = mk
    mapRef.current    = map

    if (navigator.geolocation) {
      navigator.geolocation.watchPosition(
        (p) => {
          const ll: [number, number] = [p.coords.latitude, p.coords.longitude]
          posRef.current = ll
          mk.setLatLng(ll)
          map.setView(ll, 14)
        },
        () => {},
        { enableHighAccuracy: true, maximumAge: 5000 }
      )
    }

    return () => { try { map.remove() } catch (_) {} mapRef.current = null }
  }, [ready])

  /* Swap tile on dark toggle */
  useEffect(() => {
    const L   = (window as any).L
    const map = mapRef.current
    if (!L || !map) return
    if (tileRef.current) { try { map.removeLayer(tileRef.current) } catch (_) {} }
    tileRef.current = L.tileLayer(isDark ? TILE_DARK : TILE_LIGHT, {
      maxZoom: 19, subdomains: 'abcd',
    }).addTo(map)
  }, [isDark])

  return { mapRef, posRef, ready }
}

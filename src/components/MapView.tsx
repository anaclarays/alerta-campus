import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { ufpeLocations } from "@/data/ufpeLocations";
import locationMarker from "@/assets/location-marker.png";

declare const L: any;

interface MapViewProps {
  onLocationClick?: (locationId: string) => void;
}

export default function MapView({ onLocationClick }: MapViewProps) {
  const navigate = useNavigate();
  const mapRef = useRef<any>(null);
  const markerRef = useRef<any>(null);
  const locationMarkersRef = useRef<any[]>([]);

  useEffect(() => {
    if (!mapRef.current) {
      // Inicializa o mapa
      mapRef.current = L.map("map").setView([-8.05, -34.95], 15);

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 19,
        attribution: "&copy; OpenStreetMap contributors",
      }).addTo(mapRef.current);

      // Adiciona marcadores dos centros acadêmicos
      ufpeLocations.forEach((location) => {
        const customIcon = L.icon({
          iconUrl: locationMarker,
          iconSize: [32, 40],
          iconAnchor: [16, 40],
          popupAnchor: [0, -40],
        });

        const marker = L.marker(location.coordinates, { icon: customIcon })
          .addTo(mapRef.current)
          .on('click', () => {
            if (onLocationClick) {
              onLocationClick(location.id);
            } else {
              navigate(`/relatos/${location.id}`);
            }
          });

        locationMarkersRef.current.push(marker);
      });
    }

    // Observa a localização continuamente
    const watchId = navigator.geolocation.watchPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;

        // Ícone personalizado para a localização do usuário (ponto azul pulsante)
        const userIcon = L.divIcon({
          className: 'user-location-marker',
          html: `
            <div style="
              position: relative;
              width: 20px;
              height: 20px;
            ">
              <div style="
                position: absolute;
                inset: 0;
                background: rgba(59, 130, 246, 0.3);
                border-radius: 50%;
                animation: pulse 2s ease-in-out infinite;
              "></div>
              <div style="
                position: absolute;
                inset: 4px;
                background: #3B82F6;
                border-radius: 50%;
                border: 3px solid white;
                box-shadow: 0 2px 8px rgba(0,0,0,0.3);
              "></div>
            </div>
          `,
          iconSize: [20, 20],
          iconAnchor: [10, 10],
        });

        // Se ainda não existe marcador → cria
        if (!markerRef.current) {
          markerRef.current = L.marker([latitude, longitude], { icon: userIcon }).addTo(
            mapRef.current
          );
          mapRef.current.setView([latitude, longitude], 16);
        } else {
          // Atualiza posição do marcador
          markerRef.current.setLatLng([latitude, longitude]);
        }
      },
      (err) => {
        console.error("Erro ao obter localização:", err);
      },
      {
        enableHighAccuracy: true,
        maximumAge: 1000,
        timeout: 10000,
      }
    );

    // Cleanup quando o componente desmontar
    return () => {
      navigator.geolocation.clearWatch(watchId);
    };
  }, [navigate, onLocationClick]);

  return (
    <>
      <style>{`
        @keyframes pulse {
          0%, 100% {
            transform: scale(1);
            opacity: 1;
          }
          50% {
            transform: scale(2);
            opacity: 0;
          }
        }
      `}</style>
      <div
        id="map"
        style={{
          height: "100%",
          width: "100%",
          overflow: "hidden",
        }}
      ></div>
    </>
  );
}

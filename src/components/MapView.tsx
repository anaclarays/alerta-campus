import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, X } from "lucide-react";
import { ufpeLocations } from "@/data/ufpeLocations";
import { Input } from "@/components/ui/input";
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
  const [searchQuery, setSearchQuery] = useState("");
  const [showResults, setShowResults] = useState(false);

  const filteredLocations = ufpeLocations.filter(
    (location) =>
      location.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      location.shortName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleLocationSelect = (location: typeof ufpeLocations[0]) => {
    setSearchQuery("");
    setShowResults(false);
    
    if (mapRef.current) {
      mapRef.current.setView(location.coordinates, 18);
    }
  };

  const handleLocationNavigate = (locationId: string) => {
    if (onLocationClick) {
      onLocationClick(locationId);
    } else {
      navigate(`/relatos/${locationId}`);
    }
  };

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
          .bindPopup(`<strong>${location.shortName}</strong><br/>${location.name}`)
          .on('click', () => {
            handleLocationNavigate(location.id);
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
      
      {/* Barra de Busca */}
      <div className="absolute top-20 left-4 right-4 z-[1001]">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Buscar Centro Acadêmico..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setShowResults(e.target.value.length > 0);
            }}
            onFocus={() => searchQuery.length > 0 && setShowResults(true)}
            className="pl-10 pr-10 h-12 bg-background/95 backdrop-blur-sm border-border shadow-lg rounded-xl"
          />
          {searchQuery && (
            <button
              onClick={() => {
                setSearchQuery("");
                setShowResults(false);
              }}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Resultados da busca */}
        {showResults && filteredLocations.length > 0 && (
          <div className="mt-2 bg-background/95 backdrop-blur-sm border border-border rounded-xl shadow-lg overflow-hidden max-h-64 overflow-y-auto">
            {filteredLocations.map((location) => (
              <button
                key={location.id}
                onClick={() => handleLocationSelect(location)}
                className="w-full px-4 py-3 text-left hover:bg-accent/50 transition-colors border-b border-border/50 last:border-b-0"
              >
                <span className="font-semibold text-foreground">{location.shortName}</span>
                <span className="text-muted-foreground text-sm ml-2">{location.name}</span>
              </button>
            ))}
          </div>
        )}

        {showResults && searchQuery && filteredLocations.length === 0 && (
          <div className="mt-2 bg-background/95 backdrop-blur-sm border border-border rounded-xl shadow-lg p-4 text-center text-muted-foreground">
            Nenhuma localização encontrada
          </div>
        )}
      </div>

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

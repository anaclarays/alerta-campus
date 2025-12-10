import { useEffect, useRef } from "react";

declare const L: any;

export default function MapView() {
  const mapRef = useRef<any>(null);
  const markerRef = useRef<any>(null);

  useEffect(() => {
    if (!mapRef.current) {
      // Inicializa o mapa
      mapRef.current = L.map("map").setView([-8.05, -34.95], 15);

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 19,
        attribution: "&copy; OpenStreetMap contributors",
      }).addTo(mapRef.current);
    }

    // Observa a localização continuamente
    const watchId = navigator.geolocation.watchPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;

        // Se ainda não existe marcador → cria
        if (!markerRef.current) {
          markerRef.current = L.marker([latitude, longitude]).addTo(
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
        alert("Não foi possível acessar sua localização.");
      },
      {
        enableHighAccuracy: true,
        maximumAge: 1000,
        timeout: 10000,
      }
    );

    // Cleanup quando o componente desmontar
    return () => navigator.geolocation.clearWatch(watchId);
  }, []);

  return (
    <div
      id="map"
      style={{
        height: "100%",
        width: "100%",
        overflow: "hidden",
      }}
    ></div>
  );
}

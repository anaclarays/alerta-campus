import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Menu, AlertTriangle, X, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { UFPELocation, ufpeLocations } from '@/data/ufpeLocations';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import logo from '@/assets/logo.png';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { DivIcon } from 'leaflet';
import 'leaflet/dist/leaflet.css';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const [showEmergencyOptions, setShowEmergencyOptions] = useState(false);

  const ufpeCenter: [number, number] = [-8.0522, -34.9510];

  const createCustomIcon = (shortName: string) => {
    return new DivIcon({
      className: 'custom-marker',
      html: `
        <div style="
          background: linear-gradient(135deg, #212433 0%, #1A33B0 100%);
          color: white;
          padding: 6px 10px;
          border-radius: 8px;
          font-size: 11px;
          font-weight: 600;
          box-shadow: 0 4px 12px rgba(42, 57, 133, 0.4);
          white-space: nowrap;
          border: 2px solid white;
        ">
          ${shortName}
        </div>
      `,
      iconSize: [60, 30],
      iconAnchor: [30, 30],
    });
  };

  const handleLocationClick = (location: UFPELocation) => {
    navigate(`/relatos/${location.id}`);
  };

  return (
    <div className="mobile-container relative h-screen overflow-hidden bg-muted">
      {/* Map */}
      <div className="absolute inset-0 z-0">
        <MapContainer
          center={ufpeCenter}
          zoom={16}
          style={{ height: '100%', width: '100%' }}
          zoomControl={false}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {ufpeLocations.map((location) => (
            <Marker
              key={location.id}
              position={location.coordinates}
              icon={createCustomIcon(location.shortName)}
              eventHandlers={{
                click: () => handleLocationClick(location),
              }}
            />
          ))}
        </MapContainer>
      </div>

      {/* Header */}
      <div className="absolute top-0 left-0 right-0 z-[1000] p-4 safe-area-top">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 bg-card/95 backdrop-blur-sm rounded-lg px-3 py-2 shadow-lg">
            <img src={logo} alt="Logo" className="w-6 h-6" />
            <span className="font-semibold text-sm text-foreground">Alerta Campus</span>
          </div>

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="bg-card/95 backdrop-blur-sm shadow-lg">
                <Menu className="w-5 h-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-72">
              <SheetHeader>
                <SheetTitle className="flex items-center gap-2">
                  <img src={logo} alt="Logo" className="w-8 h-8" />
                  Menu
                </SheetTitle>
              </SheetHeader>
              <nav className="mt-6 space-y-2">
                <button
                  onClick={() => navigate('/profile')}
                  className="w-full text-left px-4 py-3 rounded-lg hover:bg-muted transition-colors"
                >
                  Seu Perfil
                </button>
                <button
                  onClick={() => navigate('/notifications')}
                  className="w-full text-left px-4 py-3 rounded-lg hover:bg-muted transition-colors"
                >
                  Notificações
                </button>
                <button
                  onClick={() => navigate('/my-calls')}
                  className="w-full text-left px-4 py-3 rounded-lg hover:bg-muted transition-colors"
                >
                  Suas Chamadas
                </button>
                <button
                  onClick={() => navigate('/my-reports')}
                  className="w-full text-left px-4 py-3 rounded-lg hover:bg-muted transition-colors"
                >
                  Seus Relatos
                </button>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      {/* Emergency Button */}
      <div className="absolute bottom-6 right-4 z-[1000] safe-area-bottom">
        <Button
          variant="emergency"
          size="iconLg"
          className="rounded-full shadow-xl"
          onClick={() => setShowEmergencyOptions(true)}
        >
          <AlertTriangle className="w-6 h-6" />
        </Button>
      </div>

      {/* Emergency Options Modal */}
      {showEmergencyOptions && (
        <div className="absolute inset-0 z-[1001] bg-foreground/50 flex items-end justify-center">
          <div className="w-full max-w-md bg-card rounded-t-3xl p-6 animate-slide-up safe-area-bottom">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold">Chamados e Emergências</h2>
              <button
                onClick={() => setShowEmergencyOptions(false)}
                className="p-2 hover:bg-muted rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3">
              <button
                onClick={() => {
                  setShowEmergencyOptions(false);
                  navigate('/chamados');
                }}
                className="w-full p-4 bg-primary/10 border-2 border-primary rounded-xl text-left hover:bg-primary/20 transition-colors"
              >
                <h3 className="font-semibold text-primary">Chamado: descreva a sua ocorrência</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Relate uma situação para a equipe de segurança
                </p>
              </button>

              <button
                onClick={() => {
                  setShowEmergencyOptions(false);
                  navigate('/emergency');
                }}
                className="w-full p-4 bg-destructive/10 border-2 border-destructive rounded-xl text-left hover:bg-destructive/20 transition-colors"
              >
                <h3 className="font-semibold text-destructive">Emergência: envie um alerta!</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Envie um alerta em tempo real para o DSI
                </p>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;

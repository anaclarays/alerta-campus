import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Home, ArrowLeft } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="mobile-container flex flex-col min-h-screen bg-background">
      <div className="flex-1 flex flex-col items-center justify-center px-6 text-center">
        <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center mb-6">
          <span className="text-4xl font-bold text-primary">404</span>
        </div>
        <h1 className="text-xl font-bold text-foreground mb-2">
          Página não encontrada
        </h1>
        <p className="text-muted-foreground mb-8">
          A página que você está procurando não existe ou foi movida.
        </p>
        <Button variant="gradient" onClick={() => window.location.href = '/home'}>
          <Home className="w-4 h-4 mr-2" />
          Voltar ao início
        </Button>
      </div>
    </div>
  );
};

export default NotFound;

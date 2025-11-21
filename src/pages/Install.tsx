import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Smartphone, Download, Check } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Install = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isInstalled, setIsInstalled] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    // Detecta se o app já está instalado
    if (window.matchMedia("(display-mode: standalone)").matches) {
      setIsInstalled(true);
    }

    // Captura o evento de instalação
    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };

    window.addEventListener("beforeinstallprompt", handler);

    return () => {
      window.removeEventListener("beforeinstallprompt", handler);
    };
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) {
      toast({
        title: "Instalação não disponível",
        description: "Acesse pelo navegador do seu celular para instalar o app.",
        variant: "destructive",
      });
      return;
    }

    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;

    if (outcome === "accepted") {
      setIsInstalled(true);
      toast({
        title: "App instalado!",
        description: "Você pode acessar o SONHAR direto da sua tela inicial.",
      });
    }

    setDeferredPrompt(null);
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="max-w-md w-full">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 w-20 h-20 bg-primary rounded-2xl flex items-center justify-center">
            <Smartphone className="w-10 h-10 text-primary-foreground" />
          </div>
          <CardTitle className="text-3xl font-bold">
            {isInstalled ? "App Instalado!" : "Instalar SONHAR"}
          </CardTitle>
          <CardDescription className="text-base">
            {isInstalled
              ? "O app está instalado e pronto para usar!"
              : "Instale nosso app para uma experiência ainda melhor"}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {!isInstalled && (
            <>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-muted-foreground">
                    Acesso rápido direto da tela inicial
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-muted-foreground">
                    Funciona mesmo sem internet
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-muted-foreground">
                    Carregamento mais rápido
                  </p>
                </div>
              </div>

              <Button onClick={handleInstall} className="w-full" size="lg">
                <Download className="mr-2 h-5 w-5" />
                Instalar Agora
              </Button>

              <div className="text-center text-sm text-muted-foreground">
                <p className="font-medium mb-2">Como instalar manualmente:</p>
                <p>
                  <strong>iPhone:</strong> Compartilhar → Adicionar à Tela Inicial
                </p>
                <p>
                  <strong>Android:</strong> Menu → Instalar App
                </p>
              </div>
            </>
          )}

          {isInstalled && (
            <Button onClick={() => window.location.href = "/"} className="w-full" size="lg">
              Abrir Loja
            </Button>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Install;
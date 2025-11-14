// components/sections/Portfolio.tsx
import { cn } from '@/lib/utils';
import type { PortfolioData, PortfolioSettings } from '@/lib/types';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import Image from 'next/image';
import { Button } from '@/components/ui/button'; // Para link opcional

const paddingMap = {
  sm: 'py-12 md:py-16',
  md: 'py-16 md:py-20',
  lg: 'py-20 md:py-24',
  xl: 'py-24 md:py-32',
};

export function Portfolio({ data, settings }: { data: PortfolioData; settings: PortfolioSettings }) {
  const paddingTopClass = paddingMap[settings.paddingTop] || paddingMap.lg;
  const paddingBottomClass = paddingMap[settings.paddingBottom] || paddingMap.lg;

  return (
    <section
      id={settings.id}
      style={{ backgroundColor: settings.backgroundColor, color: settings.textColor }}
      className={cn("w-full", paddingTopClass, paddingBottomClass)}
    >
      <div className="container px-4 md:px-6">
        {/* Cabeçalho da Seção */}
        <div className="flex flex-col items-center text-center space-y-4 mb-12">
          <h2 className="text-3xl md:text-4xl font-bold font-primary tracking-tighter">{data.title}</h2>
          <p className="max-w-[700px] text-lg text-foreground/80">{data.subtitle}</p>
        </div>

        {/* Grid do Portfólio */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
          {data.items.map((item) => (
            <Card key={item.title} className="flex flex-col overflow-hidden bg-background/80"> {/* overflow-hidden para imagem */}
              <CardHeader className="p-0"> {/* Remove padding padrão para imagem colar */}
                <Image
                  src={item.imageSrc}
                  alt={item.imageAlt}
                  width={400} // Ajuste conforme necessário
                  height={250} // Ajuste conforme necessário
                  className="object-cover w-full h-48" // Imagem cobre área fixa
                />
              </CardHeader>
              <CardContent className="pt-4 flex-grow space-y-2">
                <CardTitle className="font-primary text-xl">{item.title}</CardTitle>
                <CardDescription className="text-foreground/80">{item.description}</CardDescription>
              </CardContent>
              {item.link && (
                <CardFooter>
                  <Button asChild variant="outline" size="sm">
                    <a href={item.link}>Ver mais</a>
                  </Button>
                </CardFooter>
              )}
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
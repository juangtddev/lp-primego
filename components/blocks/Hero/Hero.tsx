'use client';
import Link from 'next/link';
import Image from 'next/image';
import { type HeroData } from './hero.schema';
import { cn } from '@/lib/utils';
import { AppStoreButton } from '@/components/base/buttons/app-store-buttons';
import { GooglePlayButton } from '@/components/base/buttons/app-store-buttons';

// Propriedades que o componente Hero aceita
interface HeroProps {
  data: HeroData;
}

export function Hero({ data }: HeroProps) {
  const { title, subtitle, paragraphs, ctas, foregroundImage, styles } = data;

  // Fallbacks (valores padrão)
  const defaultStyles = {
    '--hero-background': 'hsl(0 0% 100%)',
    '--hero-min-height': '50vh',
    '--hero-padding-y': '4rem',
    '--hero-padding-x': '1rem',
    '--hero-layout-direction': 'column',
    '--hero-align-items': 'center',
    '--hero-justify-content': 'center',
    '--hero-text-align': 'center',
    '--hero-content-gap': '1.5rem',
    '--hero-title-color': 'hsl(0 0% 0%)',
    '--hero-text-color': 'hsl(0 0% 30%)',
  };

  // Combina fallbacks com estilos do JSON
  const combinedStyles = { ...defaultStyles, ...styles } as React.CSSProperties;

  return (
    <section
      // 1. O <section> (RAIZ) agora só cuida do fundo
      style={combinedStyles}
      className={cn(
        'w-full',
        // Correção para aceitar cor, gradiente ou imagem
        '[background:var(--hero-background)]',
      )}
    >
      {/* 2. O <div> (INTERNO) cuida de TUDO: container, altura, padding e layout flex */}
      <div
        className={cn(
          'container mx-auto flex', // Limita a largura
          'min-h-[var(--hero-min-height)]', // Altura mínima fica aqui
          'px-[var(--hero-padding-x,1rem)]', // Padding horizontal

          // --- MOBILE-FIRST (Padrão) ---
          // 'justify-center' controla o alinhamento vertical
          'flex-col items-center justify-center text-center gap-4',

          // --- DESKTOP (Vem do JSON) ---
          // Suas variáveis do JSON vão sobrescrever os padrões mobile
          'md:flex-[var(--hero-layout-direction,row)]',
          'md:items-[var(--hero-align-items,center)]',
          'md:justify-[var(--hero-justify-content,center)]',
          'md:gap-[var(--hero-content-gap,2rem)]',
        )}
      >
        {/* Container de Imagem (Opcional) */}
        {foregroundImage && (
          <div className="shrink-0">
            <Image
              src={foregroundImage.src}
              alt={foregroundImage.alt}
              width={foregroundImage.width}
              height={foregroundImage.height}
              className="rounded-lg object-cover"
            />
          </div>
        )}
        {/* Container de Conteúdo (Texto) */}
        <div
          className={cn(
            'flex flex-col',
            'gap-4',
            // Alinhamento do conteúdo de texto (mobile-first)
            'items-center text-center',
            // Alinhamento Desktop (do JSON)
            'md:items-[var(--hero-text-align,start)]',
            'md:text-[var(--hero-text-align,left)]',
            'max-w-[600px]',
          )}
        >
          {title && (
            <h1
              className="text-4xl md:text-6xl font-bold"
              style={{ color: 'var(--hero-title-color)' }}
            >
              O App mais <span className="text-primary">completo</span> do
              mercado
            </h1>
          )}
          <div>
            {subtitle && (
              <p
                className="text-sm md:text-xl"
                style={{
                  color: 'var(--hero-subtitle-color, var(--hero-text-color))',
                }}
              >
                {subtitle}
              </p>
            )}
            {paragraphs &&
              paragraphs.map((p, idx) => (
                <p
                  key={idx} // Usar 'idx' para a key dos parágrafos
                  className="text-sm md:text-xl"
                  style={{ color: 'var(--hero-text-color)' }}
                >
                  {p}
                </p>
              ))}
          </div>

          <div
            className={cn(
              'flex flex-wrap gap-4',
              // Alinhamento dos botões (mobile-first)
              'justify-center',
              // Alinhamento Desktop (do JSON)
              'md:justify-[var(--hero-text-align,start)]',
            )}
          >
            <AppStoreButton />
            <GooglePlayButton />
          </div>

          <div className="hidden md:flex flex-col md:flex-row text-primary-foreground md:gap-6">
            <div className="flex gap-2 items-center">
              <span className="w-3 h-3 bg-green-400 rounded-full"></span>
              <span>Carros e Motos</span>
            </div>
            <div className="flex gap-2 items-center ">
              <span className="w-3 h-3 bg-primary rounded-full"></span>
              <span>Motoristas Verificados</span>
            </div>
            <div className="flex gap-2 items-center">
              <span className="w-3 h-3 bg-green-400 rounded-full"></span>
              <span>Atendimento 24/7</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

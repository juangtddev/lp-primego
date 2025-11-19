import Link from 'next/link';
import { type HowItWorksData } from './how-it-works.schema';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Icon } from '@/components/Icon';

interface HowItWorksProps {
  data: HowItWorksData;
}

export function HowItWorks({ data }: HowItWorksProps) {
  const { title, subtitle, steps, cta, styles } = data;

  const defaultStyles = {
    '--section-background': 'hsl(0 0% 100%)',
    '--section-padding-y': '4rem',
    '--section-text-align': 'center',
    '--grid-template-columns': 'repeat(1, 1fr)',
    '--grid-gap': '2rem',
    '--step-card-align': 'center',
    '--number-size': '2.5rem',
    '--number-bg': 'hsl(0 0% 0%)',
    '--number-color': 'hsl(0 0% 100%)',
    '--icon-size': '2rem',
  };

  const combinedStyles = { ...defaultStyles, ...styles } as React.CSSProperties;

  return (
    <section
      style={combinedStyles}
      className={cn(
        'w-full',
        '[background:var(--section-background)]',
        'py-(--section-padding-y)',
        'px-4 md:px-40',
        // 🔑 CLASSES PARA O EFEITO VISUAL 🔑
        // 1. Relativo para posicionar os círculos absolutos
        'relative',
        // 2. Remove o background default (ou o torna transparente)
        // Usaremos uma cor transparente para o efeito de glassmorphism:
        'bg-transparent',

        // 3. Aplica a camada de desfoque (Blur) no que está por trás da SECTION
        // Vamos aplicar o blur se a variável '--section-background' for transparente/removida
        // Se você não pode remover o background, esta seção será a camada de desfoque
        'backdrop-blur-3xl', // Aplica o desfoque

        // 4. Criação dos Círculos Desfocados com Pseudo-elementos (Círculo 1)
        "before:content-['']",
        'before:absolute',
        'before:top-[100px]', // Posição
        'before:left-[50px]',
        'before:w-[150px]', // Tamanho
        'before:h-[150px]',
        'before:rounded-full',
        'before:bg-[hsl(209,72%,29%)]', // Cor 1
        'before:opacity-90',
        'before:z-[-2]', // Garante que fique bem no fundo (abaixo da seção)
        'before:blur-[90px]', // Desfoque inicial do círculo

        // 5. Criação dos Círculos Desfocados com Pseudo-elementos (Círculo 2)
        "after:content-['']",
        'after:absolute',
        'after:bottom-[50px]', // Posição
        'after:right-[25px]',
        'after:w-[150px]', // Tamanho
        'after:h-[150px]',
        'after:rounded-full',
        'after:bg-primary', // Cor 2
        'after:opacity-90',
        'after:z-[-2]',
        'after:blur-[80px]', // Desfoque inicial do círculo
      )}
    >
      <div className="container mx-auto flex flex-col items-center">
        {/* --- Header --- */}
        {(title || subtitle) && (
          <div
            className={cn(
              'flex flex-col gap-4 mb-12',
              'text-center',
              'items-[var(--section-text-align)]',
            )}
          >
            {title && (
              <h2
                className="text-3xl md:text-4xl font-bold"
                style={{ color: 'var(--section-title-color)' }}
              >
                Como <span className="text-primary">Funciona?</span>
              </h2>
            )}
            {subtitle && (
              <p
                className="text-md max-w-2xl"
                style={{ color: 'var(--section-subtitle-color)' }}
              >
                {subtitle}
              </p>
            )}
          </div>
        )}

        {/* --- Steps Grid --- */}
        {steps && steps.length > 0 && (
          <div
            className={cn(
              'grid w-full',
              'grid-cols-1', // Mobile-first
              'md:grid-cols-(--grid-template-columns)',
              'gap-(--grid-gap)',
            )}
          >
            {steps.map((step, index) => (
              <div
                key={index}
                className="flex flex-col gap-4 relative shadow-md rounded-md"
                style={{
                  background: 'var(--step-card-bg)',
                  padding: 'var(--step-card-padding)',
                  alignItems: 'var(--step-card-align)',
                  // Cast the CSS variable to the proper React style type without using `any`
                  textAlign:
                    'var(--step-card-align)' as unknown as React.CSSProperties['textAlign'],
                }}
              >
                {/* Topo do Card (Número e Ícone) */}
                <div className="flex flex-col items-[var(--step-card-align)] gap-4 mb-2">
                  {/* Número (Badge Circular) */}
                  {step.number && (
                    <div
                      className="absolute flex items-center p-4.5 self-end font-bold shrink-0 justify-center"
                      style={{
                        width: 'var(--number-size)',
                        height: 'var(--number-size)',
                        borderRadius: '9999px',
                        backgroundColor: 'var(--number-bg)',
                        color: 'var(--number-color)',
                        fontSize: 'var(--number-font-size, 1rem)',
                      }}
                    >
                      {step.number}
                    </div>
                  )}

                  {/* Ícone */}
                  {step.icon && (
                    <Icon
                      name={step.icon}
                      className="p-2 bg-[hsl(209,72%,29%)] rounded-md mt-5"
                      style={{
                        width: 'var(--icon-size)',
                        height: 'var(--icon-size)',
                        color: 'var(--icon-color)',
                      }}
                    />
                  )}
                </div>

                {/* Textos */}
                {step.title && (
                  <h3
                    className="text-xl font-bold"
                    style={{ color: 'var(--step-title-color)' }}
                  >
                    {step.title}
                  </h3>
                )}
                {step.text && (
                  <p
                    className="text-sm"
                    style={{ color: 'var(--step-text-color)' }}
                  >
                    {step.text}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}

        <p className="mt-10 text-sm">Pronto para começar?</p>
        {/* --- CTA Final --- */}
        {cta && (
          <div className="mt-5">
            <Button
              variant={cta.variant}
              className="text-(--section-title-color) font-semibold"
              asChild
              size="lg"
            >
              <Link href={cta.href}>{cta.text}</Link>
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}

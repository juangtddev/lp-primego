import Link from 'next/link';
import { type PricingData } from './pricing.schema';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Icon } from '@/components/Icon'; // Reutilizamos nosso helper

// Propriedades
interface PricingProps {
  data: PricingData;
}

export function Pricing({ data }: PricingProps) {
  const { title, subtitle, cards, styles } = data;

  // Fallbacks
  const defaultStyles = {
    '--section-background': 'hsl(0 0% 100%)',
    '--section-padding-y': '4rem',
    '--section-text-align': 'center',
    '--grid-template-columns': 'repeat(1, 1fr)',
    '--grid-gap': '1.5rem',
    '--card-background': 'hsl(0 0% 100%)',
    '--card-border-radius': '0.5rem',
    '--card-top-bg-overlay': 'hsla(0, 0%, 0%, 0.5)',
    '--card-top-min-height': '150px',
    '--card-top-padding': '1rem',
    '--card-bottom-padding': '1rem',
    '--benefit-icon-size': '1rem',
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
      )}
    >
      <div className="container mx-auto flex flex-col items-center">
        {/* --- Cabeçalho do Bloco --- */}
        {(title || subtitle) && (
          <div
            className={cn(
              'flex flex-col gap-4',
              'text-center',
              'items-(--section-text-align)',
              'justify-(--section-text-align)',
            )}
          >
            <h2
              className="text-3xl md:text-4xl font-bold"
              style={{ color: 'var(--section-title-color)' }}
            >
              Escolha seu <span className="text-primary">Veículo</span>
            </h2>

            {subtitle && (
              <p
                className="text-sm max-w-2xl"
                style={{ color: 'var(--section-subtitle-color)' }}
              >
                {subtitle}
              </p>
            )}
          </div>
        )}

        {/* --- Grid de Cards --- */}
        {cards && cards.length > 0 && (
          <div
            className={cn(
              'grid w-full m-12',
              'grid-cols-1', // Mobile-first
              'md:grid-cols-(--grid-template-columns)',
              'gap-(--grid-gap)',
            )}
          >
            {cards.map((card, index) => (
              <div
                key={index}
                // O 'group' é essencial para o hover
                className="group shadow-md"
                style={{
                  background: 'var(--card-background)',
                  borderRadius: 'var(--card-border-radius)',
                  overflow: 'hidden', // Importante para o border-radius
                }}
              >
                {/* === PARTE SUPERIOR === */}
                <div
                  className="relative flex flex-col justify-end bg-cover bg-center"
                  style={{
                    backgroundImage: `url(${card.top.imageUrl})`,
                    minHeight: 'var(--card-top-min-height)',
                    padding: 'var(--card-top-padding)',
                  }}
                >
                  {/* O OVERLAY */}
                  <div
                    className={cn(
                      'absolute inset-0',
                      'bg-[linear-gradient(to_bottom,_rgba(18,80,123,0)_0%,_rgba(18,80,123,.8)_100%)]',
                      'transition-opacity duration-300',
                      'group-hover:opacity-0', // Mágica do hover
                    )}
                  />

                  {/* Conteúdo (em cima do overlay) */}
                  <div className="relative z-10 ">
                    <div className="flex items-center">
                      {card.top.icon && (
                        <Icon
                          name={card.top.icon}
                          style={{
                            color: 'var(--card-top-icon-color)',
                            width: 'var(--card-top-icon-size)',
                            height: 'var(--card-top-icon-size)',
                          }}
                          className="bg-primary rounded-sm p-2"
                        />
                      )}
                      <div className="ml-4 flex flex-col item-start gap-0.5">
                        {card.top.title && (
                          <h3
                            className="text-2xl font-bold"
                            style={{ color: 'var(--card-top-title-color)' }}
                          >
                            {card.top.title}
                          </h3>
                        )}
                        {card.top.subtitle && (
                          <p
                            className="text-sm font-semibold"
                            style={{ color: 'var(--card-top-subtitle-color)' }}
                          >
                            {card.top.subtitle}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* === PARTE INFERIOR === */}
                <div
                  className="flex flex-col gap-4"
                  style={{ padding: 'var(--card-bottom-padding)' }}
                >
                  {/* Lista de Benefícios */}
                  {card.bottom.benefits && (
                    <ul className="flex flex-col gap-2">
                      {card.bottom.benefits.map((item, idx) => (
                        <li key={idx} className="flex items-center gap-2">
                          <Icon
                            name={item.icon}
                            style={{
                              color: 'var(--benefit-icon-color)',
                              width: 'var(--benefit-icon-size)',
                              height: 'var(--benefit-icon-size)',
                            }}
                            className="shrink-0 p-1 bg-green-400/20 rounded-2xl"
                          />
                          <span style={{ color: 'var(--benefit-text-color)' }}>
                            {item.text}
                          </span>
                        </li>
                      ))}
                    </ul>
                  )}
                  {/* Botão CTA */}
                  {card.bottom.cta && (
                    <Button
                      variant={card.bottom.cta.variant}
                      asChild
                      className="mt-4 w-full text-[rgb(18, 80, 123)] font-semibold"
                    >
                      <Link href={card.bottom.cta.href}>
                        {card.bottom.cta.text}
                      </Link>
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="flex gap-2 text-center">
          <div className="flex flex-col items-center gap-1.5 max-w-40">
            <Icon
              name={'Clock'}
              className="w-10 h-10 text-primary bg-white/10 p-2 rounded-md"
            />
            <h3 className="text-sm text-white font-semibold">Rápido</h3>
            <p className="text-xs text-white">
              Chegue ao seu destino no menor tempo
            </p>
          </div>
          <div>
            <div className="flex flex-col items-center gap-1.5 max-w-40">
              <Icon
                name={'Shield'}
                className="w-10 h-10 text-primary bg-white/10 p-2 rounded-md"
              />
              <h3 className="text-sm text-white font-semibold">Seguro</h3>
              <p className="text-xs text-white">
                Motoristas verificados e capacitados
              </p>
            </div>
          </div>
          <div className="flex flex-col items-center gap-1.5 max-w-40">
            <Icon
              name={'DollarSign'}
              className="w-10 h-10 text-primary bg-white/10 p-2 rounded-md"
            />
            <h3 className="text-sm text-white font-semibold">Econômico</h3>
            <p className="text-xs text-white">Preços justos e transparentes</p>
          </div>
        </div>
      </div>
    </section>
  );
}

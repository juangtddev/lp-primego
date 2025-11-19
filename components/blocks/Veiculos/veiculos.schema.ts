import { z } from 'zod';
import { icons } from 'lucide-react'; // Importa para validar o nome do ícone

// Schema para os botões (isolado)
const CtaSchema = z.object({
  text: z.string(),
  href: z.string(),
  variant: z.enum([
    'default',
    'destructive',
    'outline',
    'secondary',
    'ghost',
    'link',
  ]),
});

// Schema para cada Card
const VeiculosCardSchema = z.object({
  // Valida se o nome do ícone existe no lucide-react
  icon: z.custom<keyof typeof icons>(
    (val): val is keyof typeof icons => typeof val === 'string' && val in icons,
  ),
  bgColor: z.string().optional(),
  title: z.string(),
  text: z.string(),
});

// Schema Principal
export const veiculosSchema = z.object({
  // Cabeçalho do Bloco (opcional)
  title: z.string().optional(),
  subtitle: z.string().optional(),

  // Conteúdo (opcional)
  cards: z.array(VeiculosCardSchema).optional(),
  ctas: z.array(CtaSchema).optional(),

  // Estilos (o coração da flexibilidade)
  styles: z
    .object({
      // --- Estilos da Seção ---
      '--veiculos-background': z.string().optional(),
      '--veiculos-padding-y': z.string().optional(),
      '--veiculos-text-align': z.string().optional(), // 'center' ou 'left'
      '--veiculos-title-color': z.string().optional(),
      '--veiculos-subtitle-color': z.string().optional(),

      // --- Estilos do Grid de Cards ---
      // Ex: "repeat(3, 1fr)" para 3 colunas
      '--veiculos-grid-template-columns': z.string().optional(),
      '--veiculos-grid-gap': z.string().optional(),

      // --- Estilos dos Cards ---
      '--card-background': z.string().optional(),
      '--card-padding': z.string().optional(),
      '--card-border-radius': z.string().optional(),
      '--card-text-align': z.string().optional(),
      '--card-icon-color': z.string().optional(),
      '--card-icon-size': z.string().optional(),
      '--card-title-color': z.string().optional(),
      '--card-text-color': z.string().optional(),

      // --- Tema dos Botões ---
      '--primary': z.string().optional(),
      '--primary-foreground': z.string().optional(),
    })
    .optional(),
});

// Extrai o tipo
export type veiculosData = z.infer<typeof veiculosSchema>;

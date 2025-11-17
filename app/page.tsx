import { Header } from '@/components/blocks/Header';
import { headerSchema } from '@/components/blocks/Header/header.schema';
import headerData from '@/components/blocks/Header/data.example.json';
import { Hero } from '@/components/blocks/Hero';
import { heroSchema } from '@/components/blocks/Hero/hero.schema';
import heroData from '@/components/blocks/Hero/data.example.json';

export default function Home() {
  // 1. Valida o JSON (segurança em tempo de execução)
  const validatedHeaderData = headerSchema.parse(headerData);
  const validatedHeroData = heroSchema.parse(heroData);

  return (
    <main>
      {/* 2. Renderiza o template com os dados validados */}
      <Header data={validatedHeaderData} />
      <Hero data={validatedHeroData} />

      {/* Conteúdo de placeholder para testar o 'sticky' */}
      <div className="h-screen bg-gray-100 p-24">
        <h1 className="text-4xl font-bold">Conteúdo da Página</h1>
        <p>Role para baixo...</p>
      </div>
      <div className="h-screen bg-gray-200 p-24">
        <h2 className="text-2xl">Mais conteúdo</h2>
      </div>
    </main>
  );
}

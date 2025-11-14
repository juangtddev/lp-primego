// components/sections/Contact.tsx
'use client';

import { useState, type FormEvent } from 'react';
import { cn } from '@/lib/utils';
import type { ContactData, ContactSettings } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { MessageSquare, Loader2, CheckCircle, AlertTriangle } from 'lucide-react';

// Mapeamento de padding
const paddingMap = {
  sm: 'py-12 md:py-16',
  md: 'py-16 md:py-20',
  lg: 'py-20 md:py-24',
  xl: 'py-24 md:py-32',
};

type SubmissionStatus = 'idle' | 'loading' | 'success' | 'error';

export function Contact({ data, settings }: { data: ContactData; settings: ContactSettings }) {
  const paddingTopClass = paddingMap[settings.paddingTop] || paddingMap.lg;
  const paddingBottomClass = paddingMap[settings.paddingBottom] || paddingMap.lg;

  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    telefone: '',
    mensagem: '',
  });
  const [status, setStatus] = useState<SubmissionStatus>('idle');
  const [message, setMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('loading');
    setMessage('');

    if (!formData.nome || !formData.email || !formData.mensagem) {
      setStatus('error');
      setMessage('Por favor, preencha os campos obrigatórios (Nome, Email, Mensagem).');
      return;
    }

    // Inclui o email do destinatário nos dados a serem enviados
    const dataToSend = {
      ...formData,
      recipientEmail: data.recipientEmail // Pega do JSON via props
    };

    try {
      const response = await fetch(data.googleScriptUrl, { // Usa a URL do JSON
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams(dataToSend).toString(),
      });

      const result = await response.json();

      if (result.result === 'success') {
        setStatus('success');
        setMessage('Mensagem enviada com sucesso! Entraremos em contato em breve.');
        console.log(formData);
        setFormData({ nome: '', email: '', telefone: '', mensagem: '' }); // Limpa form
      } else {
        throw new Error(result.error || 'Erro desconhecido ao enviar.');
      }
    } catch (error) {
      console.error('Erro ao enviar formulário:', error);
      setStatus('error');
      setMessage('Ocorreu um erro ao enviar sua mensagem. Tente novamente ou use o WhatsApp.');
    }
  };

  return (
    <section
      id={settings.id}
      style={{ backgroundColor: settings.backgroundColor, color: settings.textColor }}
      className={cn("w-full", paddingTopClass, paddingBottomClass)}
    >
      <div className="container max-w-3xl px-4 md:px-6">
        {/* Cabeçalho */}
        <div className="flex flex-col items-center text-center space-y-4 mb-12">
          <h2 className="text-3xl md:text-4xl font-bold font-primary tracking-tighter">{data.title}</h2>
          <p className="text-lg text-foreground/80">{data.subtitle}</p>
        </div>

        {/* Formulário */}
        <form onSubmit={handleSubmit} className="space-y-6 bg-background/50 p-6 md:p-8 rounded-lg border shadow-sm">
          {/* --- CAMPO OCULTO CRUCIAL --- */}
          {/* Este campo não é visível, mas envia o email do destinatário para o script */}
          <input type="hidden" name="recipientEmail" value={data.recipientEmail} />

          {/* Campo Nome */}
          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="nome" className="font-semibold">Nome <span className="text-red-500">*</span></Label>
            <Input type="text" id="nome" name="nome" placeholder="Seu nome completo" value={formData.nome} onChange={handleChange} required disabled={status === 'loading'} />
          </div>

          {/* Campo Email */}
          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="email" className="font-semibold">Email <span className="text-red-500">*</span></Label>
            <Input type="email" id="email" name="email" placeholder="seu@email.com" value={formData.email} onChange={handleChange} required disabled={status === 'loading'} />
          </div>

          {/* Campo Telefone */}
          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="telefone" className="font-semibold">Telefone (Opcional)</Label>
            <Input type="tel" id="telefone" name="telefone" placeholder="(XX) 99999-8888" value={formData.telefone} onChange={handleChange} disabled={status === 'loading'} />
          </div>

          {/* Campo Mensagem */}
          <div className="grid w-full gap-1.5">
            <Label htmlFor="mensagem" className="font-semibold">Mensagem <span className="text-red-500">*</span></Label>
            <Textarea placeholder="Descreva o que você precisa..." id="mensagem" name="mensagem" rows={5} value={formData.mensagem} onChange={handleChange} required disabled={status === 'loading'} />
          </div>

          {/* Botão de Envio e Status */}
          <div className="flex flex-col items-center space-y-4">
            <Button type="submit" size="lg" disabled={status === 'loading'}>
              {status === 'loading' && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {status === 'loading' ? 'Enviando...' : 'Enviar Mensagem'}
            </Button>
            {/* Mensagens de status (renderização condicional) */}
            {status === 'success' && (<p className="text-green-600 flex items-center gap-2"><CheckCircle className="h-5 w-5"/> {message}</p>)}
            {status === 'error' && (<p className="text-red-600 flex items-center gap-2"><AlertTriangle className="h-5 w-5"/> {message}</p>)}
          </div>
        </form>

        {/* Botão CTA Alternativo (WhatsApp) */}
        {data.ctaButton && ( /* Renderiza se existir no JSON */
          <div className="mt-12 flex justify-center">
            <Button asChild size="lg" variant="outline">
              <a href={data.ctaButton.href} target="_blank" rel="noopener noreferrer">
                <MessageSquare className="mr-2 h-5 w-5" />
                {data.ctaButton.text}
              </a>
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}
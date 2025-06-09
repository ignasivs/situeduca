'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { LearningSituationInput } from '../components/LearningSituationForm';

type StoredData = {
  input: LearningSituationInput;
  result: string;
};

export default function LearningSituationResultPage() {
  const [loading, setLoading] = useState(true);
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const stored = sessionStorage.getItem('learningSituationResult');
    if (!stored) {
      router.push('/');
      return;
    }

    try {
      const data: StoredData = JSON.parse(stored);
      setResult(data.result);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  }, [router]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-primary-bg">
        <Spinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-xl mx-auto mt-10 text-feedback-error text-center bg-primary-bg p-6 rounded-lg">
        <p>❌ Ha ocurrido un error: {error}</p>
        <button
          onClick={() => router.push('/')}
          className="mt-4 bg-primary-main hover:bg-primary-main/90 text-white px-4 py-2 rounded-lg transition duration-200"
        >
          Volver al inicio
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-primary-bg py-8 px-4">
      <div className="max-w-4xl mx-auto p-8 bg-white rounded-2xl shadow-md space-y-6">
        <div className="prose prose-lg max-w-none text-text-body">
          {result?.split('\n\n').map((paragraph, index) => {
            // Detectar si es un título con asteriscos
            if (paragraph.startsWith('**') && paragraph.endsWith('**')) {
              return (
                <h2 key={index} className="text-2xl font-semibold text-secondary-coral mt-8 mb-4">
                  {paragraph.replace(/\*\*/g, '')}
                </h2>
              );
            }
            //Detectar si empieza con asteriscos
            if (paragraph.startsWith('**') && !paragraph.endsWith('**')) {
              const title = paragraph.split('**');
              if(title[1] == "Título de la actividad:") {
                return (
                  <div key={index}>
                    <h1 className="text-3xl font-semibold text-primary-main mt-8 mb-4">
                      {title[1]} {title[2]}
                    </h1>
                  </div>
                );
              }
              if(title[1] == "Cierre:") {
                return (
                  <div key={index}>
                    <h3 className="text-xl font-bold text-primary-main mt-8 mb-2">
                      {title[1]}
                    </h3>
                    <p key={index} className="mb-4">{title[2]}</p>
                  </div>
                );
              }
              if(title[1] == "Objetivos:") {
                return (
                  <div key={index}>
                    <h2 className="text-2xl font-semibold text-primary-main mt-8 mb-4">
                      {title[1]}
                    </h2>
                    <p key={index} className="mb-4">{title[2]}</p>
                  </div>
                );
              }
              if(title[1] == "Materiales:") {
                return (
                  <div key={index}>
                    <h2 className="text-2xl font-semibold text-primary-main mt-8 mb-4">
                      {title[1]}
                    </h2>
                    <p key={index} className="mb-4">{title[2]}</p>
                  </div>
                );
              }
              if(title[1] == "Evaluación:") {
                return (
                  <div key={index}>
                    <h2 className="text-2xl font-semibold text-primary-main mt-8 mb-4">
                      {title[1]}
                    </h2>
                    <p key={index} className="mb-4">{title[2]}</p>
                  </div>
                );
              }
              if(title[1] == "Extensión:") {
                return (
                  <div key={index}>
                    <h2 className="text-2xl font-semibold text-primary-main mt-8 mb-4">
                      {title[1]}
                    </h2>
                    <p key={index} className="mb-4">{title[2]}</p>
                  </div>
                );
              }
            }
            // Detectar si es una lista numerada
            const listMatch = paragraph.match(/^(\d+)\.\s/);
            if (listMatch) {
              // Encontramos un item de lista: renderiza <ol> con start correcto
              const currentNumber = Number(listMatch[1]);

              // Extrae el texto destacado entre **
              const match = paragraph.match(/\*\*(.*?)\*\*/);
              const highlighted = match ? match[1] : '';
              const rest = paragraph
                .replace(/\*\*.*?\*\*/, '')
                .replace(/^\d+\.\s*/, '')
                .trim();

              const liContent = (
                <li key={index} className="space-y-1">
                  {highlighted && (
                    <h3 className="text-lg font-semibold text-primary-main">{highlighted}</h3>
                  )}
                  <p>{rest}</p>
                </li>
              );

              // Devuelve la lista ordenada con start dinámico (listIndex)
              const olElement = (
                <ol key={index} start={currentNumber} className="list-decimal pl-6 mb-4 space-y-2">
                  {liContent}
                </ol>
              );

              return olElement;
            }                    
            // Detectar si es una lista numerada
            if (/^\d+\./.test(paragraph)) {
              return (
                <div key={index} className="pl-4">
                  <p className="mb-2">{paragraph}</p>
                </div>
              );
            }
            // Detectar si es una lista con guiones
            if (paragraph.startsWith('- ')) {
              return (
                <ul key={index} className="list-disc pl-6 mb-4 space-y-2">
                  {paragraph.split('\n').map((item, itemIndex) => (
                    <li key={itemIndex}>{item.replace('- ', '')}</li>
                  ))}
                </ul>
              );
            }
            // Párrafo normal
            return <p key={index} className="mb-4">{paragraph}</p>;
          })}
        </div>
        <div className="text-center">
          <button
            onClick={() => router.push('/')}
            className="mt-8 bg-primary-main hover:bg-primary-main/90 text-white px-8 py-3 rounded-lg transition duration-200 text-lg font-medium"
          >
            Generar otra situación
          </button>
        </div>
      </div>
    </div>
  );
}

function Spinner() {
  return (
    <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-primary-main"></div>
  );
}

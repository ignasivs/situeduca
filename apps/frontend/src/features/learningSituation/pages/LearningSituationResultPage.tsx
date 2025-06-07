'use client';

import { useEffect, useState } from 'react';
import { LearningSituationInput } from '../components/LearningSituationForm';
import Spinner from '../components/Spinner';
import { useRouter } from 'next/navigation';

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

    const input: LearningSituationInput = JSON.parse(stored);

    const fetchData = async () => {
      try {
        const response = await fetch('/api/learning-situation', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(input),
        });

        if (!response.ok) {
          throw new Error('Error en la generación');
        }

        const data = await response.json();
        setResult(data.result); // Asegúrate de que el backend devuelva `{ result: string }`
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [router]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Spinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-xl mx-auto mt-10 text-red-600 text-center">
        <p>❌ Ha ocurrido un error: {error}</p>
        <button
          onClick={() => router.push('/')}
          className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg"
        >
          Volver al inicio
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-6 mt-8 bg-white rounded-2xl shadow-md space-y-4">
      <h1 className="text-2xl font-semibold text-gray-800">Situación de aprendizaje generada</h1>
      <p className="whitespace-pre-wrap text-gray-700">{result}</p>
      <div className="text-center">
        <button
          onClick={() => router.push('/')}
          className="mt-6 bg-blue-600 text-white px-6 py-3 rounded-lg"
        >
          Generar otra
        </button>
      </div>
    </div>
  );
}

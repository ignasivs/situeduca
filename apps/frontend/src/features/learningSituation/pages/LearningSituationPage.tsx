'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import LearningSituationForm, {
  LearningSituationInput,
} from '../components/LearningSituationForm';

export default function LearningSituationPage() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (data: LearningSituationInput) => {
    setLoading(true);
    try {
      const res = await fetch('/api/learning-situation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error('Error generando situación de aprendizaje');

      const json = await res.json();

      sessionStorage.setItem(
        'learningSituationResult',
        JSON.stringify({
          input: data,
          result: json.result,
        })
      );

      router.push('/result');
    } catch (err) {
      console.error(err);
      alert('Ocurrió un error al generar la situación.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 py-12 px-4">
      <h1 className="text-3xl font-bold text-center text-blue-700 mb-10">
        Generador de Situaciones de Aprendizaje
      </h1>

      <LearningSituationForm onSubmit={handleSubmit} loading={loading} />
    </main>
  );
}

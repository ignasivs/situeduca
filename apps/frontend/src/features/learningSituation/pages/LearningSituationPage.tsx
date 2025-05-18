'use client';

import { useState } from 'react';
import LearningSituationForm, {
  LearningSituationInput,
} from '../components/LearningSituationForm';

export default function LearningSituationPage() {
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (data: LearningSituationInput) => {
    setLoading(true);
    setResult(null);
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
      setResult(json.result);
    } catch (err) {
      console.error(err);
      setResult('Ocurrió un error al generar la situación.');
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

      {result && (
        <div className="mt-10 max-w-3xl mx-auto bg-white border border-gray-200 p-6 rounded-2xl shadow-sm">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">
            Resultado generado
          </h2>
          <pre className="whitespace-pre-wrap text-gray-700">{result}</pre>
        </div>
      )}
    </main>
  );
}

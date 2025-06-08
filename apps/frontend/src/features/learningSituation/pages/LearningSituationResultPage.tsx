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
      <div className="max-w-3xl mx-auto p-6 bg-white rounded-2xl shadow-md space-y-4">
        <h1 className="text-2xl font-semibold text-text-title">Situación de aprendizaje generada</h1>
        <p className="whitespace-pre-wrap text-text-body">{result}</p>
        <div className="text-center">
          <button
            onClick={() => router.push('/')}
            className="mt-6 bg-primary-main hover:bg-primary-main/90 text-white px-6 py-3 rounded-lg transition duration-200"
          >
            Generar otra
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

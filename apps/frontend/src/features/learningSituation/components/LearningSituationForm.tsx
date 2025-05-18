'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Spinner from './Spinner';

export const LearningSituationSchema = z.object({
  course: z.enum(['Infantil', 'Primaria'], { required_error: 'Campo requerido' }),
  ageRange: z.string().min(1, 'Campo requerido'),
  topic: z.string().min(1, 'Campo requerido'),
  length: z
    .number({ invalid_type_error: 'Debe ser un número' })
    .int('Debe ser un número entero')
    .positive('Debe ser mayor que 0'),
  additionalNotes: z.string().optional(),
});

export type LearningSituationInput = z.infer<typeof LearningSituationSchema>;

interface Props {
  onSubmit: (data: LearningSituationInput) => void;
  loading: boolean;
}

export default function LearningSituationForm({ onSubmit, loading }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<LearningSituationInput>({
    resolver: zodResolver(LearningSituationSchema),
    mode: 'onBlur',
  });

  // Manejar cambio en el input numérico para length y convertir a número
  const handleLengthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === '') {
        setValue('length', 200, { shouldValidate: true });
    } else {
        const parsed = Number(value);
        setValue('length', parsed, { shouldValidate: true });
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-white shadow-md rounded-2xl p-6 max-w-xl mx-auto space-y-6"
    >
      {/* Course */}
      <div>
        <label htmlFor="course" className="block text-gray-700 font-medium mb-2">
          Curso
        </label>
        <select
          id="course"
          {...register('course')}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Selecciona una opción</option>
          <option value="Infantil">Infantil</option>
          <option value="Primaria">Primaria</option>
        </select>
        {errors.course && <p className="text-red-500 text-sm mt-1">{errors.course.message}</p>}
      </div>

      {/* Age Range */}
      <div>
        <label htmlFor="ageRange" className="block text-gray-700 font-medium mb-2">
          Edad o rango de edad
        </label>
        <input
          id="ageRange"
          {...register('ageRange')}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Ej. 5 años o 5-7 años"
        />
        {errors.ageRange && <p className="text-red-500 text-sm mt-1">{errors.ageRange.message}</p>}
      </div>

      {/* Topic */}
      <div>
        <label htmlFor="topic" className="block text-gray-700 font-medium mb-2">
          Tema de la situación de aprendizaje
        </label>
        <textarea
          id="topic"
          {...register('topic')}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows={4}
          placeholder="Describe sobre qué quieres la situación de aprendizaje"
        />
        {errors.topic && <p className="text-red-500 text-sm mt-1">{errors.topic.message}</p>}
      </div>

      {/* Length */}
      <div>
        <label htmlFor="length" className="block text-gray-700 font-medium mb-2">
          Cantidad de palabras deseadas
        </label>
        <input
          type="number"
          id="length"
          {...register('length', { valueAsNumber: true })}
          onChange={handleLengthChange}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Ej. 150"
          min={1}
        />
        {errors.length && <p className="text-red-500 text-sm mt-1">{errors.length.message}</p>}
      </div>

      {/* Additional Notes */}
      <div>
        <label htmlFor="additionalNotes" className="block text-gray-700 font-medium mb-2">
          Notas adicionales (opcional)
        </label>
        <textarea
          id="additionalNotes"
          {...register('additionalNotes')}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows={3}
          placeholder="Puedes añadir cualquier detalle extra que te gustaría incluir"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-200 flex items-center justify-center"
      >
        {loading ? <Spinner /> : 'Generar situación de aprendizaje'}
      </button>
    </form>
  );
}

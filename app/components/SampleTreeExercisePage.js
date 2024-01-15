'use client';

import Link from 'next/link';
import SampleTreeExercisePanel from './SampleTreeExercisePanel';

export default function SampleTreeExercisePage({ title, backUrl }) {
  return (
    <main>
      <div className="container mx-auto pb-20">
        <h1 className="my-5 text-3xl text-primary text-center">{title}</h1>
        <div className="text-center">
          <Link className="text-primary text-xs" href={backUrl}>
            Назад
          </Link>
        </div>
        <SampleTreeExercisePanel />
      </div>
    </main>
  );
}

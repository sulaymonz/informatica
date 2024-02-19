'use client';

import Link from 'next/link';
import VizuExercisePanel from './VizuExercisePanel';

export default function VizuExercisePage({ title, backUrl }) {
  return (
    <main>
      <div className="container mx-auto pb-20">
        <h1 className="my-5 text-3xl text-primary text-center">{title}</h1>
        <div className="text-center">
          <Link className="text-primary text-xs" href={backUrl}>
            Back
          </Link>
        </div>
        <VizuExercisePanel />
      </div>
    </main>
  );
}

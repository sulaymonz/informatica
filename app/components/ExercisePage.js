'use client';

import { useState } from 'react';
import ExercisePanel from '../components/ExercisePanel';

export default function ExercisePage({ title, exercises }) {
  const [index, setIndex] = useState(0);
  return (
    <main>
      <div className="container mx-auto pb-20">
        <h1 className="my-5 text-3xl text-primary text-center">{title}</h1>
        <div className="w-full flex flex-row justify-center items-center gap-4 select-none">
          <span
            className="cursor-pointer text-primary"
            onClick={() => {
              if (index > 0) {
                setIndex(index - 1);
              }
            }}
          >
            {'<'}
          </span>
          {exercises.map((exercise, i) => (
            <span
              key={i}
              className={
                i === index
                  ? 'text-accent underline cursor-default'
                  : 'text-primary cursor-pointer'
              }
              onClick={() => setIndex(i)}
            >
              {exercise.id}
            </span>
          ))}
          <span
            className="cursor-pointer text-primary"
            onClick={() => {
              if (index < exercises.length - 1) {
                setIndex(index + 1);
              }
            }}
          >
            {'>'}
          </span>
        </div>
        <ExercisePanel key={index} {...exercises[index]} />
      </div>
    </main>
  );
}

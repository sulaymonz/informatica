import ExercisePage from '@/app/components/ExercisePage';
import { defaultColors } from '../../../constants/colors';

export default function ComputerLesson() {
  const exercises = [
    {
      id: 11,
      description: (
        <>
          Раскрась одну область картинки красным.
          <br />
          Раскрась ещё три области картинки голубым.
          <br />
          Раскрась еще пять областей картинки синим.
        </>
      ),
      colors: defaultColors,
      tools: ['fill', 'eraser', 'undo', 'redo'],
      images: [
        {
          type: 'mainImage',
          src: '/images/exercises/grade1/exercise11-mainImage.png',
        },
        {
          type: 'fillArea',
          src: '/images/exercises/grade1/exercise11-fillArea.png',
        },
      ],
    },
    {
      id: 12,
      description: (
        <>
          Раскрась две области картинки зелёным.
          <br />
          Раскрась ещё шесть областей картинки фиолетовым.
        </>
      ),
      colors: defaultColors,
      tools: ['fill', 'eraser', 'undo', 'redo'],
      images: [
        {
          type: 'mainImage',
          src: '/images/exercises/grade1/exercise12-mainImage.png',
        },
        {
          type: 'fillArea',
          src: '/images/exercises/grade1/exercise12-fillArea.png',
        },
      ],
    },
    {
      id: 13,
      description: (
        <>
          Раскрась одну область картинки красным.
          <br />
          Раскрась ещё одну область картинки жёлтым.
          <br />
          Раскрась ещё одну область картинки голубым.
          <br />
          Раскрась ещё одну область картинки оранжевым.
        </>
      ),
      colors: defaultColors,
      tools: ['fill', 'eraser', 'undo', 'redo'],
      images: [
        {
          type: 'mainImage',
          src: '/images/exercises/grade1/exercise13-mainImage.png',
        },
        {
          type: 'fillArea',
          src: '/images/exercises/grade1/exercise13-fillArea.png',
        },
      ],
    },
    {
      id: 14,
      description: 'Раскрась картинку какими хочешь цветами.',
      colors: defaultColors,
      tools: ['fill', 'eraser', 'undo', 'redo'],
      images: [
        {
          type: 'mainImage',
          src: '/images/exercises/grade1/exercise14-mainImage.png',
        },
        {
          type: 'fillArea',
          src: '/images/exercises/grade1/exercise14-fillArea.png',
        },
      ],
    },
  ];
  return (
    <ExercisePage
      title='Компьютерный урок "Области". Задачи 11-14'
      exercises={[...exercises]}
      backUrl="/courses/grade-1"
    />
  );
}

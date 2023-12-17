import ExercisePage from '@/app/components/ExercisePage';
import { defaultColors } from '../../../constants/colors';

export default function ComputerLesson() {
  const exercises = [
    {
      id: 6,
      description:
        'Раскрась кита фиолетовым. Раскрась нераскрашенную бабочку какими хочешь цветами.',
      colors: defaultColors,
      tools: ['fill', 'eraser', 'undo', 'redo'],
      images: [
        {
          type: 'mainImage',
          src: '/images/exercises/grade1/exercise6-mainImage.png',
        },
        {
          type: 'fillArea',
          src: '/images/exercises/grade1/exercise6-fillArea.png',
        },
      ],
    },
    {
      id: 7,
      description:
        'Раскрась одну букву голубым. Раскрась ещё одну букву жёлтым.',
      colors: defaultColors,
      tools: ['fill', 'eraser', 'undo', 'redo'],
      images: [
        {
          type: 'mainImage',
          src: '/images/exercises/grade1/exercise7-mainImage.png',
        },
        {
          type: 'fillArea',
          src: '/images/exercises/grade1/exercise7-fillArea.png',
        },
      ],
    },
    {
      id: 8,
      description:
        'Раскрась правого ежа оранжевым. Раскрась левого ежа зелёным.',
      colors: defaultColors,
      tools: ['fill', 'eraser', 'undo', 'redo'],
      images: [
        {
          type: 'mainImage',
          src: '/images/exercises/grade1/exercise8-mainImage.png',
        },
        {
          type: 'fillArea',
          src: '/images/exercises/grade1/exercise8-fillArea.png',
        },
      ],
    },
    {
      id: 9,
      description:
        'Раскрась один нераскрашенный лист жёлтым. Раскрась ещё один нераскрашенный лист синим. Раскрась остальные нераскрашенные листья голубым.',
      colors: defaultColors,
      tools: ['fill', 'eraser', 'undo', 'redo'],
      images: [
        {
          type: 'mainImage',
          src: '/images/exercises/grade1/exercise9-mainImage.png',
        },
        {
          type: 'fillArea',
          src: '/images/exercises/grade1/exercise9-fillArea.png',
        },
      ],
    },
    {
      id: 10,
      description: 'Раскрась узор какими хочешь цветами.',
      colors: defaultColors,
      tools: ['fill', 'eraser', 'undo', 'redo'],
      images: [
        {
          type: 'mainImage',
          src: '/images/exercises/grade1/exercise10-mainImage.png',
        },
        {
          type: 'fillArea',
          src: '/images/exercises/grade1/exercise10-fillArea.png',
        },
      ],
    },
  ];
  return (
    <ExercisePage
      title='Компьютерный урок "Цвет". Задачи 6-10'
      exercises={[...exercises]}
      backUrl="/courses/grade-1"
    />
  );
}

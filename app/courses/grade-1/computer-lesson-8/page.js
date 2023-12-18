import ExercisePage from '@/app/components/ExercisePage';
import { defaultColors } from '../../../constants/colors';

export default function ComputerLesson() {
  const exercises = [
    {
      id: 15,
      description: 'Раскрась две одиинаковые буквы оранжевым.',
      colors: defaultColors,
      tools: ['fill', 'eraser', 'undo', 'redo'],
      images: [
        {
          type: 'mainImage',
          src: '/images/exercises/grade1/exercise15-mainImage.png',
        },
        {
          type: 'fillArea',
          src: '/images/exercises/grade1/exercise15-fillArea.png',
        },
      ],
    },
    {
      id: 16,
      description:
        'Сделай из правой фигурки такую же, как левая - раскрась квадратики.',
      colors: defaultColors,
      tools: ['fill', 'eraser', 'undo', 'redo'],
      images: [
        {
          type: 'mainImage',
          src: '/images/exercises/grade1/exercise16-mainImage.png',
        },
        {
          type: 'fillArea',
          src: '/images/exercises/grade1/exercise16-fillArea.png',
        },
      ],
    },
    {
      id: 17,
      description: (
        <>
          Раскрась одну область картинки зелёным.
          <br />
          Раскрась ещё одну область картинки жёлтым.
        </>
      ),
      colors: defaultColors,
      tools: ['fill', 'eraser', 'undo', 'redo'],
      images: [
        {
          type: 'mainImage',
          src: '/images/exercises/grade1/exercise17-mainImage.png',
        },
        {
          type: 'fillArea',
          src: '/images/exercises/grade1/exercise17-fillArea.png',
        },
      ],
    },
    {
      id: 18,
      description:
        'Сделай фигурки одинаковыми, раскрась нераскрашенные квадратики.',
      colors: defaultColors,
      tools: ['fill', 'eraser', 'undo', 'redo'],
      images: [
        {
          type: 'mainImage',
          src: '/images/exercises/grade1/exercise18-mainImage.png',
        },
        {
          type: 'fillArea',
          src: '/images/exercises/grade1/exercise18-fillArea.png',
        },
      ],
    },
    {
      id: 19,
      description:
        'Раскрась фигурки так чтобы среди этих фигурок были три одинаковые.',
      colors: defaultColors,
      tools: ['fill', 'eraser', 'undo', 'redo'],
      images: [
        {
          type: 'mainImage',
          src: '/images/exercises/grade1/exercise19-mainImage.png',
        },
        {
          type: 'fillArea',
          src: '/images/exercises/grade1/exercise19-fillArea.png',
        },
      ],
    },
  ];
  return (
    <ExercisePage
      title='Компьютерный урок "Одинаковые, разные". Задачи 15-19'
      exercises={[...exercises]}
      backUrl="/courses/grade-1"
    />
  );
}

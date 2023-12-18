import ExercisePage from '@/app/components/ExercisePage';
import { defaultColors } from '../../../constants/colors';

export default function ComputerLesson() {
  const exercises = [
    {
      id: 36,
      description: 'Вот греческие буквы. Обведи две одинаковые буквы зелёным.',
      colors: defaultColors,
      tools: ['undo', 'redo', 'fill', 'eraser', 'pencil'],
      images: [
        {
          type: 'mainImage',
          src: '/images/exercises/grade1/exercise36-mainImage.png',
        },
        {
          type: 'fillArea',
          src: '/images/exercises/noFill.png',
        },
      ],
    },
    {
      id: 37,
      description: 'Обведи голубым три одинаковые фигурки.',
      colors: defaultColors,
      tools: ['undo', 'redo', 'fill', 'eraser', 'pencil'],
      images: [
        {
          type: 'mainImage',
          src: '/images/exercises/grade1/exercise37-mainImage.png',
        },
        {
          type: 'fillArea',
          src: '/images/exercises/noFill.png',
        },
      ],
    },
    {
      id: 38,
      description: <>Вот фигурка: . Обведи такую же фигурку красным.</>,
      colors: defaultColors,
      tools: ['undo', 'redo', 'fill', 'eraser', 'pencil'],
      images: [
        {
          type: 'mainImage',
          src: '/images/exercises/grade1/exercise38-mainImage.png',
        },
        {
          type: 'fillArea',
          src: '/images/exercises/noFill.png',
        },
      ],
    },
    {
      id: 39,
      description: 'Соедини две одинаковые фигурки зелёным.',
      colors: defaultColors,
      tools: ['undo', 'redo', 'fill', 'eraser', 'pencil'],
      images: [
        {
          type: 'mainImage',
          src: '/images/exercises/grade1/exercise39-mainImage.png',
        },
        {
          type: 'fillArea',
          src: '/images/exercises/noFill.png',
        },
      ],
    },
    {
      id: 40,
      description: <>Вот флаг Таджикистана: .Обведи такой же флаг оранжевым.</>,
      colors: defaultColors,
      tools: ['undo', 'redo', 'fill', 'eraser', 'pencil'],
      images: [
        {
          type: 'mainImage',
          src: '/images/exercises/grade1/exercise40-mainImage.png',
        },
        {
          type: 'fillArea',
          src: '/images/exercises/noFill.png',
        },
      ],
    },
    {
      id: 41,
      description: (
        <>
          Раскрась одну область картинки красным.
          <br />
          Раскрась ещё одну область картинки оранжевым.
          <br />
          Раскрась ещё одну область картинки жёлтым.
          <br />
          Раскрась ещё одну область картинки зелёным.
          <br />
          Раскрась ещё одну область картинки голубым.
          <br />
          Раскрась ещё одну область картинки синим.
          <br />
          Раскрась ещё одну область картинки фиолетовым.
        </>
      ),
      colors: defaultColors,
      tools: ['undo', 'redo', 'fill', 'eraser', 'pencil'],
      images: [
        {
          type: 'mainImage',
          src: '/images/exercises/grade1/exercise41-mainImage.png',
        },
        {
          type: 'fillArea',
          src: '/images/exercises/grade1/exercise41-fillArea.png',
        },
      ],
    },
    {
      id: 42,
      description:
        'Раскрась бусины так, чтобы здесь небыло двух одинаковых бусин.',
      colors: defaultColors,
      tools: ['undo', 'redo', 'fill', 'eraser', 'pencil'],
      images: [
        {
          type: 'mainImage',
          src: '/images/exercises/grade1/exercise42-mainImage.png',
        },
        {
          type: 'fillArea',
          src: '/images/exercises/grade1/exercise42-fillArea.png',
        },
      ],
    },
    {
      id: 43,
      description: (
        <>
          Раскрась один квадратик в одной фигурке так, чтобы здесь были две
          одинаковые фигурки. Обведи потом две одинаковые фигурки голубым.
        </>
      ),
      colors: defaultColors,
      tools: ['undo', 'redo', 'fill', 'eraser', 'pencil'],
      images: [
        {
          type: 'mainImage',
          src: '/images/exercises/grade1/exercise43-mainImage.png',
        },
        {
          type: 'fillArea',
          src: '/images/exercises/grade1/exercise43-fillArea.png',
        },
      ],
    },
    {
      id: 44,
      description: (
        <>
          Раскрась фигурки так, чтобы здесь были две одинаковые фигурки. Обведи
          потом две одинаковые фигурки фиолетовым.
        </>
      ),
      colors: defaultColors,
      tools: ['undo', 'redo', 'fill', 'eraser', 'pencil'],
      images: [
        {
          type: 'mainImage',
          src: '/images/exercises/grade1/exercise44-mainImage.png',
        },
        {
          type: 'fillArea',
          src: '/images/exercises/grade1/exercise44-fillArea.png',
        },
      ],
    },
    {
      id: 45,
      description:
        'Раскрась нераскрашенные области в узоре какими хочешь цветами.',
      colors: defaultColors,
      tools: ['undo', 'redo', 'fill', 'eraser', 'pencil'],
      images: [
        {
          type: 'mainImage',
          src: '/images/exercises/grade1/exercise45-mainImage.png',
        },
        {
          type: 'fillArea',
          src: '/images/exercises/grade1/exercise45-fillArea.png',
        },
      ],
    },
  ];
  return (
    <ExercisePage
      title='Компьютерный урок "Решение задач. 1 четверть". Задачи 36 - 45'
      exercises={[...exercises]}
      backUrl="/courses/grade-1"
    />
  );
}

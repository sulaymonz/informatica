import ExercisePage from '@/app/components/ExercisePage';
import { defaultColors } from '../../../constants/colors';

export default function ComputerLesson() {
  const exercises = [
    {
      id: 25,
      description: (
        <>
          Соедини грушу и ананас синим. Для этого выбери карандаш, выбери синий
          цвет в палитре, нажми на мышку и рисуй линию, как обычным карандашом.
          Если не получилось - нажми кнопку отмены или сотри ластиком.
        </>
      ),
      colors: defaultColors,
      tools: ['undo', 'redo', 'fill', 'eraser', 'pencil'],
      images: [
        {
          type: 'mainImage',
          src: '/images/exercises/grade1/exercise25-mainImage.png',
        },
        {
          type: 'fillArea',
          src: '/images/exercises/noFill.png',
        },
      ],
    },
    {
      id: 26,
      description: 'Соедини голубым красный квадрат и зелёный круг.',
      colors: defaultColors,
      tools: ['undo', 'redo', 'fill', 'eraser', 'pencil'],
      images: [
        {
          type: 'mainImage',
          src: '/images/exercises/grade1/exercise26-mainImage.png',
        },
        {
          type: 'fillArea',
          src: '/images/exercises/noFill.png',
        },
      ],
    },
    {
      id: 27,
      description: (
        <>
          Соедини фиолетовым две одинаковые цифры. Раскрась единицу зелёным.
          Обведи двойку красным.
        </>
      ),
      colors: defaultColors,
      tools: ['undo', 'redo', 'fill', 'eraser', 'pencil'],
      images: [
        {
          type: 'mainImage',
          src: '/images/exercises/grade1/exercise27-mainImage.png',
        },
        {
          type: 'fillArea',
          src: '/images/exercises/grade1/exercise27-fillArea.png',
        },
      ],
    },
    {
      id: 28,
      description:
        'Вот предписывающие дорожные знаки. Соедини зелёным две одинаковые фигурки.',
      colors: defaultColors,
      tools: ['undo', 'redo', 'fill', 'eraser', 'pencil'],
      images: [
        {
          type: 'mainImage',
          src: '/images/exercises/grade1/exercise28-mainImage.png',
        },
        {
          type: 'fillArea',
          src: '/images/exercises/noFill.png',
        },
      ],
    },
    {
      id: 29,
      description:
        'Сделай фигурки одинаковыми - раскрась нераскрашенные квадратики.',
      colors: defaultColors,
      tools: ['undo', 'redo', 'fill', 'eraser', 'pencil'],
      images: [
        {
          type: 'mainImage',
          src: '/images/exercises/grade1/exercise29-mainImage.png',
        },
        {
          type: 'fillArea',
          src: '/images/exercises/grade1/exercise29-fillArea.png',
        },
      ],
    },
    {
      id: 30,
      description:
        'Раскрась нераскрашенные области в узоре какими хочешь цветами.',
      colors: defaultColors,
      tools: ['undo', 'redo', 'fill', 'eraser', 'pencil'],
      images: [
        {
          type: 'mainImage',
          src: '/images/exercises/grade1/exercise30-mainImage.png',
        },
        {
          type: 'fillArea',
          src: '/images/exercises/grade1/exercise30-fillArea.png',
        },
      ],
    },
  ];
  return (
    <ExercisePage
      title='Компьютерный урок "Соедини". Задачи 25 - 30'
      exercises={[...exercises]}
      backUrl="/courses/grade-1"
    />
  );
}

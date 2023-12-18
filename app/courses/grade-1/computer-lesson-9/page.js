import ExercisePage from '@/app/components/ExercisePage';
import { defaultColors } from '../../../constants/colors';

export default function ComputerLesson() {
  const exercises = [
    {
      id: 20,
      description: (
        <>
          Обведи попугая зелёным, для этого выбери карандаш, выбери зелёный цвет
          в палитре, нажми на мышку и рисуй линию, как обычным карандашом. Если
          не получилось - нажми кнопку отмены.
        </>
      ),
      colors: defaultColors,
      tools: ['undo', 'redo', 'fill', 'eraser', 'pencil'],
      images: [
        {
          type: 'mainImage',
          src: '/images/exercises/grade1/exercise20-mainImage.png',
        },
        {
          type: 'fillArea',
          src: '/images/exercises/noFill.png',
        },
      ],
    },
    {
      id: 21,
      description: (
        <>
          Обведи две одинаковые фигурки красным. Если захочешь стереть свою
          линию, выбери ластик. Обрати внимание, что стирается та линия, на
          которую указывает крестик возле ластика.
        </>
      ),
      colors: defaultColors,
      tools: ['undo', 'redo', 'fill', 'eraser', 'pencil'],
      images: [
        {
          type: 'mainImage',
          src: '/images/exercises/grade1/exercise21-mainImage.png',
        },
        {
          type: 'fillArea',
          src: '/images/exercises/noFill.png',
        },
      ],
    },
    {
      id: 22,
      description: <>Вот фигурка: . Обведи такую же фигурку фиолетовым.</>,
      colors: defaultColors,
      tools: ['undo', 'redo', 'fill', 'eraser', 'pencil'],
      images: [
        {
          type: 'mainImage',
          src: '/images/exercises/grade1/exercise22-mainImage.png',
        },
        {
          type: 'fillArea',
          src: '/images/exercises/noFill.png',
        },
      ],
    },
    {
      id: 23,
      description:
        'Обведи две одинаковые буквы синим. Раскрась букву Д красным. Раскрась букву Е голубым.',
      colors: defaultColors,
      tools: ['undo', 'redo', 'fill', 'eraser', 'pencil'],
      images: [
        {
          type: 'mainImage',
          src: '/images/exercises/grade1/exercise23-mainImage.png',
        },
        {
          type: 'fillArea',
          src: '/images/exercises/grade1/exercise23-fillArea.png',
        },
      ],
    },
    {
      id: 24,
      description:
        'Сделай картинки одинаковыми - раскрась нераскрашенные области.',
      colors: defaultColors,
      tools: ['undo', 'redo', 'fill', 'eraser', 'pencil'],
      images: [
        {
          type: 'mainImage',
          src: '/images/exercises/grade1/exercise24-mainImage.png',
        },
        {
          type: 'fillArea',
          src: '/images/exercises/grade1/exercise24-fillArea.png',
        },
      ],
    },
  ];
  return (
    <ExercisePage
      title='Компьютерный урок "Обведи". Задачи 20 - 24'
      exercises={[...exercises]}
      backUrl="/courses/grade-1"
    />
  );
}

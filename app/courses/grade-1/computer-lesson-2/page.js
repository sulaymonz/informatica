import ExercisePage from '@/app/components/ExercisePage';
import { defaultColors } from '../../../constants/colors';

export default function ComputerLesson() {
  const exercises = [
    {
      id: 1,
      description: `
        Раскрась дельфина каким хочешь цветом. Для этого выбери заливку,
        выбери какой хочешь цвет в палитре и нажми мышкой на дельфина.
      `,
      colors: defaultColors,
      tools: ['fill', 'eraser', 'undo', 'redo'],
      images: [
        {
          type: 'mainImage',
          src: '/images/exercises/grade1/exercise1-mainImage.png',
        },
        {
          type: 'fillArea',
          src: '/images/exercises/grade1/exercise1-fillArea.png',
        },
      ],
    },
    {
      id: 2,
      description: `
        Сотри раскраску динозавра. Для этого быбери ластик и нажми мышкой на динозавра.
        Теперь раскрась динозавра каким хочешь цветом.
      `,
      colors: defaultColors,
      tools: ['fill', 'eraser', 'undo', 'redo'],
      images: [
        {
          type: 'mainImage',
          src: '/images/exercises/grade1/exercise2-mainImage.png',
        },
        {
          type: 'fillArea',
          src: '/images/exercises/grade1/exercise2-fillArea.png',
        },
      ],
    },
    {
      id: 3,
      description: `
        Раскрась зонт какими хочешь цветами. Чтобы исправитч раскраску, щёлкни на кнопку отмена.
      `,
      colors: defaultColors,
      tools: ['fill', 'eraser', 'undo', 'redo'],
      images: [
        {
          type: 'mainImage',
          src: '/images/exercises/grade1/exercise3-mainImage.png',
        },
        {
          type: 'fillArea',
          src: '/images/exercises/grade1/exercise3-fillArea.png',
        },
      ],
    },
    {
      id: 4,
      description: `
        Раскрась узор какими хочешь цветами.
        Чтобы начать раскрашивать сначала, щёлкни на кнопку сначала.
      `,
      colors: defaultColors,
      tools: ['fill', 'eraser', 'undo', 'redo'],
      images: [
        {
          type: 'mainImage',
          src: '/images/exercises/grade1/exercise4-mainImage.png',
        },
        {
          type: 'fillArea',
          src: '/images/exercises/grade1/exercise4-fillArea.png',
        },
      ],
    },
    {
      id: 5,
      description: `
        Раскрась картинку какими хочешь цветами.
      `,
      colors: defaultColors,
      tools: ['fill', 'eraser', 'undo', 'redo'],
      images: [
        {
          type: 'mainImage',
          src: '/images/exercises/grade1/exercise5-mainImage.png',
        },
        {
          type: 'fillArea',
          src: '/images/exercises/grade1/exercise5-fillArea.png',
        },
      ],
    },
  ];
  return (
    <ExercisePage
      title='Компьютерный урок "Правила раскрашивания". Задачи 1-5'
      exercises={[...exercises]}
      backUrl="/courses/grade-1"
    />
  );
}

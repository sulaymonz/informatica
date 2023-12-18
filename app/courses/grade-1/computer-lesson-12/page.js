import ExercisePage from '@/app/components/ExercisePage';
import { defaultColors } from '../../../constants/colors';

export default function ComputerLesson() {
  const exercises = [
    {
      id: 31,
      description: (
        <>
          Соедини две одинаковые голубые бусины синим.
          <br />
          Соедини две одинаковые квадратные бусины жёлтым.
          <br />
          Обведи три одинаковте бусины красным.
        </>
      ),
      colors: defaultColors,
      tools: ['undo', 'redo', 'fill', 'eraser', 'pencil'],
      images: [
        {
          type: 'mainImage',
          src: '/images/exercises/grade1/exercise31-mainImage.png',
        },
        {
          type: 'fillArea',
          src: '/images/exercises/noFill.png',
        },
      ],
    },
    {
      id: 32,
      description: (
        <>
          Соедини две разные красные бусины чёрным.
          <br />
          Соедини две какие-нибудь разные круглые бусины фиолетовым.
          <br />
          Обведи четыре одинаковые бусины голубым.
        </>
      ),
      colors: defaultColors,
      tools: ['undo', 'redo', 'fill', 'eraser', 'pencil'],
      images: [
        {
          type: 'mainImage',
          src: '/images/exercises/grade1/exercise32-mainImage.png',
        },
        {
          type: 'fillArea',
          src: '/images/exercises/noFill.png',
        },
      ],
    },
    {
      id: 33,
      description: (
        <>
          Раскрась нереаскрашенные бусины так, чтобы среди этих бусин были три
          одинаковые. Обведи теперь три одинаковые бусины красным.
        </>
      ),
      colors: defaultColors,
      tools: ['undo', 'redo', 'fill', 'eraser', 'pencil'],
      images: [
        {
          type: 'mainImage',
          src: '/images/exercises/grade1/exercise33-mainImage.png',
        },
        {
          type: 'fillArea',
          src: '/images/exercises/grade1/exercise33-fillArea.png',
        },
      ],
    },
    {
      id: 34,
      description: (
        <>
          Раскрась фигурки так, чтобы среди этих фигурок были три одинаковые.
          Обведи потом три одинаковые фигурки фиолетовым.
        </>
      ),
      colors: defaultColors,
      tools: ['undo', 'redo', 'fill', 'eraser', 'pencil'],
      images: [
        {
          type: 'mainImage',
          src: '/images/exercises/grade1/exercise34-mainImage.png',
        },
        {
          type: 'fillArea',
          src: '/images/exercises/grade1/exercise34-fillArea.png',
        },
      ],
    },
    {
      id: 35,
      description: 'Раскрась узор какими хочешь цветами.',
      colors: defaultColors,
      tools: ['undo', 'redo', 'fill', 'eraser', 'pencil'],
      images: [
        {
          type: 'mainImage',
          src: '/images/exercises/grade1/exercise35-mainImage.png',
        },
        {
          type: 'fillArea',
          src: '/images/exercises/grade1/exercise35-fillArea.png',
        },
      ],
    },
  ];
  return (
    <ExercisePage
      title='Компьютерный урок "Одинаковые и разные бусины". Задачи 31 - 35'
      exercises={[...exercises]}
      backUrl="/courses/grade-1"
    />
  );
}

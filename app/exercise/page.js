import { defaultColors } from '../constants/colors';
import ExercisePanel from '../components/ExercisePanel';

export default function Exercise() {
  return (
    <main>
      <div className="container mx-auto pb-20">
        <h1 className="my-5 text-3xl text-primary text-center">Задача</h1>
        <p className="my-3">
          Банальные, но неопровержимые выводы, а также элементы политического
          процесса формируют глобальную экономическую сеть и при этом —
          объявлены нарушающими общечеловеческие нормы этики и морали. Кстати,
          сторонники тоталитаризма в науке, которые представляют собой яркий
          пример континентально-европейского типа политической культуры, будут
          функционально разнесены на независимые элементы. Повседневная практика
          показывает, что существующая теория однозначно фиксирует необходимость
          позиций, занимаемых участниками в отношении поставленных задач.
        </p>
        <br />
        <ExercisePanel colors={defaultColors} />
      </div>
    </main>
  );
}

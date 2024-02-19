import Link from 'next/link';

export default function Grade1() {
  return (
    <main>
      <div className="container mx-auto">
        <h1 className="my-5 text-3xl text-primary text-center">1-й Класс</h1>
        <p className="my-3">
          Однозначно, тщательные исследования конкурентов могут быть призваны к
          ответу. В целом, конечно, постоянное информационно-пропагандистское
          обеспечение нашей деятельности требует анализа анализа существующих
          паттернов поведения. Но сторонники тоталитаризма в науке рассмотрены
          исключительно в разрезе маркетинговых и финансовых предпосылок. С
          учётом сложившейся международной обстановки, сложившаяся структура
          организации требует определения и уточнения форм воздействия. И нет
          сомнений, что базовые сценарии поведения пользователей освещают
          чрезвычайно интересные особенности картины в целом, однако конкретные
          выводы, разумеется, обнародованы. Значимость этих проблем настолько
          очевидна, что базовый вектор развития предполагает независимые способы
          реализации поставленных обществом задач.
        </p>
        <ul>
          <li>
            <Link
              className="text-accent hover:text-primary"
              href="/courses/grade-1/computer-lesson-2"
            >
              <strong>Урок - 2:</strong> Компьютерный урок "Правила
              раскрашивания". Задачи 1-5
            </Link>
          </li>
          <li>
            <Link
              className="text-accent hover:text-primary"
              href="/courses/grade-1/computer-lesson-4"
            >
              <strong>Урок - 4:</strong> Компьютерный урок "Цвет". Задачи 6-10
            </Link>
          </li>
          <li>
            <Link
              className="text-accent hover:text-primary"
              href="/courses/grade-1/computer-lesson-5"
            >
              <strong>Урок - 5:</strong> Компьютерный урок "Области". Задачи
              11-14
            </Link>
          </li>
          <li>
            <Link
              className="text-accent hover:text-primary"
              href="/courses/grade-1/computer-lesson-8"
            >
              <strong>Урок - 8:</strong> Компьютерный урок "Одинаковые, разные".
              Задачи 15-19
            </Link>
          </li>
          <li>
            <Link
              className="text-accent hover:text-primary"
              href="/courses/grade-1/computer-lesson-9"
            >
              <strong>Урок - 9:</strong> Компьютерный урок "Обведи". Задачи 20 -
              24
            </Link>
          </li>
          <li>
            <Link
              className="text-accent hover:text-primary"
              href="/courses/grade-1/computer-lesson-10"
            >
              <strong>Урок - 10:</strong> Компьютерный урок "Соедини". Задачи 25
              - 30
            </Link>
          </li>
          <li>
            <Link
              className="text-accent hover:text-primary"
              href="/courses/grade-1/computer-lesson-12"
            >
              <strong>Урок - 12:</strong> Компьютерный урок "Одинаковые и разные
              бусины". Задачи 31 - 35
            </Link>
          </li>
          <li>
            <Link
              className="text-accent hover:text-primary"
              href="/courses/grade-1/computer-lesson-16"
            >
              <strong>Урок - 16:</strong> Компьютерный урок "Решение задач. 1
              четверть". Задачи 36 - 45
            </Link>
          </li>
          <li>
            <Link
              className="text-accent hover:text-primary"
              href="/courses/grade-1/vizu"
            >
              <strong>Test:</strong> "Vizu"
            </Link>
          </li>
        </ul>
      </div>
    </main>
  );
}

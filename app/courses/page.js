import Link from 'next/link';

export default function Courses() {
  return (
    <main>
      <div className="container mx-auto px-4">
        <h1 className="my-5 text-3xl text-primary text-center">Курсы</h1>
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
        <Link className="text-accent" href="/exercise">
          Задача
        </Link>
      </div>
    </main>
  );
}
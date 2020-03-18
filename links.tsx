import Link from "next/link";
import {
  ArticlePartialData,
  Category,
  DisciplineDetail,
  Identifiable
} from "./schema";

export function CategoryLink(props: {
  category: Category;
  children: React.ReactNode;
}) {
  return (
    <Link href={`/features/[category]`} as={`/features/${props.category.slug}`}>
      {props.children}
    </Link>
  );
}

export function ArticleLink(props: {
  article: ArticlePartialData;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={`/features/[category]/[article]`}
      as={`/features/${props.article.category.slug}/${props.article.slug}`}
    >
      {props.children}
    </Link>
  );
}

export function SchoolLink(props: {
  school: Identifiable;
  children: React.ReactNode;
}) {
  return (
    <Link href={`/schools/[slug]`} as={`/schools/${props.school.slug}`}>
      {props.children}
    </Link>
  );
}

export function PersonLink(props: {
  person: Identifiable;
  children: React.ReactNode;
}) {
  return (
    <Link href={`/people/[slug]`} as={`/people/${props.person.slug}`} passHref>
      {props.children}
    </Link>
  );
}

export function DisciplineLink(props: {
  discipline: DisciplineDetail;
  children: React.ReactNode;
}) {
  if (props.discipline.level === 1) {
    return (
      <Link
        href={`/disciplines/[discipline]`}
        as={`/disciplines/${props.discipline.slug}`}
      >
        {props.children}
      </Link>
    );
  } else {
    return (
      <Link
        href={`/disciplines/[discipline]/[subdiscipline]`}
        as={`/disciplines/${props.discipline.parent}/${props.discipline.slug}`}
      >
        {props.children}
      </Link>
    );
  }
}

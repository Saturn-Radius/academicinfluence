import Link from "next/link";
import {
  ArticlePartialData,
  Category,
  DisciplineDetail,
  Identifiable
} from "./schema";
import { ACCENT, BG_PAGE } from "./styles";

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

export function SectionLink(props: {
  id: string;
  href: string;
  as?: string;
  currentSection?: string;
  label: string;
}) {
  const active = props.id === props.currentSection;
  return (
    <Link href={props.href} as={props.as}>
      <a
        css={{
          fontStyle: "normal",
          fontWeight: 500,
          fontSize: "18px",
          lineHeight: "20px",
          alignItems: "center",
          textAlign: "left",
          textDecoration: "none",
          display: "block",
          color: active ? "white" : "inherit",
          padding: "10px",
          backgroundColor: active ? ACCENT : BG_PAGE,
          cursor: "pointer"
        }}
      >
        {props.label}
      </a>
    </Link>
  );
}

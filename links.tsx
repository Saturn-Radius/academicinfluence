import { ArticlePartialData, Category, Identifiable } from "./schema";
import Link from "next/link";

export function CategoryLink(props: {
    category: Category,
    children: React.ReactNode
}) {
    return <Link
        href={`/features/[category]`}
        as={`/features/${props.category.slug}`}
    >
        {props.children}
    </Link>
}

export function ArticleLink(props: {
    article: ArticlePartialData,
    children: React.ReactNode
}) {
    return <Link
        href={`/features/[category]/[article]`}
        as={`/features/${props.article.category.slug}/${props.article.slug}`}
    >
        {props.children}
    </Link>
}

export function SchoolLink(props: {
    school: Identifiable,
    children: React.ReactNode
}) {
    return <Link
        href={`/schools/[slug]`}
        as={`/schools/${props.school.slug}`}
    >
        {props.children}
    </Link>
}

export function PersonLink(props: {
    person: Identifiable,
    children: React.ReactNode
}) {
    return <Link
        href={`/people/[slug]`}
        as={`/people/${props.person.slug}`}
    >
        {props.children}
    </Link>
}
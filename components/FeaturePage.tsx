import { FeaturesPageCategory, FeaturesPageResponse} from "../api";

import Link from "next/link";

import { GRAY_DARK, PAGE_WIDTH_STYLE } from "../styles";

function CategoryBar(props: {categories: FeaturesPageCategory[]}) {
    return <div css={{
        display: 'flex',
        justifyContent: 'center'
    }}>
        {props.categories.map(category => (
            <Link  href={"/features/" + category.slug} key={category.slug}>
                <a css={{
                    marginLeft: '13px',
                    marginRight: '13px',
                    marginTop: '5px',
                    marginBottom: '5px',
                color: GRAY_DARK,
                fontSize: '20px',
                fontWeight: 500,
            }}>{category.name}</a>
            </Link>
        ))}
    </div>
}

export default function FeaturePage(props: {
    data: FeaturesPageResponse,
    children: React.ReactNode
}) {
    return    <div css={PAGE_WIDTH_STYLE}>
    <CategoryBar categories={props.data.categories}/>
    {props.children}
   </div>
}
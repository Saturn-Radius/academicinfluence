import { NextPage, NextPageContext } from "next";
import "rc-slider/assets/index.css";
import "rc-tooltip/assets/bootstrap.css";
import React from "react";
import Autocomplete from "react-autocomplete";
import "react-circular-progressbar/dist/styles.css";
import { apiInfluentialSchoolsPage, apiSchoolSearch } from "../../api";
import { InfluentialSchoolsPageResponse, Identifiable } from "../../schema";
import { Router, useRouter } from "next/router";

type InfluentialSchoolsProps = InfluentialSchoolsPageResponse

function SchoolSearchBox() {

  const [value, setValue] = React.useState('')
  const [items, setItems] = React.useState([] as Identifiable[])

  const onChange = React.useCallback(
    async text => {
      setItems([])
      setValue(text.target.value)
      const items = await apiSchoolSearch(text.target.value)
      setItems(items.schools)
    },
    [setValue, setItems]
  )

  const router = useRouter()

  const onSelect = React.useCallback(
    slug => {
      router.push('/schools/' + slug)
    },
    [router]
  )

  return <Autocomplete value={value} items={items}  onChange={onChange} onSelect={onSelect}

          getItemValue={item => item.slug}
           renderItem={(item, isHighlighted) => (
            <div
              key={item.slug}
              style={{ background: isHighlighted ? "lightgray" : "white" }}
            >
              {item.name}
            </div>
          )}/>
}

const InfluentialSchools: NextPage<InfluentialSchoolsProps> = props => {
  return (
      <div>
          <SchoolSearchBox />
          
          <pre>
              {JSON.stringify(props.schools, null, 4)}
          </pre>
    </div>
  );
};

InfluentialSchools.getInitialProps = async function(context: NextPageContext) {
  return await apiInfluentialSchoolsPage({})
};

export default InfluentialSchools;

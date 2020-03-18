import { useRouter } from "next/router";
import * as React from "react";
import { apiSchoolSearch } from "../../api";
import Autocomplete from "../Autocomplete";

async function lookupSchools(text: string, signal?: AbortSignal) {
  const response = await apiSchoolSearch(text, signal);
  return response.schools;
}

const SchoolSearchBox = (props: {}) => {
  const [text, setText] = React.useState("");
  const router = useRouter();
  const onSelect = React.useCallback(
    school => {
      router.push("/schools/[slug]", "/schools/" + school.slug);
    },
    [router]
  );

  return (
    <>
      Search by Name:&nbsp;
      <Autocomplete
        text={text}
        textChange={setText}
        onSelect={onSelect}
        api={lookupSchools}
      />
    </>
  );
};

export default SchoolSearchBox;

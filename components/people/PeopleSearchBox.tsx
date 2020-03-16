import { useRouter } from "next/router";
import * as React from "react";
import { apiPersonSearch } from "../../api";
import Autocomplete from "../Autocomplete";

async function lookupPeople(text: string, signal?: AbortSignal) {
  const response = await apiPersonSearch(text, signal);
  return response.people;
}

const PersonSearchBox = (props: {}) => {
  const [text, setText] = React.useState("");
  const router = useRouter();
  const onSelect = React.useCallback(
    person => {
      router.push("/people/[slug]", "/people/" + person.slug);
    },
    [router]
  );

  return (
    <Autocomplete
      text={text}
      textChange={setText}
      onSelect={onSelect}
      api={lookupPeople}
    />
  );
};

export default PersonSearchBox;

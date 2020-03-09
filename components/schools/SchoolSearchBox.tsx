import { useState, useCallback } from "react";
import styled from "@emotion/styled";
import { useRouter } from "next/router";
import Autocomplete from "react-autocomplete";
import { apiSchoolSearch } from "../../api";
import { Identifiable } from "../../schema";

const Search = styled(Autocomplete)`
  input {
    width: 100%;
  }
`;

const SchoolSearchBox = () => {
  const [value, setValue] = useState("");
  const [items, setItems] = useState([] as Identifiable[]);

  const onChange = useCallback(
    async (text: any) => {
      setItems([]);
      setValue(text.target.value);
      const items = await apiSchoolSearch(text.target.value);
      setItems(items.schools);
    },
    [setValue, setItems]
  );

  const router = useRouter();

  const onSelect = useCallback(
    slug => {
      router.push("/schools/" + slug);
    },
    [router]
  );

  return (
    <Search
      value={value}
      items={items}
      onChange={onChange}
      onSelect={onSelect}
      getItemValue={item => item.slug}
      wrapperStyle={{
        width: "100%"
      }}
      menuStyle={{
        borderRadius: "3px",
        boxShadow: "0 2px 12px rgba(0, 0, 0, 0.1)",
        background: "rgba(255, 255, 255, 0.9)",
        padding: "2px 0",
        fontSize: "90%",
        position: "fixed",
        overflow: "auto",
        maxHeight: "50%",
        zIndex: 1
      }}
      renderItem={(item, isHighlighted) => (
        <div
          key={item.slug}
          style={{
            width: "100%",
            background: isHighlighted ? "lightgray" : "white"
          }}
        >
          {item.name}
        </div>
      )}
    />
  );
};

export default SchoolSearchBox;

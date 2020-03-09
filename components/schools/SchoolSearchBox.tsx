import { useState, useCallback } from "react";
import styled from "@emotion/styled";
import { useRouter } from "next/router";
import Autocomplete from "react-autocomplete";
import { apiSchoolSearch } from "../../api";
import { Identifiable } from "../../schema";
import { GRAY_DARK, GRAY_MID } from "../../styles";

const Search = styled(Autocomplete)`
  input {
    width: 100%;
  }
`;

interface SearchListItemProps {
  readonly isHighlighted: boolean;
}
const SearchListItem = styled.div<SearchListItemProps>`
  width: 100%;
  background: ${props => (props.isHighlighted ? "lightgray" : "white")};
`;

const wrapperStyle = {
  width: "100%",
  minHeight: "39px"
};

const menuStyle = {
  zIndex: 1,
  border: `solid 1px ${GRAY_DARK}`,
  borderRadius: "3px"
};

const inputStyle = {
  width: "100%",
  height: "100%",
  maxHeight: "50%",
  backgroundColor: "#ffffff",
  borderRadius: "3px",
  padding: "2px 0",
  textIndent: "10px",
  overflow: "auto",
  outline: "none",
  fontFamily: "SF UI Display Medium",
  fontSize: "12px",
  fontStyle: "normal",
  lineHeight: "normal",
  letterSpacing: "normal",
  color: `${GRAY_MID}`
};

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
      wrapperStyle={wrapperStyle}
      menuStyle={menuStyle}
      inputProps={{
        style: inputStyle
      }}
      renderItem={(item, isHighlighted) => (
        <SearchListItem key={item.slug} isHighlighted={isHighlighted}>
          {item.name}
        </SearchListItem>
      )}
    />
  );
};

export default SchoolSearchBox;

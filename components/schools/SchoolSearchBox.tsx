import styled from "@emotion/styled";
import { useRouter } from "next/router";
import { useCallback, useState } from "react";
import Autocomplete from "react-autocomplete";
import { apiSchoolSearch } from "../../api";
import { Identifiable } from "../../schema";
import { GRAY, GRAY_DARKEST } from "../../styles";

const SearchWrapper = styled.div`
  flex: 1;
  flex-direction: column;
`;

const Search = styled(Autocomplete)`
  input {
    width: 100%;
  }
`;

const AdvancedSearchButton = styled.button`
  float: right;
  font-family: "SF UI Display Medium";
  font-size: 12px;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  color: ${GRAY_DARKEST};
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
  border: `solid 1px ${GRAY_DARKEST}`,
  borderRadius: "3px"
};

const inputStyle = {
  width: "100%",
  height: "39px",
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
  color: `${GRAY}`
};

interface SchoolSearchBoxProps {
  readonly onAdvancedSearchClick: any;
}
const SchoolSearchBox = (props: SchoolSearchBoxProps) => {
  const [value, setValue] = useState("");
  const [items, setItems] = useState([] as Identifiable[]);
  const [isAdvanced, setIsAdvanced] = useState(false);
  const { onAdvancedSearchClick } = props;

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

  const switchSearchMode = () => {
    setIsAdvanced(!isAdvanced);
    onAdvancedSearchClick(!isAdvanced);
  };

  return (
    <SearchWrapper>
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
      <AdvancedSearchButton onClick={() => switchSearchMode()}>
        Advanced Search
      </AdvancedSearchButton>
    </SearchWrapper>
  );
};

export default SchoolSearchBox;

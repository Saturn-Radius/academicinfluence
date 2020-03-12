import * as React from "react";
import Autosuggest from "react-autosuggest";

export const Cow = 2;

export default function Autocomplete<T extends { name: string }>(props: {
  api: (text: string) => Promise<T[]>;
  text: string;
  textChange?: (text: string) => void;
  clearSelection?: () => void;
  updateCurrent?: (item: T | null) => void;
  onSelect?: (item: T) => void;
}) {
  const [suggestions, setSuggestions] = React.useState<T[]>([]);
  const [currentSuggestion, setCurrentSuggestion] = React.useState<T | null>(
    null
  );

  const lookupLocation = React.useCallback(
    async function lookupLocation(text: string) {
      if (text === "") {
        if (props.clearSelection) {
          props.clearSelection();
        }
      } else {
        const response = await props.api(text);
        setSuggestions(response);
      }
    },
    [setSuggestions, props.updateCurrent]
  );

  const onSelect = React.useCallback(
    (event, { suggestion }) => {
      if (props.onSelect) {
        props.onSelect(suggestion);
      }
    },
    [props.onSelect]
  );

  const onChange = React.useCallback(
    (event, { newValue }) => {
      if (props.textChange) {
        props.textChange(newValue);
      }
    },
    [props.textChange]
  );

  const onSuggestionsFetchRequested = React.useCallback(
    ({ value }) => {
      lookupLocation(value);
    },
    [lookupLocation]
  );

  const onSuggestionsClearRequested = React.useCallback(() => {
    setSuggestions([]);
  }, [setSuggestions]);

  const targetCurrentSuggestion =
    suggestions.length > 0 ? suggestions[0] : null;

  if (props.updateCurrent && targetCurrentSuggestion !== currentSuggestion) {
    props.updateCurrent(targetCurrentSuggestion);
    setCurrentSuggestion(targetCurrentSuggestion);
  }

  return (
    <div
      css={{
        display: "flex",
        alignItems: "center",
        "& .rc-slider": {
          marginLeft: "20px"
        },
        "& .react-autosuggest__container": {
          position: "relative"
        },
        "& .react-autosuggest__suggestions-container": {
          position: "absolute",
          top: "25px",
          width: "100%",
          zIndex: 1000,
          "& ul": {
            listStyle: "none",
            padding: 0,
            background: "white",
            border: "solid 1px black"
          }
        },
        "& input": {
          paddingLeft: "8px",
          paddingRight: "8px"
        }
      }}
    >
      <Autosuggest
        inputProps={{
          style: {
            borderRadius: "4px",
            borderStyle: "solid",
            borderWidth: "1px",
            borderColor: "hsl(0,0%,80%)",
            minHeight: "34px",
            fontSize: "16px",
            fontWeight: 500
          },
          onChange,
          value: props.text
        }}
        onSuggestionsFetchRequested={onSuggestionsFetchRequested}
        onSuggestionsClearRequested={onSuggestionsClearRequested}
        suggestions={suggestions}
        getSuggestionValue={item => item.name}
        renderSuggestion={(item, { isHighlighted }) => (
          <div
            key={item.name}
            css={{
              background: isHighlighted ? "lightgray" : "white",
              padding: "5px"
            }}
          >
            {item.name}
          </div>
        )}
        onSuggestionSelected={onSelect}
        multiSection={false}
      />
    </div>
  );
}

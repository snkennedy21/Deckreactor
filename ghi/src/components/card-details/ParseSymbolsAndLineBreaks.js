import { useGetSymbolsQuery } from "../../store/RTK_Query/scryfallWebApi";
import React from "react";

// wrap any text in this to apply card symbols and line breaks to text string

function ParseSymbolsAndLineBreaks(props) {
  const string = props.string;
  const { data: symbols } = useGetSymbolsQuery();
  if (string === undefined || string === "") {
    return <></>;
  }
  const symbolUrls = {};
  if (symbols) {
    // assemble symbolUrls object {symbol: svg_uri}
    for (let symbol of symbols.data) {
      symbolUrls[symbol.symbol] = symbol.svg_uri;
    }
  }

  // helper function for parseSymbolsAndLineBreaks
  function substringSymbolArray(s) {
    const output = [];
    let substring = "";
    for (let i = 0; i < s.length; i++) {
      if (s[i] === "{") {
        output.push(substring);
        substring = "";
        while (i < s.length && s[i] !== "}") {
          substring += s[i];
          i++;
        }
        substring += s[i];
        output.push(substring);
        substring = "";
      } else {
        substring += s[i];
      }
      if (i === s.length - 1) {
        output.push(substring);
      }
    }
    return output;
  }

  return (
    <React.Fragment>
      {string.split("\n").map((substring, index) => (
        <span key={`${string} ${substring} ${index}`}>
          {substringSymbolArray(substring).map((item, idx) => (
            <React.Fragment key={`${string} ${item} ${idx} fragment`}>
              {item in symbolUrls ? ( // replaces substring with corresponding symbol
                <img
                  alt={item}
                  style={{ height: "1em" }}
                  key={`${string} ${item} ${idx}`}
                  src={symbolUrls[item]}
                />
              ) : (
                <span key={`${string} ${item} ${idx}`}>{item}</span>
              )}
            </React.Fragment>
          ))}
          <br />
        </span>
      ))}
    </React.Fragment>
  );
}

export default ParseSymbolsAndLineBreaks;

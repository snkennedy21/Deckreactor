import React from "react";
import ParseSymbolsAndLineBreaks from "../card-details/ParseSymbolsAndLineBreaks";

// will sort a list of cards by their basic types, and arrange them
// into separate lists in an object
function cardsByTypeLine(cards) {
  const type_lines = {
    'Creature': [],
    'Planeswalker': [],
    'Artifact': [],
    'Instant': [],
    'Sorcery': [],
    'Enchantment': [],
    'Land': [],
    'Conspiracy': [],
    'Emblem': [],
    'Hero': [],
    'Scheme': [],
    'Tribal': [],
    'Phenomenon': [],
    'Plane': [],
    'Vanguard': [],
  }
  // populate object with cards sorted by type_line contents
  for (let card of cards) {
    for (let type of Object.keys(type_lines)) {
      if (card.card_type.toLowerCase().split(type.toLowerCase()).length - 1 > 0) {
        type_lines[type].push(card);
        break;
      }
    }
  }
  return type_lines
}

function DeckCardList(props) {
  const cards = props.cards;
  const types = cardsByTypeLine(cards);
  const typesEntries = Object.entries(types);

  return (
    <div className="table">
      <h2>Cards</h2>
      <table className="table table-sm">
        <tbody>
          {
            typesEntries.map(entry => {
              let amount = 0;
              for (let card of entry[1]) {
                amount += card.quantity;
              }
              return (
                <React.Fragment key={entry[0]}>
                {
                  entry[1].length === 0
                  ?
                  <></>
                  :
                  <>
                  <tr><h5>{entry[0]} ({amount})</h5></tr>
                  {
                    entry[1].map(card => {
                      return (
                        <React.Fragment key={card.name}>
                          <tr>
                            <td><span className="fw-bold">{card.quantity}</span> {card.name}</td>
                            <td><ParseSymbolsAndLineBreaks string={card.mana === null ? "null" : card.mana}/></td>
                          </tr>
                        </React.Fragment>
                      )
                    })
                  }
                  </>
                }
                </React.Fragment>
              )
            })
          }

        </tbody>
      </table>
    </div>
  )
}

export default DeckCardList;
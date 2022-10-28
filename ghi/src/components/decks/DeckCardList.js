import React from "react";
import { Link } from "react-router-dom";
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
    <div>
      <h2>Cards</h2>
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
                  <h5>{entry[0]} ({amount})</h5>
                  <div className="table-responsive">
                  <table className="table table-striped table-sm">
                  <tbody>
                  {
                    entry[1].map(card => {
                      console.log(card);
                      return (
                        <React.Fragment key={card.name}>
                          <tr>
                            <td><span className="fw-bold">{card.quantity}</span> <Link to={`/card/${card.multiverse_id}`}>{card.name}</Link></td>
                            <td><ParseSymbolsAndLineBreaks string={card.mana === null ? "null" : card.mana}/></td>
                          </tr>
                        </React.Fragment>
                      )
                    })
                  }
                  </tbody>
                  </table>
                  </div>
                  </>
                }
                </React.Fragment>
              )
            })
          }
    </div>
  )
}

export default DeckCardList;
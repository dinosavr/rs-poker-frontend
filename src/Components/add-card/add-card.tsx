import './add-card.scss';

import ControlPointIcon from '@material-ui/icons/ControlPoint';
import React, { FC, useContext, useEffect, useState } from 'react';

import { AppContext } from '../../content/app-state';
import { deck2 } from '../../data/deck';

const AddCard: FC = () => {
  const appState = useContext(AppContext);
  const [showComponent, setShowComponent] = useState(true);

  const handleAddCard = () => {
    if (appState?.cardsDeck) {
      appState?.setCardsDeck((prev) => [...prev, getAvailableCards()[0]]);
    }
  };

  const getAvailableCards = () => {
    let availableCards: string[] = [];
    deck2.forEach((card) => {
      if (!appState?.cardsDeck.includes(card)) availableCards.push(card);
    });
    return availableCards;
  };

  useEffect(() => {
    getAvailableCards().length === 0 ? setShowComponent(false) : setShowComponent(true);
  }, [appState?.cardsDeck]);

  return (
    <>
      {showComponent && (
        <div
          role="none"
          className="card_container primary-bg-color primary-color"
          onClick={handleAddCard}>
          <ControlPointIcon className="control-icon" />
        </div>
      )}
    </>
  );
};

export default AddCard;
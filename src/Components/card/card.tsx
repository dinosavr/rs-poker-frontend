import './card.scss';

import { MenuItem, Select } from '@material-ui/core';
import { DeleteOutlined, EditOutlined, LocalCafe, OfflinePin } from '@material-ui/icons/';
import { FC, useContext, useEffect, useState } from 'react';
import React from 'react';

import { CARD_DECKS, SETTING_CARD_DECK_NUM_DEF } from '../../config';
import { AppContext } from '../../content/app-state';

interface IProps {
  propCardValue: string;
  shortScoreType: string;
  allowEdit: boolean;
  cardIndex: number;
}

const Card: FC<IProps> = ({ propCardValue, shortScoreType, allowEdit, cardIndex }) => {
  const [editMode, setEditMode] = useState(false);
  const [checked, setChecked] = useState(false);
  const [menuItems, setMenuItems] = useState<string[]>(
    CARD_DECKS[SETTING_CARD_DECK_NUM_DEF],
  );
  const [showEditBtn, setShowEditBtn] = useState(allowEdit);

  const appState = useContext(AppContext);

  useEffect(() => {
    setMenuItems(getAvailableCards());
    if (!menuItems.length) {
      setShowEditBtn(false);
      setEditMode(false);
    } else {
      setShowEditBtn(true);
    }
  }, [appState?.cardsDeck, menuItems.length]);

  const handleClose = () => {
    setEditMode(false);
  };

  const handleOpen = () => {
    setEditMode(true);
  };

  const deleteCard = () => {
    if (appState?.cardsDeck) {
      let tempArr = [...appState?.cardsDeck];
      tempArr.splice(cardIndex, 1);
      appState?.setCardsDeck(tempArr);
    }
  };

  // work: duplicate function card.tsx
  const getAvailableCards = () => {
    let availableCards: string[] = [];
    const currentCardDeckNumber = appState?.settings.cardDeckNumber
      ? appState?.settings.cardDeckNumber
      : 0;
    CARD_DECKS[currentCardDeckNumber].forEach((card) => {
      if (!appState?.cardsDeck.includes(card)) availableCards.push(card);
    });
    return availableCards;
  };

  return (
    <div
      role="none"
      className={`card_container ${allowEdit ? '' : 'active-card'}`}
      onClick={() => {
        setChecked(!checked);
      }}>
      <div className="top-wrapper">
        <span className="card-value_text">{propCardValue}</span>
        {editMode && (
          <>
            <Select
              id="select-label"
              open={editMode}
              onClose={handleClose}
              onOpen={handleOpen}
              value={propCardValue}
              onChange={(e) => {
                appState?.setCardsDeck((prev) => [
                  ...prev.map((el, indx) =>
                    indx === cardIndex ? (e.target.value as string) : el,
                  ),
                ]);
              }}>
              {menuItems.map((el, idx) => (
                <MenuItem value={el} key={idx}>
                  {el}
                </MenuItem>
              ))}
            </Select>
          </>
        )}
        {allowEdit && (
          <div>
            {showEditBtn && (
              <EditOutlined className="edit-card_icon" onClick={handleOpen} />
            )}
            <DeleteOutlined className="delete-card_icon" onClick={deleteCard} />
          </div>
        )}
      </div>
      {propCardValue === 'Coffee' ? (
        <LocalCafe className="score-type_text" />
      ) : propCardValue === '?' ? (
        <span className="score-type_text">?</span>
      ) : (
        <span className="score-type_text">{shortScoreType}</span>
      )}

      <span className="card-value_text rotate">{propCardValue}</span>
      {!allowEdit && checked && (
        <>
          <div className="checked-cover"></div>
          <div className="check-icon-wrapper">
            <OfflinePin className="check-icon" />
          </div>
        </>
      )}
    </div>
  );
};

export default Card;

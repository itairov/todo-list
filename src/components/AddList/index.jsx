import React, { useState } from "react";
import List from "../List";
import Badge from "../Badge";

import closeSvg from '../../assests/img/close.svg'

import './AddButtonList.scss'

const AddList = ({ colors, onAdd }) => {
  const [visiblePopup, setVisiblePopup] = useState(false);
  const [selectedColor, selectColor] = useState(colors[0].id);
  const [inputValue, setInputValue] = useState('');

  const onClose = () => {
    setVisiblePopup(false);
    setInputValue("");
    selectColor(colors[0].id);
  }

  const addList = () => {
    if (!inputValue) {
      alert('Введите название списка');
      return;
    }
    const color = colors.filter(c => c.id === selectedColor)[0].name;
    onAdd({id: Math.random()*10, name: inputValue, color: color});
    setInputValue("");
  }

  return (
    <div className="add-list">
      <List
        onClick={() => setVisiblePopup(true)}
        items={[
          {
            className: 'list__add-button',
            icon: (
              <svg width="12" height="12" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8 1V15" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M1 8H15" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            ),
            name: 'Добавить список',
          }
        ]}
      />
      {visiblePopup && (
        <div className="add-list__popup">
          <img
            onClick={onClose}
            src={closeSvg}
            alt="Закрыть список"
            className="add-list__popup-close-btn"/>

          <input
            className="field"
            value={inputValue}
            onChange={ e => setInputValue(e.target.value)}
            type="text"
            placeholder="Название списка"/>

          <div className="add-list__popup-colors">
            {
              colors.map(color => (
                <Badge
                  onClick={() => selectColor(color.id)}
                  key={color.id}
                  color={color.name}
                  className={selectedColor === color.id && 'active'}
                />)
              )
            }
          </div>
          <button className="button" onClick={addList}>Добавить</button>
        </div>
      )}
    </div>
  )
}

export default AddList;

//1:11:00 (2Video)
//react false не рендерит
//onClick={() => setVisiblePopup(!visiblePopup)}
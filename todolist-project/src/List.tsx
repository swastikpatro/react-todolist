import React from 'react';
import { listType } from './types';

const List = ({ myList }: { myList: listType[] }) => {
  return (
    <>
      {myList.map((singleItem: listType) => (
        <article key={singleItem.id} className='single-todo'>
          <span>{singleItem.text}</span>

          <button
            className='edit-btn'
            data-id={singleItem.id}
            data-main-text={singleItem.text}
            data-click-type='edit'
          >
            edit
          </button>
          <button
            className='remove-btn'
            data-id={singleItem.id}
            data-click-type='remove'
          >
            remove
          </button>
        </article>
      ))}
    </>
  );
};

export default List;

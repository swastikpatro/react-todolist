import React from 'react';
import { listType } from './types';
import { TbEdit } from 'react-icons/tb';
import { AiFillDelete } from 'react-icons/ai';

const List = ({ myList }: { myList: listType[] }) => {
  return (
    <>
      {myList.map((singleItem: listType) => (
        <article key={singleItem.id} className='single-todo'>
          <p className='title'>{singleItem.text}</p>
          <div className='btn-container'>
            <button
              className='button edit-btn'
              data-id={singleItem.id}
              data-main-text={singleItem.text}
              data-click-type='edit'
            >
              <TbEdit />
            </button>
            <button
              className='button remove-btn'
              data-id={singleItem.id}
              data-click-type='remove'
            >
              <AiFillDelete />
            </button>
          </div>
        </article>
      ))}
    </>
  );
};

export default List;

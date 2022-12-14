import React, { useReducer, useRef } from 'react';
import List from './List';
import { stateType, actionType } from './types';

function todoListReducer(state: stateType, action: actionType): stateType {
  switch (action.type) {
    case 'ADD_ITEM':
      return {
        ...state,
        list: [
          ...state.list,
          { id: new Date().getTime().toString(), text: action.message },
        ],
      };
    case 'REMOVE_ITEM':
      return {
        ...state,
        isEditing: state.editId === action.idRemoved ? false : true,
        list: state.list.filter(
          (singleItem) => singleItem.id !== action.idRemoved
        ),
      };
    case 'EDIT_ITEM':
      console.log(typeof state.editId);
      return {
        ...state,
        isEditing: true,
        editId: action.idEdited,
      };
    case 'SHOW_EDITED_LIST':
      return {
        ...state,
        isEditing: false,
        list: state.list.map((singleItem) => {
          if (singleItem.id === state.editId) {
            return { ...singleItem, text: action.message };
          } else {
            return singleItem;
          }
        }),
      };
    case 'CLEAR_ALL':
      return {
        ...state,
        list: [],
        isEditing: false,
        editId: '',
      };

    default:
      throw new Error('Error');
  }
}

const defaultState = {
  list: [],
  isEditing: false,
  editId: '-1',
};

function App() {
  const formInputRef = useRef<HTMLInputElement>(null!);
  const [state, dispatch] = useReducer(todoListReducer, defaultState);

  function handleContainerClick(e: React.MouseEvent<HTMLDivElement>): void {
    const targetElement = e.target as HTMLElement;
    const targetElementData = targetElement.dataset;

    if (!targetElementData.hasOwnProperty('clickType')) {
      return;
    }

    if (targetElementData.clickType === 'edit') {
      dispatch({
        type: 'EDIT_ITEM',
        idEdited: targetElementData.id,
      });

      formInputRef.current.value = targetElementData.mainText!;
      // formInputRef?.current?.value = targetElementData.mainText;
    } else {
      dispatch({ type: 'REMOVE_ITEM', idRemoved: targetElementData.id });
    }
  }

  function handleSubmit(e: React.SyntheticEvent): void {
    e.preventDefault();
    const formEle = e.target as HTMLFormElement;
    const clickedOnEdit = Boolean(Number(formEle.dataset.editing));
    if (formInputRef.current.value === '') {
      console.log('Please enter text');
      return;
    }

    if (!clickedOnEdit) {
      dispatch({ type: 'ADD_ITEM', message: formInputRef?.current?.value });
    } else {
      dispatch({
        type: 'SHOW_EDITED_LIST',
        message: formInputRef?.current?.value,
      });
    }

    if (formInputRef.current !== null) {
      formInputRef.current.value = '';
    }
  }

  return (
    <section className='section-center'>
      <form
        className='todolist-form'
        data-editing={state.isEditing ? 1 : 0}
        onSubmit={handleSubmit}
      >
        <h3>Todo List</h3>
        <div className='form-control'>
          <input type='text' name='' ref={formInputRef} id='' />

          <button type='submit' className='submit-btn'>
            {state.isEditing ? 'edit' : 'add'}
          </button>
        </div>
      </form>

      {state.list.length > 0 && (
        <div className='container' onClick={handleContainerClick}>
          <List myList={state.list} />

          <button
            className='clear-btn'
            onClick={() => {
              dispatch({ type: 'CLEAR_ALL' });
              formInputRef.current.value = '';
            }}
          >
            Clear All
          </button>
        </div>
      )}
    </section>
  );
}

export default App;

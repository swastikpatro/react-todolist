import React, { useReducer, useRef } from 'react';
import List from './List';
import todoListReducer from './todoListReducer';

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
    const targetBtnEle = targetElement.closest('.button') as HTMLElement;
    const targetElementData = targetBtnEle.dataset;

    if (!targetElementData.hasOwnProperty('clickType')) {
      return;
    }

    if (targetElementData.clickType === 'edit') {
      dispatch({
        type: 'EDIT_ITEM',
        idEdited: targetElementData.id,
      });

      formInputRef.current.value = targetElementData.mainText!;
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
          <input
            type='text'
            ref={formInputRef}
            className='input'
            placeholder='e.g. Hiking'
          />

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

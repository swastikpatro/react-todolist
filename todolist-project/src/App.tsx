import React, { useReducer, useRef } from 'react';
import List from './List';
import todoListReducer from './todoListReducer';
import { Toaster, toast } from 'react-hot-toast';
import { CgClose } from 'react-icons/cg';

const defaultState = {
  list: [],
  isEditing: false,
  editId: '-1',
};

function App() {
  const formInputRef = useRef<HTMLInputElement>(null!);
  const [state, dispatch] = useReducer(todoListReducer, defaultState);

  const customToast = (toastType: string, toastMsg: string): void => {
    if (toastType === 'success') {
      toast.success((t) => (
        <span>
          {toastMsg}
          <button
            className='toast-dismiss-btn toast-success-dismiss-btn'
            onClick={() => toast.dismiss(t.id)}
          >
            <CgClose />
          </button>
        </span>
      ));
      return;
    }
    if (toastType === 'error') {
      toast.error((t) => (
        <span>
          {toastMsg}
          <button
            className='toast-dismiss-btn toast-error-dismiss-btn'
            onClick={() => toast.dismiss(t.id)}
          >
            <CgClose />
          </button>
        </span>
      ));
      return;
    }
    if (toastType === 'loading') {
      toast.loading((t) => (
        <span>
          {toastMsg}
          <button
            className='toast-dismiss-btn'
            onClick={() => toast.dismiss(t.id)}
          >
            <CgClose />
          </button>
        </span>
      ));
      return;
    }
    if (toastType === 'custom') {
      toast((t) => (
        <span>
          {toastMsg}
          <button
            className='toast-dismiss-btn'
            onClick={() => toast.dismiss(t.id)}
          >
            <CgClose />
          </button>
        </span>
      ));
      return;
    }
    if (toastType === 'remove') {
      toast((t) => (
        <span>
          <span style={{ fontSize: '1.25rem' }}>🗑️</span> Removed
          <span style={{ textDecoration: 'line-through' }}>{toastMsg}</span>
          <button
            className='toast-dismiss-btn'
            onClick={() => toast.dismiss(t.id)}
          >
            <CgClose />
          </button>
        </span>
      ));
      return;
    }
  };

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
      customToast('loading', `Editing '${targetElementData.mainText}' ✍🏻`);
    } else {
      dispatch({ type: 'REMOVE_ITEM', idRemoved: targetElementData.id });
      customToast('remove', ` '${targetElementData.mainText}'`);
    }
  }

  function handleSubmit(e: React.SyntheticEvent): void {
    e.preventDefault();
    const formEle = e.target as HTMLFormElement;
    const clickedOnEdit = Boolean(Number(formEle.dataset.editing));
    if (formInputRef.current.value === '') {
      customToast('error', 'Please Enter Input 🙏🏻');
      return;
    }

    if (!clickedOnEdit) {
      dispatch({ type: 'ADD_ITEM', message: formInputRef?.current?.value });
      customToast('success', 'Added');
    } else {
      dispatch({
        type: 'SHOW_EDITED_LIST',
        message: formInputRef?.current?.value,
      });
      customToast('success', 'Edited');
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
              customToast('remove', ' All Todos');
            }}
          >
            Clear All
          </button>
        </div>
      )}

      {state.isEditing ? (
        <Toaster
          position='top-center'
          reverseOrder={false}
          gutter={8}
          containerClassName=''
          containerStyle={{}}
          toastOptions={{
            // Define default options
            className: '',
            duration: Infinity,
            style: {
              background: '#000',
              color: '#fff',
              minWidth: '7rem',
              maxWidth: 'fit-content',
              paddingTop: '.75rem',
              paddingRight: '1.5rem',
              borderRadius: '.25rem',
            },
          }}
        />
      ) : (
        <Toaster
          position='top-center'
          reverseOrder={false}
          gutter={8}
          containerClassName=''
          containerStyle={{}}
          toastOptions={{
            // Define default options
            className: '',
            duration: 1000,
            style: {
              background: '#363636',
              color: '#fff',
              minWidth: '7rem',
              maxWidth: 'fit-content',
              paddingTop: '.75rem',
              paddingRight: '1.5rem',
              borderRadius: '.25rem',
            },
          }}
        />
      )}
    </section>
  );
}

export default App;

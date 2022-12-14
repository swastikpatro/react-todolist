import { actionType, stateType } from './types';

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

export default todoListReducer;

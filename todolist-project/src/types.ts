interface listType {
  id: string;
  text: string | undefined;
}

interface stateType {
  list: listType[];
  isEditing: boolean;
  editId: string | undefined;
}

interface actionType {
  type: string;
  message?: string;
  idEdited?: string;
  idRemoved?: string;
}

export type { stateType, listType, actionType };

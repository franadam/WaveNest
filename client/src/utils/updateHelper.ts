export const updateFieldHelper = (field: string, state: any, action: any) => {
  return action.payload[field] ? action.payload[field] : state.profile[field];
};

export const updateHelper = (fields: string[], state: any, action: any) => {
  for (const field of fields) return updateFieldHelper(field, state, action);
};

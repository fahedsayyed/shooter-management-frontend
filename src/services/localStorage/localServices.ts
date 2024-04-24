export const setLocalFormData = (name: string, data: any): void => {
  localStorage.setItem(name, JSON.stringify(data));
};

export const getLocalFormData = (name: string): any | null => {
  const data = localStorage.getItem(name);

  return data ? JSON.parse(data) : null;
};

export const deleteLocalFormData = (name: string): void => {
  localStorage.removeItem(name);
};

import type { User } from '@src/entities/user';
import { API_URL } from '@src/constants';

export const fetchUsers = async (): Promise<User[]> => {
  const response = await fetch(`${API_URL}/users`);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }

  const data: User[] = await response.json();

  return data;
};

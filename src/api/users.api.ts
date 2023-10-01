import type { User } from '@src/entities/user';
import { API_URL } from '@src/constants';

export const fetchUsers = async (): Promise<User[]> => {
  const response = await fetch(`${API_URL}/users`);

  if (!response.ok) {
    throw new Error('Network response was not ok');
  }

  const data: User[] = await response.json();

  return data.reverse();
};

export const removeUser = async (userId: string): Promise<User> => {
  const response = await fetch(`${API_URL}/users/${userId}`, { method: 'DELETE' });

  if (!response.ok) {
    throw new Error('Network response was not ok');
  }

  const data: User = await response.json();

  return data;
};

export const updateUser = async ({
  userId,
  body,
}: {
  userId: string;
  body: Omit<User, 'id'>;
}): Promise<User> => {
  const response = await fetch(`${API_URL}/users/${userId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      // Add any other headers your API may require
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    throw new Error('Network response was not ok');
  }

  const data: User = await response.json();

  return data;
};

export const createUser = async (body: User): Promise<User> => {
  const response = await fetch(`${API_URL}/users`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      // Add any other headers your API may require
    },
    body: JSON.stringify({
      name: body.name,
      email: body.email,
      country: body.country,
      phone: body.phone,
    }),
  });

  if (!response.ok) {
    throw new Error('Network response was not ok');
  }

  const data: User = await response.json();

  return data;
};

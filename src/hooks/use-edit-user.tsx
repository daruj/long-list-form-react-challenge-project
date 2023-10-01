import { User } from '@src/entities/user';
import React, { useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { removeUser, updateUser, createUser } from '@src/api/users.api';
import { useForm, SubmitHandler } from 'react-hook-form';

type Inputs = {
  name: string;
  email: string;
  country: string;
  phone: string;
};

const removeItemFromQuery = (existingUsers: User[], userId: string) => {
  const cloneArray = Array.from(existingUsers);

  const indexToRemove = cloneArray.findIndex(
    (existingUser) => existingUser.id === userId
  );
  cloneArray.splice(indexToRemove, 1);

  return cloneArray;
};

const updateItemFromQuery = (
  existingUsers: User[],
  userId: string,
  data: Omit<User, 'id'>
) => {
  const cloneArray = Array.from(existingUsers);

  const indexToUpdate = cloneArray.findIndex(
    (existingUser) => existingUser.id === userId
  );

  cloneArray[indexToUpdate] = {
    id: userId,
    ...data,
  };

  return cloneArray;
};

const createItemFromQuery = (existingUsers: User[], data: User) => {
  const cloneArray = Array.from(existingUsers);
  return [data, ...cloneArray];
};

export const useEditUser = (user: User, isNew = false) => {
  const [editMode, setEditMode] = useState(isNew);
  const toggleEditMode = () => {
    setEditMode((mode) => !mode);
    if (!editMode) {
      reset();
    } else {
      if (isNew) {
        handleRemove();
      }
    }
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
  } = useForm<Inputs>({
    defaultValues: {
      name: user.name,
      email: user.email,
      country: user.country,
      phone: user.phone,
    },
  });

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    if (isNew) {
      handleCreateUserMutation.mutate({ id: user.id, ...data });
    } else {
      handleUpdateUserMutation.mutate({
        userId: user.id,
        body: data,
      });
    }
    toggleEditMode();
  };

  const queryClient = useQueryClient();

  const handleCreateUserMutation = useMutation({
    mutationFn: createUser,
    onMutate: async (data) => {
      // Store the current list of items in case the mutation fails
      await queryClient.cancelQueries('users'); // Cancel the list query to prevent a race condition
      const previousItems = queryClient.getQueryData<User[]>('users');

      // Optimistically remove the item from the list if previousItems is defined
      queryClient.setQueryData<User[]>('users', (existingUsers) =>
        createItemFromQuery(existingUsers || [], data)
      );

      return { previousItems };
    },
    onError: (error, variables, context) => {
      // If the mutation fails, revert to the previous list of items
      const previousItems = context?.previousItems || [];
      queryClient.setQueryData('users', previousItems);
    },
    onSuccess: async (data) => {
      // Store the current list of items in case the mutation fails
      await queryClient.cancelQueries('users'); // Cancel the list query to prevent a race condition
      const previousItems = queryClient.getQueryData<User[]>('users');

      // Optimistically remove the item from the list if previousItems is defined
      queryClient.setQueryData<User[]>('users', (existingUsers) =>
        updateItemFromQuery(existingUsers || [], user.id, data)
      );

      return { previousItems };
    },
  });

  const handleUpdateUserMutation = useMutation({
    mutationFn: updateUser,
    onMutate: async (data) => {
      // Store the current list of items in case the mutation fails
      await queryClient.cancelQueries('users'); // Cancel the list query to prevent a race condition
      const previousItems = queryClient.getQueryData<User[]>('users');

      // Optimistically remove the item from the list if previousItems is defined
      queryClient.setQueryData<User[]>('users', (existingUsers) =>
        updateItemFromQuery(existingUsers || [], data.userId, data.body)
      );

      return { previousItems };
    },
    onError: (error, variables, context) => {
      // If the mutation fails, revert to the previous list of items
      const previousItems = context?.previousItems || [];
      queryClient.setQueryData('users', previousItems);
    },
  });

  const handleRemoveUserMutation = useMutation({
    mutationFn: removeUser,
    onMutate: async (userId) => {
      // Store the current list of items in case the mutation fails
      await queryClient.cancelQueries('users'); // Cancel the list query to prevent a race condition
      const previousItems = queryClient.getQueryData<User[]>('users');

      // Optimistically remove the item from the list if previousItems is defined
      queryClient.setQueryData<User[]>('users', (existingUsers) =>
        removeItemFromQuery(existingUsers || [], userId)
      );

      return { previousItems };
    },
    onError: (error, variables, context) => {
      // If the mutation fails, revert to the previous list of items
      const previousItems = context?.previousItems || [];
      queryClient.setQueryData('users', previousItems);
    },
  });

  const handleRemove = () => {
    // if the user is not stored yet, then we just want to remove it from the list instead of performing the request
    if (user.id.startsWith('temp_')) {
      queryClient.setQueryData<User[]>('users', (existingUsers) =>
        removeItemFromQuery(existingUsers || [], user.id)
      );
    } else {
      handleRemoveUserMutation.mutate(user.id);
    }
  };

  const handleEscapeKey = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Escape' && !isNew) {
      toggleEditMode();
    }
  };

  return {
    editMode,
    errors,
    register,
    onSubmit,
    handleSubmit,
    handleRemove,
    handleEscapeKey,
    toggleEditMode,
    control,
  };
};

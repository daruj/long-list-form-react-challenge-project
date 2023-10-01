import { Grid, Typography } from '@mui/material';
import TrashIconButton from '@src/components/TrashIconButton';
import styles from '../users.module.css';
import type { User } from '@src/entities/user';
import React from 'react';
import countryOptions from '@src/data/countries.json';
import EditIconButton from '@src/components/EditIconButton';
import CheckIconButton from '@src/components/CheckIconButton';
import CancelIconButton from '@src/components/CancelIconButton';
import { escapeRegExp } from '@src/utils/regex.utils';
import { useEditUser } from '@src/hooks/use-edit-user';
import CountrySelect from '@src/components/CountrySelect';
import { Controller } from 'react-hook-form';
import { StyledTextField } from '@src/components/InputField';

interface UserRowProps {
  user: User;
}

const UserRow: React.FC<UserRowProps> = ({ user }) => {
  const {
    editMode,
    errors,
    control,
    handleEscapeKey,
    handleRemove,
    handleSubmit,
    onSubmit,
    register,
    toggleEditMode,
  } = useEditUser(user);
  return (
    <Grid
      container
      className={styles.userRow}
      component="form"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Grid item xs={10}>
        <Grid container>
          <Grid item xs={3} padding={1}>
            {(editMode && (
              <StyledTextField
                placeholder="Enter the name..."
                onKeyDown={handleEscapeKey}
                {...register('name', { required: true })}
                error={!!errors.name}
              />
            )) || <Typography>{user.name}</Typography>}
          </Grid>
          <Grid item xs={3} padding={1}>
            {(editMode && (
              <StyledTextField
                placeholder="Enter the email..."
                onKeyDown={handleEscapeKey}
                {...register('email', {
                  required: true,
                  pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                })}
                error={!!errors.email}
              />
            )) || <Typography>{user.email}</Typography>}
          </Grid>
          <Grid item xs={3} padding={1} textAlign="center">
            {(editMode && (
              <Controller
                control={control}
                rules={{
                  required: true,
                  pattern: new RegExp(countryOptions.map(escapeRegExp).join('|')),
                }}
                name="country"
                render={({ field: { onChange, value } }) => (
                  <CountrySelect
                    onChange={onChange}
                    value={value}
                    error={!!errors.country}
                    onKeyDown={handleEscapeKey}
                  />
                )}
              />
            )) || <Typography>{user.country}</Typography>}
          </Grid>
          <Grid item xs={3} padding={1}>
            {(editMode && (
              <StyledTextField
                placeholder="Enter the phone..."
                onKeyDown={handleEscapeKey}
                {...register('phone', {
                  required: true,
                  pattern: /^\+/,
                })}
                error={!!errors.phone}
              />
            )) || <Typography>{user.phone}</Typography>}
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={2} display="flex" justifyContent="center">
        {(!editMode && (
          <>
            <EditIconButton onClick={toggleEditMode} />
            <TrashIconButton onClick={handleRemove} />
          </>
        )) || (
          <>
            <CheckIconButton type="submit" />
            <CancelIconButton onClick={toggleEditMode} />
          </>
        )}
      </Grid>
    </Grid>
  );
};

export default React.memo(UserRow);

import { Controller, useFormContext } from 'react-hook-form';
import { MenuItem, TextField } from '@mui/material';
import { useMemo } from 'react';
import { Models } from './models';

export interface CreateFormValue {
  ns: string;
  text: string;
  model: string;
}

const CreateForm = () => {
  const {
    control,
    formState: { errors },
  } = useFormContext<CreateFormValue>();
  const models = useMemo(() => {
    const nodes = [];
    // eslint-disable-next-line guard-for-in,no-restricted-syntax
    for (const key in Models) {
      nodes.push(
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        <MenuItem key={key} value={Models[key]}>
          {key}
        </MenuItem>
      );
    }
    return nodes;
  }, []);
  return (
    <>
      <Controller
        name="ns"
        control={control}
        defaultValue=""
        rules={{ required: 'Name is required' }}
        render={({ field }) => (
          <>
            <TextField
              error={!!errors?.ns}
              fullWidth
              margin="normal"
              label="Name"
              {...field}
              helperText={errors?.ns?.message}
            />
          </>
        )}
      />
      <Controller
        name="text"
        control={control}
        defaultValue={Models.RBAC}
        render={({ field }) => (
          <>
            <TextField
              select
              fullWidth
              margin="normal"
              label="built-in Model"
              {...field}
            >
              {models}
            </TextField>
          </>
        )}
      />

      <Controller
        name="text"
        control={control}
        defaultValue="none"
        render={({ field }) => (
          <>
            <TextField
              fullWidth
              margin="normal"
              label="Model"
              multiline
              rows={14}
              {...field}
            />
          </>
        )}
      />
    </>
  );
};

export default CreateForm;

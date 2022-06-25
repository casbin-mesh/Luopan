import { Controller, useFormContext } from 'react-hook-form';
import { TextField } from '@mui/material';
import { CirclePicker } from 'react-color';
import Box from '@mui/material/Box';

export interface FavoriteFormValue {
  name: string;
  color?: string;
}

const FavoriteForm = () => {
  const {
    control,
    formState: { errors },
  } = useFormContext<FavoriteFormValue>();

  return (
    <>
      <Controller
        name="name"
        control={control}
        rules={{ required: 'Name is required' }}
        render={({ field }) => (
          <TextField
            error={!!errors?.name}
            helperText={errors?.name?.message}
            autoFocus
            fullWidth
            margin="normal"
            label="Name"
            {...field}
          />
        )}
      />
      <Box sx={{ mt: 3 }}>
        <Controller
          render={({ field: { onChange, value } }) => (
            <CirclePicker
              width="100%"
              color={value}
              onChangeComplete={(newValue) => onChange(newValue.hex)}
            />
          )}
          name="color"
        />
      </Box>
    </>
  );
};

export default FavoriteForm;

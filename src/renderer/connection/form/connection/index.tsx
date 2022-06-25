import { MenuItem, TextField } from '@mui/material';
import { Controller, useFormContext } from 'react-hook-form';
import HostFields from './fields/hosts';

export interface ConnectionFormValue {
  hosts: string[];
  authentication: {
    type: string;
    username?: string;
    password?: string;
  };
  tls: string;
}

const ConnectionForm = () => {
  const { control, watch } = useFormContext<ConnectionFormValue>();
  const watchAuth = watch('authentication');
  return (
    <>
      <>
        <HostFields />
        <Controller
          name="authentication.type"
          control={control}
          defaultValue="none"
          render={({ field }) => (
            <>
              <TextField
                select
                fullWidth
                margin="normal"
                label="Authentication"
                {...field}
              >
                <MenuItem value="none">None</MenuItem>
                <MenuItem value="basic">Basic</MenuItem>
              </TextField>
            </>
          )}
        />

        {watchAuth.type === 'basic' && (
          <>
            <Controller
              name="authentication.username"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  fullWidth
                  margin="normal"
                  label="Username"
                  {...field}
                />
              )}
            />
            <Controller
              name="authentication.password"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  fullWidth
                  margin="normal"
                  label="Password"
                  {...field}
                />
              )}
            />
          </>
        )}
        <Controller
          name="tls"
          control={control}
          render={({ field }) => (
            <TextField
              fullWidth
              margin="normal"
              select
              label="TLS/SSL"
              {...field}
            >
              <MenuItem value="off">Off</MenuItem>
              <MenuItem value="on">On</MenuItem>
            </TextField>
          )}
        />
        {/* <FormControlLabel control={<Switch />} label="Favorite" /> */}
      </>
    </>
  );
};

export default ConnectionForm;

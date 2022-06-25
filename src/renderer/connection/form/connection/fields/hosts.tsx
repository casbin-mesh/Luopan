import { Controller, useFieldArray, useFormContext } from 'react-hook-form';
import { IconButton, InputAdornment, Stack, TextField } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

// incHostPortNum
// return host:{port+1}
const incHostPortNum = (hostStr: string): string => {
  const parseResult = hostStr.split(':');
  if (parseResult.length === 2) {
    const [host, port] = parseResult;
    const newPort = String(
      Number.isNaN(Number(port)) ? port : Number(port) + 1
    );
    return [host, newPort].join(':');
  }
  return hostStr;
};

const HostFields = ({ name = 'hosts' }: { name?: string }) => {
  const { control, getValues } = useFormContext();

  const { fields, append, remove } = useFieldArray({
    control,
    name,
  });

  return (
    <>
      {fields.map((_item, index) => (
        <Controller
          key={_item.id}
          name={`${name}.${index}`}
          control={control}
          defaultValue=""
          render={({ field: { onBlur, ...field } }) => (
            <TextField
              fullWidth
              margin="normal"
              autoFocus
              {...field}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <Stack direction="row" spacing={1}>
                      <IconButton
                        edge="end"
                        onClick={() => {
                          append(
                            incHostPortNum(
                              getValues(`${name}.${fields.length - 1}`)
                            )
                          );
                        }}
                      >
                        <AddIcon />
                      </IconButton>
                      {fields.length > 1 && (
                        <IconButton edge="end" onClick={() => remove(index)}>
                          <RemoveIcon />
                        </IconButton>
                      )}
                    </Stack>
                  </InputAdornment>
                ),
              }}
            />
          )}
        />
      ))}
    </>
  );
};

export default HostFields;

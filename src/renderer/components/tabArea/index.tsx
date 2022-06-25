import React, { useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Paper, Tab, Tabs } from '@mui/material';
import useStore from '../../../store/store';

const TabsArea = () => {
  const { connectionKey } = useParams();
  const { getConnection } = useStore();
  const [value, setValue] = useState(0);

  const conn = getConnection(connectionKey as string);
  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <>
      {!!conn?.tab?.length && (
        <Paper square>
          <Tabs
            value={value}
            onChange={handleChange}
            variant="scrollable"
            scrollButtons="auto"
          >
            {conn?.tab?.map((t, index) => (
              <Tab value={index} label={conn.tabMap?.[t]?.label} key={index} />
            ))}
          </Tabs>
        </Paper>
      )}
    </>
  );
};
export default TabsArea;

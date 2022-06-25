import { CssBaseline, Grid } from '@mui/material';
import { Fill, LeftResizable, ViewPort } from 'react-spaces';
import { Outlet } from 'react-router-dom';
import Side from '../side';

const Layout = () => {
  return (
    <>
      <Grid
        container
        component="main"
        sx={{ height: '100vh', width: '100vw', backgroundColor: '#f5f6f7' }}
      >
        <CssBaseline />
        <ViewPort>
          <LeftResizable
            minimumSize={200}
            maximumSize={400}
            size="250px"
            scrollable
          >
            <Side />
          </LeftResizable>
          <Fill>
            <Outlet />
          </Fill>
        </ViewPort>
      </Grid>
    </>
  );
};

export default Layout;

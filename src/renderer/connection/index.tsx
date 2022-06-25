import {
  Box,
  CssBaseline,
  Grid,
  IconButton,
  Paper,
  Typography,
} from '@mui/material';
import { Fill, LeftResizable, ViewPort } from 'react-spaces';
import { FormProvider, useForm } from 'react-hook-form';
import EditIcon from '@mui/icons-material/Edit';
import { useCallback, useEffect, useState } from 'react';
import { LoadingButton } from '@mui/lab';
import { useNavigate } from 'react-router-dom';
import Side from './side';
import ConnectionForm, { ConnectionFormValue } from './form/connection';
import FavoriteForm, { FavoriteFormValue } from './form/favorite';
import useDialog from '../components/useDialog';
import useStore from '../../store/store';
import { Configuration } from '../../store/interface';
import { ApplyConfig } from '../../utils/applyConfig';
import { useFetcher } from '../../service/context/fetcher';
import { useStats } from '../../service/client';

const defaultConn = {
  defaultValues: {
    hosts: ['localhost:4002'],
    authentication: { type: 'none' },
    tls: 'off',
  },
};
const defaultFav = {
  defaultValues: { name: '' },
};

const Connection = () => {
  const favoritesForm = useForm<FavoriteFormValue>({
    ...defaultFav,
  });
  const nav = useNavigate();
  const f = useFetcher();
  const connectionForm = useForm<ConnectionFormValue>({ ...defaultConn });
  const { getConnection, addConnection, updateConnection, updateClusterInfo } =
    useStore();
  const [connectionKey, setConnectionKey] = useState<string>();
  const [title, setTitle] = useState('New Connection');
  const [state, fetchStats] = useStats();

  useEffect(() => {
    if (connectionKey) {
      const conn = getConnection(connectionKey);
      if (conn) {
        const {
          config: { name, color, ...rest },
        } = conn;
        if (name) {
          setTitle(name);
        }
        favoritesForm.reset({ name, color });
        connectionForm.reset(rest);
      }
    } else {
      favoritesForm.reset(defaultFav.defaultValues);
      connectionForm.reset(defaultConn.defaultValues);
      setTitle('New Connection');
    }
  }, [connectionForm, favoritesForm, connectionKey, getConnection]);

  const [node, toggle] = useDialog({
    title: 'Save connection',
    okText: 'Save',
    onCancel: (Fn) => Fn(),
    onOk: (Fn) => {
      favoritesForm.handleSubmit((data) => {
        const cfg = connectionForm.getValues();
        if (connectionKey) {
          updateConnection(connectionKey, { ...cfg, ...data });
          favoritesForm.reset(data);
          connectionForm.reset(cfg);
        } else {
          const key = addConnection({ ...cfg, ...data });
          setConnectionKey(key);
        }
        Fn();
      })();
    },
    render: () => (
      <FormProvider {...favoritesForm}>
        <FavoriteForm />
      </FormProvider>
    ),
  });

  const onConnection = useCallback(
    (cfg: Configuration, key: string) => {
      ApplyConfig(f, cfg);
      fetchStats()
        .then((data) => {
          updateClusterInfo(key, data);
          nav(`/dashboard/${key}`);
        })
        .catch(console.error);
    },
    [connectionKey, f, fetchStats, nav, updateClusterInfo]
  );

  const onSubmit = useCallback(() => {
    connectionForm.handleSubmit((cfg) => {
      if (connectionKey) {
        updateConnection(connectionKey, {
          ...favoritesForm.getValues(),
          ...cfg,
        });
        onConnection(cfg, connectionKey);
      } else {
        // add to recent
        const key = addConnection(cfg);
        console.log('new cfg', key);
        setConnectionKey(key);
        onConnection(cfg, key);
      }
    })();
  }, [
    addConnection,
    connectionForm,
    connectionKey,
    favoritesForm,
    onConnection,
    updateConnection,
  ]);

  return (
    <Grid
      container
      component="main"
      sx={{ height: '100vh', width: '100vw', backgroundColor: '#f5f6f7' }}
    >
      {node}
      <CssBaseline />
      <ViewPort>
        <LeftResizable
          minimumSize={225}
          maximumSize={400}
          size="250px"
          scrollable
        >
          <Side onClick={(item) => setConnectionKey(item)} />
        </LeftResizable>
        <Fill>
          <Grid>
            <Grid md={8} item>
              <FormProvider {...connectionForm}>
                <Box
                  component={Paper}
                  elevation={3}
                  sx={{
                    maxHeight: '90vh',
                    overflow: 'scroll',
                    p: 3,
                    m: 3,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                  }}
                >
                  <Grid container gap={1}>
                    <Grid item>
                      <Typography component="h1" variant="h5">
                        {title}
                      </Typography>
                    </Grid>
                    <Grid item>
                      <IconButton onClick={() => toggle()}>
                        <EditIcon fontSize="small" />
                      </IconButton>
                    </Grid>
                  </Grid>
                  <Box sx={{ mt: 1, width: '100%' }}>
                    <ConnectionForm />
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                      <LoadingButton
                        loading={state.loading}
                        type="submit"
                        variant="contained"
                        sx={{ mt: 3 }}
                        onClick={onSubmit}
                      >
                        Connect
                      </LoadingButton>
                    </Box>
                  </Box>
                </Box>
              </FormProvider>
            </Grid>
          </Grid>
        </Fill>
      </ViewPort>
    </Grid>
  );
};

export default Connection;

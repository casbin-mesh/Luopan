import * as React from 'react';
import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import { createTheme, styled, ThemeProvider } from '@mui/material/styles';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Paper from '@mui/material/Paper';
import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown';
import AddIcon from '@mui/icons-material/Add';
import { useParams } from 'react-router-dom';
import FolderIcon from '@mui/icons-material/Folder';
import { Skeleton } from '@mui/lab';
import { FormProvider, useForm } from 'react-hook-form';
import { useCreateNamespace, useListNamespaces } from '../../../service/client';
import useStore from '../../../store/store';
import useDialog from '../../components/useDialog';
import CreateForm, { CreateFormValue } from '../namespace/form/create';

const FireNav = styled(List)<{ component?: React.ElementType }>({
  textOverflow: 'ellipsis',
  overflow: 'hidden',
  '& .MuiListItemButton-root': {
    paddingLeft: 24,
    paddingRight: 24,
  },
  '& .MuiListItemIcon-root': {
    minWidth: 0,
    marginRight: 16,
  },
  '& .MuiSvgIcon-root': {
    fontSize: 20,
  },
});

const Index = () => {
  const [open, setOpen] = useState(true);
  const { setCurrentTab, newNamespaceTab } = useStore();
  const { connectionKey } = useParams();
  const [{ loading, value: data }, reQuery] = useListNamespaces();
  const [createState, createNamespace] = useCreateNamespace();

  useEffect(() => {
    reQuery();
  }, [reQuery]);
  const createForm = useForm<CreateFormValue>();

  const [node, toggle] = useDialog({
    title: 'New Namespace',
    render: () => (
      <FormProvider {...createForm}>
        <CreateForm />
      </FormProvider>
    ),
    onOk: (toggleFn) => {
      createForm.handleSubmit(async ({ text, ns }) => {
        await createNamespace({ ns, text });
        await reQuery();
        createForm.reset();
        toggleFn();
      })();
    },
    okLoading: createState.loading,
  });

  return (
    <Box sx={{ display: 'flex', height: '100vh' }}>
      {node}
      <ThemeProvider
        theme={createTheme({
          components: {
            MuiListItemButton: {
              defaultProps: {
                disableTouchRipple: true,
              },
            },
          },
          palette: {
            mode: 'dark',
            primary: { main: '#fafafa' },
            background: { paper: '#0c092e' },
          },
        })}
      >
        <Paper elevation={0} sx={{ minWidth: 200 }} square>
          <FireNav component="nav" disablePadding>
            <ListItem component="div" disablePadding>
              <ListItemButton sx={{ height: 56 }} onClick={() => toggle()}>
                <ListItemIcon>
                  <AddIcon color="primary" />
                </ListItemIcon>
                <ListItemText
                  primary="New Namespace"
                  primaryTypographyProps={{
                    color: 'primary',
                    fontWeight: 'medium',
                    variant: 'body1',
                  }}
                />
              </ListItemButton>
            </ListItem>
            <Divider />
            <Box
              sx={{
                bgcolor: open ? 'rgba(71, 98, 130, 0.2)' : null,
                pb: open ? 2 : 0,
              }}
            >
              <ListItemButton
                alignItems="flex-start"
                onClick={() => setOpen(!open)}
                sx={{
                  px: 3,
                  pt: 2.5,
                  pb: open ? 0 : 2.5,
                  '&:hover, &:focus': { '& svg': { opacity: open ? 1 : 0 } },
                }}
              >
                <ListItemText
                  primary={connectionKey}
                  primaryTypographyProps={{
                    fontSize: 15,
                    fontWeight: 'medium',
                    lineHeight: '20px',
                    mb: '2px',
                  }}
                  secondary={
                    data?.length ? `${data.length} namespaces` : 'namespaces'
                  }
                  secondaryTypographyProps={{
                    noWrap: true,
                    fontSize: 12,
                    lineHeight: '16px',
                    color: open ? 'rgba(0,0,0,0)' : 'rgba(255,255,255,0.5)',
                  }}
                  sx={{ my: 0 }}
                />
                <KeyboardArrowDown
                  sx={{
                    mr: -1,
                    opacity: 0,
                    transform: open ? 'rotate(-180deg)' : 'rotate(0)',
                    transition: '0.2s',
                  }}
                />
              </ListItemButton>
              {loading && (
                <Box sx={{ width: '100%', p: 2 }}>
                  <Skeleton />
                  <Skeleton animation="wave" />
                  <Skeleton animation={false} />
                </Box>
              )}
              {open &&
                data?.map?.((item) => (
                  <ListItemButton
                    key={item}
                    sx={{ py: 0, minHeight: 32, color: 'rgba(255,255,255,.8)' }}
                    onClick={() => {
                      if (connectionKey) {
                        const key = newNamespaceTab(connectionKey, item);
                        console.log(connectionKey, item, key);
                        if (key) setCurrentTab(connectionKey, key);
                      }
                    }}
                  >
                    <ListItemIcon sx={{ color: 'inherit' }}>
                      <FolderIcon />
                    </ListItemIcon>
                    <ListItemText
                      primary={item}
                      primaryTypographyProps={{
                        fontSize: 14,
                        fontWeight: 'medium',
                      }}
                    />
                  </ListItemButton>
                ))}
            </Box>
          </FireNav>
        </Paper>
      </ThemeProvider>
    </Box>
  );
};

export default Index;

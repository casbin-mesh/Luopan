import * as React from 'react';
import { useEffect } from 'react';
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
import { useBoolean } from 'react-use';
import CloudIcon from '@mui/icons-material/Cloud';
import StorageIcon from '@mui/icons-material/Storage';
import dayjs from 'dayjs';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import useStore from '../../../store/store';
import MenuButton from './menu';

dayjs.extend(localizedFormat);

const HostIcon = (hosts: string[]) => {
  const first = hosts.length ? hosts[0] : '';
  if (first.indexOf('localhost') > -1 || first.startsWith('127')) {
    return <StorageIcon />;
  }
  return <CloudIcon />;
};

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

const Index = ({ onClick }: { onClick?: (item?: string) => void }) => {
  const { recent, favorites, connectionMap, removeConnection } = useStore();
  const [showFavorite, toggleFavorite] = useBoolean(!!favorites.length);
  const [showRecent, toggleRecent] = useBoolean(!!recent.length);
  useEffect(() => {
    toggleRecent(!!recent.length);
    toggleFavorite(!!favorites.length);
  }, [toggleRecent, recent, favorites, toggleFavorite]);
  return (
    <Box sx={{ display: 'flex', height: '100vh' }}>
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
        <Paper
          elevation={0}
          sx={{
            minWidth: 225,
            width: '100%',
          }}
          square
        >
          <FireNav component="nav" disablePadding>
            <ListItemButton
              component="a"
              href="#customized-list"
              sx={{ height: 56 }}
            >
              <ListItemIcon sx={{ fontSize: 20 }}>🧭</ListItemIcon>
              <ListItemText
                sx={{ my: 0 }}
                primary="LouPan"
                primaryTypographyProps={{
                  fontSize: 20,
                  fontWeight: 'medium',
                  letterSpacing: 0,
                }}
              />
            </ListItemButton>
            <Divider />
            <ListItem component="div" disablePadding>
              <ListItemButton sx={{ height: 56 }} onClick={() => onClick?.()}>
                <ListItemIcon>
                  <AddIcon color="primary" />
                </ListItemIcon>
                <ListItemText
                  primary="New Connection"
                  primaryTypographyProps={{
                    color: 'primary',
                    fontWeight: 'medium',
                    variant: 'body1',
                  }}
                />
              </ListItemButton>
            </ListItem>
            <Divider />
            <Box sx={{ overflow: 'scroll', height: 'calc(100vh - 112px)' }}>
              <Box
                sx={{
                  bgcolor: showFavorite ? 'rgba(71, 98, 130, 0.2)' : null,
                  pb: showFavorite ? 2 : 0,
                }}
              >
                <ListItemButton
                  alignItems="flex-start"
                  onClick={() => toggleFavorite(!showFavorite)}
                  sx={{
                    px: 3,
                    pt: 2.5,
                    pb: showFavorite ? 0 : 2.5,
                    '&:hover, &:focus': {
                      '& svg': { opacity: showFavorite ? 1 : 0 },
                    },
                  }}
                >
                  <ListItemText
                    primary="Favorites"
                    primaryTypographyProps={{
                      fontSize: 15,
                      fontWeight: 'medium',
                      lineHeight: '20px',
                      mb: '2px',
                    }}
                    secondary="Saved connections"
                    secondaryTypographyProps={{
                      noWrap: true,
                      fontSize: 12,
                      lineHeight: '16px',
                      color: showFavorite
                        ? 'rgba(0,0,0,0)'
                        : 'rgba(255,255,255,0.5)',
                    }}
                    sx={{ my: 0 }}
                  />
                  <KeyboardArrowDown
                    sx={{
                      mr: -1,
                      opacity: 0,
                      transform: showFavorite ? 'rotate(-180deg)' : 'rotate(0)',
                      transition: '0.2s',
                    }}
                  />
                </ListItemButton>
                {showFavorite &&
                  [...favorites].reverse().map((item) => (
                    <ListItem
                      sx={{
                        '& .MuiListItemSecondaryAction-root': { opacity: 0 },
                        '&:hover, &:focus': {
                          '& .MuiListItemSecondaryAction-root': { opacity: 1 },
                        },
                      }}
                      key={item}
                      disablePadding
                      secondaryAction={
                        <MenuButton
                          onRemove={() => {
                            removeConnection(item);
                          }}
                        />
                      }
                    >
                      <ListItemButton
                        onClick={() => onClick?.(item)}
                        alignItems="flex-start"
                        sx={{
                          py: 0,
                          minHeight: 32,
                          color: 'rgba(255,255,255,.8)',
                        }}
                      >
                        <ListItemIcon
                          sx={{
                            color: 'inherit',
                          }}
                        >
                          {!!connectionMap[item].config.color && (
                            <Box
                              sx={{
                                background: connectionMap[item].config.color,
                                height: '8px',
                                width: '8px',
                                borderRadius: '8px',
                                ml: '-16px',
                                mr: '8px',
                                mt: '6px',
                              }}
                            />
                          )}
                          {HostIcon(connectionMap[item].config.hosts)}
                        </ListItemIcon>
                        <ListItemText
                          primary={connectionMap[item].config.name}
                          primaryTypographyProps={{
                            fontSize: 14,
                            fontWeight: 'medium',
                          }}
                          secondary={connectionMap[item].config.hosts.join(',')}
                          secondaryTypographyProps={{
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                          }}
                        />
                      </ListItemButton>
                    </ListItem>
                  ))}
              </Box>
              <Box
                sx={{
                  bgcolor: showRecent ? 'rgba(71, 98, 130, 0.2)' : null,
                  pb: showRecent ? 2 : 0,
                }}
              >
                <ListItemButton
                  alignItems="flex-start"
                  onClick={toggleRecent}
                  sx={{
                    px: 3,
                    pt: 2.5,
                    pb: showRecent ? 0 : 2.5,
                    '&:hover, &:focus': {
                      '& svg': { opacity: showRecent ? 1 : 0 },
                    },
                  }}
                >
                  <ListItemText
                    primary="Recents"
                    primaryTypographyProps={{
                      fontSize: 15,
                      fontWeight: 'medium',
                      lineHeight: '20px',
                      mb: '2px',
                    }}
                    secondary="recent connections"
                    secondaryTypographyProps={{
                      noWrap: true,
                      fontSize: 12,
                      lineHeight: '16px',
                      color: showRecent
                        ? 'rgba(0,0,0,0)'
                        : 'rgba(255,255,255,0.5)',
                    }}
                    sx={{ my: 0 }}
                  />
                  <KeyboardArrowDown
                    sx={{
                      mr: -1,
                      opacity: 0,
                      transform: showRecent ? 'rotate(-180deg)' : 'rotate(0)',
                      transition: '0.2s',
                    }}
                  />
                </ListItemButton>
                {showRecent &&
                  [...recent].reverse().map((item) => (
                    <ListItem
                      sx={{
                        '& .MuiListItemSecondaryAction-root': { opacity: 0 },
                        '&:hover, &:focus': {
                          '& .MuiListItemSecondaryAction-root': { opacity: 1 },
                        },
                      }}
                      key={item}
                      disablePadding
                      secondaryAction={
                        <MenuButton
                          onRemove={() => {
                            removeConnection(item);
                          }}
                        />
                      }
                    >
                      <ListItemButton
                        onClick={() => onClick?.(item)}
                        alignItems="flex-start"
                        sx={{
                          py: 0,
                          minHeight: 32,
                          color: 'rgba(255,255,255,.8)',
                        }}
                      >
                        <ListItemIcon sx={{ color: 'inherit' }}>
                          {HostIcon(connectionMap[item].config.hosts)}
                        </ListItemIcon>
                        <ListItemText
                          primary={connectionMap[item].config.hosts.join(',')}
                          primaryTypographyProps={{
                            fontSize: 14,
                            fontWeight: 'medium',
                          }}
                          secondary={dayjs(
                            connectionMap[item].updatedAt
                          ).format('LLL')}
                          secondaryTypographyProps={{
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                          }}
                        />
                      </ListItemButton>
                    </ListItem>
                  ))}
              </Box>
            </Box>
          </FireNav>
        </Paper>
      </ThemeProvider>
    </Box>
  );
};

export default Index;

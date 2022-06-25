import { useBoolean } from 'react-use';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { IconButton } from '@mui/material';
import { MouseEvent, useState } from 'react';

const MenuButton = ({ onRemove }: { onRemove?: () => void }) => {
  const [open, toggle] = useBoolean(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
    toggle();
  };
  const handleClose = () => {
    setAnchorEl(null);
    toggle();
  };
  return (
    <>
      <IconButton edge="end" onClick={handleClick}>
        <MoreHorizIcon />
      </IconButton>
      <Menu open={open} onClose={handleClose} anchorEl={anchorEl}>
        <MenuItem
          onClick={() => {
            onRemove?.();
            handleClose();
          }}
        >
          Remove
        </MenuItem>
      </Menu>
    </>
  );
};

export default MenuButton;

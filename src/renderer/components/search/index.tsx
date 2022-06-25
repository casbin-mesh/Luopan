import {
  Box,
  Button,
  FormControl,
  MenuItem,
  Paper,
  TextField,
} from '@mui/material';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import RefreshIcon from '@mui/icons-material/Refresh';

export default function FilterBar() {
  return (
    <Paper elevation={0} square>
      <Box
        sx={{
          display: 'flex',
          gap: 1,
          px: 2,
          py: 1,
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <FormControl margin="none" sx={{ width: '200px' }}>
          <TextField select id="tls" label="Type">
            <MenuItem value={10}>Group</MenuItem>
            <MenuItem value={20}>Policy</MenuItem>
          </TextField>
        </FormControl>
        <TextField fullWidth id="filter" label="Filter" />

        <Button size="medium" color="primary" variant="contained">
          Find
        </Button>
        <Button size="medium" variant="outlined">
          Reset
        </Button>
      </Box>
      <Box
        sx={{
          display: 'flex',
          gap: 1,
          px: 2,
          pb: 1.5,
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Box>
          <Button
            color="primary"
            variant="text"
            startIcon={<FileDownloadIcon />}
          >
            Add Data
          </Button>
          <Button
            color="primary"
            variant="text"
            sx={{ ml: 1 }}
            startIcon={<FileUploadIcon />}
          >
            Export
          </Button>
        </Box>
        <Button color="primary" variant="outlined" startIcon={<RefreshIcon />}>
          Refresh
        </Button>
      </Box>
    </Paper>
  );
}


import { Grid,  } from '@mui/material';
import KeyGrid from './KeyGrid';
import UserInfoSidebar from './UserInfoSidebar';

function Dashboard() {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={3}>
        <UserInfoSidebar />
      </Grid>
      <Grid item xs={12} md={9}>
        <KeyGrid />
      </Grid>
    </Grid>
  );
}

export default Dashboard;

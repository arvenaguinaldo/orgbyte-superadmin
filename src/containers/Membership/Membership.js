import React from 'react';
import Typography from '@material-ui/core/Typography';
import LayoutwithTopbarAndSidebar from 'layouts/Admin/LayoutWithTopbarAndSidebar';

function DenseAppBar() {
  return (
    <LayoutwithTopbarAndSidebar>
      <Typography color="primary" variant="h4">
      HELLO
      </Typography>
    </LayoutwithTopbarAndSidebar>
  );
}

export default DenseAppBar;

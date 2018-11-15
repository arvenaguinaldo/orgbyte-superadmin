import React, {Component} from 'react';

import MUIDataTable from 'mui-datatables';
import Typography from '@material-ui/core/Typography';
import LayoutWithTopbarAndSidebar from 'layouts/LayoutWithTopbarAndSidebar';

class AdminActivityLogs extends Component {
  render() {

    const columns = ['User', 'Activity', 'Date'];
    const data = [
      ['Lara Beatrice Hilario', 'LOGGED IN', '11/15/2018 3:48 AM'],
      ['Lara Beatrice Hilario', 'ADDED members', '11/15/2018 3:48 AM']
    ];

    const options = {
      filterType: 'checkbox'
    };

    return (
      <LayoutWithTopbarAndSidebar>
        <Typography variant="h4" gutterBottom>
          Activity logs
        </Typography>
        <MUIDataTable
          title={''}
          data={data}
          columns={columns}
          options={options}
        />
      </LayoutWithTopbarAndSidebar>
    );
  }
}

export default AdminActivityLogs;

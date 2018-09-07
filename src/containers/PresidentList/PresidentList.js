import React from 'react';
import MUIDataTable from 'mui-datatables';
import {createMuiTheme, MuiThemeProvider} from '@material-ui/core/styles';
import LayoutWithTopbarAndSidebar from 'layouts/LayoutWithTopbarAndSidebar';
import CustomToolbar from './CustomToolbarSelect';

class OrganizationTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      columns: ['No', 'Full Name', 'Position', 'Organization', 'Email', 'Contact Number'],
      data: [
        [1, 'Lara Beatrice Hilario', 'President', 'SWITS', 'larabeatrice@gmail.com', '09161234567'],
        [2, 'Lara Beatrice Hilario', 'President', 'SWITS', 'larabeatrice@gmail.com', '09161234567'],
        [3, 'Lara Beatrice Hilario', 'President', 'SWITS', 'larabeatrice@gmail.com', '09161234567'],
        [4, 'Lara Beatrice Hilario', 'President', 'SWITS', 'larabeatrice@gmail.com', '09161234567'],
        [5, 'Lara Beatrice Hilario', 'President', 'SWITS', 'larabeatrice@gmail.com', '09161234567'],
        [6, 'Lara Beatrice Hilario', 'President', 'SWITS', 'larabeatrice@gmail.com', '09161234567'],
        [7, 'Lara Beatrice Hilario', 'President', 'SWITS', 'larabeatrice@gmail.com', '09161234567'],
        [8, 'Lara Beatrice Hilario', 'President', 'SWITS', 'larabeatrice@gmail.com', '09161234567'],
        [9, 'Lara Beatrice Hilario', 'President', 'SWITS', 'larabeatrice@gmail.com', '09161234567']

      ]
    };
  }
  getMuiTheme = () => createMuiTheme({
    overrides: {
      MUIDataTableBodyCell: {
        root: {
          paddingLeft: '0px',
          paddingRight: '0px'
        }
      },
      MUIDataTableHeadCell: {
        root: {
          paddingLeft: '0px',
          paddingRight: '0px'
        }
      }
    }
  });
  changeStuff(newcolumns) {
    this.setState({columns: newcolumns});
  }
  render() {
    const options = {
      filter: true,
      selectableRows: true,
      filterType: 'dropdown',
      responsive: 'scroll',
      rowsPerPage: 5,
      resizableColumns: false,
      customToolbarSelect: selectedRows => <CustomToolbar selectedRows={selectedRows} data={this.state.data} changeHandler={this.changeStuff.bind(this)} columns={this.state.columns} />
    };
    return (
      <LayoutWithTopbarAndSidebar>
        <MuiThemeProvider theme={this.getMuiTheme()}>
          <MUIDataTable
            title={'Presidents List'}
            data={this.state.data}
            columns={this.state.columns}
            options={options}
          />
        </MuiThemeProvider>
      </LayoutWithTopbarAndSidebar>
    );
  }
}
export default OrganizationTable;

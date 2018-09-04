import React from 'react';
import MUIDataTable from 'mui-datatables';
import {createMuiTheme, MuiThemeProvider} from '@material-ui/core/styles';
import LayoutWithTopbarAndSidebar from 'layouts/LayoutWithTopbarAndSidebar';
import CustomToolbar from './CustomToolbarSelect';

class OrganizationTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      columns: ['No', 'Recognition no.', 'Organization', 'Type', 'College', 'Admin'],
      data: [
        [1, 'ISO-AS2349247', 'SWITS', 'University-wide', 'CICT', 'Lara Beatrice Hilario'],
        [2, 'ISO-AS2349247', 'MathSoc', 'University-wide', 'CS', 'Arven Aguinaldo'],
        [3, 'ISO-AS2349247', 'CsspOrg', 'University-wide', 'CSSP', 'John Jerico San Pablo'],
        [4, 'ISO-AS2349247', 'Welding', 'University-wide', 'CIT', 'Arjay Esponilla'],
        [3, 'ISO-AS2349247', 'CsspOrg', 'University-wide', 'CSSP', 'John Jerico San Pablo'],
        [3, 'ISO-AS2349247', 'CsspOrg', 'University-wide', 'CSSP', 'John Jerico San Pablo'],
        [2, 'ISO-AS2349247', 'MathSoc', 'University-wide', 'CS', 'Arven Aguinaldo'],
        [3, 'ISO-AS2349247', 'CsspOrg', 'University-wide', 'CSSP', 'John Jerico San Pablo'],
        [4, 'ISO-AS2349247', 'Welding', 'University-wide', 'CIT', 'Arjay Esponilla'],
        [3, 'ISO-AS2349247', 'CsspOrg', 'University-wide', 'CSSP', 'John Jerico San Pablo'],
        [3, 'ISO-AS2349247', 'CsspOrg', 'University-wide', 'CSSP', 'John Jerico San Pablo'],
        [3, 'ISO-AS2349247', 'CsspOrg', 'University-wide', 'CSSP', 'John Jerico San Pablo']
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
  changeStuff(newcolumns, newdata) {
    this.setState({columns: newcolumns});
    console.log(newdata);
  }
  render() {
    const options = {
      filter: true,
      selectableRows: true,
      filterType: 'dropdown',
      responsive: 'scroll',
      rowsPerPage: 5,
      resizableColumns: true,
      customToolbarSelect: selectedRows => <CustomToolbar selectedRows={selectedRows} data={this.state.data} changeHandler={this.changeStuff.bind(this)} />
    };
    return (
      <LayoutWithTopbarAndSidebar>
        <MuiThemeProvider theme={this.getMuiTheme()}>
          <MUIDataTable
            title={'Organization List'}
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

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {compose} from 'recompose';
import {connect} from 'react-redux';
import moment from 'moment';
import JsPDF from 'jspdf';
import 'jspdf-autotable';

import MUIDataTable from 'mui-datatables';
import {withStyles} from '@material-ui/core/styles';
import LayoutWithTopbarAndSidebar from 'layouts/LayoutWithTopbarAndSidebar';

import {createStructuredSelector} from 'reselect';
import {makeSelectOrganizationsList, makeSelectOrganizationsMeta} from 'redux/selectors/organizations';
import {fetchOrganizations} from 'redux/actions/organizations';

import fetchInitialData from 'hoc/fetchInitialData';
import showLoadingWhileFetchingDataInsideLayout from 'hoc/showLoadingWhileFetchingDataInsideLayout';

import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import Print from '@material-ui/icons/LocalPrintshop';

// import myStyles from './Announcements.scss';

const styles = theme => ({
  root: {
    width: '100%'
  },
  Paper: {
    padding: '50px'
  },
  sendButton: {
    flex: 1
  },
  grid: {
    backgroundColor: '#5F1D24'
  },
  button: {
    margin: 20
  },
  leftIcon: {
    marginRight: theme.spacing.unit
  },
  rightIcon: {
    marginLeft: theme.spacing.unit
  },
  iconSmall: {
    fontSize: 20
  }
});

let tableData = {};
let tableDataArray = [];
let tableColumnsArray = [];

const tableColumnsStatus = [];
let tableColumns = {};
const columns = [
  {
    name: 'Id',
    options: {
      display: false,
      filter: false
    }
  },
  {
    name: 'Name\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0',
    options: {
      filter: false
    }
  },
  {
    name: 'Acronym',
    options: {
      filter: false
    }
  },
  {
    name: 'Recognition No.',
    options: {
      filter: false
    }
  },
  {
    name: 'Date of Formation\xa0\xa0\xa0\xa0',
    options: {
      filter: false
    }
  },
  {
    name: 'College\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0',
    options: {
      filter: true
    }
  },
  {
    name: 'Type\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0',
    options: {
      filter: true
    }
  },
  {
    name: 'Status',
    options: {
      filter: true
    }
  }
];


class OrganizationList extends Component {

  static propTypes = {
    organizations: PropTypes.array.isRequired
  };

  static defaultProps = {
    organizations: []
  };


  render() {
    const {organizations} = this.props;
    const options = {
      selectableRows: false,
      rowsPerPage: 5,
      rowsPerPageOptions: [5, 10, 15],
      filter: true,
      filterType: 'dropdown',
      print: false,
      customToolbar: () => {
        return (
          <CustomToolbar organizations={organizations} />
        );
      },
      onTableChange: (action, tableState) => {
        // get displayed table data
        tableDataArray = [];
        tableData = {...tableState};
        let counter = 0;
        tableData.displayData.map((values) => {
          tableDataArray[counter] = {...values.data};
          counter += 1;
          return null;
        });

        // get table column names
        tableColumnsArray = [];
        let counterb = 0;
        tableColumns = {...tableState};
        tableColumns.columns.map((values, index) => {
            return (tableColumnsArray[counterb] = {title: values.name, dataKey:index}, tableColumnsStatus[counterb] = values.display, counterb++); // eslint-disable-line
        });
        // get table columnstatus (display: true/false)
        let counterc = 0;
        tableColumns.columns.map((values) => {
            return (tableColumnsStatus[counterc] = values.display, counterc++); // eslint-disable-line
        });

      }
    };

    return (
      <LayoutWithTopbarAndSidebar>
        <MUIDataTable
          title={'Organizations List'}
          options={options}
          data={this.props.organizations.map((org) => {
            return [
              org.id,
              org.name,
              org.acronym,
              org.recognition_number,
              moment(org.formation).format('MMMM Do YYYY, h:mm a'),
              org.college_name,
              org.organization_type_name,
              org.status
            ];
          })}
          columns={columns}
        />
      </LayoutWithTopbarAndSidebar>
    );
  }
}

export class CustomToolbar extends Component {
  static propTypes = {
    organizations: PropTypes.array.isRequired
  };
  printData = () => {
    const data = this.props.organizations.map(org => ({
      0: org.id,
      1: org.name,
      2: org.acronym,
      3: org.recognition_number,
      4: moment(org.formation).format('MM-DD-YYYY h:mm A'),
      5: org.college_name,
      6: org.organization_type_name,
      7: org.status
    }));

    const columnsWithKey = columns.map((col, index) => {
      return {title: col.name, dataKey: index};
    });

    tableDataArray.map((values) => {
      for (let x = 0; x < tableColumnsStatus.length; x += 1) {
        if (tableColumnsStatus[x] === 'false') {
        delete values[x] // eslint-disable-line
        }
      }
      return null;
    });

    for (let x = 0; x < tableColumnsArray.length; x += 1) {
      if (tableColumnsStatus[x] === 'false') {
        delete tableColumnsArray[x];
      }
    }

    // data supplied to pdf if table is untouched
    if (tableColumnsArray.length === 0) tableColumnsArray = [...columnsWithKey];
    if (tableDataArray.length === 0) tableDataArray = [...data];

    // pdf rows and columns
    const pdfcolumns = tableColumnsArray.map(col => (
      col
    ));
    const pdfrows = tableDataArray.map(row => (
      row
    ));

    const doc = new JsPDF('p', 'pt');
    const totalPagesExp = '{total_pages_count_string}';
    doc.setProperties({
      title: 'Announcement Table'
    });
    doc.page = 1;
    const orgname = 'Office of the Student Organizations';
    doc.autoTable(pdfcolumns, pdfrows, {
      margin: {top: 200, left: 35},
      bodyStyles: {valign: 'top'},
      styles: {overflow: 'linebreak', columnWidth: 'wrap', fontSize: 6},
      headerStyles: {fillColor: [94, 22, 25], textColor: 255, fontStyle: 'bold'},
      columnStyles: {
        // 0: {columnWidth: 'auto'},
        1: {columnWidth: 'auto'},
        // 2: {columnWidth: 'auto'},
        // 3: {columnWidth: 'auto'},
        // 4: {columnWidth: 'auto'},
        5: {columnWidth: 'auto'},
        6: {columnWidth: 'auto'}
        // 7: {columnWidth: 'auto'}
      },
      alternateRowStyles: {
        fillColor: [220, 220, 220]
      },
      theme: 'grid',
      addPageContent() {
        // HEADER
        doc.setFontSize(15);
        doc.text('Organization List', 35, 190);
        doc.addImage('https://i.postimg.cc/gJjpp5M7/bsu.png', 'PNG', 45, 30, 80, 80); // LEFT IMAGE
        doc.addImage('https://i.postimg.cc/fbVLbXsL/OSO.png', 'PNG', 475, 30, 80, 80); // RIGHT IMAGE
        doc.setTextColor(40);
        doc.setFontSize(26);
        doc.text('Bulacan State University', doc.internal.pageSize.getWidth() / 2, 60, null, null, 'center');
        doc.setFontSize(10);
        doc.text('MacArthur Highway, Brgy. Guinhawa, City of Malolos Bulacan', doc.internal.pageSize.getWidth() / 2, 73, null, null, 'center');
        doc.setFontSize(12);
        const split = doc.splitTextToSize(orgname, 300);
        doc.text(split, doc.internal.pageSize.getWidth() / 2, 100, null, null, 'center');

        // FOOTER
        let str = 'Page ' + doc.page;
        doc.page += 1;
        if (typeof doc.putTotalPages === 'function') {
          str = str + ' of ' + totalPagesExp;
        }
        const pageHeight = doc.internal.pageSize.height || doc.internal.pageSize.getHeight();
        const pageWidth = doc.internal.pageSize.width || doc.internal.pageSize.getWidth();
        doc.setFontSize(10);
        doc.text(str, pageWidth - 70, pageHeight - 10);
        doc.setFontType('italic');
        doc.setFontSize(6);
        const pdfdate = 'Report generated ' + moment(new Date()).format('MM-DD-YYYY h:mm A') + '  by OrgByte';
        doc.text(pdfdate, 10, pageHeight - 10);
      }
    });
    if (typeof doc.putTotalPages === 'function') {
      doc.putTotalPages(totalPagesExp);
    }
    window.open(doc.output('bloburl', 'table'), '_blank', 'top=0%;');

  };
  render() {
    return (
      <React.Fragment>
        <Tooltip title={'Download Pdf'}>
          <IconButton>
            <Print onClick={this.printData} />
          </IconButton>
        </Tooltip>
      </React.Fragment>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  organizations: makeSelectOrganizationsList(),
  meta: makeSelectOrganizationsMeta()
});

const withRedux = connect(mapStateToProps, {fetchOrganizations});

const withFetchInitialData = fetchInitialData((props) => {
  props.fetchOrganizations();
});

const withLoadingWhileFetchingDataInsideLayout = showLoadingWhileFetchingDataInsideLayout((props) => {
  return props.meta.isLoading;
});

export default compose(
  withRedux,
  withFetchInitialData,
  withLoadingWhileFetchingDataInsideLayout,
  withStyles(styles)
)(OrganizationList);

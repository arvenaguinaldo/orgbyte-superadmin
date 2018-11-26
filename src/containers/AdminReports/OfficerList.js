import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';
import {compose} from 'recompose';
import {makeSelectCurrentUser} from 'redux/selectors/auth';
import moment from 'moment';

import MUIDataTable from 'mui-datatables';
import LayoutWithTopbarAndSidebar from 'layouts/LayoutWithTopbarAndSidebar';

import {fetchOfficers} from 'redux/actions/users';
import {makeSelectUsersMeta, makeSelectOfficersList} from 'redux/selectors/users';

import fetchInitialData from 'hoc/fetchInitialData';
import showLoadingWhileFetchingDataInsideLayout from 'hoc/showLoadingWhileFetchingDataInsideLayout';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import Print from '@material-ui/icons/LocalPrintshop';

import JsPDF from 'jspdf';
import 'jspdf-autotable';

let tableData = {};
let tableDataArray = [];
let tableColumnsArray = [];
const tableColumnsStatus = [];
let tableColumns = {};


const columns = [
  {
    name: 'Name'
  },
  {
    name: 'Position'
  },
  {
    name: 'Email'
  },
  {
    name: 'Contact Number'
  },
  {
    name: 'College'
  }
];


class AccountsList extends React.Component {
  static propTypes = {
    officers: PropTypes.array,
    user: PropTypes.object.isRequired
  }
  static defaultProps = {
    officers: []
  };
  render() {
    const {officers, user} = this.props;
    const options = {
      filter: false,
      selectableRows: false,
      filterType: 'dropdown',
      responsive: 'scroll',
      rowsPerPage: 5,
      resizableColumns: false,
      print: false,
      customToolbar: () => {
        return (
          <CustomToolbar officers={officers} user={user} />
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
          title={'Account List'}
          columns={columns}
          options={options}
          data={officers.map((president) => {
            return [
              president.last_name + ',  ' + president.first_name + ' ' + president.middle_name,
              president.user_type_id === 'admin' ? 'President' : president.position,
              president.email,
              president.contact_number,
              president.college_name
            ];
          })}
        />
      </LayoutWithTopbarAndSidebar>
    );
  }
}

export class CustomToolbar extends Component {
  static propTypes = {
    officers: PropTypes.array,
    user: PropTypes.object.isRequired
  }
  printData = () => {
    const data = this.props.officers.map(president => ({
      0: president.last_name + ',  ' + president.first_name + ' ' + president.middle_name,
      1: president.user_type_id === 'admin' ? 'President' : president.position,
      2: president.email,
      3: president.contact_number,
      4: president.college_name
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
      title: 'Members Table'
    });
    doc.page = 1;
    // const orgname = this.props.members[0].organization_name;
    const username = this.props.user.first_name + ' ' + this.props.user.last_name;
    const orgname = 'Society for the Welfare of Information Technology Students';
    doc.autoTable(pdfcolumns, pdfrows, {
      margin: {top: 200, left: 35},
      bodyStyles: {valign: 'top'},
      styles: {overflow: 'linebreak', columnWidth: 'wrap', fontSize: 6},
      headerStyles: {fillColor: [94, 22, 25], textColor: 255, fontStyle: 'bold'},
      columnStyles: {
        0: {columnWidth: 'auto'},
        1: {columnWidth: 'auto'},
        2: {columnWidth: 'auto'},
        3: {columnWidth: 'auto'},
        4: {columnWidth: 'auto'}
      },
      alternateRowStyles: {
        fillColor: [220, 220, 220]
      },
      theme: 'grid',
      addPageContent() {
        // HEADER
        doc.setFontSize(15);
        doc.text('Account List', 35, 190);
        doc.addImage('https://i.postimg.cc/gJjpp5M7/bsu.png', 'PNG', 45, 30, 80, 80); // LEFT IMAGE
        doc.addImage('https://i.postimg.cc/fyCSqmq1/Swits.png', 'PNG', 475, 30, 80, 80); // RIGHT IMAGE
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
        const pdfdate = 'Report generated by ' + username + ' ' + moment(new Date()).format('MM-DD-YYYY h:mm A') + '  @OrgByte';
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
  officers: makeSelectOfficersList(),
  user: makeSelectCurrentUser(),
  meta: makeSelectUsersMeta()
});

const mapDispatchToProps = {
  fetchOfficers
};

const withRedux = connect(mapStateToProps, mapDispatchToProps);

const withFetchInitialData = fetchInitialData((props) => {
  props.fetchOfficers();
});

const withLoadingWhileFetchingDataInsideLayout = showLoadingWhileFetchingDataInsideLayout((props) => {
  return props.meta.isLoading;
});


export default compose(
  withRedux,
  withFetchInitialData,
  withLoadingWhileFetchingDataInsideLayout
)(AccountsList);

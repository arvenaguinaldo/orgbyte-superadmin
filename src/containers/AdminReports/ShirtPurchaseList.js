import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {compose} from 'recompose';
import {connect} from 'react-redux';
import JsPDF from 'jspdf';
import 'jspdf-autotable';
import moment from 'moment';

import MUIDataTable from 'mui-datatables';
import {withStyles} from '@material-ui/core/styles';
import LayoutWithTopbarAndSidebar from 'layouts/LayoutWithTopbarAndSidebar';

import {createStructuredSelector} from 'reselect';
import {makeSelectUsersMeta} from 'redux/selectors/users';
import {makeSelectCurrentUser} from 'redux/selectors/auth';

import {makeSelectShirtPurchaseShirts} from 'redux/selectors/shirts';
import {fetchPurchaseShirts} from 'redux/actions/shirts';

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
    name: 'Name',
    options: {
      display: true,
      filter: false
    }
  },
  {
    name: 'Size',
    options: {
      display: true,
      filter: true
    }
  },
  {
    name: 'Year and Section',
    options: {
      display: true,
      filter: true
    }
  },
  {
    name: 'Contact Number',
    options: {
      display: true,
      filter: false
    }
  },
  {
    name: 'Email',
    options: {
      display: true,
      filter: false
    }
  }
];


class ShirtPurchaseList extends Component {

static propTypes = {
  purchasedShirts: PropTypes.array.isRequired,
  user: PropTypes.object.isRequired
}

static defaultProps = {
  purchasedShirts: []
};

render() {
  const {purchasedShirts, user} = this.props;
  const options = {
    selectableRows: false,
    rowsPerPage: 5,
    rowsPerPageOptions: [5, 10, 15],
    filter: true,
    filterType: 'dropdown',
    print: false,
    customToolbar: () => {
      return (
        <CustomToolbar purchasedShirts={purchasedShirts} user={user} />
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
        title={'Shirt Purchase List'}
        options={options}
        data={purchasedShirts.map((shirt) => {
          return [
            shirt.id,
            shirt.last_name + ',  ' + shirt.first_name + ' ' + shirt.middle_name,
            shirt.size,
            shirt.year_level + shirt.section + ' - G' + shirt.group,
            shirt.contact_number,
            shirt.email
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
    purchasedShirts: PropTypes.array.isRequired,
    user: PropTypes.object.isRequired
  };
  printData = () => {
    const data = this.props.purchasedShirts.map(shirt => ({
      0: shirt.id,
      1: shirt.last_name + ',  ' + shirt.first_name + ' ' + shirt.middle_name,
      2: shirt.size,
      3: shirt.year_level + shirt.section + ' - G' + shirt.group,
      4: shirt.contact_number,
      5: shirt.email
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
      title: 'Shirts Purchase Table'
    });
    doc.page = 1;
    // const orgname = this.props.members[0].organization_name;
    const username = this.props.user.first_name + ' ' + this.props.user.last_name;
    const orgname = 'Society for the Welfare of Information Technology Students static';
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
        4: {columnWidth: 'auto'},
        5: {columnWidth: 'auto'}
      },
      alternateRowStyles: {
        fillColor: [220, 220, 220]
      },
      theme: 'grid',
      addPageContent() {
        // HEADER
        doc.setFontSize(15);
        doc.text('Shirt Purchase List', 35, 190);
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
  purchasedShirts: makeSelectShirtPurchaseShirts(),
  user: makeSelectCurrentUser(),
  meta: makeSelectUsersMeta()
});

const withRedux = connect(mapStateToProps, {fetchPurchaseShirts});

const withFetchInitialData = fetchInitialData((props) => {
  props.fetchPurchaseShirts();
});

const withLoadingWhileFetchingDataInsideLayout = showLoadingWhileFetchingDataInsideLayout((props) => {
  return props.meta.isLoading;
});

export default compose(
  withRedux,
  withFetchInitialData,
  withLoadingWhileFetchingDataInsideLayout,
  withStyles(styles)
)(ShirtPurchaseList);

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
import Typography from '@material-ui/core/Typography';

import {createStructuredSelector} from 'reselect';
import {makeSelectAnnouncementsList, makeSelectAnnouncementsMeta} from 'redux/selectors/announcements';
import {fetchAnnouncements} from 'redux/actions/announcements';

import fetchInitialData from 'hoc/fetchInitialData';
import showLoadingWhileFetchingDataInsideLayout from 'hoc/showLoadingWhileFetchingDataInsideLayout';

import {Link} from 'react-router-dom';
import Button from '@material-ui/core/Button';


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

const columns = ['Title', 'Announcements Starts', 'Announcements Ends'];


const options = {
  rowsPerPage: 5,
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
class AnnouncementsPage extends Component {
  static propTypes = {
    classes: PropTypes.object,
    announcements: PropTypes.array.isRequired
  };

  static defaultProps = {
    announcements: []
  };
  printData = () => {
    const data = this.props.announcements.map(announcement => ({
      0: announcement.title,
      1: moment(announcement.starts).format('MMMM Do YYYY, h:mm a'),
      2: moment(announcement.ends).format('MMMM Do YYYY, h:mm a')
    }));

    const columnsWithKey = columns.map((col, index) => {
      return {title: col, dataKey: index};
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

    if (tableColumnsArray.length === 0) tableColumnsArray = [...columnsWithKey];
    if (tableDataArray.length === 0) tableDataArray = [...data];
    console.log(tableColumnsArray);
    console.log(tableDataArray);
    const pdfcolumns = tableColumnsArray.map(col => (
      col
    ));
    console.log(pdfcolumns);

    const pdfrows = tableDataArray.map(row => (
      row
    ));
    console.log(pdfrows);
    const doc = new JsPDF('p', 'pt');
    doc.page = 1;
    const totalPagesExp = doc.internal.getNumberOfPages();
    doc.autoTable(pdfcolumns, pdfrows, {
      startY: 260,
      tableWidth: 500,
      margin: {horizontal: 7},
      bodyStyles: {valign: 'top'},
      styles: {overflow: 'linebreak', columnWidth: 'wrap'},
      headerStyles: {fillColor: [94, 22, 25], textColor: 255, fontStyle: 'bold'},
      columnStyles: {text: {columnWidth: 'auto'}},
      alternateRowStyles: {
        fillColor: [220, 220, 220]
      },
      theme: 'grid',
      addPageContent() {
        // HEADER
        doc.setFontSize(15);
        doc.text('Announcement List', 10, 250);
        doc.addImage('https://i.postimg.cc/nVGQ2Lqs/ang-pogi-ni-jeremiah-Robles.png', 'PNG', 60, 30, 80, 80); // LEFT IMAGE
        doc.addImage('https://i.postimg.cc/nVGQ2Lqs/ang-pogi-ni-jeremiah-Robles.png', 'PNG', 440, 30, 80, 80); // RIGHT IMAGE
        doc.setTextColor(40);
        doc.setFontSize(18);
        doc.text('Bulacan State University', doc.internal.pageSize.getWidth() / 2, 60, null, null, 'center');
        doc.setFontSize(10);
        doc.text('City of Malolos Bulacan', doc.internal.pageSize.getWidth() / 2, 70, null, null, 'center');

        // FOOTER
        let str = 'Page ' + doc.page;
        doc.page += 1;
        if (typeof doc.putTotalPages === 'function') {
          str = str + ' of ' + totalPagesExp;
        }
        const pageHeight = doc.internal.pageSize.height || doc.internal.pageSize.getHeight();
        doc.setFontSize(10);
        doc.text(str, 20, pageHeight - 10);

      }
    });
    doc.save('table.pdf');

  }
  render() {
    const {classes} = this.props;

    return (
      <LayoutWithTopbarAndSidebar>
        <Typography variant="h4">
            Announcements
        </Typography>
        <Button component={Link} to="/admin/announcements/add" variant="contained" color="primary" className={classes.button} >
          Add announcement
        </Button>
        <MUIDataTable
          title={'Announcements'}
          options={options}
          data={this.props.announcements.map((announcement) => {
            return [
              announcement.title,
              moment(announcement.starts).format('MMMM Do YYYY, h:mm a'),
              moment(announcement.ends).format('MMMM Do YYYY, h:mm a')
            ];
          })}
          columns={columns}
        />
        <Button variant="contained" color="primary" className={classes.button} onClick={this.printData} >
          Print PDF
        </Button>
      </LayoutWithTopbarAndSidebar>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  announcements: makeSelectAnnouncementsList(),
  meta: makeSelectAnnouncementsMeta()
});

const withRedux = connect(mapStateToProps, {fetchAnnouncements});

const withFetchInitialData = fetchInitialData((props) => {
  props.fetchAnnouncements();
});

const withLoadingWhileFetchingDataInsideLayout = showLoadingWhileFetchingDataInsideLayout((props) => {
  return props.meta.isLoading;
});

export default compose(
  withRedux,
  withFetchInitialData,
  withLoadingWhileFetchingDataInsideLayout,
  withStyles(styles)
)(AnnouncementsPage);


import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {compose} from 'recompose';
import moment from 'moment';
import JsPDF from 'jspdf';
import 'jspdf-autotable';

// Material UI
import MUIDataTable from 'mui-datatables';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import Print from '@material-ui/icons/LocalPrintshop';

import {createStructuredSelector} from 'reselect';
import {makeSelectEvent, makeSelectAttendees, makeSelectSuccess, makeSelectEventsMeta} from 'redux/selectors/events';
import {fetchEvent, attend, fetchAttendees} from 'redux/actions/events';
import {makeSelectCurrentUser} from 'redux/selectors/auth';
import {makeSelectCurrentOrganization} from 'redux/selectors/organizations';
import fetchInitialData from 'hoc/fetchInitialData';
import showLoadingWhileFetchingDataInsideLayout from 'hoc/showLoadingWhileFetchingDataInsideLayout';

import LayoutWithTopbarAndSidebar from 'layouts/LayoutWithTopbarAndSidebar';

let tableData = {};
let tableDataArray = [];
let tableColumnsArray = [];
let tableColumns = {};
const tableColumnsStatus = [];

const columns = [
  {
    name: 'Student No.',
    options: {
      filter: false
    }
  },
  {
    name: 'Name\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0',
    options: {
      filter: false
    }
  },
  {
    name: 'Email-Address\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0',
    options: {
      filter: false
    }
  },
  {
    name: 'Contact No.',
    options: {
      filter: false
    }
  },
  {
    name: 'Course\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0',
    options: {
      filter: true
    }
  },
  {
    name: 'Course Year Section Group',
    options: {
      filter: true
    }
  },
  {
    name: 'Attendee Type',
    options: {
      filter: true
    }
  },
  {
    name: 'Amount',
    options: {
      filter: true
    }
  }
];

class AttendeeListView extends Component {
  static propTypes = {
    attendees: PropTypes.array,
    event: PropTypes.object,
    organization: PropTypes.object,
    user: PropTypes.object.isRequired
  };

  static defaultProps = {
    event: {},
    attendees: [],
    organization: {}
  };

  getAmount = (membertype, event) => {
    if (typeof membertype !== 'undefined') {
      if (membertype === 'Bulsuans') {
        return typeof event.bulsuans_price !== 'undefined' ? event.bulsuans_price : 'loading';
      }
      if (membertype === 'Member') {
        return typeof event.members_price !== 'undefined' ? event.members_price : 'loading';
      }
      if (membertype === 'Non-Bulsuans') {
        return typeof event.non_bulsuans_price !== 'undefined' ? event.non_bulsuans_price : 'loading';
      }
    }
  };
  render() {
    const {attendees, event, user, organization} = this.props;
    const options = {
      filter: true,
      selectableRows: false,
      filterType: 'dropdown',
      print: false,
      responsive: 'scroll',
      rowsPerPage: 5,
      resizableColumns: false,
      customToolbar: () => {
        return (
          <CustomToolbar event={event} attendees={attendees} user={user} organization={organization} />
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
          title={event.name + ' attendees list'}
          data={attendees.map((attendee) => {
            return [
              attendee.student_number !== null ? attendee.student_number : 'N/A',
              attendee.last_name + ',  ' + attendee.first_name + ' ' + attendee.middle_name,
              attendee.email,
              '+63' + attendee.contact_number,
              attendee.course_namee !== null ? attendee.course_namee : 'N/A',
              attendee.section && attendee.year_level !== null ? attendee.section && attendee.year_level + attendee.section + ' - G' + attendee.group : 'N/A',
              attendee.event_attendee_type_name,
              'PHP' + parseFloat(this.getAmount(attendee.event_attendee_type_name, event)).toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})
            ];
          })}
          columns={columns}
          options={options}
        />
      </LayoutWithTopbarAndSidebar>
    );
  }
}

export class CustomToolbar extends Component {
  static propTypes = {
    attendees: PropTypes.array.isRequired,
    event: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
    organization: PropTypes.object.isRequired
  };
  getAmount = (membertype, event) => {
    if (typeof membertype !== 'undefined') {
      if (membertype === 'Bulsuans') {
        return typeof event.bulsuans_price !== 'undefined' ? event.bulsuans_price : 'loading';
      }
      if (membertype === 'Member') {
        return typeof event.members_price !== 'undefined' ? event.members_price : 'loading';
      }
      if (membertype === 'Non-Bulsuans') {
        return typeof event.non_bulsuans_price !== 'undefined' ? event.non_bulsuans_price : 'loading';
      }
    }
  };
  printData = () => {
    const event = this.props.event;
    let total = 0;
    let bulsuans = 0;
    let members = 0;
    let nonbulsuans = 0;
    const data = this.props.attendees.map(attendee => ({
      0: attendee.student_number !== null ? attendee.student_number : 'N/A',
      1: attendee.last_name + ',  ' + attendee.first_name + ' ' + attendee.middle_name,
      2: attendee.email,
      3: '+63' + attendee.contact_number,
      4: attendee.course_namee !== null ? attendee.course_namee : 'N/A',
      5: attendee.section && attendee.year_level !== null ? attendee.section && attendee.year_level + attendee.section + ' - G' + attendee.group : 'N/A',
      6: attendee.event_attendee_type_name,
      7: 'Php' + parseFloat(this.getAmount(attendee.event_attendee_type_name, event)).toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})
    }));

    for (let i = 0; i < this.props.attendees.length; i += 1) {
      total += +data[i][7];
      if (data[i][6] === 'Bulsuans') {
        bulsuans += 1;
      }
      if (data[i][6] === 'Member') {
        members += 1;
      }
      if (data[i][6] === 'Non-Bulsuans') {
        nonbulsuans += 1;
      }
    }

    total = total.toLocaleString(undefined, {maximumFractionDigits: 2});
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
    doc.setFontSize(10);
    const totalPagesExp = '{total_pages_count_string}';
    doc.setProperties({
      title: 'Attendees Table'
    });
    doc.page = 1;
    const orgname = this.props.organization.name;
    const username = this.props.user.first_name + ' ' + this.props.user.last_name;
    const eventname = this.props.event.name;
    const starts = moment(this.props.event.starts).format('MMM DD YYYY h:mm a');
    const ends = moment(this.props.event.ends).format('MMM DD YYYY h:mm a');
    const venue = this.props.event.venue;
    const attendeecount = this.props.attendees.length;

    doc.autoTable(pdfcolumns, pdfrows, {
      margin: {top: 280, left: 35},
      bodyStyles: {valign: 'top'},
      styles: {overflow: 'linebreak', columnWidth: 'wrap', fontSize: 6},
      headerStyles: {fillColor: [94, 22, 25], textColor: 255, fontStyle: 'bold'},
      columnStyles: {
        // 0: {columnWidth: 'auto'},
        1: {columnWidth: 'auto'},
        // 2: {columnWidth: 'auto'},
        // 3: {columnWidth: 'auto'},
        4: {columnWidth: 'auto'}
        // 5: {columnWidth: 'auto'}
        // 6: {columnWidth: 'auto'},
        // 7: {columnWidth: 'auto'}
      },
      alternateRowStyles: {
        fillColor: [220, 220, 220]
      },
      theme: 'grid',
      addPageContent() {
        doc.setFontSize(15);
        doc.text('Attendee List', 35, 275);
        doc.setFontSize(15);
        doc.text('Report Summary', 35, 170);
        doc.setFontSize(8);
        doc.setTextColor(128, 128, 128);
        doc.text('Event Name: ' + eventname, 40, 185);
        doc.text('Venue: ' + venue, 40, 195);
        doc.text('Duration: ' + starts + ' to ' + ends, 40, 205);
        doc.text('Members: ' + members, 40, 215);
        doc.text('Bulsuans: ' + bulsuans, 40, 225);
        doc.text('Non-Bulsuans: ' + nonbulsuans, 40, 235);
        doc.text('Total participants: ' + attendeecount, 40, 245);
        doc.text('Total price of tickets sold: Php ' + total, 40, 255);
        // HEADER
        const pdfcenter = doc.internal.pageSize.getWidth() / 2;
        doc.addImage('https://i.postimg.cc/gJjpp5M7/bsu.png', 'PNG', pdfcenter - 40, 30, 80, 80); // CENTER IMAGE
        doc.setTextColor(40);
        const split = doc.splitTextToSize(orgname, 300);
        doc.setFontSize(18);
        doc.text(split, doc.internal.pageSize.getWidth() / 2, 140, null, null, 'center');
        // END OF HEADER

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
    // COUNT AT END OF TABLE
    const totalrecords = pdfrows.length;
    const endoftable = doc.autoTable.previous.finalY + 15;
    doc.setFontSize(7);
    doc.text('Total records: ' + totalrecords, 490, endoftable);
    // END OF COUNT END OF TABLE
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
  event: makeSelectEvent(),
  organization: makeSelectCurrentOrganization(),
  attendees: makeSelectAttendees(),
  success: makeSelectSuccess(),
  user: makeSelectCurrentUser(),
  meta: makeSelectEventsMeta()
});

const mapDispatchToProps = {
  fetchEvent,
  fetchAttendees,
  attend
};

const withRedux = connect(mapStateToProps, mapDispatchToProps);

const withFetchInitialData = fetchInitialData((props) => {
  const {match: {params}} = props;
  props.fetchEvent(params.id);
  props.fetchAttendees(params.id);
});

const withLoadingWhileFetchingDataInsideLayout = showLoadingWhileFetchingDataInsideLayout((props) => {
  return props.meta.isLoading;
});

export default compose(
  withRedux,
  withFetchInitialData,
  withLoadingWhileFetchingDataInsideLayout
)(AttendeeListView);

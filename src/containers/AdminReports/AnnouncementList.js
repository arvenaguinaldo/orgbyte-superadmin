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

import {renderDateTimePicker} from 'components/ReduxMaterialUiForms/ReduxMaterialUiForms';
import Grid from '@material-ui/core/Grid';
import {Field, reduxForm} from 'redux-form';

import {createStructuredSelector} from 'reselect';
import {makeSelectAnnouncementsList, makeSelectAnnouncementsMeta} from 'redux/selectors/announcements';
import {makeSelectCurrentUser} from 'redux/selectors/auth';
import {fetchAnnouncements} from 'redux/actions/announcements';

import fetchInitialData from 'hoc/fetchInitialData';
import showLoadingWhileFetchingDataInsideLayout from 'hoc/showLoadingWhileFetchingDataInsideLayout';

import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import Print from '@material-ui/icons/LocalPrintshop';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

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
  },
  RangeLabel: {
    marginTop: 36,
    marginLeft: 36
  },
  ResetButton: {
    marginTop: '28px'
  }
});

let tableData = {};
let tableDataArray = [];
let tableColumnsArray = [];

const tableColumnsStatus = [];
let tableColumns = {};
let tabletitle;
let globalStartsDate;
let globalEndsDate;
const columns = [
  {
    name: 'Title',
    options: {
      filter: false
    }
  },
  {
    name: 'Announcements Starts',
    options: {
      filter: false
    }
  },
  {
    name: 'Announcements Ends',
    options: {
      filter: false
    }
  }
];


class AnnouncementsPage extends Component {

  static propTypes = {
    announcements: PropTypes.array.isRequired,
    user: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired
  };

  static defaultProps = {
    announcements: []
  };

  state = {
    startsDate: 'reset',
    endsDate: 'reset'
  }

  handleStartsDateChange = (date) => {
    this.setState({startsDate: date});
  };

  handleEndsDateChange = (date) => {
    this.setState({endsDate: date});
  };
  timePeriod = (startsDate) => {
    moment.locale('en');
    globalStartsDate = this.state.startsDate;
    globalEndsDate = this.state.endsDate;
    const starts = moment(startsDate).format('YYYY-MM-DD h:mm a');
    const startsRange = moment(this.state.startsDate).format('YYYY-MM-DD h:mm a');
    const endsRange = moment(this.state.endsDate).format('YYYY-MM-DD h:mm a');
    if (startsRange <= starts && starts <= endsRange) {
      return startsDate;
    } else if (this.state.startsDate === 'reset') {
      return startsDate;
    } else if (this.state.endsDate === 'reset') {
      return startsDate;
    }
  };
  Reset = () => {
    this.setState({startsDate: 'reset', endsDate: 'reset'});
  };
  render() {
    const {announcements, user, classes} = this.props;
    const {startsDate, endsDate} = this.state;
    tabletitle = startsDate && endsDate !== 'reset' ? 'Announcements List from ' + moment(startsDate._d).format('MMM DD YYYY') + ' to ' + moment(endsDate._d).format('MMM DD YYYY') : 'Announcements List';
    const options = {
      selectableRows: false,
      rowsPerPage: 5,
      rowsPerPageOptions: [5, 10, 15],
      filter: false,
      print: false,
      customToolbar: () => {
        return (
          <CustomToolbar announcements={announcements} user={user} startsDate={this.state.startsDate} endsDate={this.state.endsDate} />
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
        <form>
          <Grid container spacing={0}>
            <Grid item xs={12} sm={12} md={12}>
              <Grid container spacing={40}>
                <Grid item xs={10} sm={10} md={2} />
                <Grid item xs={10} sm={10} md={2}>
                  <Typography variant="subtitle1" className={classes.RangeLabel}>Date Range:</Typography>
                </Grid>
                <Grid item xs={10} sm={10} md={3} >
                  <Field
                    name="starts"
                    component={renderDateTimePicker}
                    label="Start date"
                    selected={this.state.startsDate}
                    onChange={this.handleStartsDateChange}
                    fullWidth
                    clearable
                  />
                </Grid>
                <Grid item xs={10} sm={10} md={3} >
                  <Field
                    name="ends"
                    component={renderDateTimePicker}
                    label="End date"
                    selected={this.state.endsDate}
                    onChange={this.handleEndsDateChange}
                    minDate={moment(this.state.startsDate).format('YYYY-MM-DD')}
                    fullWidth
                    clearable
                  />
                </Grid>
                <Grid item xs={10} sm={10} md={2} >
                  <Button variant="contained" color="primary" className={classes.ResetButton} onClick={this.Reset}>Reset</Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </form>
        <MUIDataTable
          title={tabletitle}
          options={options}
          data={this.props.announcements.filter(announcement => this.timePeriod(announcement.starts, announcement.ends)).map((announcement) => {
            return [
              announcement.title,
              moment(announcement.starts).format('MMMM DD YYYY, h:mm a'),
              moment(announcement.ends).format('MMMM DD YYYY, h:mm a')
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
    announcements: PropTypes.array.isRequired,
    user: PropTypes.object.isRequired
  };
  timePeriod = (startsDate) => {
    moment.locale('en');
    const starts = moment(startsDate).format('YYYY-MM-DD h:mm a');
    const startsRange = moment(globalStartsDate).format('YYYY-MM-DD h:mm a');
    const endsRange = moment(globalEndsDate).format('YYYY-MM-DD h:mm a');
    if (startsRange <= starts && starts <= endsRange) {
      return startsDate;
    } else if (globalStartsDate === 'reset') {
      return startsDate;
    } else if (globalEndsDate === 'reset') {
      return startsDate;
    }
  }
  printData = () => {
    const data = this.props.announcements.filter(announcement => this.timePeriod(announcement.starts)).map(announcement => ({
      0: announcement.title,
      1: moment(announcement.starts).format('MMMM DD YYYY, h:mm a'),
      2: moment(announcement.ends).format('MMMM DD YYYY, h:mm a')
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
    const orgname = this.props.announcements[0].organization_name;
    const username = this.props.user.first_name + ' ' + this.props.user.last_name;
    doc.autoTable(pdfcolumns, pdfrows, {
      margin: {top: 200, left: 35},
      bodyStyles: {valign: 'top'},
      styles: {overflow: 'linebreak', columnWidth: 'wrap', fontSize: 6},
      headerStyles: {fillColor: [94, 22, 25], textColor: 255, fontStyle: 'bold'},
      columnStyles: {0: {columnWidth: 'auto'}},
      alternateRowStyles: {
        fillColor: [220, 220, 220]
      },
      theme: 'grid',
      addPageContent() {
        // HEADER
        const pdfcenter = doc.internal.pageSize.getWidth() / 2;
        doc.addImage('https://i.postimg.cc/gJjpp5M7/bsu.png', 'PNG', pdfcenter - 40, 30, 80, 80); // CENTER IMAGE
        doc.setTextColor(40);
        const split = doc.splitTextToSize(orgname, 300);
        doc.setFontSize(18);
        doc.text(split, doc.internal.pageSize.getWidth() / 2, 140, null, null, 'center');
        // END OF HEADER

        doc.setFontSize(15);
        doc.text('Announcement List', 35, 190);

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
    const total = pdfrows.length;
    const endoftable = doc.autoTable.previous.finalY + 15;
    doc.setFontSize(7);
    doc.text('Total records: ' + total, 490, endoftable);
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
  announcements: makeSelectAnnouncementsList(),
  user: makeSelectCurrentUser(),
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
  reduxForm({
    form: 'AnnouncementsForm',
    destroyOnUnmount: false
  }),
  withStyles(styles)
)(AnnouncementsPage);

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {compose} from 'recompose';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';
import MUIDataTable from 'mui-datatables';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import {fetchCourses} from 'redux/actions/courses';

import {makeSelectCoursesList, makeSelectCoursesMeta} from 'redux/selectors/courses';

import fetchInitialData from 'hoc/fetchInitialData';
import showLoadingWhileFetchingDataInsideLayout from 'hoc/showLoadingWhileFetchingDataInsideLayout';

import LayoutWithTopbarAndSidebar from 'layouts/LayoutWithTopbarAndSidebar';
import CustomToolbarSelect from 'containers/CustomToolbarSelect/CustomToolbarSelect';
import AddCourse from './AddCourse';

import style from './Courses.scss';

class Course extends Component {

  static propTypes = {
    courses: PropTypes.array.isRequired
    // modalOpen: PropTypes.bool.isRequired,
  }

  static defaultProps = {
    courses: []
  };

  state = {
    columns: [
      {
        name: 'id',
        options: {
          display: false,
          filter: false
        }
      },
      {
        name: 'Course Name',
        options: {
          filter: true
        }
      },
      {
        name: 'Course Code',
        options: {
          filter: true
        }
      },
      {
        name: 'College Name',
        options: {
          filter: true
        }
      }
    ],
    dbTable: 'courses',
    open: false,
    id: 0
  };

  handleOpen = (e) => {
    e.preventDefault();
    this.setState({open: true});
  };

  handleClose = () => {
    this.setState({open: false});
  };

  render() {
    const {courses} = this.props;
    const {columns, dbTable} = this.state;

    const options = {
      filter: true,
      print: false,
      download: false,
      selectableRows: true,
      filterType: 'dropdown',
      responsive: 'stacked',
      rowsPerPage: 5,
      resizableColumns: false,
      customToolbarSelect: selectedRows =>
        (<CustomToolbarSelect
          dbTable={dbTable}
          selectedRows={selectedRows}
          data={courses}
          columns={columns}
        />)

    };

    return (
      <LayoutWithTopbarAndSidebar>
        <AddCourse open={this.state.open} handleClose={this.handleClose.bind(this)} />
        <Typography variant="h4">
          Courses
        </Typography>

        <Button onClick={e => this.handleOpen(e)} variant="contained" color="primary" className={style.button} >
          Add a course
        </Button>

        <MUIDataTable
          title={'Courses'}
          data={courses.map((course) => {
            return [
              course.id,
              course.course_name,
              course.course_code,
              course.college_name
            ];
          })}
          columns={columns}
          options={options}
        />
      </LayoutWithTopbarAndSidebar>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  courses: makeSelectCoursesList(),
  meta: makeSelectCoursesMeta()
});

const withRedux = connect(mapStateToProps, {fetchCourses});

const withFetchInitialData = fetchInitialData((props) => {
  props.fetchCourses();
});

const withLoadingWhileFetchingDataInsideLayout = showLoadingWhileFetchingDataInsideLayout((props) => {
  return props.meta.isLoading;
});


export default compose(
  withRedux,
  withFetchInitialData,
  withLoadingWhileFetchingDataInsideLayout
)(Course);

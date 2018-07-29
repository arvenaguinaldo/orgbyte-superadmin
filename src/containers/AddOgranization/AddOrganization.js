import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';


// layout
import LayoutWithTopbarAndSidebar from 'layouts/LayoutWithTopbarAndSidebar';

import style from './AddOrganization.scss';


const styles = theme => ({
  root: {
    width: '100%'
  },
  backButton: {
    marginRight: theme.spacing.unit
  },
  instructions: {
    marginTop: theme.spacing.unit,
    marginBottom: theme.spacing.unit
  },
  hide: {
    display: 'none'
  }
});

function getSteps() {
  return ['Organization Profile', 'President Profile', 'Create an ad'];
}

function getStepContent(stepIndex) {
  switch (stepIndex) {
    case 0:
      return 'Organization Profile';
    case 1:
      return 'President Profile';
    case 2:
      return 'This is the bit I really care about!';
    default:
      return 'Uknown stepIndex';
  }
}

class AddOrganization extends React.Component {
  static propTypes = {
    classes: PropTypes.object
  };

  state = {
    activeStep: 0
  };

  handleNext = () => {
    const {activeStep} = this.state;
    this.setState({
      activeStep: activeStep + 1
    });
  };

  handleBack = () => {
    const {activeStep} = this.state;
    this.setState({
      activeStep: activeStep - 1
    });
  };

  handleReset = () => {
    this.setState({
      activeStep: 0
    });
  };

  render() {
    const {classes} = this.props;
    const steps = getSteps();
    const {activeStep} = this.state;

    return (
      <LayoutWithTopbarAndSidebar>
        <div className={classes.root}>
          <Paper elevation={1} square={false} >
            <Stepper className={style.stepper} activeStep={activeStep} alternativeLabel>
              {steps.map((label) => {
                return (
                  <Step key={label}>
                    <StepLabel>{label}</StepLabel>
                  </Step>
                );
              })}
            </Stepper>
            <Paper className={style.form} elevation={0} square={false} >
              <h1>asd</h1>
            </Paper>
            <div className={style.bottomButton}>
              {this.state.activeStep === steps.length ? (
                <div>
                  <Typography className={classes.instructions}>
                All steps completed - you&quot;re finished
                  </Typography>
                  <Button onClick={this.handleReset}>Reset</Button>
                </div>
              ) : (
                <div>
                  <Typography className={classes.instructions}>{getStepContent(activeStep)}</Typography>
                  <div>
                    <Button
                      disabled={activeStep === 0}
                      onClick={this.handleBack}
                      className={classes.backButton}
                    >
                  Back
                    </Button>
                    <Button variant="contained" color="primary" onClick={this.handleNext}>
                      {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </Paper>
        </div>
      </LayoutWithTopbarAndSidebar>
    );
  }
}

export default withStyles(styles)(AddOrganization);

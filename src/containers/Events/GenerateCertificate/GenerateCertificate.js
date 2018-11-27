import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Rnd} from 'react-rnd';
import {compose} from 'recompose';
import {SketchPicker} from 'react-color';
import Center from 'react-center';
import JsPDF from 'jspdf';

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

// import {renderTextField, renderDateTimePicker} from 'components/ReduxMaterialUiForms/ReduxMaterialUiForms';


// actions
import {createStructuredSelector} from 'reselect';
import {makeSelectWhoAttend, makeSelectEventsMeta} from 'redux/selectors/events';
import {makeSelectEmailsMeta} from 'redux/selectors/emails';
import {fetchWhoAttend} from 'redux/actions/events';
import fetchInitialData from 'hoc/fetchInitialData';
import showLoadingWhileFetchingDataInsideLayout from 'hoc/showLoadingWhileFetchingDataInsideLayout';

// actions mailer

import {sendCertificate} from 'redux/actions/emails';

// import {validate} from 'utils/Validations/GenerateCertificate';
import LayoutWithTopbarAndSidebar from 'layouts/LayoutWithTopbarAndSidebar';

import styles from './GenerateCertificate.scss';

const style = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  border: 'dashed 2px #000'
};

class GenerateCertificate extends Component {
    static propTypes = {
      attendees: PropTypes.array,
      sendCertificate: PropTypes.func,
      metaEmail: PropTypes.object
    };

    state = {
      selectedImage: null,
      width: 400,
      height: 80,
      x: 0,
      y: 0,
      fontSize: 30,
      certificateWidth: 400,
      certificateHeight: 300,
      fontColor: '#000',
      fontFamily: 'arial',
      fontStyle: 'normal',
      orientation: 'p',
      pageWidth: 600,
      pageHeight: 728
    }


    onGenerateCertificate = (event) => {
      event.preventDefault();

      const {attendees} = this.props;

      const {selectedImage,
        fontSize,
        fontColor,
        fontFamily,
        fontStyle,
        certificateWidth,
        certificateHeight,
        x,
        y,
        orientation
      } = this.state;

      const imgData = selectedImage;
      console.log(imgData);

      const doc = new JsPDF(orientation, 'px', 'a4');

      attendees.map((attend) => {

        doc.addImage(imgData, 'JPEG', 10, 10, certificateWidth - 110, certificateHeight - 90, 'certificate');

        doc.setFontSize(fontSize);
        doc.setFont(fontFamily);
        doc.setFontType(fontStyle);
        doc.setTextColor(fontColor);
        doc.text(attend.last_name + ', ' + attend.first_name, x + 74, y + 14);
        doc.addPage('a4', orientation);
        return null;
      });

      window.open(doc.output('bloburl'), '_blank', 'top=10%');
    }

    onDownloadCertificate = (event) => {
      event.preventDefault();

      const {attendees} = this.props;

      const {selectedImage,
        fontSize,
        fontColor,
        fontFamily,
        fontStyle,
        certificateWidth,
        certificateHeight,
        x,
        y,
        orientation
      } = this.state;

      const imgData = selectedImage;
      console.log(imgData);

      const doc = new JsPDF(orientation, 'px', 'a4');

      attendees.map((attend) => {

        doc.addImage(imgData, 'JPEG', 10, 10, certificateWidth - 110, certificateHeight - 90, 'certificate');

        doc.setFontSize(fontSize);
        doc.setFont(fontFamily);
        doc.setFontType(fontStyle);
        doc.setTextColor(fontColor);
        doc.text(attend.last_name + ', ' + attend.first_name, x + 74, y + 14);
        doc.addPage('a4', orientation);
        return null;
      });

      doc.save('certificates.pdf');
    }

    onSendToAttendeesEmails = (event) => {
      event.preventDefault();

      const {attendees} = this.props;
      const {match: {params}} = this.props; // eslint-disable-line react/prop-types

      const {selectedImage,
        fontSize,
        fontColor,
        fontFamily,
        fontStyle,
        certificateWidth,
        certificateHeight,
        x,
        y,
        orientation
      } = this.state;

      const imgData = selectedImage;
      console.log(imgData);

      attendees.map((attend) => {
        const doc = new JsPDF(orientation, 'px', 'a4');

        doc.addImage(imgData, 'JPEG', 10, 10, certificateWidth - 110, certificateHeight - 90, 'certificate');

        doc.setFontSize(fontSize);
        doc.setFont(fontFamily);
        doc.setFontType(fontStyle);
        doc.setTextColor(fontColor);
        doc.text(attend.last_name + ', ' + attend.first_name, x + 74, y + 14);
        const certificatePdf = doc.output('datauristring'); // Display in iframe
        const base64 = certificatePdf.substring(28);
        this.props.sendCertificate({certificatePdf: base64, event_id: params.id, attendee: attend});

        return null;
      });
    }

    imageUploadHandler = (event) => {
      event.preventDefault();
      console.log(event.target.files[0]);
      this.setState({selectedImage: URL.createObjectURL(event.target.files[0])});
    }

    handleChange = name => ({target: {value}}) => {
      this.setState({[name]: value});
    };

    handleFontStyleChange = (selectedFont) => {
      this.setState({fontFamily: selectedFont});
    };

    handleOrientationChange = name => ({target: {value}}) => {
      const {pageHeight, pageWidth} = this.state;
      if (value === 'l') {
        this.setState({pageWidth: pageHeight, pageHeight: pageWidth});
      }
      if (value === 'p') {
        this.setState({pageHeight: pageWidth, pageWidth: pageHeight});
      }
      this.setState({[name]: value});
    };

    handleChangeComplete = (color) => {
      this.setState({fontColor: color.hex});
    };


    render() {

      const {selectedImage,
        fontSize,
        fontColor,
        fontFamily,
        fontStyle,
        certificateWidth,
        certificateHeight,
        x,
        y,
        orientation,
        pageWidth,
        pageHeight
      } = this.state;

      const {metaEmail} = this.props;


      if (selectedImage) {
        const imgData = selectedImage;
        console.log(imgData);

        const doc = new JsPDF(orientation, 'px', 'a4');

        doc.addImage(imgData, 'JPEG', 10, 10, certificateWidth - 110, certificateHeight - 90);
        // console.log(img.naturalWidth);

        doc.setFontSize(fontSize);
        doc.setFont(fontFamily);
        doc.setFontType(fontStyle);
        doc.setTextColor(fontColor);
        doc.text('Juan Dela Cruz', x + 74, y + 14);
        // window.open(doc.output('bloburl'), '_blank', 'top=10%');

        document.getElementById('pdfPreview').src = doc.output('datauristring'); // Display in iframe
      }

      return (
        <LayoutWithTopbarAndSidebar>
          <Typography variant="h4" gutterBottom>Generate Certificate</Typography>
          <Paper className={styles.Paper}>
            <Grid container spacing={0}>
              <Grid className={styles.grid} item xs={12} sm={12} md={12}>

                <Grid container spacing={40}>
                  <Grid item xs={12} sm={12} md={9}>
                    <input
                      accept="image/jpeg, image/png"
                      style={{display: 'none'}}
                      id="contained-button-file"
                      multiple
                      onChange={this.imageUploadHandler}
                      type="file"
                    />
                    <label htmlFor="contained-button-file">
                      <Button variant="contained" color="primary" component="span" fullWidth >
                        Upload a Template
                      </Button>
                    </label>
                    <Paper className={styles.imagePreview} elevation={1} square={false}>

                      <Center>
                        <div className={styles.page} style={{width: pageWidth + 'px', height: pageHeight + 'px'}}>
                          <div style={{posittion: 'relative'}}>
                            {selectedImage && <Rnd
                              style={style}
                              enableResizing={false}
                              size={{width: this.state.width, height: this.state.height}}
                              position={{x: this.state.x, y: this.state.y}}
                              onDragStop={(e, d) => {
                                this.setState({x: d.x, y: d.y});
                                console.log(d.x);
                                console.log(d.y);
                              }}
                            >
                              <h2 style={{fontSize: fontSize + 'px', color: fontColor, fontFamily, fontStyle}}>Juan Dela Cruz</h2>
                            </Rnd>
                            }
                          </div>
                          {selectedImage === null ? (
                            <Center> <Typography className={styles.a4} variant="h4" gutterBottom>Upload a template</Typography> </Center>
                          ) : (
                            <img
                              style={{width: certificateWidth + 'px', height: certificateHeight + 'px'}}
                              className={styles.selectedImage}
                              alt="Certificate"
                              src={selectedImage}
                              id="imageCertificate"
                            />
                          )}
                        </div>
                      </Center>

                    </Paper>
                  </Grid>
                  <Grid item xs={12} sm={12} md={3}>
                    <Paper className={styles.toolbar} elevation={1} square={false}>
                      <Grid container spacing={8}>
                        <ExpansionPanel style={{width: '100%'}}>
                          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography >Page Layout</Typography>
                          </ExpansionPanelSummary>
                          <ExpansionPanelDetails>
                            <Select
                              native
                              onChange={this.handleOrientationChange('orientation')}
                              fullWidth
                            >
                              <option value="p">Portrait</option>
                              <option value="l">Landscape</option>
                            </Select>
                          </ExpansionPanelDetails>
                        </ExpansionPanel>

                        <ExpansionPanel style={{width: '100%'}}>
                          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography >Certificate Size</Typography>
                          </ExpansionPanelSummary>
                          <ExpansionPanelDetails>
                            <Grid item xs={12} sm={12} md={6}>
                              <TextField
                                id="standard-name"
                                label="Image Width"
                                margin="normal"
                                value={certificateWidth}
                                type="number"
                                onChange={this.handleChange('certificateWidth')}
                              />
                            </Grid>

                            <Grid item xs={12} sm={12} md={6}>
                              <TextField
                                id="standard-name"
                                label="Image Height"
                                margin="normal"
                                value={certificateHeight}
                                type="number"
                                onChange={this.handleChange('certificateHeight')}
                              />
                            </Grid>
                          </ExpansionPanelDetails>
                        </ExpansionPanel>

                        <ExpansionPanel style={{width: '100%'}} defaultExpanded>
                          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography >Attendee Name</Typography>
                          </ExpansionPanelSummary>
                          <ExpansionPanelDetails>
                            <TextField
                              label="Font Size"
                              margin="normal"
                              value={fontSize}
                              onChange={this.handleChange('fontSize')}
                              type="number"
                              fullWidth
                            />
                          </ExpansionPanelDetails>
                          <ExpansionPanelDetails>
                            <Select
                              native
                              onChange={this.handleChange('fontFamily')}
                              fullWidth
                            >
                              <option value="arial">Arial</option>
                              <option value="courier">Courier</option>
                              <option value="times">Times</option>
                              <option value="helvetica">Helvetica</option>
                            </Select>
                          </ExpansionPanelDetails>
                          <ExpansionPanelDetails>
                            <Select
                              native
                              onChange={this.handleChange('fontStyle')}
                              fullWidth
                            >
                              <option value="normal">Normal</option>
                              <option value="italic">Italic</option>
                              <option value="bold">Bold</option>
                              <option value="bolditalic">Bold Italic</option>
                            </Select>
                          </ExpansionPanelDetails>
                          <Typography variant="body2" gutterBottom>Font Color</Typography>
                          <ExpansionPanelDetails>
                            <SketchPicker
                              color={fontColor}
                              onChangeComplete={this.handleChangeComplete}
                            />
                          </ExpansionPanelDetails>
                        </ExpansionPanel>
                      </Grid>
                    </Paper>

                    <Grid container spacing={8}>
                      <Grid item xs={10} sm={10} md={12}>
                        <Button
                          variant="contained"
                          color="primary"
                          component="span"
                          onClick={e => this.onGenerateCertificate(e)}
                          disabled={!selectedImage}
                          fullWidth
                        >
                          PREVIEW ALL
                        </Button>
                      </Grid>

                      <Grid item xs={10} sm={10} md={12}>
                        <Button
                          variant="contained"
                          color="primary"
                          component="span"
                          onClick={e => this.onSendToAttendeesEmails(e)}
                          disabled={metaEmail.isLoading || !selectedImage}
                          fullWidth
                        >
                          {metaEmail.isLoading ? 'Loading...' : 'SEND TO EMAIL'}
                        </Button>
                      </Grid>

                      <Grid item xs={10} sm={10} md={12}>
                        <Button
                          variant="contained"
                          color="primary"
                          component="span"
                          onClick={e => this.onDownloadCertificate(e)}
                          disabled={!selectedImage}
                          fullWidth
                        >
                          DOWNLOAD
                        </Button>
                      </Grid>

                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Paper>

          <Typography variant="h4" gutterBottom>Sample Preview</Typography>
          <Paper className={styles.pdfPreviewContainer}>
            <iframe id="pdfPreview" title="PDF PREVIEW" type="application/pdf" className={styles.pdfPreview}>
              <div />
            </iframe>
          </Paper>
        </LayoutWithTopbarAndSidebar>
      );
    }
}

const mapStateToProps = createStructuredSelector({
  attendees: makeSelectWhoAttend(),
  metaEmail: makeSelectEmailsMeta(),
  meta: makeSelectEventsMeta()
});

const mapDispatchToProps = {
  fetchWhoAttend,
  sendCertificate
};

const withRedux = connect(mapStateToProps, mapDispatchToProps);

const withFetchInitialData = fetchInitialData((props) => {
  const {match: {params}} = props;
  props.fetchWhoAttend(params.id);
});

const withLoadingWhileFetchingDataInsideLayout = showLoadingWhileFetchingDataInsideLayout((props) => {
  return props.meta.isLoading;
});

export default compose(
  withRedux,
  withFetchInitialData,
  withLoadingWhileFetchingDataInsideLayout
)(GenerateCertificate);


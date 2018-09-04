import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Dropzone from 'dropzone';
import classnames from 'classnames';
import CloudUpload from '@material-ui/icons/CloudUpload';
// import Icon from 'components/common/Icon/Icon';
// import ProgressBar from 'components/common/Spinner/Spinner';
// import qa from 'components/common/qa';

const noop = () => {};

const FileList = ({files, formatFileSize}) => {
  const styles = require('./FileList.scss');
  return (
    <div>
      {files.map(({size, status, upload: {filename}}) => {
        const fileClassName = classnames(
          styles.file,
          status === 'error' && styles.errorFile
        );
        return (
          <div key={filename} className={fileClassName}>
            <div className={styles.fileName}>{filename}</div>
            <div className={styles.fileSize}>
              &nbsp;(<span dangerouslySetInnerHTML={formatFileSize(size)} />)
            </div>
          </div>
        );
      })}
    </div>
  );
};

FileList.propTypes = {
  files: PropTypes.array.isRequired,
  formatFileSize: PropTypes.func.isRequired
};

export default class FileUpload extends Component {
  static propTypes = {
    acceptedFiles: PropTypes.string,
    headers: PropTypes.object,
    isErrorMessageVisible: PropTypes.bool,
    isFileListVisible: PropTypes.bool,
    messages: PropTypes.shape({
      dictFileTooBig: PropTypes.string,
      dictInvalidFileType: PropTypes.string,
      dictResponseError: PropTypes.string,
      dictCancelUpload: PropTypes.string,
      dictCancelUploadConfirmation: PropTypes.string,
      dictRemoveFile: PropTypes.string,
      dictRemoveFileConfirmation: PropTypes.string,
      dictMaxFilesExceeded: PropTypes.string
    }),
    label: PropTypes.string.isRequired,
    maxFiles: PropTypes.number,
    maxFilesize: PropTypes.number,
    paramName: PropTypes.string,
    onError: PropTypes.func,
    onFileAdd: PropTypes.func,
    onMaxFilesExceed: PropTypes.func,
    onMaxFilesReach: PropTypes.func,
    onUploadComplete: PropTypes.func,
    onUploadProgress: PropTypes.func,
    onUploadSuccess: PropTypes.func,
    onUploadTimeout: PropTypes.func,
    size: PropTypes.oneOf(['small', 'medium', 'large']),
    timeout: PropTypes.number,
    uploadUrl: PropTypes.string.isRequired
  };

  static defaultProps = {
    isErrorMessageVisible: true,
    isFileListVisible: true,
    maxFilesize: 256,
    onError: noop,
    onFileAdd: noop,
    onMaxFilesExceed: noop,
    onMaxFilesReach: noop,
    onUploadComplete: noop,
    onUploadProgress: noop,
    onUploadSuccess: noop,
    onUploadTimeout: noop,
    paramName: 'file',
    size: 'small',
    timeout: 30000,
    uploadUrl: noop
  }

  state = {
    errorMessage: '',
    files: [],
    isMaxFilesReached: false
  }

  componentDidMount() {
    const {
      acceptedFiles,
      headers,
      maxFiles,
      maxFilesize,
      messages,
      onMaxFilesExceed,
      onUploadSuccess,
      paramName,
      timeout,
      uploadUrl
    } = this.props;

    const options = {
      acceptedFiles,
      addedfile: this.handleOnFileAdd,
      canceled: this.handleOnUploadCanceled,
      complete: this.handleOnUploadComplete,
      error: this.handleOnError,
      headers,
      maxFiles,
      maxFilesize,
      maxfilesexceeded: onMaxFilesExceed,
      maxfilesreached: this.handleOnMaxFilesReach,
      paramName,
      renameFile: this.handleRenameFile,
      success: onUploadSuccess,
      sending: this.onSendingFile,
      timeout,
      uploadprogress: this.handleOnUploadProgress,
      url: uploadUrl,
      ...messages
    };

    Dropzone.autoDiscover = false;
    this.dropzone = new Dropzone(this.form, options);
  }

  componentWillUnmount() {
    this.dropzone.disable();
  }

  onSendingFile = (file) => {
    this.setTimeoutWatcher(file);
  };

  setTimeoutWatcher = (file) => {
    const {timeout} = this.props;

    if (this.uploadTimeoutId) {
      this.clearUploadTimeout();
    }

    this.uploadTimeoutId = setTimeout(() => this.dropzone.removeFile(file), timeout);
  };

  clearUploadTimeout = () => {
    if (this.uploadTimeoutId) {
      clearTimeout(this.uploadTimeoutId);
    }
  };

  handleOnUploadCanceled = () => {
    this.props.onUploadTimeout();
  };

  handleOnFileAdd = (file) => {
    const {
      maxFiles,
      onFileAdd
    } = this.props;

    if (!maxFiles || this.dropzone.files.length <= maxFiles) {
      this.setState({
        errorMessage: '',
        files: [...this.dropzone.files]
      });

      onFileAdd(file);
    }
  };

  /*
   * Reference: http://www.dropzonejs.com/#event-uploadprogress
  */
  handleOnUploadProgress = (file, progress, bytesSent) => {
    this.setState({
      files: [...this.dropzone.files]
    });

    const {onUploadProgress} = this.props;
    onUploadProgress(file, progress, bytesSent);
  };

  handleOnMaxFilesReach = () => {
    this.setState({
      isMaxFilesReached: true
    });

    this.props.onMaxFilesReach();
  };

  /*
   * Reference: http://www.dropzonejs.com/#event-error
  */
  handleOnError = (file, errorMessage, xhr) => {
    this.setState({
      errorMessage
    });

    this.clearUploadTimeout();

    const {onError} = this.props;
    onError(file, errorMessage, xhr);
  };

  handleOnUploadComplete = (file) => {
    this.clearUploadTimeout();
    this.props.onUploadComplete(file);
  };

  handleRenameFile = (file) => {
    const filename = file.name;
    const filteredFiles = this.state.files.filter(item => item.name === filename);

    if (filteredFiles.length !== 0) {
      const index = filename.lastIndexOf('.');
      const fileExtention = index !== -1 ? filename.substr(index) : '';
      return `${filename.substr(0, filename.length - fileExtention.length)}_${filteredFiles.length + 1}${fileExtention}`;
    }

    return file.name;
  };

  formatFileSize = (size) => {
    return {__html: this.dropzone.filesize(size)};
  };

  render() {
    const styles = require('./FileUpload.scss');
    const {
      errorMessage,
      files,
      isMaxFilesReached
    } = this.state;
    const {
      isErrorMessageVisible,
      isFileListVisible,
      size,
      label
    } = this.props;
    const rootProps = {
      className: styles[size]
    };
    const formProps = {
      className: classnames(
        styles.form,
        isMaxFilesReached && styles.maxFilesReached
      ),
      ref: (element) => { this.form = element; }
    };
    return (
      <div {...rootProps}>
        {isErrorMessageVisible && errorMessage && <div className={styles.errorMessage}>{errorMessage}</div>}
        <form {...formProps} encType="multipart/form-data">
          {!isMaxFilesReached &&
          <div className={classnames(styles.message, 'dz-message')}>
            <div className={styles.icon}><CloudUpload /></div>
            <div className={styles.label}>{label}</div>
            <input type="hidden" name="X-Amz-Credential" value="AKIAIRKM6VWMEJMXD4TA/20191229/ap-southeast-1/s3/aws4_request" />
            {/* <input type="hidden" name="key" value="38212380_1858531684185480_5302473689139249152_n.jpg" />

              <input type="hidden" name="acl" value="public-read" />
              <input type="hidden" name="Content-Type" value="image/jpeg" />
              <input type="hidden" name="x-amz-meta-uuid" value="14365123651274" />
              <input type="hidden" name="x-amz-server-side-encryption" value="AES256" />
              <input type="hidden" name="X-Amz-Algorithm" value="AWS4-HMAC-SHA256" />
              <input type="hidden" name="X-Amz-Date" value="20191229T000000Z" />

              <input type="hidden" name="x-amz-meta-tag" value="" />
              <input type="hidden" name="X-Amz-Signature" value="fa73e8127e6ac5337e173f59c8f275007cdcb9ed1ea3a1d6d4cfd6c46760d996" />
              <input
                type="hidden"
                name="Policy"
                value="eyAiZXhwaXJhdGlvbiI6ICIyMDE5LTEyLTMwVDEyOjAwOjAwLjAwMFoiLA0KICAiY29uZGl0aW9ucyI6IFsNCiAgICB7ImJ1Y2tldCI6ICJvcmdieXRlIn0sDQogICAgWyJzdGFydHMtd2l0aCIsICIka2V5IiwgIiJdLA0KICAgIHsiYWNsIjogInB1YmxpYy1yZWFkIn0sDQogICAgWyJzdGFydHMtd2l0aCIsICIkQ29udGVudC1UeXBlIiwgImltYWdlLyJdLA0KICAgIHsieC1hbXotbWV0YS11dWlkIjogIjE0MzY1MTIzNjUxMjc0In0sDQogICAgeyJ4LWFtei1zZXJ2ZXItc2lkZS1lbmNyeXB0aW9uIjogIkFFUzI1NiJ9LA0KICAgIFsic3RhcnRzLXdpdGgiLCAiJHgtYW16LW1ldGEtdGFnIiwgIiJdLA0KDQogICAgeyJ4LWFtei1jcmVkZW50aWFsIjogIkFLSUFJUktNNlZXTUVKTVhENFRBLzIwMTkxMjI5L2FwLXNvdXRoZWFzdC0xL3MzL2F3czRfcmVxdWVzdCJ9LA0KICAgIHsieC1hbXotYWxnb3JpdGhtIjogIkFXUzQtSE1BQy1TSEEyNTYifSwNCiAgICB7IngtYW16LWRhdGUiOiAiMjAxOTEyMjlUMDAwMDAwWiIgfQ0KICBdDQp9"
              /> */}
          </div>
          }
        </form>
        {isFileListVisible && <FileList files={files} formatFileSize={this.formatFileSize} />}
      </div>
    );
  }
}

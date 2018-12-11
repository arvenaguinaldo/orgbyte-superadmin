import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Dropzone from 'dropzone';
import classnames from 'classnames';
import config from 'config';
import CloudUpload from '@material-ui/icons/CloudUpload';
import LinearProgress from '@material-ui/core/LinearProgress';
// import Icon from 'components/common/Icon/Icon';
// import ProgressBar from 'components/common/Spinner/Spinner';
// import qa from 'components/common/qa';

const noop = () => {};

const FileList = ({files, formatFileSize}) => {
  const styles = require('./FileList.scss');
  return (
    <div>
      {files.map(({size, status, upload: {filename, progress}}) => {
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
            <div className={styles.progressBar}>
              <LinearProgress color="secondary" variant="determinate" value={progress} />
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
    autoProcessQueue: PropTypes.bool,
    headers: PropTypes.object,
    isErrorMessageVisible: PropTypes.bool,
    isFileListVisible: PropTypes.bool,
    uploadMultiple: PropTypes.bool,
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
    thumbnailWidth: PropTypes.number,
    thumbnailHeight: PropTypes.number,
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
    uploadMultiple: false,
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
    timeout: 4800,
    uploadUrl: noop
  }

  state = {
    errorMessage: '',
    files: [],
    isMaxFilesReached: false
  }

  componentDidMount() {
    const previewNode = document.querySelector('#tpl');

    previewNode.id = '';

    const previewTemplate = previewNode.parentNode.innerHTML;
    previewNode.parentNode.removeChild(previewNode);

    const {
      acceptedFiles,
      autoProcessQueue,
      headers,
      thumbnailWidth,
      thumbnailHeight,
      maxFiles,
      maxFilesize,
      messages,
      onMaxFilesExceed,
      uploadMultiple,
      onUploadSuccess,
      paramName,
      timeout,
      uploadUrl
    } = this.props;

    const options = {
      acceptedFiles,
      autoProcessQueue,
      previewTemplate,
      previewsContainer: '#previews',
      canceled: this.handleOnUploadCanceled,
      complete: this.handleOnUploadComplete,
      error: this.handleOnError,
      headers,
      thumbnailWidth,
      thumbnailHeight,
      maxFiles,
      maxFilesize,
      maxfilesexceeded: onMaxFilesExceed,
      maxfilesreached: this.handleOnMaxFilesReach,
      uploadMultiple,
      paramName,
      renameFile: this.handleRenameFile,
      success: onUploadSuccess,
      sending: this.onSendingFile,
      timeout,
      uploadprogress: this.handleOnUploadProgress,
      url: config.apiUrl + uploadUrl,
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

  // handleAddedfile = (file) => {
  //   file.previewElement = Dropzone.createElement(this.dropzone.previewTemplate); // eslint-disable-line
  //   console.log(file.previewElement);
  //   // Now attach this new element some where in your page
  // }

  // handleThumbnail = (file, dataUrl) => {
  //   if (file.previewElement) {
  //     console.log(file.previewElement);
  //     file.previewElement.classList.remove('#tpl');
  //     const images = file.previewElement.querySelector('.data-dz-thumbnail');
  //     // for (let i = 0; i < images.length; i += 1) {
  //     const thumbnailElement = images;
  //     thumbnailElement.alt = file.name;
  //     thumbnailElement.src = dataUrl;
  //     // }
  //     file.previewElement.classList.add('dz-image-preview');
  //   }
  // }

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

  processQueue = (id) => {
    this.dropzone.on('sending', (file, xhr, formData) => {
      formData.append('id', id);
    });
    this.dropzone.processQueue();
  }

  formatFileSize = (size) => {
    return {__html: this.dropzone.filesize(size)};
  };

  render() {
    const styles = require('./FileUpload.scss');
    const {
      errorMessage,
      // files,
      isMaxFilesReached
    } = this.state;
    const {
      isErrorMessageVisible,
      // isFileListVisible,
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
      <div {...rootProps} >
        {isErrorMessageVisible && errorMessage && <div className={styles.errorMessage}>{errorMessage}</div>}
        <form {...formProps} encType="multipart/form-data">
          {!isMaxFilesReached &&
          <div className={classnames(styles.message, 'dz-message', 'dropzone-previews')} id="previews">
            <div id="tpl">
              <div className="dz-details">
                <div className="dz-image"><img data-dz-thumbnail="" /></div> {/*eslint-disable-line*/}
                <div className="dz-filename" style={{fontSize: 15, color: '#ccc'}}><span data-dz-name="" /></div>
                <div className="dz-size" style={{fontSize: 15, color: '#ccc'}} data-dz-size="" />
              </div>
            </div>
            <div>
              <div className={styles.icon}><CloudUpload /></div>
              <div className={styles.label}>{label}</div>
            </div>
          </div>
          }
        </form>
      </div>
    );
  }
}

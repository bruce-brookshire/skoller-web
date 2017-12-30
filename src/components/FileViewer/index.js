import React from 'react'
import PropTypes from 'prop-types'

class FileViewer extends React.Component {

  static propTypes = {
    source: PropTypes.string
  }

  constructor(props) {
    super(props)

    this.state = {
      rotate: 0
    }
  }


  /*
  * Set the url of the file.
  *
  * @param [String] file. Original url of the file to be displayed.
  * @return [String] url. Final url of the file to be displayed.
  */
  setUrl (file) {
    let url = encodeURI(file)

    // if it is a word doc, use gview.
    if (!this.isImage(url)) {
      url = `https://docs.google.com/gview?url=${url}&embedded=true`
    }

    return url
  }


  /*
  * Determine if the file type is a word doc.
  *
  * @param [String] url. Original url of the file to be displayed.
  * @return [Boolean]. Boolean value indicating whther the document is a word doc.
  */
  isWordDoc (url) {
    const wordDoc = /.*\.(doc|DOC|docx|DOCX|docm|DOCM)/g

    return wordDoc.test(url)
  }


  /*
  * Determine if the file type is an image.
  *
  * @param [String] url. Original url of the file to be displayed.
  * @return [Boolean]. Boolean value indicating whther the document is an img.
  */
  isImage (url) {
    const img = /.*\.(png|PNG|jpg|JPG|jpeg|JPEG)/g

    return img.test(url)
  }


  /**
   * Rotate the image/doc in the file viewer
   *
   * @param {SyntheticEvent} event
   */
  handleRotateFile(event) {
    event.preventDefault()

    let { rotate } = this.state

    this.setState({ rotate: rotate >= 270 ? 0 : rotate + 90 })
  }


  /**
   * Render...
   *
   * @return {JSX}
   */
  render () {
    const fileProps = {
      src: this.setUrl(this.props.source),
      style: {
        transform: `rotate(${this.state.rotate}deg)`
      }
    }

    return (
      <div className="file-viewer">
        {this.isImage(this.props.source) ? <img {...fileProps} /> : <iframe {...fileProps} /> }

        <button onClick={this.handleRotateFile.bind(this)} className="action">
          <i className="fa fa-refresh" />
        </button>
      </div>
    )
  }
}

export default FileViewer

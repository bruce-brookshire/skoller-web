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
    if (this.isWordDoc(url)) {
      url = `https://docs.google.com/gview?url=${url}&embedded=true`
    }

    return url
  }


  /*
  * Determine if the file type is a PDF.
  *
  * @param [String] url. Original url of the file to be displayed.
  * @return [Boolean]. Boolean value indicating whther the document is a PDF
  */
  isPDF(url) {
    const pdf = /.*\.(pdf)/ig

    return pdf.test(url)
  }


  /*
  * Determine if the file type is a word doc.
  *
  * @param [String] url. Original url of the file to be displayed.
  * @return [Boolean]. Boolean value indicating whther the document is a word doc.
  */
  isWordDoc (url) {
    const wordDoc = /.*\.(doc|docx|docm)/ig

    return wordDoc.test(url)
  }


  /*
  * Determine if the file type is an image.
  *
  * @param [String] url. Original url of the file to be displayed.
  * @return [Boolean]. Boolean value indicating whther the document is an img.
  */
  isImage (url) {
    const img = /.*\.(png|jpg|jpeg)/ig

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
    const { source } = this.props

    const fileProps = {
      src: this.setUrl(source),
      style: {
        transform: `rotate(${this.state.rotate}deg)`
      }
    }

    const classArr = [
      'file-viewer',
      this.isPDF(source) ? 'is-pdf' : null,
      this.isImage(source) ? 'is-image' : null,
      this.isWordDoc(source) ? 'is-doc' : null
    ].filter(c => c)

    return (
      <div className={classArr.join(' ')}>
        {this.isImage(this.props.source) ? <img {...fileProps} /> : <iframe {...fileProps} /> }

        {this.isImage(this.props.source)
          ? <button onClick={this.handleRotateFile.bind(this)} className="action">
              <i className="fa fa-refresh" />
            </button>
          : null
        }
      </div>
    )
  }
}

export default FileViewer

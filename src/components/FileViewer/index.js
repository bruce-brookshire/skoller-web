import React from 'react'
import PropTypes from 'prop-types'

class FileViewer extends React.Component {
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
  * Determine if the file type is a word doc.
  *
  * @param [String] url. Original url of the file to be displayed.
  * @return [Boolean]. Boolean value indicating whther the document is a word doc.
  */
  isWordDoc (url) {
    const wordDoc = /.*\.(doc|DOC|docx|DOCX|docm|DOCM)/g
    return wordDoc.test(url)
  }

  render () {
    const source = this.setUrl(this.props.source)
    return (
      <div className='file-viewer'>
        <iframe src={source}/>
      </div>
    )
  }
}

FileViewer.propTypes = {
  source: PropTypes.string
}

export default FileViewer

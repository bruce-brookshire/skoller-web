import React from 'react'
import PropTypes from 'prop-types'

class Sammi extends React.Component {
  getSammi = () => {
    const sammis = {
      'wow': '/src/assets/images/sammi/Wow@3x.png',
      'ooo': '/src/assets/images/sammi/OoOoo@3x.png',
      'sad': 'src/assets/images/sammi/Sad@3x.png',
      'happy': '/src/assets/images/sammi/Smile@3x.png',
      'happy2': '/src/assets/images/sammi/Smile 2@3x.png',
      'smirk': '/src/assets/images/sammi/Smirk@3x.png',
      'deal with it': '/src/assets/images/sammi/Deal with it@3x.png'
    }

    let sammi
    Object.keys(sammis).forEach(sammisKey => {
      if (sammisKey === this.props.emotion) {
        sammi = sammis[sammisKey]
      }
    })
    return sammi
  }

  render () {
    return (
      <div
        className={'sammi-container ' + (this.props.align !== undefined ? 'align-' + this.props.align : '')}
      >
        {this.props.position === 'left' &&
          <img src={this.getSammi()} />
        }
        <div className={`sammi-${this.props.position}` + (this.props.children ? ' sammi-children' : '')}>
          {this.props.message !== undefined
            ? <p>{this.props.message}</p>
            : null
          }
          {this.props.children}
        </div>
        {this.props.position === 'right' &&
          <img src={this.getSammi()} />
        }
      </div>
    )
  }
}

Sammi.propTypes = {
  position: PropTypes.string,
  message: PropTypes.string,
  emotion: PropTypes.string,
  align: PropTypes.string,
  children: PropTypes.object
}

export default Sammi

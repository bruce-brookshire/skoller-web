import React from 'react'
import PropTypes from 'prop-types'
import OutsideClickHandler from 'react-outside-click-handler'
// import actions from '../../../../actions'

function ColorChanger (props) {
  const [showPalette, setShowPalette] = React.useState()

  const updateColor = (color) => {
    props.updateClassColor(props.cl, color)
    // actions.studentClasses.updateClassColor(this.state.cl, color)
    //   .then(data => {
    //     this.setState({cl: data, showPalette: false})
    //     this.props.rootStore.studentClassesStore.updateClasses()
    //   })
  }

  const renderPalette = () => {
    let colors = [
      'D73F76ff',
      'E2762Dff',
      'F1AA39ff',
      '19A394ff',
      '61D8A0ff',
      '3484E3ff',
      'FF7BB1ff',
      'DE89F6ff'
    ]
    if (showPalette) {
      return (
        <OutsideClickHandler
          onOutsideClick={() => setShowPalette(false)}
        >
          <div className='sk-class-palette' style={{
            top: 24,
            left: -96
          }}>
            {colors.map(color => {
              return (
                <div
                  className='sk-class-palette-color'
                  style={{backgroundColor: '#' + color}}
                  key={colors.indexOf(color)}
                  onClick={() => updateColor(color)}
                />
              )
            })}
          </div>
        </OutsideClickHandler>
      )
    } else {
      return null
    }
  }

  return (
    <div style={{position: 'relative'}}>
      <i
        className='fas fa-palette'
        title='Class color'
        onClick={() => setShowPalette(true)}
      />
      {renderPalette()}
    </div>
  )
}

ColorChanger.propTypes = {
  cl: PropTypes.object,
  updateClassColor: PropTypes.func
}

export default ColorChanger

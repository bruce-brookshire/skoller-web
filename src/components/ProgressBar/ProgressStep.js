import React from 'react'
import PropTypes from 'prop-types'

class ProgressStep extends React.Component {
    render () {
        const {active, label} = this.props
        const classes = []
        if (active) classes.push('active')
        return (
            <div>
                <span>{label}</span>
                <div className={classes.join(' ')}></div>
            </div>
        )
    }
}

ProgressStep.propTypes = {
    active: PropTypes.bool,
    label: PropTypes.string,

    
}

export default ProgressStep
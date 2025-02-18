import React from 'react'
import PropTypes from 'prop-types'

class SkollerJobsSwitch extends React.Component {
  getColor(givenFillColor) {
    let fillColor = '#4a4a4a'

    const skColors = {
      '$cn-font-color': '#4a4a4a',
      '$cn-color-darkgrey': '#4a4a4a',
      '$cn-color-blue': '#57B9E4',
      '$cn-color-yellow': '#FDBA22',
      '$cn-color-pink': '#EA8A8A',
      '$cn-color-white': '#fff',
      '$cn-color-grey': '#a9a9a9',
      '$cn-color-orange': '#ff6d00',
      '$cn-color-red': '#ff4159',
      '$cn-color-green': '#7ed321',
      '$cn-primary-background-color': '#EDFAFF',
      '$cn-blue-cell-background': '#edf5ff',
      '$cn-link-background': 'rgba(85,185,229,0.2)',
      '$cn-form-border': '#CCC',
      '$cn-color-hover-grey': '#e9e9e9'
    }

    if (givenFillColor) {
      Object.keys(skColors).forEach(function(item) {
        if (givenFillColor === item) {
          fillColor = skColors[item]
        }
      })
      fillColor = '#' + givenFillColor
    } else {
      fillColor = '#FFFFFF'
    }

    return fillColor
  }

  render() {
    const fillColor = this.getColor(this.props.fill)
    return (
      <svg
        width={this.props.width}
        height={this.props.height}
        viewBox="0 0 124 20"
        version="1.1"
      >
        <title>Swith to SkollerJobs</title>
        <g
          id="Home"
          stroke="none"
          strokeWidth="1"
          fill="none"
          fillRule="evenodd"
        >
          <g
            id="Home---Main"
            transform="translate(-639.000000, -103.000000)"
            fill={fillColor}
          >
            <g id="Group-8" transform="translate(384.000000, 80.000000)">
              <g id="Group-3" transform="translate(14.000000, 13.000000)">
                <g id="Group-23" transform="translate(235.000000, 0.000000)">
                  <g id="Group-9" transform="translate(6.000000, 10.000000)">
                    <g id="Group-22" transform="translate(0.000000, 0.725000)">
                      <path
                        d="M0,15.6 L0,13.4354792 L0.136095874,13.4354792 C2.19720041,13.4354792 4.25830495,13.4350729 6.31940948,13.4371044 C6.39671529,13.437206 6.45111179,13.414859 6.50749586,13.3647816 C8.29180587,11.7809941 10.0836477,10.2053327 11.8605305,8.61382537 C12.7959412,7.77612042 13.7057227,6.91149758 14.6266974,6.05865766 C15.6291623,5.13034608 16.6316271,4.20213608 17.632209,3.27189454 C17.6940327,3.21450358 17.7562749,3.19286769 17.8406941,3.19296927 C19.9657145,3.19489923 22.0906303,3.1945945 24.2155462,3.1945945 L24.3746559,3.1945945 L24.3746559,0 C26.9276304,1.43121897 29.4553942,2.84821716 32,4.27466201 C29.4553942,5.70110686 26.9271074,7.11851136 24.3789449,8.54698775 L24.3789449,5.36021468 L24.244732,5.36021468 C22.405084,5.36021468 20.565436,5.36072256 18.725788,5.35858945 C18.6442978,5.35848787 18.5872861,5.38164741 18.5286007,5.43609265 C16.8647998,6.97996043 15.2077986,8.53063386 13.5311309,10.0611951 C12.3798079,11.1120084 11.2009729,12.1345834 10.0341678,13.1695508 C9.14457571,13.9587019 8.25508823,14.7478531 7.36267171,15.5342617 C7.32103746,15.570931 7.25220495,15.5972394 7.1960301,15.597341 C4.83459409,15.6003883 2.47305346,15.599982 0.111617446,15.599982 L0,15.6 Z"
                        id="Fill-4"
                      ></path>
                      <path
                        d="M32,14.3059602 C29.5583371,15.7167268 27.1359434,17.116343 24.6976928,18.525 L24.6976928,15.3784 L24.5535756,15.3784 C22.5945449,15.3784 20.6355141,15.3778977 18.676383,15.3801077 C18.5905751,15.3802081 18.53066,15.3544921 18.4677342,15.2968319 C17.4190707,14.3354935 16.3678981,13.3768674 15.3175285,12.4173372 C14.8815638,12.0189393 14.4464021,11.6198382 14,11.2110937 C14.522174,10.7244977 15.0416383,10.2401118 15.5674253,9.75 C15.8176232,9.97812951 16.0646097,10.2025422 16.3110943,10.4277586 C17.2869967,11.3192819 18.2647056,12.2088966 19.2359914,13.1054425 C19.3461869,13.2072017 19.4532712,13.241155 19.5986931,13.2407531 C21.2516253,13.2362327 22.9045575,13.23784 24.55759,13.23784 L24.6969903,13.23784 L24.6969903,10.0866191 C27.1386532,11.4972852 29.5608461,12.8968009 32,14.3059602"
                        id="Fill-7"
                      ></path>
                      <path
                        d="M12,7.23432365 C11.4520438,7.75100028 10.9117257,8.26055546 10.3662807,8.775 C10.1439383,8.56103784 9.93132673,8.35749212 9.71986607,8.15267092 C8.72837612,7.19202015 7.73678153,6.23147567 6.74717494,5.26880539 C6.68858119,5.21172755 6.63176618,5.18717452 6.55015346,5.18717452 C4.41765485,5.18919403 2.28515625,5.18855629 0.152657645,5.18834371 L0,5.18834371 L0,2.9263821 L0.116036551,2.9263821 C2.56023298,2.92648839 5.00432478,2.92691356 7.44841657,2.92500033 C7.52647182,2.92489404 7.58046177,2.9502974 7.63560268,3.00376137 C8.97907366,4.30772946 10.3242188,5.60999691 11.6689453,6.91268952 C11.7743094,7.01472811 11.8793597,7.11708556 12,7.23432365"
                        id="Fill-10"
                      ></path>
                    </g>
                    <text
                      id="skollerJobs"
                      fontFamily="Calibre-Black, Calibre"
                      fontSize="20"
                      fontWeight="700"
                    >
                      <tspan x="35.14" y="16.8878049">
                        s
                      </tspan>
                      <tspan x="44.32" y="16.8878049" letterSpacing="-1.1">
                        k
                      </tspan>
                      <tspan x="54.18" y="16.8878049">
                        o
                      </tspan>
                      <tspan x="64.26" y="16.8878049" letterSpacing="-0.3">
                        l
                      </tspan>
                      <tspan x="69" y="16.8878049">
                        le
                      </tspan>
                      <tspan x="83.78" y="16.8878049" letterSpacing="-0.9">
                        r
                      </tspan>
                      <tspan
                        x="90.48"
                        y="16.8878049"
                        fontFamily="Calibre-Light-Italic, Calibre"
                        fontStyle="italic"
                        fontWeight="300"
                        letterSpacing="-1.1"
                      >
                        Jobs
                      </tspan>
                    </text>
                  </g>
                </g>
              </g>
            </g>
          </g>
        </g>
      </svg>
    )
  }
}

SkollerJobsSwitch.defaultProps = {
  width: '124',
  height: '20'
}

SkollerJobsSwitch.propTypes = {
  fill: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string
}

export default SkollerJobsSwitch

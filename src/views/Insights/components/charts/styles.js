export function getStyles (c) {
  if (c) {
    c = c.toLowerCase().replace(/.$/, '').replace(/.$/, '')
  }

  const GRAY_COLOR = '#4a4a4a'
  const GRAY_COLOR_75 = GRAY_COLOR + '75'
  const GRAY_COLOR_50 = GRAY_COLOR + '50'
  const GRAY_COLOR_25 = GRAY_COLOR + '25'
  const COLOR = c || '#57B9E4'
  const COLOR_75 = COLOR + '75'
  const COLOR_50 = COLOR + '50'
  const COLOR_25 = COLOR + '25'

  const labelFontSize = '18px'

  return {
    parent: {
      fontFamily: '"Calibre", sans-serif',
      padding: {
        left: 70, right: 25, top: 50, bottom: 50
      },

      parent: {
        maxWidth: '100%'
      }
    },
    title: {
      textAnchor: 'middle',
      verticalAnchor: 'end',
      fill: GRAY_COLOR,
      fontFamily: 'inherit',
      fontSize: '18px',
      fontWeight: '400'
    },
    subtitle: {
      textAnchor: 'start',
      verticalAnchor: 'end',
      fill: GRAY_COLOR,
      fontFamily: 'inherit',
      fontSize: '14px'
    },

    // INDEPENDENT AXIS
    axisDates: {
      axis: {stroke: COLOR, strokeWidth: 2},
      grid: {
        stroke: COLOR_25,
        strokeWidth: (tick) => {
          if (tick.tick === 0) {
            return 0
          } else {
            return 2
          }
        }
      },
      ticks: { strokeWidth: 0 },
      tickLabels: {
        fill: GRAY_COLOR,
        fontFamily: 'inherit',
        fontSize: labelFontSize,
        angle: -30
      }
    },

    // DATA SET ONE
    axisOne: {
      grid: {
        stroke: COLOR_25,
        strokeWidth: (tick) => {
          if (tick.tick === 0) {
            return 0
          } else {
            return 2
          }
        }
      },
      axis: { stroke: COLOR, strokeWidth: 2 },
      ticks: { strokeWidth: 0 },
      tickLabels: {
        fill: GRAY_COLOR,
        fontFamily: 'inherit',
        fontSize: labelFontSize,
        angle: -30
      },
      axisLabel: {
        fontFamily: 'inherit',
        fill: GRAY_COLOR,
        fontSize: 20,
        padding: 50
      }
    },

    // label
    label: {
      fill: GRAY_COLOR,
      fontFamily: 'inherit',
      fontSize: labelFontSize,
      padding: 60
    },

    // LINE DEFAULT
    lineOne: {
      data: { stroke: COLOR, strokeWidth: 2 }
    },

    // AREA DEFAULT
    area: {
      data: { fill: COLOR_50, stroke: COLOR, strokeWidth: 2 }
    },

    // STACK DEFAULT
    stack: {
      colorScale: [COLOR_50, COLOR_75, COLOR]
    },

    // PIE DEFAULT
    pie: {
      colorScale: [COLOR, COLOR_75, COLOR_50, GRAY_COLOR_25],
      labelTitleOne: {
        fill: COLOR,
        fontSize: 20,
        fontFamily: 'inherit',
        fontWeight: 600
      },
      labelTitleTwo: {
        fill: COLOR_75,
        fontSize: 20,
        fontFamily: 'inherit',
        fontWeight: 600
      },
      labelTitleThree: {
        fill: COLOR_50,
        fontSize: 20,
        fontFamily: 'inherit',
        fontWeight: 600
      },
      labelTitleFour: {
        fill: GRAY_COLOR_25,
        fontSize: 20,
        fontFamily: 'inherit',
        fontWeight: 600
      },
      labelTitleOneSubtitle: {
        fill: GRAY_COLOR,
        fontSize: 14,
        fontFamily: 'inherit',
        fontWeight: 300
      },
      labelTitleTwoSubtitle: {
        fill: GRAY_COLOR,
        fontSize: 14,
        fontFamily: 'inherit',
        fontWeight: 300
      },
      labelTitleThreeSubtitle: {
        fill: GRAY_COLOR,
        fontSize: 14,
        fontFamily: 'inherit',
        fontWeight: 300
      },
      labelTitleFourSubtitle: {
        fill: GRAY_COLOR,
        fontSize: 14,
        fontFamily: 'inherit',
        fontWeight: 300
      }
    },

    // SCATTER
    scatter: {
      data: { stroke: COLOR, strokeWidth: 2, fill: '#ffffff' }
    },

    // BAR
    bar: {
      data: { fill: COLOR }
    },

    // VERTICAL TODAY LINE
    todayLine: {
      front: {
        data: { stroke: GRAY_COLOR_75, strokeWidth: 2 }
      },
      back: {
        data: { stroke: GRAY_COLOR_25, strokeWidth: 6 }
      },
      dot: {
        data: { stroke: GRAY_COLOR_50, strokeWidth: 5, fill: GRAY_COLOR },
        labels: {
          fontFamily: '"Calibre", sans-serif',
          fontWeight: 600
        }
      }
    },

    // FLYOUT
    flyout: {
      strokeWidth: '1px',
      stroke: GRAY_COLOR_75,
      // fontFamily: '"Calibre", sans-serif',
      fill: 'white',
      // padding: 0,
      labels: {
        fontFamily: '"Calibre", sans-serif',
        fontWeight: 900
      }
    },

    // tooltip
    tooltip: {
      fontFamily: '"Calibre", sans-serif',
      labels: {
        fontFamily: 'inherit',
        fontWeight: 400
      }
    },

    // ANIMATION
    animate: {
      duration: 800,
      onLoad: {
        duration: 0
      }
    }
  }
}

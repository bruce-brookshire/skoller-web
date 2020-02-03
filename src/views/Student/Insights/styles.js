export function getStyles (c) {
  const GRAY_COLOR = '#4a4a4a'
  const GRAY_COLOR_75 = GRAY_COLOR + '75'
  const GRAY_COLOR_50 = GRAY_COLOR + '50'
  const GRAY_COLOR_25 = GRAY_COLOR + '25'
  const COLOR = c || '#57B9E4'
  const COLOR_75 = COLOR + '75'
  const COLOR_50 = COLOR + '50'
  const COLOR_25 = COLOR + '25'

  return {
    parent: {
      boxSizing: 'border-box',
      display: 'inline',
      padding: 0,
      fontFamily: '"Calibre", sans-serif',
      maxWidth: '100%',
      height: 'auto',
      border: '1px solid ' + GRAY_COLOR_50,
      borderRadius: '5px',
      margin: '1rem'
    },
    title: {
      textAnchor: 'start',
      verticalAnchor: 'end',
      fill: GRAY_COLOR,
      fontFamily: 'inherit',
      fontSize: '24px',
      fontWeight: 'bold'
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
        fontSize: '14px',
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
        fontSize: '14px'
      },
      axisLabel: {
        fontFamily: 'inherit',
        fontSize: '14px',
        fill: GRAY_COLOR
      }
    },
    label: {
      fill: GRAY_COLOR,
      fontFamily: 'inherit',
      fontSize: '14px'
    },

    // AXIS LABEL
    axisLabel: {
      fill: GRAY_COLOR,
      fontFamily: 'inherit',
      fontSize: '14px'
    },

    // LINE DEFAULT
    lineOne: {
      data: { stroke: COLOR, strokeWidth: 2 }
    },

    // AREA DEFAULT
    area: {
      data: { fill: COLOR_50, stroke: COLOR, strokeWidth: 2 }
    },

    // AREA DEFAULT
    pie: {
      colorScale: [COLOR, COLOR_75, COLOR_50, COLOR_25],
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
      }
    },

    // SCATTER
    scatter: {
      data: { stroke: COLOR, strokeWidth: 2, fill: '#ffffff' }
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
        data: { stroke: GRAY_COLOR_50, strokeWidth: 5, fill: GRAY_COLOR }
      }
    }
  }
}

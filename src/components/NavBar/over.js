export default ({ left, top }, event, triggerElement, tooltipElement) => {
  // left position of the element you hovered over + half it's width
  const arrowLeft = triggerElement.getBoundingClientRect().left + triggerElement.offsetWidth / 2
  // the triggering element's bottom edge
  const arrowTop = triggerElement.getBoundingClientRect().top + triggerElement.offsetHeight + 4
  const sheet = document.createElement('style')

  // after and before are black border triangle and white triangle
  sheet.innerHTML = `
      .__react_component_tooltip{
        box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.5);
      }
      .__react_component_tooltip.place-bottom::after {
        position: fixed;
        top: ${arrowTop}px;
        left: ${arrowLeft}px;
    }
    .__react_component_tooltip.place-bottom::before {
        position: fixed;
        top: ${arrowTop - 1}px;
        left: ${arrowLeft}px;
      }
    `
  document.body.appendChild(sheet)

  // https://github.com/wwayne/react-tooltip/issues/476
  return {
    top,
    left: left - 30
  }
}

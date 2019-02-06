import React from 'react'

var TxtType = function(el, toRotate, period) {
  this.toRotate = toRotate
  this.el = el
  this.loopNum = 0
  this.period = parseInt(period, 10) || 2000
  this.txt = ''
  this.tick()
  this.isDeleting = false
}

TxtType.prototype.tick = function() {
  var i = this.loopNum % this.toRotate.length
  var fullTxt = this.toRotate[i]

  if (this.isDeleting) {
  this.txt = fullTxt.substring(0, this.txt.length - 1)
  } else {
  this.txt = fullTxt.substring(0, this.txt.length + 1)
  }

  this.el.innerHTML = '<span class="wrap">A better way for students to<b>'+this.txt+'</b></span>'

  var that = this
  var delta = (1967 / parseInt(fullTxt.length))

  if (this.isDeleting) { delta /= 2 }

  if (!this.isDeleting && this.txt === fullTxt) {
  delta = this.period
  this.isDeleting = true
  } else if (this.isDeleting && this.txt === '') {
  this.isDeleting = false
  this.loopNum++
  delta = 360
  }

  setTimeout(function() {
  that.tick()
  }, delta)
}

function writeMessage() {
  var elements = document.getElementsByClassName('typewrite')
  for (var i=0; i<elements.length; i++) {
      var toRotate = elements[i].getAttribute('data-type')
      var period = elements[i].getAttribute('data-period')
      if (toRotate) {
        new TxtType(elements[i], JSON.parse(toRotate), period)
      }
  }
  // INJECT CSS
  var css = document.createElement("style")
  css.type = "text/css"
  css.innerHTML = ".typewrite > .wrap { border-right: 0.08em solid #fff}"
  document.body.appendChild(css)
}

var TxtTypeMobile = function(el, toRotate, period) {
  this.toRotate = toRotate
  this.el = el
  this.loopNum = 0
  this.period = parseInt(period, 10) || 2000
  this.txt = ''
  this.tick()
  this.isDeleting = false
}

TxtTypeMobile.prototype.tick = function() {
  var i = this.loopNum % this.toRotate.length
  var fullTxt = this.toRotate[i]

  if (this.isDeleting) {
  this.txt = fullTxt.substring(0, this.txt.length - 1)
  } else {
  this.txt = fullTxt.substring(0, this.txt.length + 1)
  }

  this.el.innerHTML = '<span class="wrap">A better way for students to<br>&nbsp;<b>'+this.txt+'</b></span>'

  var that = this
  var delta = (1967 / parseInt(fullTxt.length))

  if (this.isDeleting) { delta /= 2 }

  if (!this.isDeleting && this.txt === fullTxt) {
  delta = this.period
  this.isDeleting = true
  } else if (this.isDeleting && this.txt === '') {
  this.isDeleting = false
  this.loopNum++
  delta = 360
  }

  setTimeout(function() {
  that.tick()
  }, delta)
}

function writeMessageMobile() {
  var elements = document.getElementsByClassName('typewritemobile')
  for (var i=0; i<elements.length; i++) {
      var toRotate = elements[i].getAttribute('data-type')
      var period = elements[i].getAttribute('data-period')
      if (toRotate) {
        new TxtTypeMobile(elements[i], JSON.parse(toRotate), period)
      }
  }
}

var nIntervalId

function runWriteMessage() {
  nIntervalId = setInterval(writeMessage(), 15000)
}

function runWriteMessageMobile() {
  nIntervalId = setInterval(writeMessageMobile(), 15000)
}

class LandingMessageType extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      imageSrc: '/src/assets/images/landing_collaborate.png'
    }
  }

  componentDidMount() {
    runWriteMessage()
    runWriteMessageMobile()
  }

  render () {
    return (
      <div className='container-landing-message'>
        <div className='landing-image-carousel'>
          <div className='landing-image-carousel-container'>
            <div className='landing-image-container'>
              <img src={require('../../assets/images/landing_collaborate.png')} className='landing-image' />
              <img src={require('../../assets/images/landing_organize.png')} className='landing-image' />
              <img src={require('../../assets/images/landing_keepup.png')} className='landing-image' />
            </div>
            <div className='landing-image-text typewrite' data-period="2000" data-type='[ " Collaborate", " Organize", " Keep Up" ]'>
              <span className="wrap"></span>
            </div>
            <div className='landing-image-text typewritemobile' data-period="2000" data-type='[ "Collaborate", "Organize", "Keep Up" ]'>
              <span className="wrap"></span>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default LandingMessageType

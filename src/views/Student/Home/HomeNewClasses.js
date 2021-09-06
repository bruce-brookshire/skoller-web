import React from 'react'
import PropTypes from 'prop-types'
import {inject, observer} from 'mobx-react'
import ClassList from '../../components/ClassList'
import JoinFirstClassPrompt from '../../components/Sammi/Prompts/JoinFirstClassPrompt'
import SecondClassPrompt from '../../components/Sammi/Prompts/SecondClassPrompt'
import SkLoader from '../../../assets/sk-icons/SkLoader';

@inject('rootStore') @observer
class HomeClasses extends React.Component {
  launchClassStatusModal (cl) {
    if (this.props.launchClassStatusModal) {
      this.props.launchClassStatusModal(cl)
    } else {
      return null
    }
  }

  render () {
    if (this.props.rootStore.studentClassesStore.loading) {
      return <SkLoader />
    } else {
      return (
        <div className='home-classes'>
            <div className="row">
              <div className="center-block col-md-6">
                <h2 className="sec-title"><svg fill="white" width="22px" height="22px" viewBox="0 0 22 22" version="1.1"><title>Classes</title>
                  <g id="Symbols" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                    <g id="Sidebar" transform="translate(0.000000, -193.000000)" fill="#555"><g id="Group-4"><g id="Group-26" transform="translate(0.000000, 193.000000)">
                      <g id="Group-18"><g id="Group-25"><g id="Tasks-17-Highlight-Copy-6"><path d="M1.70354407,6.58626314 C4.10606669,7.5669301 6.50769676,8.54938131 8.91256233,9.52436099 C9.06898179,9.58770177 9.24604148,9.61781094 9.4155145,9.62952007 C9.67268059,9.64613587 9.90307017,9.53261313 10.1337945,9.43247225 C13.3078154,8.04276657 16.4827288,6.65216878 19.6569729,5.2624631 C20.3132206,4.97531079 20.9695798,4.68815848 21.6258275,4.40022556 C21.8211845,4.31424714 21.9557365,4.17563342 21.9908807,3.95706312 C22.0519088,3.57478812 21.8004327,3.15660514 21.4221029,3.00806654 C19.0421172,2.07568577 16.6621314,1.143305 14.2822573,0.211816359 C14.1068711,0.142565258 13.930704,0.070749301 13.7486237,0.0240243228 C13.4671356,-0.0485722423 13.2091885,0.0565868374 12.9554811,0.163418649 C9.56903317,1.58657896 6.18370096,3.01297322 2.79502168,4.43111534 C2.3214121,4.62894377 1.86476099,4.87093232 1.35701136,4.9912575 C1.24008726,5.01958243 1.14324553,5.14481429 1.04138322,5.23079271 C0.476064086,5.70740979 0.197923058,6.33836427 0.0718503097,7.04860624 C0.0384912373,7.23650979 0.0234294488,7.4284279 0,7.61789267 L0,7.84995634 C0.0234294488,8.04354718 0.0402763382,8.23892227 0.0718503097,8.43095189 C0.147717096,8.89574834 0.309045587,9.3289859 0.58205445,9.7162791 C0.61373999,9.76133134 0.642190035,9.79723932 0.600351734,9.85812676 C0.226261534,10.3981961 0.0576810716,11.0058439 0.0191898343,11.6553099 C0.0167353206,11.6927791 0.00591314661,11.7286871 0,11.7653757 L0,11.9974394 C0.0234294488,12.1877963 0.0411688886,12.3781532 0.0709577593,12.5675064 C0.144258463,13.0374326 0.308153036,13.4723429 0.582835432,13.8637621 C0.615413522,13.9097065 0.642190035,13.9447223 0.600351734,14.0057213 C0.23128213,14.5389882 0.0593546037,15.1374917 0.0217559168,15.7801553 C0.0191898343,15.824427 0.00758667866,15.8686986 0,15.9137508 L0,16.1449224 C0.00591314661,16.1741394 0.015954339,16.2033565 0.0167353206,16.2333542 C0.0325780907,16.6131758 0.100188786,16.9829611 0.233736644,17.3393645 C0.47015094,17.9704305 0.847476634,18.4836246 1.48565019,18.753269 C4.00743987,19.8182417 6.53279974,20.8758543 9.05637452,21.9392657 C9.21089731,22.0043908 9.363635,22.0242405 9.51570328,21.9634646 C9.81303415,21.8457043 10.1044519,21.7163463 10.3974315,21.5903339 C13.7895695,20.130485 17.1817074,18.6706361 20.5737337,17.2107872 C20.8992915,17.0713928 21.2250724,16.9328906 21.5506302,16.7909315 C21.8113665,16.6774087 21.9205923,16.5055634 21.898948,16.2534269 C21.8595642,15.7867347 21.3569467,15.4855315 20.9143533,15.669978 C20.4659582,15.8560973 20.0216913,16.0514724 19.5766433,16.2433905 C16.1945466,17.6991134 12.814235,19.1547247 9.4330308,20.6120087 C9.35705244,20.6446828 9.29178469,20.6488088 9.21502536,20.6162463 C6.78739975,19.5938726 4.35910474,18.5738406 1.93226011,17.5504633 C1.87569473,17.5271565 1.81957562,17.4812122 1.78476616,17.4311417 C1.23841372,16.6824269 1.18240618,15.8778429 1.52570339,15.0340054 C1.57233915,14.9179178 1.63928044,14.811086 1.69774249,14.7001281 C1.7627871,14.7259997 1.80629893,14.7418349 1.84802567,14.7593428 C4.21629667,15.7551759 6.58546022,16.7458792 8.94938004,17.7508565 C9.22339302,17.8677247 9.46895595,17.8643793 9.72612205,17.7525293 C9.95561908,17.6522769 10.1796492,17.5396463 10.4091463,17.4403975 C13.7795283,15.9880201 17.1499103,14.5382076 20.5209617,13.0867224 C20.8741885,12.9348383 21.2284195,12.7828428 21.5816463,12.6285054 C21.7920651,12.535836 21.9073156,12.3781532 21.903076,12.1410713 C21.8963819,11.7612496 21.4454208,11.287978 20.8692795,11.5375496 C17.1465632,13.1451565 13.4204999,14.7433961 9.69934553,16.3560212 C9.43135727,16.4721088 9.21681046,16.4771269 8.94435944,16.3611509 C6.61123261,15.3662099 4.26973812,14.3887769 1.93147913,13.4038724 C1.87814924,13.3813462 1.82459622,13.3395279 1.79045616,13.292803 C1.23004606,12.5299257 1.1816252,11.7111792 1.53898008,10.8539598 C1.58249191,10.7495814 1.64586299,10.6536781 1.69941602,10.5543178 C1.76133671,10.5776245 1.80049736,10.591787 1.83965801,10.6085143 C4.21707765,11.6084734 6.59628239,12.6058677 8.97113595,13.6134099 C9.21178986,13.7152235 9.43213825,13.7260405 9.66174685,13.6292451 C9.90987587,13.5239745 10.1520917,13.4029802 10.3991051,13.2970405 C13.4472764,11.9832769 16.496898,10.6719666 19.5457388,9.35987568 C20.2178292,9.07015852 20.8910354,8.7822256 21.5623449,8.49261994 C21.7920651,8.39415179 21.9073156,8.22554041 21.903076,8.00429374 C21.8939274,7.52355059 21.3789258,7.18978481 20.9228325,7.37166653 C20.7690907,7.43255397 20.6197001,7.50436993 20.4667392,7.56949496 C16.7808407,9.15535633 13.0949421,10.7403256 9.4104939,12.3270791 C9.34366419,12.3562961 9.29089214,12.3529507 9.22685165,12.3262985 C6.79587898,11.3029211 4.36412533,10.2822201 1.93315266,9.25884268 C1.88573592,9.23888141 1.83619937,9.2070995 1.80551795,9.16706545 C1.50484003,8.77809952 1.33525544,8.33828255 1.31528463,7.84493815 C1.29687578,7.38828233 1.40554379,6.96095509 1.61172294,6.55113577 C1.64753653,6.56462914 1.67609814,6.57544614 1.70354407,6.58626314" id="Fill-1-Copy"></path></g></g></g></g></g></g></g></svg>  Classes</h2>

              </div>
            </div>

          <div className="row">
            <div className="center-block col-md-6">
              <div class="card-wrap sborder-danger sborder-1">
                <span className="card-icon sbg-danger stext-white">
                  <i className="fas fa-file-upload fa-2x"></i>
                  </span>
                <h3 className="card-title stext-dark">Intro to psychology</h3>
                <p className="card-subtitle stext-danger">Upload syllabus</p>
              </div>
            </div>
            <div className="center-block col-md-6">
            <div className="card-wrap sborder-purple sborder-1">
                <span className="card-icon sbg-purple stext-white"><h3 className="stext-white">76%</h3></span>
                <h3 className="card-title stext-purple">Sociology</h3>
                <ul className="card-ul">  
                 <li className="stext-light"><span><i className="fas fa-users"></i></span> 2</li>
                 <li className="stext-light"><span><i className="fas fa-adjust"></i></span> 47%</li>
                </ul>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="center-block col-md-6">
            <div className="card-wrap sborder-dark sborder-1">
                <span className="card-icon sbg-dark stext-white"><i className="fas fa-clock fa-2x"></i></span>
                <h3 className="card-title stext-dark">Ethics 101</h3>
                <p className="card-subtitle stext-dark">Syllabus In Review</p>
              </div>
            </div>
            <div className="center-block col-md-6">
            <div className="card-wrap sborder-green sborder-1">
                <span className="card-icon sbg-green stext-white"><h3 className="stext-white">89%</h3></span>
                <h3 className="card-title stext-green">Intro to Psychology</h3>
                <ul className="card-ul">  
                 <li className="stext-light"><span><i className="fas fa-users"></i></span> 7</li>
                 <li className="stext-light"><span><i className="fas fa-adjust"></i></span> 59%</li>
                </ul>
              </div>
            </div>
          </div>  
          <div className="row">
            <div className="center-block col-md-6">
              <div className="card-wrap sborder-orange sborder-1">
                <span className="card-icon sbg-orange stext-white"><h3 className="stext-white">85%</h3></span>
                <h3 className="card-title stext-orange">Business Finance</h3>
                <ul className="card-ul">  
                 <li className="stext-light"><span><i className="fas fa-users"></i></span> 13</li>
                 <li className="stext-light"><span><i className="fas fa-adjust"></i></span> 64%</li>
                </ul>
              </div>

            </div>
            <div className="center-block col-md-6">
            <div className="card-wrap sborder-darkpink sborder-1">
                <span className="card-icon sbg-darkpink stext-white"><h3 className="stext-white">91%</h3></span>
                <h3 className="card-title stext-darkpink">Elementary Art</h3>  
                <ul className="card-ul">  
                 <li className="stext-light"><span><i className="fas fa-users"></i></span> 9</li>
                 <li className="stext-light"><span><i className="fas fa-adjust"></i></span> 65%</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )
    }
  }
}

HomeClasses.propTypes = {
  classes: PropTypes.array,
  onAddClass: PropTypes.func,
  onClassSelect: PropTypes.func,
  launchClassStatusModal: PropTypes.func,
  rootStore: PropTypes.object
}

export default HomeClasses

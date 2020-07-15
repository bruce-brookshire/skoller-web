import React from 'react'
import PropTypes from 'prop-types'

class InsightsIcon extends React.Component {
  render () {
    let fill = this.props.fill || '#FFFFFF'
    return (
      <svg fill={fill} width={this.props.width} height={this.props.height} viewBox="0 0 17 26" version="1.1">
        <title>Home</title>
        <g id="Insights" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
          <g transform="translate(-18.000000, -368.000000)" fill={fill} id="Group-7">
            <g transform="translate(18.000000, 368.000000)">
              <path d="M16.5175018,6.66230432 C16.4078017,6.1264036 16.2441756,5.59890258 16.0309913,5.09475271 C15.8218388,4.6003465 15.5629601,4.12324366 15.261579,3.67721971 C14.9628857,3.23522761 14.620346,2.81994655 14.2431996,2.44296811 C13.8658852,2.06565369 13.4506041,1.72311401 13.009116,1.42475674 C12.562924,1.12337559 12.0859892,0.864496899 11.591583,0.655344424 C11.0877691,0.442328087 10.5604361,0.27853398 10.0240314,0.168833926 C8.92467893,-0.0562779754 7.76232875,-0.0562779754 6.6629763,0.168833926 C6.12673959,0.27853398 5.59940656,0.442160093 5.09559268,0.655344424 C4.60118647,0.864328905 4.12425163,1.12320759 3.67789169,1.42475674 C3.23623557,1.72311401 2.82095451,2.06582168 2.44380808,2.44296811 C2.06649366,2.82028254 1.72378599,3.2355636 1.42542872,3.67721971 C1.12404756,4.12341166 0.865168875,4.60051449 0.656016399,5.09475271 C0.442832069,5.59873458 0.279205955,6.12623561 0.169505902,6.66230432 C0.0571179452,7.21164456 -3.19744231e-14,7.77711221 -3.19744231e-14,8.34274787 C-3.19744231e-14,8.90855151 0.0571179452,9.47401917 0.169505902,10.0233594 C0.279205955,10.5595961 0.443000063,11.0870971 0.656016399,11.590575 C0.865168875,12.0853172 1.12404756,12.5622521 1.42542872,13.008444 C1.72378599,13.4499321 2.06632566,13.8650452 2.44380808,14.2425276 C2.78651575,14.5854033 3.16080629,14.899552 3.55760801,15.177918 C3.63942107,15.3892544 3.75466492,15.9026439 3.85781321,16.3616034 C3.99909613,16.9907407 4.18808933,17.8300386 4.47065517,18.8129712 L6.37621061,18.8129712 C6.3710028,18.7499735 6.35941122,18.6864717 6.3404279,18.623474 C6.01972744,17.5545285 5.8206546,16.6685283 5.66089235,15.95657 C5.38118241,14.7115667 5.24090746,14.0864612 4.71239847,13.7294741 C4.36817885,13.4969704 4.0444545,13.230028 3.75046508,12.9358706 C3.45613966,12.6415452 3.18919727,12.3179889 2.95669363,11.9739372 C2.72217407,11.6266937 2.52074931,11.2555951 2.35796317,10.8707209 C2.19248912,10.479295 2.06514971,10.0695577 1.97980878,9.65293273 C1.89228392,9.22505212 1.84793352,8.78440398 1.84793352,8.34274787 C1.84793352,7.90125975 1.89228392,7.46044361 1.97980878,7.03273099 C2.06514971,6.61610598 2.19248912,6.20636872 2.35813116,5.81460682 C2.52074931,5.43006865 2.72200607,5.05913799 2.95669363,4.71172649 C3.18936526,4.36750688 3.45630766,4.04378252 3.75046508,3.7497931 C4.0444545,3.45563568 4.36817885,3.18852529 4.71239847,2.95602166 C5.05980997,2.7213341 5.43074063,2.51990934 5.81544679,2.3572912 C6.2068727,2.19164915 6.61677796,2.06447773 7.03340297,1.9791368 C7.88950017,1.8039191 8.79750751,1.8039191 9.65360471,1.9791368 C10.0703977,2.06447773 10.480135,2.19164915 10.8717289,2.35745919 C11.256435,2.52007734 11.6275337,2.72150209 11.9746092,2.95602166 C12.3186608,3.1883573 12.6423852,3.45546769 12.9367106,3.7497931 C13.230532,4.04361453 13.4974744,4.36733888 13.730314,4.71172649 C13.9648336,5.05897 14.1662584,5.43006865 14.3290445,5.81460682 C14.4946865,6.20636872 14.621858,6.61627398 14.7071989,7.03273099 C14.7947238,7.46077959 14.8390742,7.90142774 14.8390742,8.34274787 C14.8390742,8.78406799 14.7947238,9.22488413 14.7071989,9.65293273 C14.621858,10.0695577 14.4945186,10.479295 14.3290445,10.8708889 C14.1662584,11.2555951 13.9648336,11.6266937 13.730314,11.9739372 C13.4976424,12.3181568 13.2307,12.6418812 12.9365426,12.9358706 C12.6423852,13.230028 12.3186608,13.4971384 11.9746092,13.7294741 C11.4494601,14.0844453 11.3105291,14.7068629 11.0335071,15.9469943 C10.8724009,16.6681924 10.6721521,17.5657841 10.3484277,18.6172582 C10.3284364,18.6822719 10.3163409,18.7477895 10.3109651,18.8129712 L12.2185364,18.8129712 C12.5041262,17.8381023 12.6946313,16.9878849 12.8370902,16.3496758 C12.9383905,15.8955881 13.0519544,15.3877424 13.1330955,15.1753981 C13.5285533,14.8975361 13.9014999,14.5843953 14.2431996,14.2426956 C14.620514,13.8653812 14.9630537,13.4502681 15.261579,13.008444 C15.5627921,12.5624201 15.8216708,12.0854852 16.0309913,11.590743 C16.2441756,11.0867611 16.4078017,10.5594281 16.5175018,10.0233594 C16.6300577,9.47368318 16.6870077,8.90821552 16.6870077,8.34274787 C16.6870077,7.7774482 16.6300577,7.21198055 16.5175018,6.66230432" id="Fill-1"></path>
              <path d="M8.83711175,5.74913117 C9.08204694,5.69906897 9.34361353,5.69906897 9.58854872,5.74913117 C9.70748844,5.7734903 9.82441223,5.80977699 9.9364642,5.85731928 C10.0463322,5.90368561 10.1523364,5.96130754 10.2517889,6.02850512 C10.3505693,6.09519872 10.443302,6.17163597 10.5276349,6.25613693 C10.6121359,6.34063789 10.6887411,6.43337056 10.7550988,6.53147903 C10.8224643,6.63126744 10.8800863,6.73743962 10.9266206,6.84747566 C10.9738269,6.95902365 11.0101136,7.07594744 11.0344727,7.19505515 C11.1240135,7.63251142 11.5088876,7.93406057 11.9386162,7.93406057 C12.000102,7.93406057 12.0624277,7.92784479 12.1249215,7.91507725 C12.6248715,7.81276893 12.9470839,7.32457849 12.8447756,6.82462848 C12.7960573,6.58590907 12.7231479,6.35122151 12.6285674,6.12762156 C12.5358347,5.90822145 12.4209268,5.69638107 12.2863637,5.49714024 C12.1539844,5.30109129 12.0017819,5.11696991 11.8344599,4.94964793 C11.6671379,4.78198997 11.4826806,4.62978744 11.2861276,4.49707222 C11.0875588,4.36301304 10.8757184,4.24793718 10.6564863,4.15537251 C10.4323824,4.06045592 10.1976948,3.98754655 9.95897539,3.9388283 C9.47078496,3.83887189 8.95487552,3.83887189 8.46668508,3.9388283 C7.96673506,4.04113662 7.64435466,4.52915906 7.74666298,5.02910908 C7.8489713,5.52905909 8.33749773,5.8512715 8.83711175,5.74913117" id="Fill-4"></path>
              <g id="Group-8" transform="translate(4.457143, 19.556457)">
                <path d="M5.34009668,3.47872879 C4.73548643,3.73273565 4.40252241,3.84965945 3.7942163,3.84965945 C3.18624617,3.84965945 2.85345014,3.73256766 2.2485039,3.4785608 L2.06051867,2.50587579 C2.71132725,2.50486783 3.48359547,2.50671576 4.23839232,2.50906768 C4.69432791,2.51024363 5.13598403,2.51141959 5.52707396,2.51192357 L5.34009668,3.47872879 Z M6.41072217,0.662478109 C5.89968455,0.665502 5.09650545,0.663318078 4.24343214,0.661134157 C3.10040126,0.657774278 1.91889976,0.654582393 1.16259097,0.662646103 L1.16208699,0.662646103 C0.534293573,0.669533855 0.0786939638,1.1908191 0.0786939638,1.9024415 C0.0786939638,1.96123939 0.0842377643,2.02003727 0.0954933594,2.07782719 L0.462896142,3.97767084 C0.504390649,4.45594964 0.805435819,4.87475857 1.25313971,5.06391976 L1.33075292,5.09684658 C2.12267643,5.43233051 2.74811793,5.69759297 3.7942163,5.69759297 C4.84115463,5.69759297 5.46659613,5.43233051 6.25868764,5.09667859 L6.3403327,5.06207183 C6.78518069,4.8710627 7.08404194,4.45326173 7.12570444,3.97800683 L7.49310723,2.07782719 C7.50436282,2.02003727 7.51007462,1.96123939 7.51007462,1.9024415 C7.51007462,1.6857293 7.46370828,1.27632803 7.15308746,0.967555133 C6.95367863,0.769322265 6.69312001,0.658446254 6.41072217,0.662478109 Z" id="Fill-6"></path>
              </g>
            </g>
          </g>
        </g>
      </svg>
    )
  }
}

InsightsIcon.propTypes = {
  fill: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string
}

export default InsightsIcon

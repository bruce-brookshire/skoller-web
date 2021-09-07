import React from 'react'
import {inject, observer} from 'mobx-react'
import TasksList from '../Tasks/TasksList'

@inject('rootStore') @observer
class HomeAssignments extends React.Component {
  render () {
    return (
      <div class="home-tasks">
             <div class="home-tasks-inner">
             <div class="divider-spantext"><span>weekdays work</span> </div>
              <div class="work-list-items first-child">
               
              <div class="work-left-items"> <input type="radio" class="assign-radio" /><h4 class="stext-purple">Homework 6</h4><span class="stext-dark">Tommorow</span></div>  
              <div class="work-right-items"><span><i class="fas fa-signal stext-purple"></i></span><span class="stext-light">Sociology</span></div>
            </div>
            <div class="work-list-items">
              <div class="work-left-items"> <input type="radio" class="assign-radio" /><h4 class="stext-green">Eassy 3</h4><span class="stext-dark">in two days</span></div>  
              <div class="work-right-items"><span><i class="fas fa-signal stext-green"></i></span><span class="stext-light">Into to physocloghy</span></div>
            </div>
            <div class="work-list-items">
              <div class="work-left-items"> <input type="radio" class="assign-radio" /><h4 class="stext-orange">Homework 6</h4><span class="stext-dark">In 3 days</span></div>  
              <div class="work-right-items"><span><i class="fas fa-signal stext-orange"></i></span><span class="stext-light">Business Finance</span></div>
            </div>
            <div class="work-list-items">
              <div class="work-left-items"> <input type="radio" class="assign-radio" /><h4 class="stext-danger">Homework 1.1</h4><span class="stext-dark">Tommorow</span></div>  
              <div class="work-right-items"><span><i class="fas fa-signal stext-danger"></i></span><span class="stext-light">Elementory Art 101</span></div>
            </div>
            </div>
           

            <div class="home-tasks-inner">
            <div class="divider-spantext"><span>weekdays work</span> </div>
            <div class="work-list-items first-child">
            <div class="work-left-items"> <input type="radio" class="assign-radio" /><h4 class="stext-purple">Homework 6</h4><span class="stext-dark">Tommorow</span></div>  
            <div class="work-right-items"><span><i class="fas fa-signal stext-purple"></i></span><span class="stext-light">Sociology</span></div>
            </div>
            <div class="work-list-items">
            <div class="work-left-items"> <input type="radio" class="assign-radio" /><h4 class="stext-green">Eassy 3</h4><span class="stext-dark">in two days</span></div>  
            <div class="work-right-items"><span><i class="fas fa-signal stext-green"></i></span><span class="stext-light">Into to physocloghy</span></div>
            </div>
            <div class="work-list-items">
            <div class="work-left-items"> <input type="radio" class="assign-radio" /><h4 class="stext-orange">Homework 6</h4><span class="stext-dark">In 3 days</span></div>  
            <div class="work-right-items"><span><i class="fas fa-signal stext-orange"></i></span><span class="stext-light">Business Finance</span></div>
            </div>
            <div class="work-list-items">
            <div class="work-left-items"> <input type="radio" class="assign-radio" /><h4 class="stext-danger">Homework 1.1</h4><span class="stext-dark">Tommorow</span></div>  
            <div class="work-right-items"><span><i class="fas fa-signal stext-danger"></i></span><span class="stext-light">Elementory Art 101</span></div>
            </div>
        </div>







      </div>

       
       

        



     
    )
  }
}

export default HomeAssignments

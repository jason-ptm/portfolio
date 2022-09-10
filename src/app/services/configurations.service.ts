import { Injectable } from '@angular/core';
import * as $ from 'jquery'

@Injectable({
  providedIn: 'root'
})
export class ConfigurationsService {

  lang:string = 'es'

  home:boolean = false
  about:boolean = false
  projects:boolean = false

  constructor() { }

  animateMouse(){
    document.querySelectorAll('.hov').forEach(obj =>{
      obj.addEventListener('mouseenter', ()=> document.querySelector('#cursor')?.classList.add('hov'))
      obj.addEventListener('mouseleave', ()=> document.querySelector('#cursor')?.classList.remove('hov'))
    });
  }

  slideToDiv(cont:string){
    if(cont != undefined){
      $('html, body').animate({
        scrollTop: $(cont).offset()?.top
      }, 1000);
    }
  }

  changeValues(div:string){
    if(div == 'welcome'){
      this.home = true
      this.about = false
      this.projects = false
    }
    else if(div == 'projects'){
      this.home = false
      this.about = false
      this.projects = true
    }
    else if(div != 'contact'){
      this.home = false
      this.about = true
      this.projects = false
    }
  }
}

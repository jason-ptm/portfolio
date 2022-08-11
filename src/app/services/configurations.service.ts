import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigurationsService {

  lang:string = 'es'
  animations:boolean = true

  constructor() { }

  animateMouse(){
    document.querySelectorAll('.hov').forEach(obj =>{
      obj.addEventListener('mouseenter', ()=> document.querySelector('#cursor')?.classList.add('hov'))
      obj.addEventListener('mouseleave', ()=> document.querySelector('#cursor')?.classList.remove('hov'))
    });
  }
}

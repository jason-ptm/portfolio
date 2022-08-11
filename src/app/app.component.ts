import { Component, HostListener, OnInit } from '@angular/core';
import { Router, Event, NavigationEnd, RouterOutlet } from '@angular/router';

// Traductor
import { TranslateService } from '@ngx-translate/core';

// Animations
import { fader } from './animations/route-animations';
import gsap from 'gsap';

import { ConfigurationsService } from './services/configurations.service';
import { LoginService } from './services/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations:[
    fader
  ]
})
export class AppComponent implements OnInit{

  title = '';
  flagMenu: boolean = false;
  flagTools: boolean = false;
  cursorX: number = 0;
  cursorY: number = 0;
  cursorFlag: boolean = false;
  languajeFlag: boolean = false;

  constructor(
      private _router: Router, 
      private _translate: TranslateService,
      public _configuration:ConfigurationsService,
      public _login:LoginService
    ){
    this._router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) this.flagMenu = false
    });
  }

  //https://www.youtube.com/watch?v=ZwMd2z_iM0Q&ab_channel=ALL.DESIGN

  async ngOnInit() {
    await this.initialAnimations()
    this.setAppLanguaje()
    this._configuration.animateMouse()
  }

  initialAnimations():void{
    gsap.timeline({repeat:0})
      .from('.animate .line',{
        height:'0',
        visibility:'visible',
        duration: 1,
        ease: "slow(0.7, 0.7, false)"
      })
      .to('.animate .box',{
        stagger:0,
        flexBasis: 0,
        duration: .8,
      })
      .from('.isa',{
        duration: .5,
        opacity:0,
        y: -20,
        stagger: .2,
      })
      .to('.animate',{
        zIndex:-1
      })
  }

  prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData;
  }

  @HostListener('document:mousemove', ['$event'])
  pageMove(e:any) {
    this.cursorX = (e.clientX - 13);
    this.cursorY = (e.clientY - 13);
  }

  @HostListener('window:scroll', ['$event'])
  onScroll(){
    const scrollY = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    if(scrollY > 10) document.querySelector('#nav')?.classList.add('fx')
    else document.querySelector('#nav')?.classList.remove('fx')
  }

  redirect(url:string){
    window.open(url, '_blank');
  }

  openMenu(){
    this.flagMenu = !this.flagMenu
  }

  openTools(){
    this.flagTools = !this.flagTools
  }

  setAppLanguaje(){
    this.title = this._translate.instant('portfolio')
    this._translate.setDefaultLang(this._configuration.lang);
    this._translate.use(this._translate.getBrowserLang() || '');
  }

  changeLang(lang:string){
    this.languajeFlag = !this.languajeFlag
    this._translate.use(lang)
    this._configuration.lang = lang
  }

  changeCursor(){
    this.cursorFlag = !this.cursorFlag
  }
  
  changeAnimations(){
    this._configuration.animations = !this._configuration.animations
  }  
}

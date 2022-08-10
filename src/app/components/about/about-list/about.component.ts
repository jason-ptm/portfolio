import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

//Animations modules
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

//popups
import { SwalComponent, SwalPortalTargets } from '@sweetalert2/ngx-sweetalert2';
import { AppComponent } from 'src/app/app.component';
import { ConfigurationsService } from 'src/app/services/configurations.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit, OnDestroy {

  contactForm: FormGroup;
  @ViewChild('formCon')
  public readonly formCon!: SwalComponent;
  animations: any

  constructor(private _fb:FormBuilder, public readonly swalTargets: SwalPortalTargets, private _app:AppComponent, public _configuration:ConfigurationsService) {
    
    this.contactForm = this._fb.group({
      name:[undefined, [Validators.required, Validators.maxLength(30)]],
      email:[undefined, [Validators.required, Validators.email]],
      message:[undefined, [Validators.required, Validators.maxLength(250), Validators.minLength(10)]]
    })
  }

  ngOnInit(): void {
    gsap.registerPlugin(ScrollTrigger)
    this.initialAnimations()
    this.initScrollAnimations()
    this.scroll()
  }

  initialAnimations(){
    if(this._configuration.animations){
      gsap.from('.tltan', {
        duration: 1,
        width:'100%',
        stagger: .2,
        delay: 1.6
      })
    }
  }

  scroll(){
    window.scrollTo(0,0)
  }

  initScrollAnimations(){
    document.querySelectorAll('.container').forEach((cont)=>{
      gsap.from(cont,{
        scrollTrigger:{
          trigger:cont,
          start:'top 60%',
          end:'bottom 60%',
          scrub:true,
          toggleClass:'anim-init'
        },onStart:()=>ScrollTrigger.refresh()
      })
    })
  }

  ngOnDestroy(): void {
  }
}

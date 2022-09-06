import { AfterContentInit, AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

//Animations modules
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

//popups
import { SwalComponent, SwalPortalTargets } from '@sweetalert2/ngx-sweetalert2';
import { ConfigurationsService } from 'src/app/services/configurations.service';
import { DataBaseService } from 'src/app/services/data-base.service';
import { Router } from '@angular/router';

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

  constructor(
    private _fb:FormBuilder, 
    public readonly swalTargets: SwalPortalTargets,
    public _configuration:ConfigurationsService,
    public _dbService:DataBaseService,
    private router:Router) {
    
    this.contactForm = this._fb.group({
      name:[undefined, [Validators.required, Validators.maxLength(30)]],
      email:[undefined, [Validators.required, Validators.email]],
      message:[undefined, [Validators.required, Validators.maxLength(250), Validators.minLength(10)]]
    })
  }

  ngOnInit():void {
    this._dbService.getProjects()
    gsap.registerPlugin(ScrollTrigger)
    this.initialAnimations()
    this.initScrollAnimations()
    this.animProjects()
    this.scroll()
  }

  initialAnimations(){
    gsap.from('.tltan', {
      duration: 1,
      width:'100%',
      stagger: .2,
      delay: 1.6
    })
  }

  scroll(){
    setTimeout(()=>{
      $('html, body').animate({
        scrollTop: 0
      }, 0);
    }, 500)
  }

  initScrollAnimations(){
    document.querySelectorAll('.container').forEach((cont)=>{
      gsap.from(cont,{
        scrollTrigger:{
          trigger:cont,
          start:'top 60%',
          end:'bottom 60%',
          toggleClass:'anim-init'
        },onStart:()=>{
          // console.log(cont.id)
          this._configuration.changeValues(cont.id)
          ScrollTrigger.refresh()
        },onRepeat:()=>{
          console.log(cont.id)
        }
      })
    })
  }

  animProjects(){
    setTimeout(() => {
      document.querySelectorAll('#projects .item').forEach((item)=>{
        gsap.from(item,{
          scrollTrigger:{
            trigger:item,
            start:'30% bottom',
            end:'bottom top',
            toggleClass:'view'
          }
        })
      })
      this._configuration.animateMouse()
    }, 1000);
  }

  add(){
    this._dbService.selectedProject = this._dbService.projectPlant
    this.router.navigate(['/project'])
  }

  update(){
    this.router.navigate(['/project',this._dbService.selectedProject._id])
  }

  async delete(){
    await this._dbService.deleteProject()
  }

  redirect(url:string){
    window.open(url,'_blank')
  }

  changeSlide(slider:HTMLElement){
    slider.classList.toggle('change')
  }

  ngOnDestroy(): void {
  }
}

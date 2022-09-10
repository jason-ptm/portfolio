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
import { LoginService } from 'src/app/services/login.service';
import Swal from 'sweetalert2';
import { CONSTANTS } from '@firebase/util';

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
    public _login:LoginService,
    public _configuration:ConfigurationsService,
    public _dbService:DataBaseService,
    private router:Router) {
    
    this.contactForm = this._fb.group({
      name:[undefined, [Validators.required, Validators.maxLength(30)]],
      email:[undefined, [Validators.required, Validators.email]],
      message:[undefined, [Validators.required, Validators.maxLength(250), Validators.minLength(10)]]
    })
  }

  async ngOnInit() {
    this.scroll()
    gsap.registerPlugin(ScrollTrigger)
    this.initialAnimations()
    this.initScrollAnimations()
    await this._dbService.getProjects()
    this.animProjects()
  }

  initialAnimations(){
    gsap.from('.tltan', {
      duration: 1,
      width:'100%',
      delay:1
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
          start:'top 62%',
          end:'bottom 64%',
          toggleClass:'anim-init',
          onToggle:()=>this._configuration.changeValues(cont.id)
        },
        onStart:()=>{
          ScrollTrigger.refresh()
          
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

  redirectUser(){
    this.router.navigate(['/project'])
  }

  editProject(project:any){
    this._dbService.selectedProject = project
    this.router.navigate(['/project', project._id])
  }

  deleteProject(project:any){
    Swal.fire({
      icon:'question',
      title:'Sure u want to delete this?',
      showConfirmButton:true,
      showCancelButton:true
    }).then((res)=>{
      if(res.isConfirmed){
        this._dbService.selectedProject = project
        this._dbService.deleteProject()
        this.animProjects()
      }
    })
  }

  changeSlide(slider:HTMLElement){
    slider.classList.toggle('change')
  }

  ngOnDestroy(): void {
  }
}

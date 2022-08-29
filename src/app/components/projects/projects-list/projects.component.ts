import { Component, Input, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { DataBaseService } from 'src/app/services/data-base.service';

//Animations modules
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { ConfigurationsService } from 'src/app/services/configurations.service';
import { LoginService } from 'src/app/services/login.service';
import { Router } from '@angular/router';
import { CSSRulePlugin } from 'gsap/all';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {

  state:boolean
  sideBarFlag = false

  constructor(
    public _dbService: DataBaseService, 
    public _translate: TranslateService, 
    public _configuration:ConfigurationsService,
    public _login:LoginService,
    private router:Router
  ) {}

  ngOnInit(): void {
    this._dbService.getProjects()
    gsap.registerPlugin(ScrollTrigger)
    this.animateSideBar()
  }

  sideBar(index?:number){
    if(index!= undefined) this.selectProject(index)
    this.showSideBar(!this.sideBarFlag)
  }

  selectProject(index:number){
    this._dbService.selectedProject = this._dbService.arrProjects[index]
  }

  animateSideBar(){
    gsap.timeline({
      scrollTrigger:{
        trigger:'.bsd',
        start:'top 70px',
        end:'bottom bottom',
        pin:true,
        toggleClass:'slide'
      }
    })
  }

  async showSideBar(flag:boolean){
    if(flag){
      this.sideBarFlag = !this.sideBarFlag
      gsap.timeline({defaults:{duration: .5}})
        .to('#side-bar .info',{x:0},0)
        .to('.bsd .back',{opacity:1},0)
    }
    else{
      await gsap.timeline({defaults:{duration:.5}})
        .to('#side-bar .info',{x:'100%'})
        .to('.bsd .back',{opacity:0},0)
      this.sideBarFlag = !this.sideBarFlag
    }
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
    this.sideBar()
  }

  redirect(url:string){
    window.open(url,'_blank')
  }
}

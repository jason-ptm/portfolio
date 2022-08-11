import { Component, Input, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { DataBaseService } from 'src/app/services/data-base.service';

//Animations modules
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { ConfigurationsService } from 'src/app/services/configurations.service';
import { LoginService } from 'src/app/services/login.service';
import { Router } from '@angular/router';

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
  }

  sideBar(index?:number){
    if(index!= undefined) this.selectProject(index)
    document.querySelector('#side-bar .back')?.classList.toggle('op')
    this.animateSideBar()
    this.sideBarFlag = !this.sideBarFlag
  }

  selectProject(index:number){
    this._dbService.selectedProject = this._dbService.arrProjects[index]
  }

  animateSideBar(){
    gsap.timeline({
      scrollTrigger:{
        trigger:'.bsd',
        start:'-80px top',
        end:'bottom bottom',
        pin:true,
        pinSpacing:false
      }
    })
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

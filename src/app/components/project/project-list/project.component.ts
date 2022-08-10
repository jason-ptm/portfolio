import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DataBaseService } from 'src/app/services/data-base.service';
import { LoginService } from 'src/app/services/login.service';
import * as moment from 'moment';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {

  projectForm: FormGroup
  languajeInp: FormControl
  maxDate:Date = new Date()
  indexImage:number
  _id:any = this._activatedRouter.snapshot.paramMap.get('_id')
  
  imagesUrls =
  [
    '../../../../assets/img/projects/bck-1.jpg',
    '../../../../assets/img/projects/bck-2.jpg',
    '../../../../assets/img/projects/bck-3.jpg',
    '../../../../assets/img/projects/bck-4.jpg',
    '../../../../assets/img/projects/bck-5.jpg'
  ]

  constructor(
    private _fb: FormBuilder,
    private _activatedRouter:ActivatedRoute, 
    private _router:Router,
    public _dbService:DataBaseService,
    private _login:LoginService
    ) {
      this.projectForm = this._fb.group({
        titleEn:[
          undefined, 
          [Validators.required, Validators.maxLength(30), Validators.minLength(10)]
        ],descriptionEn:[
          undefined, 
          [Validators.required, Validators.maxLength(250), Validators.minLength(10)]
        ],titleEs:[
          undefined, 
          [Validators.required, Validators.maxLength(30), Validators.minLength(10)]
        ],descriptionEs:[
          undefined, 
          [Validators.required, Validators.maxLength(250), Validators.minLength(10)]
        ],startDate:[
          {value:undefined, disabled:true},
          [Validators.required]
        ],endDate:[
          {value:undefined, disabled:true},
          [Validators.required]
        ],urlPage:[
          undefined, 
          [Validators.required]
        ],urlRep:[
          undefined, 
          [Validators.required]
        ]
      })
      this.languajeInp = new FormControl(undefined, [Validators.required ,Validators.maxLength(20)])
    }

  async ngOnInit() {
    if(this._id != null || this._id != undefined) await this._dbService.getProject(this._id)
    if(!this._login.checkUser()) this._router.navigate(['/projects'])

    this.projectForm.get('startDate')?.setValue(new Date(this._dbService.selectedProject.startDate))
    this.projectForm.get('endDate')?.setValue(new Date(this._dbService.selectedProject.endDate))

    this.indexImage = this.imagesUrls.indexOf(this._dbService.selectedProject.image)
  }

  addLang(){
    let value = this.languajeInp.value

    if(value != undefined && value != ' '){
      this._dbService.selectedProject.languajes.unshift(value)
      this.languajeInp.reset()
    }
  }

  async deleteLang(index:number){
    this._dbService.selectedProject.languajes.splice(index,1)
  }

  selectImage(index:number){
    this.indexImage = index
    this._dbService.selectedProject.image = this.imagesUrls[index]
  }

  addData(){
    this._dbService.selectedProject.startDate = moment(this.projectForm.get('startDate')?.value).format('L')
    this._dbService.selectedProject.endDate = moment(this.projectForm.get('endtDate')?.value).format('L')
    if(this._id != undefined || this._id != null)this._dbService.updateProject()
    else this._dbService.createProject()
  }
}

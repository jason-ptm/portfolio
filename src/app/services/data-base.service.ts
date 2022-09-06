import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Project } from '../model/project';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import Swal from 'sweetalert2';

@Injectable({
  providedIn:'root'
})
export class DataBaseService {

  projectPlant: Project = {
    urlPage:'',
    urlRep:'',
    languajes:[''],
    en:{
      title:'',
      description:''
    },
    es:{
      title:'',
      description:''
    }
  }

  selectedProject:Project = this.projectPlant

  public arrProjects: Project[] = []

  constructor(private _store:AngularFirestore) {
   }

  async getProjects(){
    await this._store.firestore.collection('projects').get().then(
      res =>{
        res.forEach(item => {
          let project:Project = item.data() as Project
          project._id = item.id
          this.arrProjects.push(project)
        })
      },err =>{
        Swal.fire({
          icon:'warning',
          title:'Error',
          text: err
        })
      }
    )
  }

  async getProject(id:string){
    await this._store.firestore.collection('projects').doc(id).get().then(
      res => {
        this.selectedProject = res.data() as Project
        this.selectedProject._id = res.id
      },err => {
        Swal.fire({
          icon:'warning',
          title:'Error',
          text: err
        })
        this.selectedProject = this.projectPlant
      }
    )
  }

  async createProject(){
    await this._store.collection('projects').add(this.selectedProject).then(
      res => {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Proyecto creado',
          showConfirmButton: false,
          timer: 1500
        })
        this.getProjects()
      },
      err =>  {
        Swal.fire({
          position: 'top-end',
          icon: 'warning',
          title: 'Error',
          showConfirmButton: false,
          timer: 1500
        })
        console.log(err)
      }
    )
  }

  updateProject(){
    this._store.collection('projects').doc(this.selectedProject._id).update(this.selectedProject).then(
      res => {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Proyecto actualizado',
          showConfirmButton: false,
          timer: 1500
        })
      },
      err => {
        Swal.fire({
          position: 'top-end',
          icon: 'warning',
          title: 'Error',
          showConfirmButton: false,
          timer: 1500
        }),
        console.log(this.selectedProject)
        console.log(err)
      }
    )
  }

  async deleteProject(){
    await this._store.collection('projects').doc(this.selectedProject._id).delete().then(
      res => {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Proyecto eliminado',
          showConfirmButton: false,
          timer: 1500
        })
        this.getProjects()
        this.selectedProject = this.projectPlant
      },
      err => {
        Swal.fire({
          position: 'top-end',
          icon: 'warning',
          title: 'Error',
          showConfirmButton: false,
          timer: 1500
        }),
        console.log(err)
      }
    )
  }

}

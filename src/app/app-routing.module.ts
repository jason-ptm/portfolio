import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  {
    path:'home',
    loadChildren:() => {
      return import('./components/about/about.module').then(m => m.AboutModule)
    }
  },{
    path:'projects',
    loadChildren: ()=>{
      return import('./components/projects/projects.module').then(m=>m.ProjectsModule)
    }
  },{
    path:'project/:_id',
    loadChildren: ()=>{
      return import('./components/project/project.module').then(m=>m.ProjectModule)
    }
  },{
    path:'project',
    loadChildren: ()=>{
      return import('./components/project/project.module').then(m=>m.ProjectModule)
    }
  },{
    path:'**',
    loadChildren:() => {
      return import('./components/about/about.module').then(m => m.AboutModule)
    }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{
    enableTracing: false,
    preloadingStrategy: PreloadAllModules
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }

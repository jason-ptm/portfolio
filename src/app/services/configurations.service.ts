import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigurationsService {

  lang:string = 'es'
  animations:boolean = true

  constructor() { }
}

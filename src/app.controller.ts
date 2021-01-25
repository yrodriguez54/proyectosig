import { Controller, Get, Render } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Render('home')
  async home(){
    let limitem = await this.appService.getmunici();
    let sedes = await this.appService.getSedes();
    //let hoteles = await this.appService.getHoteles();

    return { 
      limitem: encodeURIComponent(JSON.stringify(limitem)),
      //sedes: encodeURIComponent(JSON.stringify(sedes)), 
      sedes: encodeURIComponent(JSON.stringify(sedes)) }
  }

  @Get('/sedes')
  async getSedes(){
    let sedes = await this.appService.getSedes();
    return sedes
  }
  
 /* @Get('/hoteles')
  async getHoteles(){
    let hoteles = await this.appService.getHoteles();
    return hoteles
  }*/
  
}

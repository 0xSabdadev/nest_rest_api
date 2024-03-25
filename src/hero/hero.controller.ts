import { Body, Controller, Delete, Get, Header, HttpCode, Param, Post, Put, Redirect, Req, Res } from '@nestjs/common';

import { CreateHeroDto } from './dto/create-hero.dto';
import { UpdateHeroDto } from './dto/update-hero.dto';
import { HeroService } from './hero.service';

@Controller('hero')
export class HeroController {
    constructor(private heroService : HeroService){}

    @Get()
    @HttpCode(200)
    @Header('Cache-Control','none')
    index(@Res() response) {
        response.json(this.heroService.findAll())
    }
    @Get('create')
    create(@Res({passthrough:true}) response){
        response.cookie('name','baladam')
        return 'Hero Create';
    }
    @Post('store')
    store(@Req() request, @Body() createHeroDto: CreateHeroDto, @Res({passthrough:true}) response){
        this.heroService.create(createHeroDto)

        response.status(201).json(this.heroService.findAll())
    }
    @Get('welcome')
    @Redirect('https://docs.nestjs.com/')
    welcome(){
        return 'welcome'
    }
    // params
    @Get('detail/:id')
    detail(@Param('id') id:number){
        const hero = this.heroService.findAll().filter((hero)=>{
            return hero.id == id
        })
        return hero
    }

    @Put('update/:id')
    update(@Param('id') id:number, @Body() updateHeroDto:UpdateHeroDto){
        const hero = this.heroService.findAll().filter((hero)=>{
            if(hero.id == id){
                hero.nama = updateHeroDto.nama
                hero.type = updateHeroDto.type
            }
        })
        return this.heroService.findAll()
    }

    @Delete('destroy/:id')
    destroy(@Param('id') id:number){
        const hero = this.heroService.findAll().filter((hero)=>{
            return hero.id != id
        })
        return hero
    }
}
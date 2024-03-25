import { Body, Controller, Get, Header, HttpCode, Param, Post, Redirect, Req, Res } from '@nestjs/common';

import { CreateHeroDto } from './dto/create-hero.dto';
let heroes = [
    {
        id: 1, 
        nama: "Aurora",
        type: "Mage",
        gambar:"aurora.jpg",
    },
    {
        id: 2, 
        nama: "Zilong",
        type: "Fighter",
        gambar:"zilong.jpg",
    },
    {
        id: 3, 
        nama: "Akai",
        type: "Tank",
        gambar:"ekei.jpg",
    },
]
@Controller('hero')
export class HeroController {
    @Get()
    @HttpCode(204)
    @Header('Cache-Control','none')
    index(@Res() response) {
        response.json({
            title : 'hero index'
        })
    }
    @Get('create')
    create(@Res({passthrough:true}) response){
        response.cookie('name','baladam')
        return 'Hero Create';
    }
    @Post('store')
    store(@Req() request, @Body() createHeroDto: CreateHeroDto, @Res({passthrough:true}) response){
        // const  {id, nama, type , gambar} = request.body

        // heroes.push({
        //     id,
        //     nama,
        //     type,
        //     gambar
        // })

        response.status(201).json(createHeroDto)
    }
    @Get('welcome')
    @Redirect('https://docs.nestjs.com/')
    welcome(){
        return 'welcome'
    }
    // params
    @Get('detail/:id')
    detail(@Param('id') id:string){
        return 'hero by ' + id;
    }
}
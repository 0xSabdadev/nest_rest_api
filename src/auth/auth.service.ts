import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { AuthDto } from './dto/auth.dto';
import { compare } from 'bcryptjs'
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(private userService: UserService,
        private jswService:JwtService){}

    async login(dto:AuthDto){
        const user = await this.userService.findByEmail(dto.email)
        if(user && (await compare(dto.password, user.password))){
            const {password,...result} = user
            const payload = {sub: user.id, username:user.email}
            return {
                ...result,
                access_token : await this.jswService.signAsync(payload,{
                    secret:'qwerty',
                    expiresIn:'60s'
                })
            }
        }
        throw new UnauthorizedException()
    }
}

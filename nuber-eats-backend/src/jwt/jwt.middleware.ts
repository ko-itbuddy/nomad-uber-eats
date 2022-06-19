import { UsersService } from './../users/users.service';
import { JwtService } from './jwt.service';
import { Injectable, NestMiddleware, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { NextFunction } from "express";

@Injectable()
export class JwtMiddleWare implements NestMiddleware {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UsersService
  ) { }
  async use(req: Request, res: Response, next: NextFunction) {
    if ('x-jwt' in req.headers) {
      const token = req.headers['x-jwt'];
      const decoded = this.jwtService.verify(token.toString());
      if (typeof decoded === "object" && decoded.hasOwnProperty('id')) {
        try {
          const user = await this.userService.findById(decoded['id']);
          console.log(user);
          req['user'] = user;
        } catch (error) {
          throw new UnauthorizedException();
        }
      }
    }
    next();
  }
}

export function jwtMiddleWare(req: Request, res: Response, next: NextFunction) {
  console.log(req.headers);
  next();
}
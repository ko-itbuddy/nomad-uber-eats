import { JwtService } from './../jwt/jwt.service';
import { CreateAccountInput, CreateAccountOutput } from './dtos/create-account.dto';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from "@nestjs/typeorm";
import { Injectable } from '@nestjs/common';
import { LoginInput, LoginOutput } from './dtos/login.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly users: Repository<User>,
    private readonly jwtService: JwtService,
  ) { }

  async createAccount({ email, password, role }: CreateAccountInput): Promise<CreateAccountOutput> {
    try {
      const exists = await this.users.findOne({ where: { email } });
      if (exists) {
        return { ok: false, error: 'There us a user with that email already' };
      }
      await this.users.save(this.users.create({ email, password, role }));
      return { ok: true };
    } catch (e) {
      //make error
      return { ok: false, error: "couldn't create account" };
    }
    //create user & hash the password
  }


  async login({
    email,
    password,
  }: LoginInput): Promise<LoginOutput> {
    // make a JWT and give it to the user
    try {
      const user = await this.users.findOne({ where: { email } });
      if (!user) {
        return {
          ok: false,
          error: 'User not found',
        };
      }
      const passwordCorrect = await user.checkPassword(password);
      if (!passwordCorrect) {
        return {
          ok: false,
          error: 'Wrong password',
        };
      }
      const token = this.jwtService.sign({ id: user.id });
      return {
        ok: true,
        token
      };
    } catch (error) {
      return {
        ok: false,
        error,
      };
    }
  }
}
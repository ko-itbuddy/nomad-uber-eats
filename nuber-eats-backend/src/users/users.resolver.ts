import { AuthGuard } from './../auth/auth.guard';
import { LoginInput, LoginOutput } from './dtos/login.dto';
import { CreateAccountOutput, CreateAccountInput } from './dtos/create-account.dto';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { Args, Context, Mutation, Query, Resolver } from "@nestjs/graphql";
import { UseGuards } from '@nestjs/common';
import { AuthUser } from './auth-user.decorator';

@Resolver(of => User)
export class UsersResolver {
  constructor(
    private readonly usersService: UsersService
  ) { }
  @Query(returns => Boolean)
  hi() {
    return true;
  }

  @Mutation(returns => CreateAccountOutput)
  async createAccount(@Args("input") createAccountInput: CreateAccountInput): Promise<CreateAccountOutput> {
    try {
      const { ok, error } = await this.usersService.createAccount(createAccountInput);

      return {
        ok,
        error
      }
    } catch (error) {
      return {
        ok: false,
        error
      }
    }
  }

  @Mutation(returns => LoginOutput)
  async login(@Args('input') loginInput: LoginInput): Promise<LoginOutput> {
    try {
      return this.usersService.login(loginInput);
    } catch (error) {
      return {
        ok: false,
        error,
      };
    }
  }

  @Query(returns => User)
  @UseGuards(AuthGuard)
  me(@AuthUser() authUser: User) {
    console.log(authUser);
    return authUser;
  }
}
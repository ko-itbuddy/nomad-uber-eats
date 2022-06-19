import { LoginInput, LoginOutput } from './dtos/login.dto';
import { CreateAccountOutput, CreateAccountInput } from './dtos/create-account.dto';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { Args, Context, Mutation, Query, Resolver } from "@nestjs/graphql";

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
  me(@Context() context) {
    if (!context.user) {
      return;
    } else {
      return context.user;
    }
  }
}
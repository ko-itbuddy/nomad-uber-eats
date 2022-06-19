import { CreateAccountOutput, CreateAccountInput } from './dtos/create-account.dto';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";

@Resolver(of => User)
export class UsersResolver {
  constructor(
    private readonly userService: UsersService
  ) { }
  @Query(returns => Boolean)
  hi() {
    return true;
  }

  @Mutation(returns => CreateAccountOutput)
  async createAccount(@Args("input") createAccountInput: CreateAccountInput): Promise<CreateAccountOutput> {
    try {
      const { ok, error } = await this.userService.createAccount(createAccountInput);

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
}
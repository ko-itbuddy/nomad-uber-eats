import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { Query, Resolver } from "@nestjs/graphql";

@Resolver(of => User)
export class UsersResolver {
  constructor(
    private readonly userService: UsersService
  ) { }
  @Query(returns => Boolean)
  hi() {
    return true;
  }
}
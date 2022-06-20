import { UserProfileInput, UserProfileOutput } from './dtos/user-profile.dto';
import { AuthGuard } from './../auth/auth.guard';
import { LoginInput, LoginOutput } from './dtos/login.dto';
import { CreateAccountOutput, CreateAccountInput } from './dtos/create-account.dto';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { UseGuards } from '@nestjs/common';
import { AuthUser } from '../auth/auth-user.decorator';
import { EditProfileInput, EditProfileOutput } from './dtos/edit-profile.dto';

@Resolver(of => User)
export class UsersResolver {
  constructor(
    private readonly usersService: UsersService
  ) { }

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
  async me(@AuthUser() authUser: User) {
    console.log(authUser);
    return authUser;
  }

  @UseGuards(AuthGuard)
  @Query(returns => UserProfileOutput) 
  async userProfile(@Args() userProfileInput: UserProfileInput): Promise<UserProfileOutput> {
    try {
      const user = await this.usersService.findById(userProfileInput.userId);
      if (!user) {
        throw Error();
      }
      return {
        ok: true,
        user,
      }
    } catch (error) {
      return {
        ok: false,
        error: 'User Not Found'
      }
    }
  }
  
  @UseGuards(AuthGuard)
  @Mutation(returns => EditProfileOutput)
  async editProfile
    (@AuthUser() authUser:User,
      @Args("input") editProfileInput: EditProfileInput,
      ): Promise<EditProfileOutput> { 
    
    try {
     await this.usersService.editProfile(authUser.id, editProfileInput);
      return {
        ok: true
      }
    } catch (error) {
      return {
        ok: false,
        error
      }
    }
  }


}
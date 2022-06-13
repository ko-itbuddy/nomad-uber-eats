import { ArgsType, Field, InputType } from "@nestjs/graphql"

@ArgsType()
export class createRestaurantDto {
  @Field(type => String)
  name: string;

  @Field(type => Boolean)
  isVegan: string;

  @Field(type => String)
  address: string;

  @Field(type => String)
  ownerName: string;

}


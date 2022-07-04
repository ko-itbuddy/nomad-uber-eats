import { InputType, ObjectType, PickType } from "@nestjs/graphql";
import { CoreOutPut } from "src/common/dtos/output.dto";
import { Verification } from "../entities/verification.entiry";

@ObjectType()
export class VerifyEmailOutPut extends CoreOutPut { }

@InputType()
export class VerifyEmailInput extends PickType(Verification, ['code']) { }
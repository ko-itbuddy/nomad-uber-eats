import { CONFIG_OPTIONS } from './jwt.constants';
import { JwtModuleOptions } from './jwt.interfaces';
import { DynamicModule, Global, Module } from '@nestjs/common';
import { JwtService } from './jwt.service';

@Global()
@Module({
  providers: [JwtService]
})
export class JwtModule {
  static forRoot(options: JwtModuleOptions): DynamicModule {
    return {
      module: JwtModule,
      providers: [
        {
          provide: CONFIG_OPTIONS,
          useValue: options
        },
        JwtService
      ],
      exports: [JwtService],
    }
  }
}

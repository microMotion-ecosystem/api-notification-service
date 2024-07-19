import {Controller, Get, UseGuards,} from '@nestjs/common';
import {AppService} from '../services/app.service';
import {ApiBearerAuth, ApiOperation, ApiResponse} from "@nestjs/swagger";
import {JwtAuthGuard} from "../core/jwt-auth-guard/jwt-auth.guard";

@Controller()
export class AppController {
    constructor(private readonly appService: AppService) {
    }


    @Get()
    // @ApiBearerAuth('access-token')
    // @ApiOperation({summary: 'Check if the API is working'})
    // @ApiResponse({status: 200, description: 'API is working correctly.'})
    isWorking(): string {
        return this.appService.isWorking();
    }


    @UseGuards(JwtAuthGuard)
    @Get('api/v1/demo')
    @ApiBearerAuth('access-token')
    @ApiOperation({summary: 'Demo route'})
    @ApiResponse({status: 200, description: 'Returns a demo text.'})
    demo(): string {
        return 'demo';
    }
}

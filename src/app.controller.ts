import { GoogleOAuthGuard } from './security/google-oauth-guard';
import { Controller, Get, HttpException, HttpStatus, Post, Req, Request, Response, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('auth')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @UseGuards(GoogleOAuthGuard)
  async googleAuth(@Request() req) {}

  @Get('google-redirect')
  @UseGuards(GoogleOAuthGuard)
  googleAuthRedirect(@Request() req, @Response() res) {
    return this.appService.googleLogin(req, res);
  }

  async verifyToken(accessToken) {
    console.log(`>>>about to verify ${accessToken}`);
    
    let res = await fetch(`https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=${accessToken}`, {
      method: 'POST'
    });
    let json = await res.json();

    console.log(`token verified to ${JSON.stringify(json)}`);

    return json;
  }

  @Post('validate')
  async validateToken(@Req() req, res) {
    if(!req.cookies) {
      console.log(`validate request doesn't have cookie`);
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }
    if(!req.cookies.accessToken) {
      console.log(`validate request can't get accessToken`);
      throw new HttpException('no accessToken found', HttpStatus.UNAUTHORIZED);
    }
    console.log(`>>>>>validate() called w/ ${req.cookies.accessToken}`);

    return await this.verifyToken(req.cookies.accessToken);
  }
}

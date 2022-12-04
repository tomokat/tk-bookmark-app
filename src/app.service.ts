import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  googleLogin(req, res) {
    if(!req.user) {
      return 'No user from google';
    }

    console.log(`user ${JSON.stringify(req.user)}`);

    res.cookie('accessToken', req.user.accessToken, {
      httpOnly: true
    });
    
    console.log(`>>>successfully get ${req.user.accessToken}`);
    res.redirect('/');
  }
}

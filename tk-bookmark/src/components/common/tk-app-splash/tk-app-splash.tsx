import { Component, Event, EventEmitter, getAssetPath, h } from '@stencil/core';

@Component({
  tag: 'tk-app-splash',
  styleUrl: 'tk-app-splash.css',
  shadow: false,
  assetsDirs: ['../assets']
})
export class TkAppSplash {

  @Event() requestLoginAsGuest : EventEmitter;

  loginAsGuest() {
    console.log(`loginAsGuest requested`);
    this.requestLoginAsGuest.emit();
  }

  render() {
    return (
      <div>
        <header class="w3-container w3-top w3-xlarge w3-padding-16">
          <span class="w3-left w3-padding" style={{color:'white'}}>Bookmark Application</span>
        </header>

        <div class="w3-main app-main"> 
          <div class="" style={{marginTop:'83px'}}></div>
          <div class="w3-center w3-padding-16">
            By "Sign in with Google", you can create your own bookmarks/labels
          </div>
          <div class="tk-bookmark-container w3-center" style={{padding: '5px'}}>
            <a href="/auth">
            <img src={getAssetPath('../assets/btn_google_signin_dark_normal_web@2x.png')} alt="" />
            </a>
          </div>
          <div class="w3-center w3-padding-16">
            <a class="loginAsGuestLink" onClick={()=>this.loginAsGuest()}>Or you can login as guest</a>
          </div>
        </div>

        <div class="footer">
          <p>Made with Stencil JS, Nest JS, Mongoose and MongoDB</p>
        </div>        
      </div>
    );
  }

}

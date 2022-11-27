import { Component, h, Listen, State } from '@stencil/core';
import { SlDialog, SlInput } from '@shoelace-style/shoelace';

//import state from '../../../stores/tk-bookmark-store';

import { version } from '../../../../package.json';
import { version as backendVersion } from '../../../../../package.json';


import hotkeys from 'hotkeys-js';

@Component({
  tag: 'tk-bookmark-app-root',
  styleUrl: 'tk-bookmark-app-root.css',
  shadow: false,
})
export class AppRoot {

  @State() sideMenuOpen = false;

  @Listen('notifyLabelSelection')
  async notifyLabelSelectionHanlder(event) {
    let labels = event.detail;
    let filterLabels = [];
    labels.map(label=> {
      if(label.selected) {
        filterLabels.push(label.caption);
      }
    });
    console.log(`detected label selection change ${filterLabels}`);

    await customElements.whenDefined('tk-bookmark-list');
    let element = document.querySelector('tk-bookmark-list');
    element.setLabelFilterList(filterLabels);
  }

  @Listen('deleteLabelSuccess')
  @Listen('updateLabelSuccess')
  async reloadBookmarkListHandler() {
    await customElements.whenDefined('tk-bookmark-list');
    let element = document.querySelector('tk-bookmark-list');
    console.log(`calling function`);
    element.reloadBookmarkList();
  }

  componentWillRender() {
    this.initializeHotKeys();
  }

  shouldTrigger(event) {
    let target = event.target as Element;
    let tagName = target.tagName;
    return tagName === 'BODY';
  }

  initializeHotKeys() {
    hotkeys('shift+/', event => {
      if(this.shouldTrigger(event)) {
        console.log(`help dialog requested`);
        this.toggleHelpModal(true);
      }
    });

    hotkeys('b, s, l', (event, handler) => {
      if(this.shouldTrigger(event)) {
        console.log(`set focus on bookmark search requested`);
        if(handler.key === 'b' || handler.key === 's') {
          this.setFocusOn('.bookmarkListFilter');
        } else if(handler.key === 'l') {
          this.setFocusOn('.labelListFilter');
        }
        event.preventDefault();
      }
    });
  }

  setFocusOn(targetClassName) {
    const input = document.querySelector(targetClassName) as SlInput;
    if(input) {
      input.focus();
    }
  }

  toggleHelpModal(open: boolean) {
    const dialog = document.querySelector('.help-dialog') as SlDialog;
    if(open) {
      dialog.show();
    } else {
      dialog.hide();
    }
  }

  renderHelpDialog() {
    return (
      <sl-dialog label="Help" class="help-dialog">
        <sl-badge>?</sl-badge> = open help dialog<br/>
        <sl-badge>b, s</sl-badge> = set focus on boomkark filter<br/>
        <sl-badge>l</sl-badge> = set focus on label filter<br/>
        <sl-divider></sl-divider>
        <div>Component version: {version} </div>
        <div>Backend version: {backendVersion} </div>
      </sl-dialog>
    );
  }

  void() {

  }

  toggleSideMenu(show) {
    this.sideMenuOpen = show;

    let sideMenu = document.querySelector('.w3-sidebar') as HTMLElement;
    let overlay = document.querySelector('.w3-overlay') as HTMLElement;
    if(show) {
      sideMenu.style.display = 'block';
      overlay.style.display = 'block';
    } else {
      sideMenu.style.display = 'none';
      overlay.style.display = 'none';
    }
  }

  isMobileView() {
    let headerElement = document.querySelector('header') as HTMLElement;
    if(!headerElement) {
      return false;
    }
    return headerElement.style.display !== 'none';
  }

  getTitle() {
    if(this.isMobileView()) {
      return 'Manage labels';
    }
    return 'Bookmark Application';
  }

  render() {
    return (
      <div>
        {this.renderHelpDialog()}

        {/* Sidebar/menu */}
        <nav class="w3-sidebar w3-bar-block w3-white w3-animate-left w3-text-grey w3-collapse w3-top"
          style={{zIndex: '3', width:'300px', fontWeight:'bold'}} id="mySidebar"><br/>
          {/* <h1 style={{padding: '3px'}}>
            <sl-icon name="journal-check" style={{paddingRight: '5px'}}></sl-icon>
            Bookmark Application
          </h1> */}
          <h3 class="w3-center" style={{padding: '5px'}}>{this.getTitle()}</h3>
          <div style={{padding:'5px'}}>
            <tk-bookmark-label></tk-bookmark-label>
          </div>
        </nav>

        <header class="w3-container w3-top w3-hide-large w3-xlarge w3-padding-16">
          <span class="w3-left w3-padding" style={{color:'white'}}>Bookmark Application</span>
          <a href="javascript:void(0)" class="w3-right w3-button w3-white"
            onClick={()=>this.toggleSideMenu(!this.sideMenuOpen)}>☰</a>
        </header>

        <div class="w3-overlay w3-hide-large w3-animate-opacity" 
          onClick={()=>this.toggleSideMenu(false)}
          style={{cursor:'pointer'}} title="close side menu" id="myOverlay"></div>

        <div class="w3-main app-main" style={{marginLeft:'300px'}}> 
          <div class="w3-hide-large" style={{marginTop:'83px'}}></div>
          <div class="tk-bookmark-container" style={{padding: '5px'}}>
            <tk-bookmark></tk-bookmark>
          </div>
        </div>

        <div class="footer">
          <p>Made with Stencil JS, Nest JS, Mongoose and MongoDB</p>
        </div>
      </div>
    );
  }

}

import { Component, h, Listen } from '@stencil/core';
import { SlDialog, SlInput } from '@shoelace-style/shoelace';

//import state from '../../../stores/tk-bookmark-store';

import { version } from '../../../../../package.json';

import hotkeys from 'hotkeys-js';

@Component({
  tag: 'tk-bookmark-app-root',
  styleUrl: 'tk-bookmark-app-root.css',
  shadow: false,
})
export class AppRoot {

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
        <div>Version: {version} </div>
      </sl-dialog>
    );
  }

  render() {
    return (
      <div>
        {this.renderHelpDialog()}
        <div class="header">
          <h1 style={{padding: '3px'}}>
            <sl-icon name="journal-check" style={{paddingRight: '5px'}}></sl-icon>
            Bookmark Application
          </h1>
        </div>
        
        <div class="row">
          <div class="col-3 col-s-3 menu">
            <tk-bookmark-label></tk-bookmark-label>
          </div>
          <div class="col-9 col-s-9">
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

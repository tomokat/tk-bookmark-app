import { Component, h, Listen, State } from '@stencil/core';
import state from '../../../stores/tk-bookmark-store';

@Component({
  tag: 'tk-bookmark',
  shadow: false,
})
export class TkBookmark {

  @State() isEditMode = false;

  @Listen('closeAddBookmark')
  @Listen('toggleBookmarkMode')
  async toggleBookmarkModeHandler() {
    this.isEditMode = !this.isEditMode;
  }

  @Listen('addBookmarkSuccess')
  @Listen('deleteBookmarkSuccess')
  @Listen('updateBookmarkSuccess')
  async reloadBookmarkLabelHandler(event) {
    console.log(`received event - about to refresh bookmark list ${event.detail}`);
    let detail = event.detail;
    
    if(detail && detail.reloadLabel) {
      await customElements.whenDefined('tk-label-list');
      let element = document.querySelector('tk-label-list');
      element.reloadLabelList();
    }

    await customElements.whenDefined('tk-bookmark-list');
    let element = document.querySelector('tk-bookmark-list');
    
    if(!detail || !detail.stayInAdd) {
      this.isEditMode = false;
    }
    element.reloadBookmarkList();

    
  };

  renderNormal() {
    return (
      <div>
        <tk-bookmark-bar></tk-bookmark-bar>
        <tk-bookmark-list></tk-bookmark-list>
      </div>
    );
  }

  renderEditMode() {
    return (
      <div>
        <tk-bookmark-bar></tk-bookmark-bar>
        <tk-add-or-edit-bookmark forNewBookmark={true} existingTags={state.labels}></tk-add-or-edit-bookmark>
        <tk-bookmark-list></tk-bookmark-list>
      </div>
    )
  }

  render() {
    if(this.isEditMode) {
      return this.renderEditMode();
    }
    return this.renderNormal();
  }

}

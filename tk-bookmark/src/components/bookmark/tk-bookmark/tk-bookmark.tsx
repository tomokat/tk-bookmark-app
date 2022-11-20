import { Component, h, Listen, State } from '@stencil/core';

@Component({
  tag: 'tk-bookmark',
  shadow: false,
})
export class TkBookmark {

  @State() isEditMode = false;

  @Listen('toggleBookmarkMode')
  async toggleBookmarkModeHandler() {
    this.isEditMode = !this.isEditMode;
  }

  @Listen('addBookmarkSuccess')
  @Listen('deleteBookmarkSuccess')
  @Listen('updateBookmarkSuccess')
  async reloadBookmarkLabelHandler() {
    console.log(`received event - about to refresh bookmark list`);
    
    await customElements.whenDefined('tk-bookmark-list');
    let element = document.querySelector('tk-bookmark-list');
    console.log(`calling function`);
    this.isEditMode = false;
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
        <tk-add-or-edit-bookmark forNewBookmark={true}></tk-add-or-edit-bookmark>
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

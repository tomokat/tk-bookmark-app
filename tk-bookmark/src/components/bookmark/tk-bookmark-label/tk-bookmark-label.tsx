import { Component, Listen, h, State } from '@stencil/core';

@Component({
  tag: 'tk-bookmark-label',
  shadow: false,
})
export class TkBookmarkLabel {

  @State() isEditMode = false;

  @Listen('addLabelSuccess')
  @Listen('updateLabelSuccess')
  async reloadBookmarkLabelHandler() {
    console.log(`received addLabelSuccess event - about to refresh the label`);
    
    await customElements.whenDefined('tk-label-list');
    let element = document.querySelector('tk-label-list');
    console.log(`calling function`);
    element.reloadLabelList();
  };

  @Listen('toggleLabelMode')
  async toggleLabelModeHandler() {
    this.isEditMode = !this.isEditMode;
  }

  renderNormal() {
    return (
      <div>
        <tk-bookmark-label-bar></tk-bookmark-label-bar>
        <tk-label-list isEditMode={this.isEditMode}></tk-label-list>
      </div>
    );
  }

  renderEditMode() {
    return (
      <div>
        <tk-bookmark-label-bar></tk-bookmark-label-bar>
        <tk-add-label></tk-add-label>
        <tk-label-list isEditMode={this.isEditMode}></tk-label-list>
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

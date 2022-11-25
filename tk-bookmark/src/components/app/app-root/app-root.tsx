import { Component, h, Listen } from '@stencil/core';
import state from '../../../stores/tk-bookmark-store';

@Component({
  tag: 'app-root',
  styleUrl: 'app-root.css',
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
  

  render() {
    return (
      <div>
        <div class="header">
          <h1>Bookmark Application</h1>
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

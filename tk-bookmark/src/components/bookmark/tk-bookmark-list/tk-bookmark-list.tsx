import { Component, Event, EventEmitter, Method, h, State, Listen } from '@stencil/core';
import { SlDialog } from '@shoelace-style/shoelace';

import state from '../../../stores/tk-bookmark-store';
import { convertLabelIdsToLabels, getLabelIdsFromExistingLabels } from '../../../utils/tk-bookmark-app-utils';

@Component({
  tag: 'tk-bookmark-list',
  shadow: false,
})
export class TkBookmarkList {

  @Event() deleteBookmarkSuccess: EventEmitter;
  @Event() updateBookmarkSuccess: EventEmitter;

  //@Prop() isEditMode = true;
  //@Prop() loadedLabel: boolean;

  @State() bookmarkInAction;
  @State() bookmarkList;

  filterValue;
  labelFilterList;

  componentWillLoad() {
    this.getBookmarkData();
  }

  @Method()
  async setLabelFilterList(list) {
    this.labelFilterList = list;
    this.filterBookmarkList();
  }

  @Method()
  async reloadBookmarkList() {
    this.getBookmarkData();
  }

  @Listen('requestEditBookmark')
  requestEditBookmarkHandler(event: CustomEvent) {
    this.bookmarkInAction = event.detail;
    console.log(`received requestEditBookmark event with ${JSON.stringify(this.bookmarkInAction)}`);
    this.toggleEditBookmarkModal(true);
  }

  @Listen('notifyUpdateRequestObject')
  notifyUpdateRequestObjectHandler(event: CustomEvent) {
    this.bookmarkInAction = event.detail;
  }

  async waitUntilLabelLoaded() {
    const loaded = new Promise((resolve)=> {
      if(!state.loadedLabel) {
        const fns = setInterval(()=> {
          if(state.loadedLabel) {
            console.log(`label loaded, resolving promise now`);
            clearInterval(fns);
            resolve('done');
          } else {
            console.log(`label not loaded still, waiting ....`);
          }
        }, 100);
      } else {
        return resolve('done');
      }
    });
    await loaded;
  }

  async appendLabelsForDisplay(bookmarkList) {
    //wait until label get loaded
    await this.waitUntilLabelLoaded();
    console.log(`appendLabelsForDisplay done waiting for label`);

    bookmarkList.map(bookmark => {
      let labelsForDisplay = convertLabelIdsToLabels(bookmark.labels, state.labels);
      bookmark.labelsForDisplay = labelsForDisplay;
    });
    this.bookmarkList = [...bookmarkList];
  }

  async getBookmarkData() {
    let response = await fetch('http://localhost:3000/bookmark');
    let json = await response.json();
    await this.appendLabelsForDisplay(json);
    state.bookmarks = this.bookmarkList;
    this.filterBookmarkList();
    return;
  }

  async updateBookmarkData() {
    if(!this.bookmarkInAction || !this.bookmarkInAction._id) {
      return;
    }

    let labelIds = await getLabelIdsFromExistingLabels(state.labels);
    
    let requestObject = {
      title: this.bookmarkInAction.title,
      url: this.bookmarkInAction.url,
      labels: labelIds,
      notes: this.bookmarkInAction.notes
    };
    let response = await fetch(`http://localhost:3000/bookmark/${this.bookmarkInAction._id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestObject)
    }).then(()=> {
      this.toggleEditBookmarkModal(false);
      this.updateBookmarkSuccess.emit();
    });
  }

  async deleteBookmarkData() {
    if(!this.bookmarkInAction || !this.bookmarkInAction._id) {
      return;
    }
    let response = await fetch(`http://localhost:3000/bookmark/${this.bookmarkInAction._id}`, {
      method: 'DELETE'
    }).then(()=> {
      this.toggleEditBookmarkModal(false);
      this.deleteBookmarkSuccess.emit();
    });
  }

  toggleEditBookmarkModal(open: boolean) {
    const dialog = document.querySelector('.edit-bookmark-dialog') as SlDialog;
    if(open) {
      dialog.show();
    } else {
      dialog.hide();
    }
  }

  checkLabelFilter(bookmark) {
    if(!this.labelFilterList) {
      return true;
    }

    let result = true;
    this.labelFilterList.map(label => {
      if(result && !bookmark.labelsForDisplay.includes(label)) {
        result = false;
      }
    });
    return result;
  }

  filterBookmarkList() {
    //console.log(`bookmark fiter: ${filterValue}`);
    this.bookmarkList = state.bookmarks;

    this.bookmarkList = this.bookmarkList.filter(bookmark=> {
      return this.checkLabelFilter(bookmark)
    });

    if(this.filterValue && this.filterValue.trim()) {
      let filterList = this.bookmarkList.filter(bookmark=> {
        return (bookmark.title.toLowerCase().includes(this.filterValue.toLowerCase()) ||
          bookmark.notes.toLowerCase().includes(this.filterValue.toLowerCase()));
      });
      this.bookmarkList = [...filterList];
    }
  }

  updateFilterValue(event) {
    this.filterValue = event.target.value;
    this.filterBookmarkList();
  }

  renderEditBookmarkDialog() {
    return (
      <sl-dialog label="Edit bookmark" class="edit-bookmark-dialog">
        <tk-add-or-edit-bookmark bookmark={this.bookmarkInAction}></tk-add-or-edit-bookmark>
        <sl-button slot="footer" variant="primary"
          onClick={()=>this.updateBookmarkData()}>Update</sl-button>
        <sl-button slot="footer" variant="danger"
          onClick={()=>this.deleteBookmarkData()}>Delete</sl-button>
        {/* <sl-button slot="footer" variant="text"
          onClick={()=>this.toggleEditBookmarkModal(false)}>Cancel</sl-button> */}
      </sl-dialog>
    );
  }

  renderBookmarkFilter() {
    return (
      <sl-input class="bookmarkListFilter" size="medium" style={{paddingBottom: '5px'}}
        onKeyUp={(event)=> {this.updateFilterValue(event)}}>
        <sl-icon name="search" slot="prefix"></sl-icon>
        <sl-badge slot="suffix" pill>{this.bookmarkList.length}/{state.bookmarks.length}</sl-badge>
      </sl-input>
    );
  }

  renderEditMode() {
    return (
      <div>
      {this.renderEditBookmarkDialog()}
      {this.renderBookmarkFilter()}
      { this.bookmarkList.map(bookmark =>
        <tk-bookmark-list-item bookmark={bookmark}></tk-bookmark-list-item>
      )}
      </div>
    );
  }

  render() {
    if(!this.bookmarkList) {
      return;
    } 

    return this.renderEditMode();
  }

}

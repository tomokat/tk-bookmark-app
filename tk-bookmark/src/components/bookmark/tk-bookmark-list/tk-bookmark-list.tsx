import { Prop } from '@nestjs/mongoose';
import { Component, Event, EventEmitter, Method, h, State, Listen } from '@stencil/core';
import { SlDialog } from '@shoelace-style/shoelace';

@Component({
  tag: 'tk-bookmark-list',
  shadow: false,
})
export class TkBookmarkList {

  @Event() deleteBookmarkSuccess: EventEmitter;
  @Event() updateBookmarkSuccess: EventEmitter;

  @Prop() isEditMode = true;

  @State() bookmarkInAction;

  @State() bookmarkList;

  componentWillLoad() {
    this.getBookmarkData();
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

  async getBookmarkData() {
    let response = await fetch('http://localhost:3000/bookmark');
    let json = await response.json();
    this.bookmarkList = [...json];
    return;
  }

  async updateBookmarkData() {
    if(!this.bookmarkInAction || !this.bookmarkInAction._id) {
      return;
    }
    let requestObject = {
      title: this.bookmarkInAction.title,
      url: this.bookmarkInAction.url,
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

  renderNormal() {
    return (
      <div>
        {this.renderEditBookmarkDialog()}
        Norma
      </div>
    );
  }

  renderBookmark(bookmark) {
    return (
      <sl-card class="card-header">
        <div slot="header">
          <a href={bookmark.url} title={bookmark.title} target="_blank">
            {bookmark.title}
          </a>
          <sl-icon-button name="gear" label="Settings"></sl-icon-button>
        </div>
        {bookmark.notes}
      </sl-card>
    );
  }

  renderEditMode() {
    return (
      <div>
      {this.renderEditBookmarkDialog()}
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

    if(this.isEditMode) {
      return this.renderEditMode();
    }
    return this.renderNormal();
  }

}

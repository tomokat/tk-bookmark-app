import { Prop } from '@nestjs/mongoose';
import { Component, Event, EventEmitter, h, State } from '@stencil/core';

@Component({
  tag: 'tk-add-or-edit-bookmark',
  shadow: false,
})
export class TkAddBookmark {

  @Event() addBookmarkSuccess: EventEmitter;
  @Event() notifyUpdateRequestObject: EventEmitter;

  @Prop() forNewBookmark: boolean;
  @Prop() bookmark;

  @State() requestObject;

  componentWillRender() {
    this.initialize();
  }

  initialize() {
    this.requestObject = {
      title: '',
      url: '',
      notes: ''
    };
    
    if(!this.forNewBookmark) {
      this.requestObject = {...this.bookmark};
    }
  }

  handleRequestObjectChange(key, value) {
    this.requestObject[key] = value;
    this.notifyUpdateRequestObject.emit(this.requestObject);
  }

  addBookmarkData() {
    let response = fetch('http://localhost:3000/bookmark', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(this.requestObject)
    }).then(()=> {
      this.addBookmarkSuccess.emit();
    });
  }

  renderActionBar() {
    if(this.forNewBookmark) {
      return (
        <div>
          <sl-button variant="primary"
            onClick={()=>this.addBookmarkData()}>Add</sl-button>
          <sl-button variant="default">Next</sl-button>
          <sl-button variant="text">Cancel</sl-button>
        </div>
      );
    }
  }

  render() {
    return (
      <div>
        <sl-input name="bookmarkTitle" placeholder="Title" value={this.requestObject.title}
          onBlur={(e)=>this.handleRequestObjectChange('title', e.target.value)}>  
        </sl-input>
        <sl-input name="bookmarkUrl" placeholder="URL" value={this.requestObject.url}
          onBlur={(e)=>this.handleRequestObjectChange('url', e.target.value)}>  
        </sl-input>
        <sl-textarea name="bookmarkNotes" label="Notes" value={this.requestObject.notes}
          onBlur={(e)=>this.handleRequestObjectChange('notes', e.target.value)}></sl-textarea>
        
        {this.renderActionBar()}
      </div>
    );
  }

}

import { Prop } from '@nestjs/mongoose';
import { Component, Event, EventEmitter, h, State } from '@stencil/core';

import state from '../../../stores/tk-bookmark-store';
import { getLabelIdsFromExistingLabels } from '../../../utils/tk-bookmark-app-utils';

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

  async initialize() {
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

  async createLabel(requestData) {
    return fetch(`${state.bookmarkApi}/label`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestData)
    }).then(res => res.json());
  }

  async createNewLabelIds() {
    let newLabelIds = [];

    let newLabels = await document.querySelector('tk-add-tags').getTags();
    let existingLabels = state.labels;
    console.log(`size of new labels: ${newLabels.length}`);
    console.log(`size of existing labels: ${state.labels.length}`);

    //goal is to construct newLabelIds[]
    newLabels.map(async newLabel => {
      let existingLabel = existingLabels.find(label => label.caption.toLowerCase() === newLabel.caption.toLowerCase());
      if(existingLabel) {
        console.log(`found ${existingLabel.caption} within existing label list`);
        newLabelIds.push(existingLabel._id);
      } else {
        console.log(`found new label: ${newLabel.caption}`);
        //let newLabelData = await this.createLabel({caption: newLabel.caption});
        //newLabelIds.push(newLabelData._id);
      }
    });
    console.log(`constructed ids: ${newLabelIds}`);
    return newLabelIds;
  }

  async addBookmarkData() {
    let newLabelIds = await getLabelIdsFromExistingLabels(state.labels);
    this.requestObject['labels'] = newLabelIds;
    
    fetch(`${state.bookmarkApi}/bookmark`, {
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

  convertToCurrentTags() {
    let existingLabels = state.labels;
    let currentTags = [];

    if(this.requestObject.labels) {
      this.requestObject.labels.map(labelId => {
        let existingLabel = existingLabels.find(existingLabel => existingLabel._id === labelId);
        if(existingLabel) {
          currentTags.push({caption: existingLabel.caption})
        }
      });
    }
    return currentTags;
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
        <tk-add-tags currentTags={this.convertToCurrentTags()} existingTags={state.labels}></tk-add-tags>
        <sl-textarea name="bookmarkNotes" label="Notes" value={this.requestObject.notes}
          onBlur={(e)=>this.handleRequestObjectChange('notes', e.target.value)}></sl-textarea>

        {console.log(`tk-add-or-edit-bookmark passing ${JSON.stringify(this.requestObject)}`)}
        
        {this.renderActionBar()}
      </div>
    );
  }

}

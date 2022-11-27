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
  @Event() closeAddBookmark: EventEmitter;
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

  clearForm() {
    let titleInput = document.querySelector('.bookmarkTitle') as HTMLInputElement;
    titleInput.value = '';
    let urlInput = document.querySelector('.bookmarkUrl') as HTMLInputElement;
    urlInput.value = '';
    let notesInput = document.querySelector('.bookmarkNotes') as HTMLInputElement;
    notesInput.value = '';
    titleInput.focus();

    this.requestObject = {
      title: '',
      url: '',
      notes: ''
    };
    this.requestObject = {...this.requestObject};
  }

  async createNewLabelIds() {
    let newLabelIds = [];

    let newLabels = await document.querySelector('tk-add-tags').getTags();
    let existingLabels = state.labels;
    console.log(`size of new labels: ${newLabels.length}`);
    console.log(`size of existing labels: ${state.labels.length}`);

    //goal is to construct newLabelIds[]
    newLabels.map(async newLabel => {
      let existingLabel = existingLabels.find(label => {
        return label.caption.toLowerCase() === newLabel.caption.toLowerCase();
      });
      if(existingLabel) {
        console.log(`found ${existingLabel.caption} within existing label list`);
        newLabelIds.push(existingLabel._id);
      } else {
        console.log(`found new label: ${newLabel.caption}`);
        let newLabelData = await this.createLabel({caption: newLabel.caption});
        newLabelIds.push(newLabelData._id);
      }
    });
    console.log(`constructed ids: ${newLabelIds}`);
    return newLabelIds;
  }

  async addBookmarkData(stayInAdd) {
    let newLabelIds = await getLabelIdsFromExistingLabels(state.labels);
    this.requestObject['labels'] = newLabelIds;
    
    fetch(`${state.bookmarkApi}/bookmark`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(this.requestObject)
    }).then(()=> {
      if(stayInAdd) {
        this.clearForm();
      }
      this.addBookmarkSuccess.emit({stayInAdd: stayInAdd, reloadLabel: true});
    });
  }

  cancelAdd() {
    this.closeAddBookmark.emit();
  }

  renderActionBar() {
    if(this.forNewBookmark) {
      return (
        <div style={{padding: '5px'}}>
          <sl-button variant="primary" style={{padding: '5px'}}
            onClick={()=>this.addBookmarkData(false)}>Add</sl-button>
          <sl-button variant="default"
            onClick={()=>this.addBookmarkData(true)}>Next</sl-button>
          <sl-button variant="text"
            onClick={()=>this.cancelAdd()}>Cancel</sl-button>
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
    console.log(`render() called w/ ${JSON.stringify(this.requestObject)}`);
    return (
      <div style={{padding: '5px', backgroundColor: 'cornsilk'}}>
        <sl-input class="bookmarkTitle" name="bookmarkTitle" placeholder="Title" value={this.requestObject.title}
          onBlur={(e)=>this.handleRequestObjectChange('title', e.target.value)}>  
        </sl-input>
        <sl-input class="bookmarkUrl" name="bookmarkUrl" placeholder="URL" value={this.requestObject.url}
          onBlur={(e)=>this.handleRequestObjectChange('url', e.target.value)}>  
        </sl-input>
        <tk-add-tags currentTags={this.convertToCurrentTags()} existingTags={state.labels}></tk-add-tags>
        <sl-textarea class="bookmarkNotes" name="bookmarkNotes" label="Notes" value={this.requestObject.notes}
          onBlur={(e)=>this.handleRequestObjectChange('notes', e.target.value)}></sl-textarea>

        {console.log(`tk-add-or-edit-bookmark passing ${JSON.stringify(this.requestObject)}`)}
        
        {this.renderActionBar()}
      </div>
    );
  }

}

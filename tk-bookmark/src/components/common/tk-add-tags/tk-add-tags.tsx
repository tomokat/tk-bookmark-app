import { Prop } from '@nestjs/mongoose';
import { Component, Event, EventEmitter, h, State, Method, Watch } from '@stencil/core';

import { SlDropdown } from '@shoelace-style/shoelace';

@Component({
  tag: 'tk-add-tags',
  styleUrl: 'tk-add-tags.css',
  shadow: false,
})
export class TkAddTags {

  @Event() notifyUpdateTags: EventEmitter;

  @Prop() existingTags;
  @Prop() currentTags;

  @State() tags = [];

  enteredLabelValue;
  @State() matchedTags = [];

  @Method()
  async getTags() {
    return this.tags;
  }

  @Watch('currentTags')
  currentTagsHandler () {
    //console.log(`currentTags has been updated`);
    if(this.currentTags) {
      this.tags = [...this.currentTags];
    } else {
      //console.log(`currentTags is empty?!`);
    }
  }

  componentWillLoad() {
    
  }

  convertValueToTags(event, value) {
    if(this.matchedTags.length > 0) {
      return;
    }

    //let value = event.target.value;
    if(value && value.trim()) {
      this.addTag(value);
      event.target.value = '';
    }
  }

  findExistingTag(caption) {
    return this.existingTags.find(tag => tag.caption.toLowerCase() == caption.toLowerCase());
  }

  setTag(event, tagCaption) {
    if(!event) {
      console.log(`setTag() called without event for ${tagCaption}`);
    }
    let tagInput = document.querySelector('.tagInput') as HTMLInputElement;
    this.addTag(tagCaption);
    tagInput.value = '';
  }

  removeTag(targetTag) {
    const result = this.tags.filter(tag => {
      return tag.caption !== targetTag.caption
    });
    this.updateTags(result);
  }

  addTag(tagCaption) {
    let targetTag = this.currentTags.find(currentTag => {
      return currentTag.caption === tagCaption
    });
    if(targetTag) {
      console.log(`already existing tag - not going to add one`);
      return;
    }

    this.tags.push({caption: tagCaption});
    this.updateTags(this.tags);
  }

  updateTags(result) {
    this.tags = [...result];
    this.notifyUpdateTags.emit(this.tags);
  }

  findMatchedTags(value) {
    let result = [];
    this.existingTags.map(existingTag => {
      if(existingTag.caption.toLowerCase().includes(value.toLowerCase())) {
        result.push(existingTag);
      }
    });
    return result;
  }

  handleLabelInput(event) {
    let enteredValue = event.target.value;
    //console.log(`keyUp: ${enteredValue}`);
    if(enteredValue && enteredValue.trim()) {
      //construct menu on the fly
      this.matchedTags = [...this.findMatchedTags(enteredValue)];
      //console.log(`there are ${this.matchedTags.length} labels found`);
      let dropdownElement = document.querySelector('.matchedTagDropdown') as SlDropdown;
      
      if(this.matchedTags.length > 0) {
        dropdownElement.show();
      } else {
        dropdownElement.hide();
      }
    }
  }

  getTagVariant(tag) {
    let targetTag = this.existingTags.find(existingTag => {
      return existingTag.caption === tag.caption
    });
    console.log(`check ${tag.caption}, targetTag: ${targetTag}`);
    if(targetTag) {
      return 'neutral';
    }
    return 'success';
  } 

  renderTags() {
    return (
      this.tags.map(tag =>
        <sl-tag style={{padding: '5px'}} variant={this.getTagVariant(tag)} size="medium" removable
          onClick={()=>this.removeTag(tag)}>{tag.caption}</sl-tag>
      )
    );
  }

  render() {
    return (
      <div class="tk-add-tags-holder">
        {this.renderTags()}
        <sl-input class="tagInput" style={{padding:'10px'}} placeholder="Labels"
          onKeyUp={(event)=>{this.handleLabelInput(event)}}
          onBlur={(event)=>this.convertValueToTags(event, event.target.value)}></sl-input>
        <sl-dropdown class="matchedTagDropdown" style={{position: 'relative', top: '-20px', left: '20px'}}>
          <sl-menu>
            {this.matchedTags.map(matchedTag =>
              <sl-menu-item onClick={(event) => this.setTag(event, matchedTag.caption)}>{matchedTag.caption}</sl-menu-item>
            )}
          </sl-menu>
        </sl-dropdown>
        
      </div>
    );
  }

}

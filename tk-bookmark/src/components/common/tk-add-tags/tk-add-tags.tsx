import { Prop } from '@nestjs/mongoose';
import { Component, Event, EventEmitter, h, State, Method, Watch } from '@stencil/core';

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

  @Method()
  async getTags() {
    return this.tags;
  }

  @Watch('currentTags')
  currentTagsHandler () {
    console.log(`currentTags has been updated`);
    if(this.currentTags) {
      this.tags = [...this.currentTags];
    } else {
      console.log(`currentTags is empty?!`);
    }
  }

  componentWillLoad() {
    this.testData();
  }

  testData() {
    this.existingTags = [
      {caption: 'Programming'},
      {caption: 'Cooking'},
      {caption: 'Cat'},
      {caption: 'Dog'},
      {caption: 'Test'},
      {caption: 'Design'}
    ];
  }

  convertValueToTags(event) {
    let value = event.target.value;
    if(value && value.trim()) {
      let data = value.split(' ');
      data.map(item => {
        this.tags.push({caption: item});
      });
      console.log(`converted ${value} to ${this.tags}`);
      this.updateTags(this.tags);
      event.target.value = '';
    }
  }

  findExistingTag(caption) {
    return this.existingTags.find(tag => tag.caption.toLowerCase() == caption.toLowerCase());
  }

  addTag(event) {
    let value = event.target.value;
    if(value && value.trim()) {
      console.log(`selected ${value}`);
      this.tags.push({caption: value});
      this.updateTags(this.tags);
      event.target.value = '';
    }
  }

  removeTag(targetTag) {
    const result = this.tags.filter(tag => {
      return tag.caption !== targetTag.caption
    });
    this.updateTags(result);
  }

  updateTags(result) {
    this.tags = [...result];
    this.notifyUpdateTags.emit(this.tags);
  }

  render() {
    return (
      <div class="tk-add-tags-holder">
        <div style={{padding:'10px'}}>
          <input list="existingTagList" onBlur={(event)=>this.addTag(event)} />
          <datalist id="existingTagList">
            {this.existingTags.map((existingTag)=>
              <option value={existingTag.caption}></option>
            )}
          </datalist>
        </div>
        <sl-input style={{padding:'10px'}} placeholder="New labels"
          onBlur={(event)=>this.convertValueToTags(event)}></sl-input>
        {/* App Chip Input:
        <app-chip-input></app-chip-input> */}
        {this.tags.map(tag =>
          <sl-tag style={{padding: '5px'}} size="medium" removable
            onClick={()=>this.removeTag(tag)}>{tag.caption}</sl-tag>
        )}
      </div>
    );
  }

}

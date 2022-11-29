import { Prop } from '@nestjs/mongoose';
import { Component, h, State } from '@stencil/core';

@Component({
  tag: 'tk-bookmark-table',
  styleUrl: 'tk-bookmark-table.css',
  shadow: false,
})
export class TkBookmarkTable {

  @Prop() staticTableData = [];

  @State() headers = [];
  @State() tableData = [];

  componentWillRender() {
    this.initializeHeaders();
  }

  initializeHeaders() {
    this.headers = [
      {field: 'title', title: 'Title', renderFunction: (tableRowData) => {
        return this.customRenderTitle(tableRowData);
      }},
      {field: 'createdAt', title: 'Created', renderFunction: (tableRowData) => {
        return this.customRenderDate(tableRowData['createdAt'])
      }},
      {field: 'updatedAt', title: 'Modified', renderFunction: (tableRowData) => {
        return this.customRenderDate(tableRowData['updatedAt'])
      }},
      {field: 'notes', title: 'Notes'}
    ];
  }

  customRenderTitle(tableRowData) {
    let bookmarkTitle = tableRowData['title'];
    let bookmarkUrl = tableRowData['url'];
    return (
      <a href={bookmarkUrl} title={bookmarkTitle} target="_blank">
        {bookmarkTitle}
      </a>
    );
  }

  customRenderDate(date) {
    return new Date(date).toLocaleDateString('en-US');
  }

  render() {
    return (
      <tk-table
        headers={this.headers}
        tableData={this.staticTableData}>
      </tk-table>
    );
  }

}

import { Prop } from '@nestjs/mongoose';
import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'tk-table',
  styleUrl: 'tk-table.css',
  shadow: false,
})
export class TkTable {

  @Prop() headers = [];
  @Prop() tableData = [];

  renderDefaultTableHeader() {
    return (
      <tr>
        {this.headers.map(header =>
          <th>{header.title}</th>
        )}
      </tr>
    );
  }

  hasRenderFunctionDefined(header) {
    return header.renderFunction && typeof header.renderFunction === 'function';
  }

  renderTableCell(header, tableRowData) {
    return (
      <td>
        {this.hasRenderFunctionDefined(header)
          ? header.renderFunction(tableRowData)
          : tableRowData[header.field]
        }
      </td>
    )
  }

  renderTableRow(tableRowData) {
    return (
      <tr>
      {this.headers.map(header =>
        this.renderTableCell(header, tableRowData)
      )}
      </tr>
    );
  }

  render() {
    return (
      <Host>
        <table>
          {this.renderDefaultTableHeader()}
          {this.tableData.map(tableRowData =>
            this.renderTableRow(tableRowData)
          )}
        </table>
      </Host>
    );
  }

}

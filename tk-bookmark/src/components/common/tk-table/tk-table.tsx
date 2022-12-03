import { Prop } from '@nestjs/mongoose';
import { Component, Host, h, State, Watch } from '@stencil/core';

@Component({
  tag: 'tk-table',
  styleUrl: 'tk-table.css',
  shadow: true,
})
export class TkTable {

  @Prop() headers = [];
  @Prop() tableData = [];

  @State() renderedTableData = [];

  columnSort = {
    field: '',
    isAsending: false
  };
  columnFilters = [];

  // for debug
  @State() tableInfoForDebug = '';

  componentWillLoad() {
    this.renderedTableData = this.tableData;
  }

  @Watch('tableData')
  handleTableDataChange(newData) {
    this.tableData = newData;
    this.updateTable();
  }

  applyFilterOnRowData(rowData) {
    //let toBeFilter = false;

    let result = [];

    this.columnFilters.map(columnFilter => {
      let toBeFilter = false;
      let cellValue = rowData[columnFilter.field];
      let filterValue = columnFilter.value;
      if(cellValue.toLowerCase().includes(filterValue.toLowerCase())) {
        toBeFilter = true;
      }
      console.log(`check ${cellValue} with ${filterValue} - [${toBeFilter}]`);
      result.push(toBeFilter);
    });

    console.log(`>>>>filter result ${result}`);

    
    return !result.includes(false);
  }

  applyFilters(tableData) {
    if(this.columnFilters.length === 0) {
      return tableData;
    }

    return tableData.filter(rowData => {
        return this.applyFilterOnRowData(rowData)
    });
  }

  applySort(tableData) {
    if(!this.columnSort.field) {
      return tableData;
    }
    let field = this.columnSort.field;
    return tableData.sort((a,b)=> {
      if(this.columnSort.isAsending) {
        return a[field] > b[field] ? 1: -1
      } else {
        return b[field] > a[field] ? 1: -1
      }
    });
  }

  updateTable() {
    let updatedTableData = [];
    updatedTableData = this.tableData;

    //filter row data
    updatedTableData = this.applyFilters(updatedTableData);

    //sort table
    updatedTableData = this.applySort(updatedTableData);

    this.renderedTableData = [...updatedTableData];
  }

  hasColumnFilterDefined() {
    let columnsWithFilterDefined = this.headers.filter(header => {
      return header.filter;
    });
    return columnsWithFilterDefined;
  }

  toggleColumnSort(header) {
    if(this.columnSort.field !== header.field) {
      this.columnSort = {
        field: header.field,
        isAsending: true
      }
    } else {
      this.columnSort.isAsending = !this.columnSort.isAsending;
    }

    this.updateTableInfoForDebug();
    this.updateTable();
  }

  renderSortIndicator(header) {
    if(this.columnSort.field === header.field) {
      if(this.columnSort.isAsending) {
        return (
          <sl-icon name="sort-alpha-up"></sl-icon>
        );
      } else {
        return (
          <sl-icon name="sort-alpha-up-alt"></sl-icon>
        );
      }
    }
    return '';
  }

  renderDefaultTableHeader() {
    return (
      <tr>
        {this.headers.map(header =>
          <th class={`${header.field}Column`}
            onClick={()=>this.toggleColumnSort(header)}>
            {header.title} {this.renderSortIndicator(header)}
          </th>
        )}
      </tr>
    );
  }

  hasRenderFunctionDefined(header) {
    return header.renderFunction && typeof header.renderFunction === 'function';
  }

  
  handleRemoveColumnFilter(header, filterValue, targetFilter) {
    if(!filterValue.trim() && targetFilter) {
      this.columnFilters = this.columnFilters.filter(columnFilter => {
        return columnFilter.field !== header.field
      });
    }
  }

  updateColumnFilters(event, header) {
    console.log(`>>>> updateColumnFilters() called with ${event.target.value}`);
    let filterValue = (event.target as HTMLInputElement).value;
    let targetFilter = this.columnFilters.find(columnFilter => {
      return columnFilter.field === header.field
    });

    this.handleRemoveColumnFilter(header, filterValue, targetFilter);

    //add or update
    if(!targetFilter) {
      targetFilter = { field: header.field, value: filterValue};
      this.columnFilters.push(targetFilter);
    } else {{
      targetFilter.value = filterValue;
    }}

    this.updateTableInfoForDebug();
    this.updateTable();
  }

  renderColumnFilter(header) {
    if(header.filter) {
      return (
        <td>
          <sl-input onKeyUp={(event)=>this.updateColumnFilters(event, header)}></sl-input>
        </td>
      )
    }
    return (
      <td></td>
    );
  }

  renderColumnFilterRow() {
    if(this.hasColumnFilterDefined()) {
      return (
        <tr>
          {this.headers.map(header =>
            this.renderColumnFilter(header)
          )}
        </tr>
      )
    }
    return;
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

  updateTableInfoForDebug() {
    let filterInfo = JSON.stringify(this.columnFilters);
    let sortInfo = JSON.stringify(this.columnSort);
    this.tableInfoForDebug = `Filter: ${filterInfo}, Sort: ${sortInfo}`;
  }

  renderTableInfoForDebug() {
    return `Table Info: ${this.tableInfoForDebug}`;
  }

  render() {
    return (
      <Host>
        {this.renderTableInfoForDebug()}
        <table style={{padding: '5px'}}>
          {this.renderDefaultTableHeader()}
          {this.renderColumnFilterRow()}
          {this.renderedTableData.map(tableRowData =>
            this.renderTableRow(tableRowData)
          )}
        </table>
      </Host>
    );
  }

}

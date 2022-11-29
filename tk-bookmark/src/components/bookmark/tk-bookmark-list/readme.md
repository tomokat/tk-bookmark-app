# tk-bookmark-list



<!-- Auto Generated Below -->


## Events

| Event                   | Description | Type               |
| ----------------------- | ----------- | ------------------ |
| `deleteBookmarkSuccess` |             | `CustomEvent<any>` |
| `updateBookmarkSuccess` |             | `CustomEvent<any>` |


## Methods

### `reloadBookmarkList() => Promise<void>`



#### Returns

Type: `Promise<void>`



### `setLabelFilterList(list: any) => Promise<void>`



#### Returns

Type: `Promise<void>`




## Dependencies

### Used by

 - [tk-bookmark](../tk-bookmark)

### Depends on

- [tk-add-or-edit-bookmark](../tk-add-or-edit-bookmark)
- [tk-bookmark-list-item](../tk-bookmark-list-item)
- [tk-bookmark-table](../tk-bookmark-table)

### Graph
```mermaid
graph TD;
  tk-bookmark-list --> tk-add-or-edit-bookmark
  tk-bookmark-list --> tk-bookmark-list-item
  tk-bookmark-list --> tk-bookmark-table
  tk-add-or-edit-bookmark --> tk-add-tags
  tk-bookmark-table --> tk-table
  tk-bookmark --> tk-bookmark-list
  style tk-bookmark-list fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*

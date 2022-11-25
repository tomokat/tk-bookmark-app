# tk-add-or-edit-bookmark



<!-- Auto Generated Below -->


## Properties

| Property         | Attribute          | Description | Type      | Default     |
| ---------------- | ------------------ | ----------- | --------- | ----------- |
| `bookmark`       | `bookmark`         |             | `any`     | `undefined` |
| `forNewBookmark` | `for-new-bookmark` |             | `boolean` | `undefined` |


## Events

| Event                       | Description | Type               |
| --------------------------- | ----------- | ------------------ |
| `addBookmarkSuccess`        |             | `CustomEvent<any>` |
| `notifyUpdateRequestObject` |             | `CustomEvent<any>` |


## Dependencies

### Used by

 - [tk-bookmark](../tk-bookmark)
 - [tk-bookmark-list](../tk-bookmark-list)

### Depends on

- [tk-add-tags](../../common/tk-add-tags)

### Graph
```mermaid
graph TD;
  tk-add-or-edit-bookmark --> tk-add-tags
  tk-bookmark --> tk-add-or-edit-bookmark
  tk-bookmark-list --> tk-add-or-edit-bookmark
  style tk-add-or-edit-bookmark fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*

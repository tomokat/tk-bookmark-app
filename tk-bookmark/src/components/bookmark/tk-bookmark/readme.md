# tk-bookmark



<!-- Auto Generated Below -->


## Dependencies

### Used by

 - [tk-bookmark-app-root](../../app/tk-bookmark-app-root)

### Depends on

- [tk-bookmark-bar](../tk-bookmark-bar)
- [tk-bookmark-list](../tk-bookmark-list)
- [tk-add-or-edit-bookmark](../tk-add-or-edit-bookmark)

### Graph
```mermaid
graph TD;
  tk-bookmark --> tk-bookmark-bar
  tk-bookmark --> tk-bookmark-list
  tk-bookmark --> tk-add-or-edit-bookmark
  tk-bookmark-list --> tk-add-or-edit-bookmark
  tk-bookmark-list --> tk-bookmark-list-item
  tk-bookmark-list --> tk-bookmark-table
  tk-add-or-edit-bookmark --> tk-add-tags
  tk-bookmark-table --> tk-table
  tk-bookmark-app-root --> tk-bookmark
  style tk-bookmark fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*

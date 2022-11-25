# tk-bookmark



<!-- Auto Generated Below -->


## Dependencies

### Used by

 - [app-root](../../app/app-root)

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
  tk-add-or-edit-bookmark --> tk-add-tags
  app-root --> tk-bookmark
  style tk-bookmark fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*

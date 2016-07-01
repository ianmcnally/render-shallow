# renderShallow

A utility for shallow rendering React components in tests.

## Usage

`renderShallow` shallow renders a [React element](https://facebook.github.io/react/docs/glossary.html#react-elements), using React's [ShallowRenderer](https://facebook.github.io/react/docs/test-utils.html#shallow-rendering) test utility. It wraps the renderer creation, and returns the rendered component, along with some helpers to rerender the element, should it change.

### API

##### renderShallow

```js
renderShallow(element ReactElement, context ReactContext[Object, optional])

returns: Object { output ReactElement, rerender function, rerenderElement function }
```

[More on React's context.](https://facebook.github.io/react/docs/context.html)

###### .output

The React element returned by the shallow renderer.

###### rerender

```js
rerender()

returns: React element
```

Function that gets the rendered output again. Useful for when a component's state has changed and the DOM should be updated.

###### rerenderElement

```js
rerenderElement(newElement ReactElement, context Object[optional. Uses initial context, if specified])
```

Function that renders `newElement` with the same render instance that `renderShallow` used. If context was initially specified, that will be reused, otherwise you can supply it. Useful for when you want to tests a props update to your component.

#### Example

```js
  // if you just want the shallow-renderer component
  const component = renderShallow(<AReactComponent />).output

  // if you want to rerender
  const { output, rerender } = renderShallow(<AReactComponent />)

  // if you want to rerender the element
  const { output, rerenderElement } = renderShallow(<AReactComponent />)
```

## Why

I found that in most of the React component tests I wrote, I simply wanted a shallow rendered component to test. The ShallowRenderer API is a little verbose, between the creation and the getting of the output. So I started abstracting that (the `.output` returned from `renderShallow`). When I found myself wanting to rerender the component, either because of state or props changes, I added the ability to both re-fetch the output (`rerender`), or render the element again with new props (`rerenderElement`).

## Development

- `npm run compile` - Builds a distributable version of the project

- `npm start` - Runs tests and reruns on file change

- `npm test` - Runs tests once

- `npm lint` - Lints javascript
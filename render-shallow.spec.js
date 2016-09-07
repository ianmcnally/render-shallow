import renderShallow from './'
import React, { Component, isValidElement, PropTypes } from 'react'
import { stub, spy } from 'sinon'

it('returns the correct API', () => {
  const TestComponent = () => <p />

  const result = renderShallow(<TestComponent />)

  expect(Object.keys(result)).toEqual( ['instance', 'output', 'rerender', 'rerenderElement'])
})

it('output - is a React element', () => {
  const TestComponent = () => <p />

  const { output } = renderShallow(<TestComponent />)

  expect(isValidElement(output)).toBe(true)
  expect(output.type).toEqual('p')
})

it('instance() - returns the instance the element', () => {
  const mockInstanceReturn = 47
  const rendererStub = { getMountedInstance: stub().returns(mockInstanceReturn), render: spy(), getRenderOutput: spy() }
  const TestComponent = () => <p />

  const { instance } = renderShallow(<TestComponent />, {}, rendererStub)

  expect(instance()).toEqual(mockInstanceReturn)
})

it('rerender - returns a React element', () => {
  const TestComponent = () => <p />

  const { rerender } = renderShallow(<TestComponent />)
  const output = rerender()

  expect(isValidElement(output)).toBe(true)
})

it('rerender - rerenders the React component from .output', () => {
  class TestComponent extends Component {
    constructor(props) {
      super(props)
      this.state = { message: '' }
    }
    render() {
      return <p>{this.state.message}</p>
    }
  }

  const { instance, rerender } = renderShallow(<TestComponent />)

  instance().setState({ message: 'I am working!' })

  const rerenderedElement = rerender()

  expect(rerenderedElement.props.children).toEqual('I am working!')
})

it('accepts a context and renders the component with it', () => {
  const context = { a : 100 }
  const TestComponent = () => <p />
  TestComponent.contextTypes = { a: PropTypes.number }

  const { instance } = renderShallow(<TestComponent />, context)
  const componentContext = instance().context

  expect(context).toEqual(componentContext)
})

it('renderShallow.rerenderElement - with no new context specified and an existing context, reuses the existing context', () => {
  const context = { a : 100 }
  const TestComponent = () => <p />
  TestComponent.contextTypes = { a: PropTypes.number }

  const { rerenderElement } = renderShallow(<TestComponent />, context)

  const { instance } = rerenderElement(<TestComponent />)

  expect(instance().context).toEqual(context)
})

it('rerenderElement - with a new context, uses that when rendering', () => {
  const oldContext = { a :100 }
  const TestComponent = () => <p />
  TestComponent.contextTypes = { a: PropTypes.number }

  const newContext = { a: 200 }

  const { rerenderElement } = renderShallow(<TestComponent />, oldContext)

  const { instance } = rerenderElement(<TestComponent />, newContext)

  expect(instance().context).toEqual(newContext)
})

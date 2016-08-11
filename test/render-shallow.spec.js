import test from 'ava'
import renderShallow from '../'
import React, { Component, isValidElement, PropTypes } from 'react'
import { stub, spy } from 'sinon'

test('renderShallow - returns the correct API', t => {
  const TestComponent = () => <p />

  const result = renderShallow(<TestComponent />)

  t.deepEqual(Object.keys(result), ['instance', 'output', 'rerender', 'rerenderElement'])
})

test('renderShallow.output - is a React element', t => {
  const TestComponent = () => <p />

  const { output } = renderShallow(<TestComponent />)

  t.true(isValidElement(output))
  t.is(output.type, 'p')
})

test('renderShallow.instance() - returns the instance the element', t => {
  const mockInstanceReturn = 47
  const rendererStub = { getMountedInstance: stub().returns(mockInstanceReturn), render: spy(), getRenderOutput: spy() }
  const TestComponent = () => <p />

  const { instance } = renderShallow(<TestComponent />, {}, rendererStub)

  t.is(instance(), mockInstanceReturn)
})

test('renderShallow.rerender - returns a React element', t => {
  const TestComponent = () => <p />

  const { rerender } = renderShallow(<TestComponent />)
  const output = rerender()

  t.true(isValidElement(output))
})

test('renderShallow.rerender - rerenders the React component from .output', t => {
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

  t.is(rerenderedElement.props.children, 'I am working!')
})

test('renderShallow accepts a context and renders the component with it', t => {
  const context = { a : 100 }
  const TestComponent = () => <p />
  TestComponent.contextTypes = { a: PropTypes.number }

  const { instance } = renderShallow(<TestComponent />, context)
  const componentContext = instance().context

  t.deepEqual(context, componentContext)
})

test('renderShallow.rerenderElement - with no new context specified and an existing context, reuses the existing context', t => {
  const context = { a : 100 }
  const TestComponent = () => <p />
  TestComponent.contextTypes = { a: PropTypes.number }

  const { rerenderElement } = renderShallow(<TestComponent />, context)

  const { instance } = rerenderElement(<TestComponent />)

  t.deepEqual(instance().context, context)
})

test('renderShallow.rerenderElement - with a new context, uses that when rendering', t => {
  const oldContext = { a :100 }
  const TestComponent = () => <p />
  TestComponent.contextTypes = { a: PropTypes.number }

  const newContext = { a: 200 }

  const { rerenderElement } = renderShallow(<TestComponent />, oldContext)

  const { instance } = rerenderElement(<TestComponent />, newContext)

  t.deepEqual(instance().context, newContext)
})
import test from 'ava'
import renderShallow from '../'
import React, { Component, isValidElement } from 'react'
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

test.cb('renderShallow.rerender - rerenders the React component from .output', t => {
  class TestComponent extends Component {
    constructor(props) {
      super(props)
      this.state = { message: '' }
      this.updateStateForTesting = this.updateStateForTesting.bind(this)
    }
    updateStateForTesting() {
      this.setState({ message: 'I am working!' })
    }
    render() {
      return <p onClick={this.updateStateForTesting}>{this.state.message}</p>
    }
  }

  const { output, rerender } = renderShallow(<TestComponent />)

  t.is(output.props.children, '')

  output.props.onClick() // hack to update the state

  setTimeout(() => {
    const newOutput = rerender()

    t.is(newOutput.props.children, 'I am working!')

    t.end()
  }, 0)

})

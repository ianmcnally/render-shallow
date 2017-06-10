import ShallowRenderer from 'react-test-renderer/shallow'

const renderShallow = (element, context = {}, renderer = new ShallowRenderer()) => {
  renderer.render(element, context)

  const output = () => renderer.getRenderOutput()

  return {
    instance() { return renderer.getMountedInstance() },
    output: output(),
    rerender: output,
    rerenderElement(newElement, newContext = context) {
      return renderShallow(newElement, newContext, renderer)
    }
  }
}

export default renderShallow

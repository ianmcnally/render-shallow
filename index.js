import ShallowRenderer from 'react-test-renderer/shallow'

const renderShallow = (
  element,
  context = {},
  renderer = new ShallowRenderer(),
) => {
  renderer.render(element, context)

  const output = () => renderer.getRenderOutput()

  return {
    instance() {
      const instance = renderer.getMountedInstance()
      const isClassicalComponent = instance && instance.context
      if (isClassicalComponent) {
        return instance
      } else {
        return { ...instance, context: renderer._context }
      }
    },
    output: output(),
    rerender: output,
    rerenderElement(newElement, newContext = context) {
      return renderShallow(newElement, newContext, renderer)
    },
  }
}

export default renderShallow

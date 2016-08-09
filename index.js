import { createRenderer } from 'react-addons-test-utils'

const renderShallow = (element, context = {}, renderer = createRenderer()) => {
  renderer.render(element, context)

  const output = () => renderer.getRenderOutput()

  return {
    instance() {
      return renderer.getMountedInstance()
    },
    output: output(),
    rerender: output,
    rerenderElement(newElement, newContext = context) {
      return renderShallow(newElement, newContext, renderer)
    }
  }
}

export default renderShallow

export function stripFrontmatter() {
  return tree => {
    const first = tree.children[0]
    const second = tree.children[1]
    if (first?.type === 'thematicBreak' && second?.type === 'heading' && second.depth === 2) {
      tree.children.splice(0, 2)
    }
  }
}

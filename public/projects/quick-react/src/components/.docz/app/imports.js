export const imports = {
  'src/index.mdx': () =>
    import(
      /* webpackPrefetch: true, webpackChunkName: "src-index" */ 'src/index.mdx'
    ),
  'src/Upload/index.mdx': () =>
    import(
      /* webpackPrefetch: true, webpackChunkName: "src-upload-index" */ 'src/Upload/index.mdx'
    ),
}

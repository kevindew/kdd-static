Reveal.initialize
  controls: false,
  progress: true,
  history: true,
  center: false,
  transition: Reveal.getQueryHash().transition || 'linear'

hljs.initHighlightingOnLoad()

twemoji.parse document.body,
  size: 72
  folder: 'svg'
  ext: '.svg'

<template>
    <svg xmlns:xlink="http://www.w3.org/1999/xlink" height="100%" version="1.1" :viewBox="svg.viewBox" width="100%"
         :style="style">
        <use xlink:href="#aplayer-${type}"></use>
        <path class="aplayer-fill" :d="svg.d"></path>
    </svg>
</template>

<script>
    const requireAssets = require.context('@/assets', false, /\.svg$/)

    const SVGs = requireAssets.keys().reduce((svgs, path) => {
        console.log(svgs)
        console.log('path: ' + path)

        const inlineSvg = requireAssets(path)

        console.log(inlineSvg)

        const [raw, viewBox, d] = inlineSvg.match(/^<svg.+?viewBox="(.+?)".*><path.+?d="(.+?)".*><\/path><\/svg>$/)

        svgs[path.match(/^.*\/(.+?)\.svg$/)[1]] = {
            viewBox,
            d
        }
        return svgs
    }, {})

    export default {
        props: ['type'],
        computed: {
            svg() {
                let icon = this.type
                if (this.type === 'prev' || this.type === 'next') {
                    icon = 'skip'
                }
                // return SVGs[this.type] || {}
                return {
                    viewBox: '0 0 32 32',
                    d: 'M4 16c0-6.6 5.4-12 12-12s12 5.4 12 12c0 1.2-0.8 2-2 2s-2-0.8-2-2c0-4.4-3.6-8-8-8s-8 3.6-8 8 3.6 8 8 8c1.2 0 2 0.8 2 2s-0.8 2-2 2c-6.6 0-12-5.4-12-12z'
                }
            },
            style() {
                if (this.type === 'next') {
                    return {
                        transform: 'rotate(180deg)',
                    }
                }
            }
        }
    }
</script>
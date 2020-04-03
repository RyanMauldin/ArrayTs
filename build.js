const browserify = require("browserify");
const tsify = require("tsify");
const coffeeify = require("coffeeify");
const exorcist = require("exorcist");
const minifySteam = require("minify-stream");
const envify = require('envify')

browserify("dist/src/classes/ArrayTs.js", { debug: true })
    .plugin(tsify, { allowJs: true })
    .transform(coffeeify, { bare: false, header: true })
    .transform(exorcist)
    .plugin('tinyify')
    .transform('unassertify', { global: true })
    .transform(envify, { global: true, _: 'purge', NODE_ENV: 'development' })
    .transform('uglifyify', { global: true })
    .plugin('common-shakeify')
    .plugin('browser-pack-flat/plugin')
	.bundle()
    .on('error', function (error) { console.error(error.toString()); })
    .pipe(minifySteam({ sourceMap: true }))
	.pipe(process.stdout);
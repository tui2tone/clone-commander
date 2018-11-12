const glob = require("glob")
const fs = require('fs-extra')
const pluralize = require('pluralize')
const camelCase = require('camelcase')
const capitalize = require('capitalize')

const clone = (from, to, replaces) => {
    let fromPath = (from + '/**/*').replace("//", "/")
    const replaceStrs = getReplaceString(replaces)
    const options = {}

    glob(fromPath, options, function (er, files) {
        files.map((file) => {
            const fileName = '/' + file.replace(from, '')
            let toPath = replaceStr((to + fileName).replace("///", "/").replace("//", "/"), replaceStrs)
            
            const content = fs.readFileSync(file, 'utf8');
            const replacedContent = replaceStr(content, replaceStrs)

            writeFile(toPath, replacedContent)
        })
    })
}

const getReplaceString = (replaces) => {
    let strs = []
    for(let i = 0; i < replaces.length / 2; i++) {
        const fromStr = replaces[i]
        const toStr = replaces[i + 1]

        const fromSing = pluralize.singular(fromStr)
        const fromPlu = pluralize.plural(fromStr)

        const fromCapSing = capitalize(fromSing)
        const fromCapPlu = capitalize(fromPlu)

        const toSing = pluralize.singular(toStr)
        const toPlu = pluralize.plural(toStr)

        const toCapSing = capitalize(toSing)
        const toCapPlu = capitalize(toPlu)

        const fromUpperSing = fromSing.toUpperCase()
        const fromUpperPlu = fromPlu.toUpperCase()

        const toUpperSing = toSing.toUpperCase()
        const toUpperPlu = toPlu.toUpperCase()

        strs.push({
            from: fromPlu,
            to: toPlu
        })

        strs.push({
            from: fromSing,
            to: toSing
        })

        strs.push({
            from: fromCapPlu,
            to: toCapPlu
        })

        strs.push({
            from: fromCapSing,
            to: toCapSing
        })
        strs.push({
            from: fromUpperPlu,
            to: toUpperPlu
        })

        strs.push({
            from: fromUpperSing,
            to: toUpperSing
        })
    }

    return strs
}


const replaceStr = (str, replaces) => {
    let fromStr = str;
    replaces.map((item) => {
        fromStr = fromStr.replace(new RegExp(item.from, "g"), item.to)
    })

    return fromStr
}

const writeFile = (to, content) => {
    fs.outputFile(to, content, (err) => {  
        if (err) throw err;
        console.log(`${to} saved!`);
    });
}

module.exports = {
    clone
}
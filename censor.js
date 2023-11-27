const fs = require('fs')

const ITEM_TYPES = {login: 1, note: 2, card: 3, identity: 4}

// CENSORING SCRIPT

const vault = require(`./${process.argv[2]}`)

for (let itemIndex in vault["items"]) {
    let item = vault["items"][itemIndex]

    if (
        item["type"] === ITEM_TYPES.note ||
        item["type"] === ITEM_TYPES.card ||
        item["type"] === ITEM_TYPES.identity
    ) {
        delete vault["items"][itemIndex]
        continue;
    }

    delete item["passwordHistory"]
    delete item["notes"]
    delete item["fields"]

    let login = item.type === ITEM_TYPES.login ? item["login"] : undefined

    delete login["fido2Credentials"]
    delete login["password"]
    delete login["totp"]
}

fs.writeFileSync(`./bitwarden_export_censored_${new Date().toISOString().substring(0, 10)}.json`, JSON.stringify(vault))
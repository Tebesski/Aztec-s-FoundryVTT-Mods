function getItemRarityColor(rarityLevel) {
   switch (rarityLevel) {
      case "junk":
         return ["#999", "0px 0px 1px #1F1F1F", "#1F1F1F"]
      case "common":
         return ["#02ad1d", "0px 0px 1px #008716", "#008716"]
      case "uncommon":
         return ["#2080ff", "0px 0px 1px #1966CC", "#1966CC"]
      case "rare":
         return ["#FF2BF8", "0px 0px 1px #9632C7", "#9632C7"]
      case "legend":
         return ["#ff8000", "0px 0px 1px #E67300", "#E67300"]
      case "ancient":
         return ["#00D980", "1px 1px 1px #00FF96", "#00FF96"]
      case "dragon":
         return ["#C2DE38", "1px 1px 1px #63611E", "#63611E"]
      case "demonic":
         return ["#fb5ead", "1px 1px 1px #A82874", "#A82874"]

      default:
         return ["#999", "0px 0px 0px #1F1F1F", "#1F1F1F"]
   }
}

Hooks.on("renderActorSheet", (sheet, html) => {
   const itemsWithRarity = sheet.actor.items.filter((i) => {
      return i.system.flags.dictionary.hasOwnProperty("rarity")
   })

   itemsWithRarity.forEach((i) => {
      let itemID = i._id
      let itemRarityColor = getItemRarityColor(
         i.system.flags?.dictionary.rarity
      )
      html.find(`[data-item-id="${itemID}"] h4`).css({
         color: `${itemRarityColor[0]}`,
         textShadow: `${itemRarityColor[1]}`,
      })
   })
})

Hooks.on("renderItemSheetPF", (i, html) => {
   if (i.object.system.flags.dictionary.hasOwnProperty("rarity")) {
      let itemRarityColor = getItemRarityColor(
         i.object.system.flags.dictionary.rarity
      )

      html.find(
         `input[placeholder="Item Name"]`
      )[0].style = `color: ${itemRarityColor[0]};text-shadow: ${itemRarityColor[1]}`
   } else return
})

Hooks.on("renderItemPileInventoryApp", (pile) => {
   const itemsWithRarity = pile.actor.allItems.filter((i) => {
      return i.system.flags.dictionary.hasOwnProperty("rarity")
   })

   itemsWithRarity.forEach((item) => {
      let itemRarityColor = getItemRarityColor(
         item.system.flags?.dictionary.rarity
      )

      for (let html of pile.element.find(`.item-piles-clickable-link`)) {
         if (html.innerText == item.name) {
            html.style = `color: ${itemRarityColor[0]};text-shadow: ${itemRarityColor[1]};`
         }
      }
   })
})

Hooks.on("renderVaultApp", (pile) => {
   const itemsWithRarity = pile.actor.allItems.filter((i) => {
      return i.system.flags.dictionary.hasOwnProperty("rarity")
   })

   itemsWithRarity.forEach((item) => {
      let itemRarityColor = getItemRarityColor(
         item.system.flags?.dictionary.rarity
      )

      for (let html of pile.element.find(`.grid-item`)) {
         if (html.getAttribute("data-fast-tooltip") == item.name) {
            html.style = `box-shadow: inset 0 0 10px ${itemRarityColor[0]};outline: 1px solid ${itemRarityColor[2]}`
         }
      }
   })
})

Hooks.on("renderMerchantApp", (pile) => {
   console.log(pile)
   const itemsWithRarity = pile.merchant.allItems.filter((i) => {
      return i.system.flags.dictionary.hasOwnProperty("rarity")
   })

   itemsWithRarity.forEach((item) => {
      let itemRarityColor = getItemRarityColor(
         item.system.flags?.dictionary.rarity
      )

      for (let html of pile.element.find(`.item-piles-clickable`)) {
         if (html.innerText == item.name) {
            html.style = `color: ${itemRarityColor[0]};text-shadow: ${itemRarityColor[1]};`
         }
      }
   })
})

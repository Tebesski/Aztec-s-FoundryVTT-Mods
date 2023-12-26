function getItemRarityColor(rarityLevel) {
   switch (rarityLevel) {
      case "junk":
         return ["#999", "0px 0px 1px #1F1F1F"]
      case "common":
         return ["#00C720", "0px 0px 1px #008716"]
      case "uncommon":
         return ["#2080ff", "0px 0px 1px #1966CC"]
      case "rare":
         return ["#FF2BF8", "0px 0px 1px #9632C7"]
      case "legend":
         return ["#ff8000", "0px 0px 1px #E67300"]
      case "ancient":
         return ["#00D980", "1px 1px 1px #00FF96"]
      case "dragon":
         return ["#C2DE38", "1px 1px 1px #63611E"]
      case "demonic":
         return ["#fb5ead", "1px 1px 1px #A82874"]

      default:
         return ["#999", "0px 0px 0px #1F1F1F"]
   }
}

Hooks.on("renderActorSheet", (sheet, html) => {
   const itemsWithRarity = sheet.actor.items.filter((i) => {
      return i.system.flags.dictionary.hasOwnProperty("rarity")
   })

   itemsWithRarity.forEach((i) => {
      let itemID = i._id
      console.log(itemID, "itemID")
      let actorID = i.parent._id
      console.log(actorID, "actorID")
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
      )[0].style = `color: ${itemRarityColor[0]};textShadow: ${itemRarityColor[1]}`
   } else return
})

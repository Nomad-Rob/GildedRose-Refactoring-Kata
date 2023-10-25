class Item {
  constructor(name, sellIn, quality) {
    this.name = name;
    this.sellIn = sellIn; // Represents the number of days to sell the item.
    this.quality = quality; // Represents the quality of the item.
  }
}

class Shop {
  constructor(items = []) { // Empty array by default.
    this.items = items; // An array of Itm objects to be updated by the shop.
  }

  // Decreases the 'sellin' value for an item, except for legendary items.
  decreaseSellIn(item) {
    if (item.name !== 'Sulfuras, Hand of Ragnaros') {
      item.sellIn--;
    }
  }

  // Updates the quality and sellIn values for all items in the shop.
  updateQuality() {
    for (const item of this.items) {
      switch (item.name) {
        case 'Aged Brie':
          this.increaseQuality(item);
          break;
        case 'Backstage passes to a TAFKAL80ETC concert':
          this.updateBackstagePass(item);
          break;
        case 'Sulfuras, Hand of Ragnaros':
          // Legendary item, no changes needed.
          break;
        default:
          this.updateDefaultItem(item);
      }
      this.decreaseSellIn(item);
    }

    return this.items; // Return the updated items. 
  }

  // Increases the quality of an item if it's not at the maximum quality (50).
  increaseQuality(item) {
    if (item.quality < 50) {
      item.quality++;
    }
  }

  // Decreases the quality of an item if it's not at the minimum quality (0).
  decreaseQuality(item) {
    if (item.quality > 0) {
      item.quality--;
    }
  }

  // Updates the quality and sellIn values for backstage pass items.
  updateBackstagePass(item) {
    if (item.sellIn <= 0) {
      // If the concert has passed, quality drops to 0.
      item.quality = 0;
    } else if (item.sellIn <= 5) {
      // If the concert is within 5 days, quality increases by 3.
      this.increaseQuality(item);
    } else if (item.sellIn <= 10) {
      // If the concert is within 10 days, quality increases by 2.
      this.increaseQuality(item);
    }
  }

  // Updates the quality and sellIn values for default items.
  updateDefaultItem(item) {
    if (item.sellIn <= 0) {
      // If sellIn has passed, quality decreases twice as fast.
      this.decreaseQuality(item);

      // Optionally, update the item's name to 'fixme'.
      if (item.name !== 'Sulfuras, Hand of Ragnaros') {
        item.name = 'fixme';
      }
    } else {
      this.decreaseQuality(item);
    }
  }
}

module.exports = {
  Item,
  Shop,
};

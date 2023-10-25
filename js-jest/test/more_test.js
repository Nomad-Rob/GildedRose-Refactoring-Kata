const { Shop, Item } = require('./gilded_rose');

describe('Gilded Rose', () => {
  it('should decrease SellIn and Quality for a normal item', () => {
    const items = [new Item('Normal Item', 10, 20)];
    const gildedRose = new Shop(items);

    gildedRose.updateQuality();

    expect(items[0].sellIn).toBe(9);
    expect(items[0].quality).toBe(19);
  });

  it('should degrade Quality twice as fast after SellIn date for normal items', () => {
    const items = [new Item('Normal Item', 0, 20)];
    const gildedRose = new Shop(items);

    gildedRose.updateQuality();

    expect(items[0].sellIn).toBe(-1);
    expect(items[0].quality).toBe(18);
  });

  it('should never decrease Quality below 0 for normal items', () => {
    const items = [new Item('Normal Item', 5, 0)];
    const gildedRose = new Shop(items);

    gildedRose.updateQuality();

    expect(items[0].quality).toBe(0);
  });

  it('should increase Quality for Aged Brie as it gets older', () => {
    const items = [new Item('Aged Brie', 10, 20)];
    const gildedRose = new Shop(items);

    gildedRose.updateQuality();

    expect(items[0].sellIn).toBe(9);
    expect(items[0].quality).toBe(21);
  });

  it('should not increase Quality above 50 for any item', () => {
    const items = [new Item('Aged Brie', 10, 50)];
    const gildedRose = new Shop(items);

    gildedRose.updateQuality();

    expect(items[0].quality).toBe(50);
  });

  it('should not change SellIn and Quality for Sulfuras', () => {
    const items = [new Item('Sulfuras, Hand of Ragnaros', 10, 80)];
    const gildedRose = new Shop(items);

    gildedRose.updateQuality();

    expect(items[0].sellIn).toBe(10);
    expect(items[0].quality).toBe(80);
  });

  it('should increase Quality for Backstage passes as SellIn approaches', () => {
    const items = [new Item('Backstage passes', 15, 20)];
    const gildedRose = new Shop(items);

    gildedRose.updateQuality();

    expect(items[0].sellIn).toBe(14);
    expect(items[0].quality).toBe(21);
  });

  it('should increase Quality by 2 for Backstage passes when there are 10 days or less', () => {
    const items = [new Item('Backstage passes', 10, 20)];
    const gildedRose = new Shop(items);

    gildedRose.updateQuality();

    expect(items[0].sellIn).toBe(9);
    expect(items[0].quality).toBe(22);
  });

  it('should increase Quality by 3 for Backstage passes when there are 5 days or less', () => {
    const items = [new Item('Backstage passes', 5, 20)];
    const gildedRose = new Shop(items);

    gildedRose.updateQuality();

    expect(items[0].sellIn).toBe(4);
    expect(items[0].quality).toBe(23);
  });

  it('should drop Quality to 0 for Backstage passes after the concert', () => {
    const items = [new Item('Backstage passes', 0, 20)];
    const gildedRose = new Shop(items);

    gildedRose.updateQuality();

    expect(items[0].sellIn).toBe(-1);
    expect(items[0].quality).toBe(0);
  });

  it('should degrade Quality twice as fast for Conjured items', () => {
    const items = [new Item('Conjured Item', 10, 20)];
    const gildedRose = new Shop(items);

    gildedRose.updateQuality();

    expect(items[0].sellIn).toBe(9);
    expect(items[0].quality).toBe(18);
  });

  it('should degrade Quality twice as fast after SellIn date for Conjured items', () => {
    const items = [new Item('Conjured Item', 0, 20)];
    const gildedRose = new Shop(items);

    gildedRose.updateQuality();

    expect(items[0].sellIn).toBe(-1);
    expect(items[0].quality).toBe(16);
  });

  // Add more test cases for different scenarios and item types
});

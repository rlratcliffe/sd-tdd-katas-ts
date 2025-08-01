export class Item {
    name: string;
    daysTilExpired: number;
    quality: number;

    constructor(name: string, daysTilExpired: number, quality: number) {
        this.name = name;
        this.daysTilExpired = daysTilExpired;
        this.quality = quality;
    }
}

export class GildedRose {
    items: Array<Item>;

    constructor(items = [] as Array<Item>) {
        this.items = items;
    }

    updateQuality() {
        this.items.forEach(item => {
            let category = ItemCategory.categorize(item);
            category.evaluateAndUpdateQualityOfItem(item);
        });

        return this.items;
    }

}

class ItemCategory {
    static categorize(item: Item) {
        if (item.name == 'Aged Brie') {
            return new Brie();
        } else if (item.name == 'Backstage passes to a TAFKAL80ETC concert') {
            return new Backstage();
        } else if (item.name == 'Sulfuras, Hand of Ragnaros') {
            return new Sulfuras();
        }
        return new ItemCategory();
    }

    updateQuality(item: Item) {
        if (item.quality > 0) {
            item.quality = item.quality - 1
        }
    }

    updateSellIn(item: Item) {
        item.daysTilExpired = item.daysTilExpired - 1;
    }

    updateExpired(item:Item) {
        if (item.daysTilExpired < 0) {
            if (item.quality > 0) {
                item.quality = item.quality - 1
            }
        }
    }

    evaluateAndUpdateQualityOfItem(item: Item) {
        this.updateQuality(item);
        this.updateSellIn(item);
        this.updateExpired(item);
    }

}

class Brie extends ItemCategory {
    updateQuality(item: Item) {
        if (item.quality < 50) {
            item.quality = item.quality + 1
        }
    }

    updateSellIn(item: Item) {
        item.daysTilExpired = item.daysTilExpired - 1;
    }

    updateExpired(item:Item) {
        if (item.daysTilExpired < 0) {
            if (item.quality < 50) {
                item.quality = item.quality + 1
            }
        }
    }
}

class Backstage extends ItemCategory {
    updateQuality(item: Item) {
        if (item.quality < 50) {
            item.quality = item.quality + 1
            if (item.daysTilExpired < 11) {
                if (item.quality < 50) {
                    item.quality = item.quality + 1
                }
            }
            if (item.daysTilExpired < 6) {
                if (item.quality < 50) {
                    item.quality = item.quality + 1
                }
            }
        }
    }

    updateSellIn(item: Item) {
        item.daysTilExpired = item.daysTilExpired - 1;
    }

    updateExpired(item:Item) {
        if (item.daysTilExpired < 0) {
            item.quality = item.quality - item.quality
        }
    }
}

class Sulfuras extends ItemCategory {
    // @ts-ignore
    updateQuality(item: Item) {}
    // @ts-ignore
    updateSellIn(item: Item) {}
    // @ts-ignore
    updateExpired(item:Item) {}
}
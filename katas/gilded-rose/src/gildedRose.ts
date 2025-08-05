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

class ItemCategory {
    updateOneItem(item: Item) {
        this.updateItemQuality(item);

        this.updateDaysTilExpired(item);
        if (item.daysTilExpired < 0) {
            this.updateExpired(item);
        }
    }

    protected updateExpired(item: Item) {
        this.decrementQuality(item);
    }

    protected updateDaysTilExpired(item: Item) {
        item.daysTilExpired = item.daysTilExpired - 1;
    }

    protected updateItemQuality(item: Item) {
        this.decrementQuality(item);
    }

    protected incrementQuality(item: Item) {
        if (item.quality < 50) {
            item.quality = item.quality + 1
        }
    }

    protected decrementQuality(item: Item) {
        if (item.quality > 0) {
            item.quality = item.quality - 1
        }
    }
}

class Legendary extends ItemCategory {
    // @ts-ignore
    protected updateExpired(item: Item) {
    }
    // @ts-ignore
    protected updateDaysTilExpired(item: Item) {
    }
    // @ts-ignore
    protected updateItemQuality(item: Item) {

    }
}

class Brie extends ItemCategory {
    protected updateExpired(item: Item) {
        this.incrementQuality(item);
    }

    protected updateDaysTilExpired(item: Item) {
        item.daysTilExpired = item.daysTilExpired - 1;
    }

    protected updateItemQuality(item: Item) {
        this.incrementQuality(item);
    }
}

class BackstagePass extends ItemCategory {
    protected updateExpired(item: Item) {
        item.quality = 0
    }

    protected updateDaysTilExpired(item: Item) {
        item.daysTilExpired = item.daysTilExpired - 1;
    }

    protected updateItemQuality(item: Item) {
        this.incrementQuality(item);
        if (item.daysTilExpired < 11) {
            this.incrementQuality(item);
        }
        if (item.daysTilExpired < 6) {
            this.incrementQuality(item);
        }
    }
}

export class Conjured extends ItemCategory {

    protected updateExpired(item: Item) {
        this.decrementQuality(item);
        this.decrementQuality(item);
    }

    protected updateItemQuality(item: Item) {
        this.decrementQuality(item);
        this.decrementQuality(item);
    }
}

export class GildedRose {
    items: Array<Item>;

    constructor(items = [] as Array<Item>) {
        this.items = items;
    }

    updateQuality() {
        this.items.forEach(item => {
            let category= this.categorize(item);
            category.updateOneItem(item);
        });

        return this.items;
    }

    private categorize(item: Item): ItemCategory {
        if (item.name == 'Sulfuras, Hand of Ragnaros') {
            return new Legendary();
        } else if (item.name == 'Aged Brie') {
            return new Brie();
        } else if (item.name == 'Backstage passes to a TAFKAL80ETC concert') {
            return new BackstagePass();
        } else if (item.name.startsWith("Conjured")) {
            return new Conjured();
        }
        return new ItemCategory();
    }


}
export class Item {
    name: string;
    daysTilExpired: number;
    quality: number;

    constructor(name: string, daysTilExpired: number, quality: number) {
        this.name = name;
        this.daysTilExpired = daysTilExpired;
        this.quality = quality;
    }

    incrementQuality() {
        if (this.quality < 50) {
            this.quality = this.quality + 1
        }
    }

    decrementQuality() {
        if (this.quality > 0) {
            this.quality = this.quality - 1
        }
    }
}

class ItemCategory {
    private item: Item;

    constructor(item: Item) {
        this.item = item;
    }

    updateOneItem() {
        this.updateItemQuality(this.item);

        this.updateDaysTilExpired(this.item);
        if (this.item.daysTilExpired < 0) {
            this.updateExpired(this.item);
        }
    }

    protected updateExpired(item: Item) {
        item.decrementQuality();
    }

    protected updateDaysTilExpired(item: Item) {
        item.daysTilExpired = item.daysTilExpired - 1;
    }

    protected updateItemQuality(item: Item) {
        item.decrementQuality();
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
        item.incrementQuality();
    }

    protected updateDaysTilExpired(item: Item) {
        item.daysTilExpired = item.daysTilExpired - 1;
    }

    protected updateItemQuality(item: Item) {
        item.incrementQuality();
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
        item.incrementQuality();
        if (item.daysTilExpired < 11) {
            item.incrementQuality();
        }
        if (item.daysTilExpired < 6) {
            item.incrementQuality();
        }
    }
}

export class Conjured extends ItemCategory {

    protected updateExpired(item: Item) {
        item.decrementQuality();
        item.decrementQuality();
    }

    protected updateItemQuality(item: Item) {
        item.decrementQuality();
        item.decrementQuality();
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
            category.updateOneItem();
        });

        return this.items;
    }

    private categorize(item: Item): ItemCategory {
        if (item.name == 'Sulfuras, Hand of Ragnaros') {
            return new Legendary(item);
        } else if (item.name == 'Aged Brie') {
            return new Brie(item);
        } else if (item.name == 'Backstage passes to a TAFKAL80ETC concert') {
            return new BackstagePass(item);
        } else if (item.name.startsWith("Conjured")) {
            return new Conjured(item);
        }
        return new ItemCategory(item);
    }


}
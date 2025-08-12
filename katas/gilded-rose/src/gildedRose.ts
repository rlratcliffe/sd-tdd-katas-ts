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

interface I_ItemCategory {
    updateDaysTilExpired(): void;
    updateExpired(): void;
    updateItemQuality(): void;
    updateAllProperties(): void;
}

class ItemCategory implements I_ItemCategory {
    protected item: Item;

    constructor(item: Item) {
        this.item = item;
    }

    updateExpired() {
        this.item.decrementQuality();
    }

    updateDaysTilExpired() {
        this.item.daysTilExpired = this.item.daysTilExpired - 1;
    }

    updateItemQuality() {
        this.item.decrementQuality();
    }

    updateAllProperties() {
        this.updateItemQuality();
        this.updateDaysTilExpired();
        if (this.item.daysTilExpired < 0) {
            this.updateExpired();
        }
    }
}

class Legendary extends ItemCategory {
    // @ts-ignore
    updateExpired() {
    }
    // @ts-ignore
    updateDaysTilExpired() {
    }
    // @ts-ignore
    updateItemQuality() {
    }
}

class Brie extends ItemCategory {
    updateExpired() {
        this.item.incrementQuality();
    }

    updateDaysTilExpired() {
        this.item.daysTilExpired = this.item.daysTilExpired - 1;
    }

    updateItemQuality() {
        this.item.incrementQuality();
    }
}

class BackstagePass extends ItemCategory {
    updateExpired() {
        this.item.quality = 0
    }

    updateDaysTilExpired() {
        this.item.daysTilExpired = this.item.daysTilExpired - 1;
    }

    updateItemQuality() {
        this.item.incrementQuality();
        if (this.item.daysTilExpired < 11) {
            this.item.incrementQuality();
        }
        if (this.item.daysTilExpired < 6) {
            this.item.incrementQuality();
        }
    }
}

export class Conjured extends ItemCategory {

    updateExpired() {
        this.item.decrementQuality();
        this.item.decrementQuality();
    }

    updateItemQuality() {
        this.item.decrementQuality();
        this.item.decrementQuality();
    }
}

export class GildedRose {
    items: Array<Item>;

    constructor(items = [] as Array<Item>) {
        this.items = items;
    }

    updateQuality() {
        this.items.forEach(item => {
            const itemCategory = new ItemCategory(item);
            const context = new Context(itemCategory);

            if (item.name == 'Sulfuras, Hand of Ragnaros') {
                context.setStrategy(new Legendary(item));
            } else if (item.name == 'Aged Brie') {
                context.setStrategy(new Brie(item))
            } else if (item.name == 'Backstage passes to a TAFKAL80ETC concert') {
                context.setStrategy(new BackstagePass(item))
            } else if (item.name.startsWith("Conjured")) {
                context.setStrategy(new Conjured(item))
            }

            context.processUpdate();
        });

        return this.items;
    }



}

export class Context {
    private strategy: ItemCategory;

    constructor(strategy: ItemCategory) {
        this.strategy = strategy;
    }

    setStrategy(strategy: ItemCategory) {
        this.strategy = strategy;
    }

    processUpdate() {
        this.strategy.updateAllProperties();
    }
}
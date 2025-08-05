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
            this.updateOneItem(item);
        });

        return this.items;
    }

    private updateOneItem(item: Item) {
        this.updateItemQuality(item);

        this.updateDaysTilExpired(item);
        if (item.daysTilExpired < 0) {
            this.updateExpired(item);
        }
    }

    private updateExpired(item: Item) {
        if (item.name == 'Aged Brie') {
            this.incrementQuality(item);
        } else if (item.name == 'Backstage passes to a TAFKAL80ETC concert') {
            item.quality = 0
        } else if (item.name == 'Sulfuras, Hand of Ragnaros') {
        } else this.decrementQuality(item);
    }

    private updateDaysTilExpired(item: Item) {
        if (item.name != 'Sulfuras, Hand of Ragnaros') {
            item.daysTilExpired = item.daysTilExpired - 1;
        }
    }

    private updateItemQuality(item: Item) {
        if (item.name == 'Aged Brie') {
            this.incrementQuality(item);
        } else if (item.name == 'Backstage passes to a TAFKAL80ETC concert') {
            this.incrementQuality(item);
            if (item.daysTilExpired < 11) {
                this.incrementQuality(item);
            }
            if (item.daysTilExpired < 6) {
                this.incrementQuality(item);
            }
        } else if (item.name == 'Sulfuras, Hand of Ragnaros') {
        } else this.decrementQuality(item);
    }

    private incrementQuality(item: Item) {
        if (item.quality < 50) {
            item.quality = item.quality + 1
        }
    }

    private decrementQuality(item: Item) {
        if (item.quality > 0) {
            item.quality = item.quality - 1
        }
    }
}
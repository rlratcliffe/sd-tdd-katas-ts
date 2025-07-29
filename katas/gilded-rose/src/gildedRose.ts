export class Item {
    name: string;
    daysTillExpired: number;
    quality: number;

    constructor(name: string, daysTillExpired: number, quality: number) {
        this.name = name;
        this.daysTillExpired = daysTillExpired;
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
            this.extracted(item);
        });

        return this.items;
    }

    private extracted(item: Item) {
        if (item.name == 'Aged Brie') {
            if (item.quality < 50) {
                item.quality = item.quality + 1
            }
            item.daysTillExpired = item.daysTillExpired - 1;
            if (item.daysTillExpired < 0) {
                if (item.quality < 50) {
                    item.quality = item.quality + 1
                }
            }
        } else if (item.name == 'Backstage passes to a TAFKAL80ETC concert') {
            if (item.quality < 50) {
                item.quality = item.quality + 1
                if (item.daysTillExpired < 11) {
                    if (item.quality < 50) {
                        item.quality = item.quality + 1
                    }
                }
                if (item.daysTillExpired < 6) {
                    if (item.quality < 50) {
                        item.quality = item.quality + 1
                    }
                }
            }
            item.daysTillExpired = item.daysTillExpired - 1;
            if (item.daysTillExpired < 0) {
                item.quality = item.quality - item.quality
            }
        } else if (item.name == 'Sulfuras, Hand of Ragnaros') {

        } else {
            if (item.quality > 0) {
                item.quality = item.quality - 1
            }
            item.daysTillExpired = item.daysTillExpired - 1;
            if (item.daysTillExpired < 0) {
                if (item.quality > 0) {
                    item.quality = item.quality - 1
                }
            }
        }
    }
}
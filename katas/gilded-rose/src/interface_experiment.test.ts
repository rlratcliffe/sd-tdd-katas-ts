import {Item} from "./gildedRose";

describe('conjured item', () => {
    it('should decrease quality twice as fast as normal item', () => {
        const item = new Item("Conjured Mana Cake", 3, 10);
        const conjured = new NewConjured(item);
        const context = new Context(conjured);
        context.processUpdate();

        expect(item).toMatchObject({"daysTilExpired": 2, "name": "Conjured Mana Cake", "quality": 8});
    });

    it('should decrease quality by 4 when expired', () => {
        const item = new Item("Conjured Mana Cake", 0, 10);
        const conjured = new NewConjured(item);
        const context = new Context(conjured);
        context.processUpdate();

        expect(item).toMatchObject({"daysTilExpired": -1, "name": "Conjured Mana Cake", "quality": 6});
    });
});


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

class NewConjured extends ItemCategory {
    updateExpired() {
        this.item.decrementQuality();
        this.item.decrementQuality();
    }

    updateItemQuality() {
        this.item.decrementQuality();
        this.item.decrementQuality();
    }
}

class Context {
    private strategy: ItemCategory;

    constructor(strategy: ItemCategory) {
        this.strategy = strategy;
    }

    processUpdate() {
        this.strategy.updateAllProperties();
    }

}
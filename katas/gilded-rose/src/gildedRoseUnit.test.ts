import {Conjured, Item} from "./gildedRose";

describe('conjured item', () => {
    it('should decrease quality twice as fast as normal item', () => {
        const item = new Item("Conjured Mana Cake", 3, 10);
        const conjured = new Conjured();
        conjured.updateOneItem(item);

        expect(item).toMatchObject({"daysTilExpired": 2, "name": "Conjured Mana Cake", "quality": 8});
    });

    it('should decrease quality by 4 when expired', () => {
        const item = new Item("Conjured Mana Cake", 0, 10);
        const conjured = new Conjured();
        conjured.updateOneItem(item);

        expect(item).toMatchObject({"daysTilExpired": -1, "name": "Conjured Mana Cake", "quality": 6});
    });
});
class Character {
    health: number;
    constructor(name: string, health: number, status: string) {

    }

    receiveDamage(amount: number) {

    }
}

describe('Character', () => {
    // Test List

    // a character can receive 0 damage from another character

    it('should receive 0 damage and reduce no health', () => {
        const hero = new Character('Hero', 1000, 'Alive');

        hero.receiveDamage(0);

        expect(hero.health).toBe(1000);
    });
});
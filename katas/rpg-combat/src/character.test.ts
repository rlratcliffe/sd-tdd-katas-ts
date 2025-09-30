class Character {
    health: number;
    name: string;
    status: string;

    constructor(name: string, health: number, status: string) {
        this.name = name;
        this.health = health;
        this.status = status;
    }

    receiveDamage(_amount: number) {

    }
}

describe('Character', () => {
    // Test List

    // a character can receive 0 damage from another character

    it('should receive 0 damage and reduce no health', () => {
        const hero = new Character('Hero', 1000, 'Alive');

        hero.receiveDamage(0);

        expect(hero).toEqual({"name": 'Hero', "health": 1000, "status": 'Alive'});
    });
});
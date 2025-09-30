class Character {
    health: number;
    name: string;
    status: string;

    constructor(name: string, health: number, status: string) {
        this.name = name;
        this.health = health;
        this.status = status;
    }

    receiveDamage(amount: number) {
        this.health -= amount;
    }
}

describe('Character', () => {

    it('should receive 0 damage and reduce no health', () => {
        const hero = new Character('Hero', 1000, 'Alive');

        hero.receiveDamage(0);

        expect(hero).toEqual({name: 'Hero', health: 1000, status: 'Alive'});
    });

    it('should receive 1 damage and reduce health by 1', () => {
        const hero = new Character('Hero', 1000, 'Alive');

        hero.receiveDamage(1);

        expect(hero.health).toEqual(999);
    });

    it('should die when health reaches zero', () => {
        const hero = new Character('Hero', 1000, 'Alive');

        hero.receiveDamage(1000);

        expect(hero).toEqual({name: 'Hero', health: 0, status: 'Dead'});
    });
});
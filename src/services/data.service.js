var itemCats = [ 'helmet', 'crown', 'armor', 'clothes', 'weapon', 'lighter', 'purse', 'potion', 'spell', 'food'];

var itemLimits = [
    {slot:'head', limit:1, types: [ 'helmet' , 'crown' ]},
    {slot:'body', limit:1, types: [ 'armor', 'clothes' ]},
    {slot:'hands', limit:2, types: [ 'weapon', 'lighter']},
    {slot:'belt', limit:3, types: [ 'weapon', 'purse']},
    {slot:'bag', limit:10, types: [ 'helmet', 'crown', 'clothes', 'lighter', 'potion', 'spell', 'food', 'purse' ]}
];

class Item {
    static counter = 0;
    constructor(nom, type, prix, effet) {
        Item.counter++;
        this._id = Item.counter
        this.nom = nom
        // test si le type donné en param est valide
        if(itemCats.includes(type)) {
            this.type = type
        }
        else {
            this.type = ''
        }
        if (prix>=0) {
            this.prix = prix
        }
        else {
            this.prix = 0
        }
        this.effet = effet
    }
    // conversion format API => format interne
    static fromAPI(obj) {
        let it = new Item(obj.name, obj.type, obj.price, obj.effect)
        it._id = obj._id
        return it
    }
    // conversion format interne => format API
    static toAPI(obj) {
        return {
            _id: obj._id,
            name: obj.nom,
            type: obj.type,
            price: obj.prix,
            effect: obj.effet
        }
    }
}

class Boutique {
    static counter = 0;
    constructor(nom, itemCat) {
        Boutique.counter++;
        this._id = Boutique.counter;
        this.nom = nom;
        this.itemCat = [...itemCat];
        this.itemStock = [];
        this.itemCommande = [];
    }
// conversion format API => format interne
    static fromAPI(obj) {
        let b = new Boutique(obj.name, obj.itemCat)
        // ATTENTION: le format des items stockés dans obj.itemStock et obj.itemOdrer n'est
        // pas le même que celui utilisé localement. Donc il faut les convertir.
        obj.itemStock.forEach(item => b.itemStock.push(Item.fromAPI(item)))
        obj.itemOrder.forEach(item => b.itemCommande.push(Item.fromAPI(item)))
        b._id = obj._id
        return b;
    }
    // conversion format interne => format API
    static toAPI(obj) {
        let json = {
            _id: obj._id,
            name: obj.nom,
            itemCat: [...obj.itemCat],
            itemStock: [],
            itemOrder: []
        }
        obj.itemStock.forEach(item => json.itemStock.push(Item.toAPI(item)))
        obj.itemCommande.forEach(item => json.itemOrder.push(Item.toAPI(item)))
        return json
    }
}

class Rue {
    static counter = 0;
    constructor(nom) {
        Rue.counter++;
        this._id = Rue.counter;
        this.nom = nom;
        this.boutiques = [];
    }
// conversion format API => format interne
    static fromAPI(obj) {
        let r = new Rue(obj.name)
        r._id = obj._id
        obj.shops.forEach(shop => r.boutiques.push(Boutique.fromAPI(shop)))
        return r;
    }
// conversion format interne => format API
    static toAPI(obj) {
        let json = {
            _id: obj._id,
            name: obj.nom,
            shops: []
        }
        obj.boutiques.forEach(b => json.shops.push(Boutique.toAPI(b)))
        return json
    }
}

class Ville {
    static counter = 0;
    constructor(nom) {
        Ville.counter++;
        this._id = Ville.counter;
        this.nom = nom;
        this.rues = [];
    }
    // conversion format API => format interne
    static fromAPI(obj) {
        let v = new Ville(obj.name)
        v._id = obj._id
        obj.streets.forEach(street => v.rues.push(Rue.fromAPI(street)))
        return v;
    }
// conversion format interne => format API
    static toAPI(obj) {
        let json = {
            _id: obj._id,
            name: obj.nom,
            streets: []
        }
        obj.rues.forEach(r => json.streets.push(Rue.toAPI(r)))
        return json
    }
}


class Emplacement {
    constructor(_id, nom) {
        this._id = _id
        this.nom = nom
        this.items = []
    }
    // conversion format API => format interne
    static fromAPI(obj) {
        let e = new Emplacement(obj._id, obj.name)
        obj.items.forEach(it => e.items.push(Item.fromAPI(it)))
        return e
    }
    // conversion format interne => format API
    static toAPI(obj) {
        let json = {
            _id: obj._id,
            name: obj.nom,
            items: []
        }
        obj.items.forEach(item => json.items.push(Item.toAPI(item)))
        return json
    }
}

class Hero {

    static counter = 0;
    constructor(publicName, realName) {
        Hero.counter++;
        this._id = Hero.counter;
        this.publicName = publicName;
        this.realName = realName;
        this.powers = [];
    }

    static fromAPI(obj) {
        let h = new Hero(obj.publicName, obj.realName)
        h._id = obj._id
        return h
    }
    static toAPI(obj) {
        return {
            _id: obj._id,
            publicName: obj.publicName,
            realName: obj.realName,
            powers: []
        }
    }

}

export { Emplacement, Hero, Ville, Rue, Boutique, Item, itemCats, itemLimits}
let db = [];
let counter = 0;

class Product {
    constructor(id, name, price, image, stock){
        this.id = id;
        this.name = name;
        this.price = price;
        this.image = image;
        this.stock = stock;
    }

    save(){
        this.id = ++counter;
        db.push(this);
        return this;
    }

    edit(){
        const index = db.findIndex(p => p.id == this.id);
        db.splice(index, 1, this);
        return this;
    }

    static getAll(){
        return db;
    }

    static deleteById(productId){
        const index = db.findIndex(p => p.id == productId);
        const deleteProd = db[index];
        db.splice(index, 1);
        return deleteProd;
    }

}

module.exports = Product;
export class Item {
    itemId: number;
    itemName: string;
    quantity: number;
    price: number

    constructor(
        itemId: number,
        itemName: string,
        quantity: number,
        price: number
    ) {
        this.itemId = itemId;
        this.itemName = itemName;
        this.quantity = quantity;
        this.price = price
    }

}

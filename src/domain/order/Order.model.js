class OrderModel{
    constructor({
        id, customerId, totalAmount, status = "pending"
    , createdAt, items=[] })
    {
        this.id = id;
        this.customerId = customerId;
        this.totalAmount = totalAmount;
        this.status = status
        this.createdAt = createdAt;
        this.items = items;
    }

    canBeModified(){
        return this.status === "pending";
    }

    canBeCancelled(){
        return this.status === "pending" || this.status === "confirmed"
    }
}

module.exports = OrderModel;
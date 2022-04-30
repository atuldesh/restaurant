class BillRow {
    item;
    qty;
    rate;
    constructor(item,qty,rate){
        this.item=item;
        this.qty=qty;
        this.rate=rate;
    }
    get amount()  {return this.qty * this.rate;}
}
class Bill {
    dttime;
    tableNo;
    billRows;
    constructor(tableNo){
        this.dttime = new Date();
        this.tableNo = tableNo;
        this.billRows = [];
    }
    /**
     * @param {BillRow} brow
     */
    addBillRow(brow){
        this.billRows.push(brow);
    }
    get billAmount() {
        let tamt=0;
        for(i=0;i<this.billRows.length;i++){
            tamt = tamt + this.billRows[i].amount;
        }
        return tamt;
    }
    getBillRow(item){
        for(i=0;i<this.billRows.length;i++){
            if(item==this.billRows[i].item){
                return this.billRows[i];
            }
        }
        return null;
    }
    removeItem(item){
        for(i=0;i<this.billRows.length;i++){
            console.log(this.billRows[i].item + ","+item);
            if(item==this.billRows[i].item){
                console.log('remove'+item)
                this.billRows.splice(i,1);
                break;
            }
        }
    }

}
let bills = [];
let bill;

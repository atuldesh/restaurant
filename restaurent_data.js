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
        tamt=0;
        for(i=0;i<this.billRows.length;i++){
            tamt = tamt + this.billRows[i].amount;
        }
        return tamt;
    }

}
let bills = [];

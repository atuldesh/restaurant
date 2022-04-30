let mitems = ['Samosa','Kachori','Idli','Sambar Bada','Dosa','Cutlet','Wada Pav','Alu Poha','Puri Bhaji','Chola Bhatura','Dalbada'];
let mrates = [30,30,40,60,80,60,30,20,40,40,40];
let tables = 30;
let tbl_cols = 10;
let tbl_no_rows = parseInt(tables/tbl_cols);
let activeTableNo = 0;
function $(id) { return document.getElementById(id);}
function $$(cname) { return document.getElementsByClassName(cname);}
let tbl = $('tbl-tbl')
for(n=0;n<tbl_no_rows;n++){
    let r = tbl.insertRow();
    for(j=1;j<=tbl_cols;j++){
        let c = r.insertCell();
        let v = n*10 +j;
        c.innerText=(v<10)?"0"+(v):v;
        c.addEventListener('click',function() {getTable(c);});

    }
} 
function clearBill(){
    n=tableBillIndex(activeTableNo);
    if(n>-1) bills.splice(n,1);
    $('tblno').innerText="";
    $('bill-dtls').innerHTML="";
    setTableColor(activeTableNo,"rgb(140, 239, 140)");
    activeTableNo=0;
    $('tot').innerText="";
 
}
function tableBillIndex(n){
    for(i=0;i<bills.length;i++){
        if(bills[i].tableNo==n) return i;
    }
    return -1;
}
function saveCurrentBill(){
    n = tableBillIndex(activeTableNo);
    if(n == -1){
        bills.push(bill);
    }
}
function showCurrentBill(){
    n = tableBillIndex(activeTableNo);
    $('bill-dtls').innerHTML="";
    if(n==-1){
        const d = new Date();
        $('dttime').innerText = d.toLocaleString();
        $('tblno').innerText = activeTableNo;
        bill = new Bill(activeTableNo);
        $('tot').innerText="";
        console.log('tot'+bill.billAmount);
        return;
    } 
    bill = bills[n];
    $('dttime').innerText=bill.dttime.toLocaleString();
    $('tblno').innerText = bill.tableNo;
    for(i=0;i<bill.billRows.length;i++){
        createBillRow(bill.billRows[i]);
    }        
    $('tot').innerText=bill.billAmount;

}
function setTableColor(tblno,p_color){
    let vrno = parseInt(tblno/tbl_cols);
    let vcno = (tblno-10*vrno) % tbl_cols;   
    $('tbl-tbl').rows[vrno].cells[vcno-1].style.backgroundColor=p_color;
}
function getTable(c){
    if(activeTableNo>0){
        if($$('bill-row').length>0){
             saveCurrentBill();
             setTableColor(activeTableNo,"blue");
        } else {
            setTableColor(activeTableNo,"rgb(140, 239, 140)");
        }
    }
    c.style.backgroundColor = "red";
    activeTableNo= parseInt(c.innerText);
    showCurrentBill();
}

function attachEvent(col,n){
    col.addEventListener('click',function() {addItem(n);});
}

function showMenu(){
    let ms = $("menu-section")
    for(i=0;i<mitems.length;i++) {
        let mi = document.createElement('div');
        mi.id="mi"+i;
        mi.classList.add('menu-item');
        attachEvent(mi,i);
        let vimg = document.createElement('div'); vimg.classList.add('img-div');
        let viname = document.createElement('div');viname.classList.add('item-name');
        let virate = document.createElement('div');virate.classList.add('item-rate');
        vimg.innerHTML = '<img  class = "img" src="images/'+(i+1)+'.jpg" />';
        viname.innerText = mitems[i];
        virate.innerText = "Rs."+mrates[i];
        mi.appendChild(vimg);mi.appendChild(viname);mi.appendChild(virate);
        ms.appendChild(mi);
        
        
    }
}
function addItem(n) {
    if(activeTableNo==0){
        alert("Please select Table");
        return;
    }
    let rows = $$('bill-row');
    for(i=0;i<rows.length;i++){
        let chld = rows[i].children;
        if(chld[0].innerText == mitems[n]){
            let  qty = parseInt(chld[2].innerText) +1;
            let rate = parseInt(chld[3].innerText);
            let amt = qty * rate;
            chld[2].innerText = qty;
            chld[4].innerText = amt.toFixed(2);
            let brow = bill.getBillRow(mitems[n]);
            brow.qty=qty;
            $('tot').innerText=bill.billAmount;
    
            return;
        }
    }
    let brow = new BillRow(mitems[n],1,mrates[n]);
    bill.billRows.push(brow);
    $('tot').innerText=bill.billAmount;
    createBillRow(brow);
   
}
function createBillRow(brow){
    let nrow = document.createElement('div');
    nrow.classList.add('bill-row');
    let item = document.createElement('div');item.classList.add('b-item');item.innerText=brow.item;
    let qty = document.createElement('div'); qty.classList.add('b-qty'); qty.innerText=brow.qty;
    let rate = document.createElement('div');rate.classList.add('b-rate');rate.innerText=brow.rate;
    let amt = document.createElement('div');amt.classList.add('b-amt');
    amt.innerText=brow.amount.toFixed(2);

    let dbtn1 = document.createElement('div');
    dbtn1.innerHTML = "<input type='button' value='-' onclick='reduceQty(this)'/>";
     let dbtn2 = document.createElement('div');
    dbtn2.innerHTML = "<input type='button' value='X' onclick='delBillRow(this)'/>";

    nrow.appendChild(item);nrow.appendChild(dbtn1);nrow.appendChild(qty);
    nrow.appendChild(rate);nrow.appendChild(amt);nrow.appendChild(dbtn2);    
    $('bill-dtls').appendChild(nrow);
}
function delBillRow(btn){
    let brow = btn.parentElement.parentElement;
 //   console.log("A");
     bill.removeItem(brow.children[0].innerText);
    $('tot').innerText=bill.billAmount;
    brow.remove();

}
function reduceQty(btn){
    let brow = btn.parentElement.parentElement;
    let chld = brow.children;
    let qty = parseInt(chld[2].innerText);
    if(qty==1){
        bill.removeItem(brow.children[0].innerText);
        brow.remove();
    } else {
        qty=qty-1;
        let rate = parseInt(chld[3].innerText);
        amt = qty*rate;
        chld[2].innerText = qty;
        chld[4].innerText = amt.toFixed(2);
        let brow = bill.getBillRow(chld[0].innerText);
        brow.qty=qty;
    }
     $('tot').innerText=bill.billAmount;
        console.log(qty);
  //  brow.remove();
}










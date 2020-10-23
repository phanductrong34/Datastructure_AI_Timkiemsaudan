/*
CHÚ Ý

    REMOVE bây h sẽ check là có 1 phần tửu thì ta set head và tail = null luôn
    ADD thì luôn nhớ set mqh hai chiều next của thằng trước và prev của thăng sau
    GET,SEARCH mà cứ có index thì phải có đk check nếu vượt quá phạm vi, và trả ra thằng lấy đc
    UPDATE, SET: sử dụng kết quuar của get để update, cái này cần 2 tham số là index và val, trả ra true hoặc false, tức là set thành công hay không
    INSERT thì check vị trí của nó: đầu, cuối hoặc giữa hoặc ra noiaf phạm vi, vì có index

*/

class Node{
    constructor(val){
        this.val = val;
        this.next = null;
        this.prev = null;
    }
}

class DoublyLinkedList{
    constructor(){
        this.head = null;
        this.tail = null;
        this.length = 0;
    } 

    push(val){
        let newNode = new Node(val);
        // TH list chưa có phần tử nào
        if(this.head == null){
            this.head = newNode;
            this.tail = this.head;
        }else{
            //set MWH 2 chiều với tail cũ
            this.tail.next = newNode;
            newNode.prev = this.tail;

            this.tail = newNode
        }    
        this.length ++;
        return this;

    }

    pop(){
        //kiểm tra list có phần tử nào hay không 
        if(this.head == null) return undefined;
        //cắt đứt mối quan hệ với tail cũ;
        let remove = this.tail;
        // nếu còn lại đúng 1 phan tử thì đi luôn
        if(this.length == 1){
            this.head = null;
            this.tail = this.head;
        }else{
            this.tail = this.tail.prev;
            this.tail.next = null;
            // chú ý phần tử lấy ra cũng phải cập nhạt lại prev nữa
            remove.prev = null
        }

        this.length--;
        return remove.val;

    }

    shift(){
        //kiểm tra điều kiện bao nhiêu phân tử
        if(this.head === null) return undefined;
        let remove = this.head;
        if(this.length == 1){
            this.head = null;
            this.tail = this.head;
        }else{
            // new head create
            this.head = remove.next;
            this.head.prev = null;
            //isolate remove
            remove.next = null;
        }
        this.length--;
        return remove;
    }

    unshift(val){
        let newNode = new Node(val);
        if(this.head == null){
            this.head = newNode;
            this.tail = this.head;
        }else{
            newNode.next = this.head;
            this.head.prev = newNode;
            this.head = newNode;
        }
        this.length++;
        return this;

    }

    get(index){
        var current,count;
        if(index < 0 || index >= this.length) return null;
        // nếu mà index ở nửa đầu của list
        else if(index < Math.floor(this.length / 2)){
            current = this.head;
            count = 0;
            while(count !== index){
                current = current.next;
                count++;
            }
        }else{
            current = this.tail;
            count = this.length - 1;
            while(count !== index){
                current = current.prev;
                count--;
            }
        }
        return current
    }

    set(index,val){
        var foundNode = this.get(index);
        if(foundNode !== null){
            foundNode.val = val
            return true
        }
        return false
    }

    insert(index,val){
        let newNode = new Node(val);
        if(index < 0 || index > this.length) return false;
        else if(index == 0){
            return !!this.unshift(newNode);
        }else if(index == this.length){
            return !!this.push(newNode);
        }else{
            if(index < this.length / 2){
                let foundNode = this.get(index);
                let prevNode = this.get(--index);

                // thiết lập các mối quan hệ mới
                newNode.prev = prevNode;
                prevNode.next = newNode;

                newNode.next = foundNode;
                foundNode.prev  = newNode;

                this.length++;
            }
        }
        return true;
    }

    remove(index){
        if(index < 0 || index > this.length - 1) return false;
        if(index == 0) return !!this.shift();
        if(index == this.length - 1) return !!this.pop();
        let remove = this.get(index);

        // thiết lập MQH hai chiều mới
        remove.prev.next = remove.next;
        remove.next.prev = remove.prev;

        // cô lập remove;
        remove.next = null;
        remove.prev = null;

        this.length--;
        return remove;
    }

}

let list = new DoublyLinkedList();
list.push("first");
list.push("second");
list.push("third");
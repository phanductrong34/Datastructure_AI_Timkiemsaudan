
/*
CHÚ Ỳ
    ta tuy có hai hàm là push và pop ngưng cái nội dung lại giống nhưu shft và unshift
    vì thêm và xóa ở ngay đầu thì time complexity là không đổi là O(1), còn 
*/
class Node{
    constructor(val){
        this.val = val;
        this.next = null;
    }
} 

class Stack{
    constructor(){
        this.first = null;
        this.last = null;
        this.length = 0;
    }

    push(val){
        let newNode = new Node(val);
        if(this.first == null){
            this.first = newNode;
            this.last = this.first;
        }else{
            newNode.next = this.first;
            this.first = newNode;
        }
        this.length++;
        return this;
    }

    pop(){
        if(!this.first) return null;
        let remove =this.first;
        if(this.length == 1){
            this.first = null;
            this.last = null;
        }else{
            this.first = this.first.next;
            remove.next = null;
        }
        this.length--;
        return remove.val;
        
    }
}

let stack = new Stack();

stack.push(1)
stack.push(2)
stack.push(3)
stack.push(4)


///////////////////////////////////////////////////////////////////////////////////

class Queue{
    constructor(){
        this.first = null;
        this.last = null;
        this.size = 0;
    }

    // thêm vào hàng đợi
    enqueue(val){
        let newNode = new Node(val)
        if(this.size == 0){
            this.first = newNode;
            this.last = newNode;
        }else{
            this.last.next = newNode;
            this.last = newNode;
        }
        this.size++;
        return this;
    }

    // xóa cái đầu tiên khỏi hàng đợi
    dequeue(){
        if(this.size == 0) return null;
        let remove = this.first;
        if(this.size == 1){
            this.first = null;
            this.last = null;
        }else{
            this.first = remove.next;
            remove.next = null;
        }
        this.size--;
        return remove.val;
    }
}

let q = new Queue();


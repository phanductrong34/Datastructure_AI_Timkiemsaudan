class Node{
    constructor(val){
        this.val = val;
        this.left = null;
        this.right = null;
    }
}

class BinarySearchTree{
    constructor(){
        this.root = null;
    }
    /*
    INSERT: 
        - đầu tiên kiểm tra xem có root không, nếu không có thì insert luôn vào root;
        - nếu có thì bắt đầu đặt một biến con trỏ là current, và trỏ đầu tiên vào root
        - tạo 1 vòng lặp,so sánh value với current.val:
            + Nếu nhở hơn, check xem có current.left không
                . nếu không, ta chèn luôn vào và return
                . Nếu có, ta update lại current chính là current.left và tiếp tục vòng lặp tiếp theo;
            + Nếu lớn hơn, check xem có node bên phải không ;
                . nếu không ta chèn luôn vào va return ;
                . nếu có, ta update lại current chisng là currnet.right và tiếp tục vòng lặp tiếp theo;
            + Nếu bằng (tức phần tử ấy đã có sẵn trong tree, thì ta return undefine)
    */

    insert(value){
        let newNode = new Node(value);
        if(this.root === null){
            this.root = newNode;
            return this; 
        }else{
            let current = this.root
            while(true){
                if(value < current.val){
                    if(current.left === null){
                        current.left = newNode;
                        return this
                    }else{
                        current = current.left;
                    }
                }else if(value > current.val){
                    if(current.right === null){
                        current.right = newNode;
                        return this;
                    }else{
                        current = current.right;
                    }
                }else{
                    return undefined;
                }
            }
        }
    }

    // điều kiện dừng lại đó là ta check xem phần tử đã đc insert hay chưa
    
    insertRecursive(value){
        let newNode = new Node(value);
        if(!this.root){
            this.root = newNode;
            return this;
        }else{
            function helper(current){
                if(value < current.val){
                    if(current.left === null){
                        current.left = newNode;
                        return this;
                    }else{
                        current = current.left;
                    }
                }else if(value > current.val){
                    if(current.right === null){
                        current.right = newNode;
                        return this;
                    }else{
                        current = current.right;
                    }
                }else{
                    return undefined;
                }
                
                return helper(current)
            }
            helper(this.root);
        }
    }


    find(value){
        if(this.root === null){return null}
        else{
            let current = this.root;
            while(true){
                if(value < current.val){
                    if(current.left === null) return null;
                    else current = current.left;
                }else if(value > current.val){
                    if(current.right === null) return null;
                    else current = current.right;
                }else{
                    return current;
                }
            }
        }
    }

    /*
        -  tạo ra hai cái array: 1 cái là queue, 1 cái là visited;
        - nếu ko có root thì return undefine luon
        - nếu có thì bước đầu tiên là tống nó vào queue
        - chạy vòng lặp thỏa mãn miễn là vẫn còn phàn tử ở trong queue thì tiếp tục 
        mỗi lần lặp, nó sẽ lại nhấc 1 thằng từ queue ra và xẻ hét đống con trực tiếp trái phải của nó vào hàng đợi tiếp
            + dequeue 1 phần tử và push vào visited
            + nếu mà thằng đc dequeue đó có left node thì lấy ra và nhét vào queue;
            + nếu mà vẫn là thằng ấy mà có right node thì lấy ra và nhét vào queue:
            + end vòng lặp và bắt đầu vòng mới (dequeue ngay sau đó) khi ném hết trái phải của thằng ấy vào queue 

        ở đây chúng ta dùng 1 biến global scope là queue nên ko cần đẹ quy truyền vào cái gì cả, cái queue đã lưu lại tiến trình của mình rồi
    */
    BFS(){
        if(this.root === null) return null;
        else{
            let queue = [];
            let visited = [];
            let node;

            // tống root vào hàng đợi và như vậy là tống hết level đầu tiên
            queue.push(this.root);

            while(queue.length){
                node = queue.shift();
                visited.push(node.val);     
                // kiểm tra con trái phải của node ấy và đẩy nốt vào queue
                if(node.left){
                    queue.push(node.left);
                }
                if(node.right){
                    queue.push(node.right);
                }
            }

            return visited;

        }
    } 

    DFSPreOrder(){
        if(!this.root) return null;
        else{
            let visited = [];
            function traverse(node){
                visited.push(node.val);

                if(node.left) traverse(node.left);
                if(node.right) traverse(node.right);
            }

            traverse(this.root);
            return visited;
        }
    }

    // hiệu ứng đưa hết con vào xong mới đến cha
    DFSPostOrder(){
        if(!this.root) return null;
        else{
            let visited = [];
            function traverse(node){
                if(node.left) traverse(node.left);
                if(node.right) traverse(node.right);

                //Đắt ở đây tức là khi nó chạm tới lá (left lẫn right đều bằng null) nên push luôn vào
                visited.push(node.val);
            }

            traverse(this.root);
            return visited;
        }
    }

    // hiệu ứng gặp lần thứ 2 thì đẩy vào
    // cứ kiểu 1 thằng mà ko có con trái thì đẩy vào, sau đó mới xét tới phải
    DFSInorder(){
        if(!this.root) return null;
        else{
            let visited = []
            function traverse(node){
                if(node.left) traverse(node.left);
                visited.push(node.val);
                if(node.right) traverse(node.right); 
            }
            traverse(this.root);
            return visited;
        }
    }


}

let tree = new BinarySearchTree();
tree.insert(10);
tree.insert(3);
tree.insert(15);
tree.insert(6);
tree.insert(1);
tree.insert(12);
tree.insert(18);

/*
                10
            3       15
        1      6  12   18   

*/

// BFS : [10 3 15 1 6 12 18] ==> dùng queue và quết hết trái phải;
// DFS Pre-order [10 3 1 6 15 12 18] ==> dùng đệ quy và quét đệ quy trái phải, gặp cái nào là nhét vào luôn
// DFS Post-order [1,6,3,12,18,15,10]  ==> đảo cái thứ tự push xuống dưới cùng là sau khi recursion trái và phải
// DFS In-order [1,3,6,10,12,15,18] ==>  đảo cái thứ tự push ra giữa recursion trái và phải


/*
Khi nào thì duyệt kiểu này kiểu kia;
    DFS In-order output ra đúng 1 cái array đc sắp xếp từ nhỏ tới lớn ==> dùng khi ta muốn 1 cái output như vậy
    BFS như kiểu flatten cái tree ra sau đó ta có thể từ output ấy xây lại cây
*/
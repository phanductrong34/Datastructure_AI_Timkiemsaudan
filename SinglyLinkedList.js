/*chú ý các trường hợp khác nhau của Lít ban đầu
    - Không có phần tử nào ==> if(this.head == null)
    - Có phần tử rồi
-CHÚ Ý CÁC KIỂU RETURN
    - THÊM: (Push.Unshift.insert) retrun ra toàn bộ list
    - Xóa: return ra phần tử bị xóa ấy;
*\
    
*/
class Node{
    constructor(val){
        this.val = val;
        this.next = null;
    }
}

   /*Cái này như kiểu manager quản lý ds các node*/
class SinglyLinkList{
    constructor(){
        this.head = null;
        this.tail = null;
        this.length = 0;
    }
    
    /*Push: THÊM NODE MỚI VÀO CUỐI CỦA LINKLIST
        -B1: Tạo 1 Node mới
        -B2: check điều kiện
            + Nếu chưa có head (list 0 phần tử) thì cả head và tail đều trỏ vào node mới
            + Nếu đã có head thì tail(lúc này đang là 1 node) tail.next = node mới ấy, và tail lúc này bằng node mới 
             CHÚ Ý head và tail là hai con trỏ vào node đầu và cuối, pha xử lý ở trên là vừa set link giữa node cũ và mới, vừa update lại tail
        -B3: tăng length lên 1
    */
    push(val){
        var newNode = new Node(val);
        if(!this.head){
            this.head = newNode;
            this.tail = this.head;
        }else{
            this.tail.next = newNode;   //this.tail đang là node đuôi hiện tại ==> nesting
            this.tail = newNode;
        }
        this.length++;
        return this;
    }

    
    /*
    Pop: delete node cuối cùng của list
        -B1: Nếu ko có node nào(list rỗng == head = null hoặc length = 0) thì return undefined
        -B2: loop qua toàn bộ list cho tới khi chạm tới tail với hai con trỏ 1 con vào hiện tại, 1 con là ngay trước đó, mà chắc chắn sẽ là tail mới sau này
            con trỏ hiện tại ở tail khi nó có các đặc tính của tail : .next = null, chạm vào rồi thì set tail mới là con trỏ phía trước(tail là .next = null)
        -B3: Giảm length đi 1
        -B4: Trả ra node bị remove

    */
    pop(){
        if(this.head === null) return undefined;
        let current = this.head;
        let previous = current;
        while(current.next){
            previous = current   //dịch con trỏ previous lên bằng với hiện tại
            current = current.next 
        }
        // thoát khỏi vòng while tức current đã trỏ vào tail
        previous.next = null;
        this.tail = previous;
        this.length--;
        // thêm 1 đk nếu length mà bằng 0 thì sao
        if(this.length === 0){
            this.head = null;
            this.tail = null;
        }
        return current;
    }

    /* 
    Shift: Delete node đầu tiên của list
        -head sẽ chính là node đầu tiên, node head thì ko có tính chất gì, chỉ là con trỏ head trỏ vào thôi
        - Giảm length đi 1
        -return head
        - check cả th không có node nào nữa (length == 0)
    */

    shift(){
        if(!this.head) return undefined;
        let currentHead = this.head
        this.head= this.head.next;
        this.length--;
        // đây là th remove cái duy nhất thì ta phải làm thêm động tác nữa là reset SinglyLinkList về trạng thái ban đầu
        if(this.length === 0){
            this.head = null;
            this.tail = null;
        }
        return currentHead;
        
    }

    /*
    Unshift: Thêm node mới vào đầu LinkList
        -B1: tạo 1 node mới có value và next trỏ vào head hiện tại
        -B2: cập nhật lại con trỏ head là cái node mới tạo ấy
        -B3: tăng length lên 1
        -B4: return cả list mới
        -B5: xét th list rỗng và unshift này là phần tử đầu tiên, thì head lẫn tail đểu trỏ 1 giá trị
    */

    unshift(val){
        let newHead = new Node(val);
        // TH list đang rỗng phần tử
        if(!this.head){
            this.head = newHead;
            this.tail = this.head;
        }
        //nếu có phần tử trong list rồi
        newHead.next = this.head;  // tạo link giữa head mới và head cũ
        this.head = newHead;
        this.length++;
        return this;
    }

    /*
    Get: Lấy 1 node bất kì ứng với vị trí truyền vào
        -B1: input là vị trí cần tìm
        -B2: kiểm tra input mà nỏ hơn 0 hoặc lớn hơn length ta trả ra null luôn
        -B3: Lặp qua list cho tới khi chạm tới index ấy và trả ra node khớp với index ấy
    */

    get(index){
        if(index < 0 || index >= this.length) return null
        let count = 0;
        let current = this.head;
        while(count !== index){
            current = current.next;
            count++;
        }

        return current;
    }

    /*
    Set: update gía trị của phẩn tử tại vị trí cho trước
        -B1: input: index, val ==> ta dùng luôn hàm get để lấy đc node ấy, nếu lấy đc thì tiếp tục update, ko tìm thấy trả false
        -B2: lấy đc rồi thì update và return false thôi
    */

    set(index,val){
        let node = this.get(index);
        if(node){
            node.val = val;
            return true;
        }else{
            return false
        }
        
    }

    /*
    Insert: chèn 1 giá trị với vào vị trí index cho trước
        -B1: nếu index < 0 hoặc lớn hơn length ==> return false
            nếu index = 0 => ta dùng luôn hàm unshift
            Nếu index = length => ta dùng luôn hàm push
        -B2: ta sử dụng hàm get luôn, có điều index trước khi truyền vào phải trừ đi 1: ta cần lấy giá trị ở ngầy trước ấy, gắn next của nó với node mới, và next của node mới là cái phần tử ở đúng index
        -B3: tăng length ở mọi trường hợp true;
        -B4: return true ở tất cả các trường hợp
    */

    insert(index,val){
        if(index < 0 || index > this.length) return false;   // chú ý cái insert này thì == length vẫn hợp lệ
        if(index == 0){
            return !!this.unshift(val);      // như này ta vừa return đc true false mà vẫn thực hiện đc 1 hàm có sẵn;
        }
        else if(index == this.length){
            return !!this.push(val);
        }else{
            let previousNode = this.get(--index);
            let newNode = new Node(val);
            newNode.next =  previousNode.next;
            previousNode.next = newNode
            this.length++;
            return true            
        }
        return false;

    }

    /*
    Remove: xóa 1 phần tử ở 1 vị trí nhất định
        -B1: nếu index ở ngoài khoảng xét thì tất nhiên return false
        -B2: nếu index == 0, ta dùng hàm shift
            nếu index == length, ta dùng hàm pop
            nếu indx ở giữa, ta dùng làm get, nhưng lấy phần tử trước đó + sau đó
        -B3: gán next của node trước đó là node sau đó (cách 1 phần tử luôn);
        -B4: length -- và return ra phần tử vừa bị remove;
    */

    remove(index){
        if(index < 0 || index >= this.length) return undefined;  
        if(index == 0){
            return this.shift();           // đoạn này phải return nếu ko nó sẽ tiếp tục chạy hàm xuống dưới cho đến khi hết lệnh, cái return ở trong hàm con chỉ pop call stack của hàm con thôi
        }else if(index == this.length-1){
            return this.pop();
        }else{
            let prevNode = this.get(--index);
            let removed = this.get(index);
            prevNode.next = removed.next;
            this.length--;
            return removed
        }
    }

    /* 
    Reverse: Đảo lại thứ tự NGAY TẠI CHỖ ==> tức ko tạo thêm list mới;
        -B1: dảo head và tail cho nhau và ta sẽ đặt từng viên gạch theo chiều ngược
        -B2: loop và mỗi một vòng lặp ta tiếp cận node tiếp theo (như chiều cũ và tìm cách đảo chiều nó, thay lại cái next)
            để làm đc vậy cần 2 thứ, 1 là bản thân cái node tiếp theo ấy có chứa val (node này gọi là current), và node để update lại next (node này sẽ gọi là prevNode)
    */
   // dùng cái print này để kiểm tra xem reverse có đc ko hay thôi 

    print(){
        let arr = [];
        let current = this.head;
        while(current){
            arr.push(current.val);
            current = current.next
        }
        console.log(arr);
    }
    reverse(){
        // Swap hai con trỏ trước
        let node = this.head;
        this.head = this.tail;
        this.tail = node;

        // Tạo hai con trỏ theo dõi cái prev và next của node hiện tại
        let next;
        let prev = null // vì phần tử dầu là this.head ;
        
        // mỗi vòng lặp ta nhảy tối 1 node mới và biết đc previous của nó là gì ==> cần 2 thứ update sau mỗi vòng lặp là NODE và PREV;
        for(let i = 0; i < this.length; i++){
            // gán lại giá trị cho next và thiết lập quan hệ mới
            next = node.next;
            node.next = prev;
            // cập nhật giá trị chuẩn  bị vòng mới;
            prev = node;
            node = next
        }

        return this
    }
    
    //          Tail         Head
    //          13   27   42  50
    //prev     node  next
    //         prev  node      
}

var firstList = new SinglyLinkList()
firstList.push("hello")
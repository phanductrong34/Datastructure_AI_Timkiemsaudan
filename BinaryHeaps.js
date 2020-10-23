class MaxBinaryHeap {
    constructor(){
        this.value = [41,39,33,18,27,12];
    }

    // iNSERT: ĐƯA PHẦN TỬ MUỐN INSERT VỀ ĐÚNG VỊ TRÍ CỦA NÓ TRONG ARRAY
    /* 
    B1: chèn phẩn tử mới vào cuối cùng của dãy
    B2: đặt biến giữ lại index của phần tử cuối ấy
    B3: chạy 1 vòng while (điều kiện là chừng nào Index của thằng con vẫn lớn hơn 0 thì tiếp tục)
    B4: tìm ra index của thằng bố nó, so sánh nếu thằng bố mà lớn hơn thì break luôn
    B5: nếu không bị break thì swap giá trị của hai thằng bố và con
    B6: cập nhật lại index chính là index của thằng bố
    */
    insert(value){
        this.value.push(value);
        this.bubbleUp();
        return this.value;
    }
    

    bubbleUp(){
        let index = this.value.length-1;
        let element = this.value[index];
        while(index > 0){
            let parentIndex = Math.floor((index-1)/2);
            let parent = this.value[parentIndex];
            if(parent > element) break;
            // nếu không bị break thì swap;
            this.value[parentIndex] = element;
            this.value[index] = parent;
            // cập nhật lại index
            index = parentIndex;
        }
    }
    swap(index1,index2){
        [this.value[index1],this.value[index2]] = [this.value[index2],this.value[index1]];
    }

    // Hàm láy ra phần tử lớn nhất của heap, hay chính là root của heap
    /*
    B1: đảo thằng root và thằng lá cuối cùng của heap ==> sau đó pop thằng root ra ==> như vậy pop sẽ ko xáo trộn cấu trúc gì của cây
    B2: vun đống lại hay sinkDown: đưa thằng root mới ấy về đúng vị trí chính xác của nó trong heap;
    B3: bằng cách tìm con trái và con phải, thằng con nào lớn hơn thì swap giá trị, nếu cả hai con cùng lớn hơn thì swap với con lớn nhất
    B4: lặp cho tới khi cái element ấy không còn con nào (trở thành lá hoặc tất cả con đều nhỏ hơn thì dừng lại);

    Ý tưởng của bài này là ta có swapIdx nhưu kiểu trong selection sort có biến maxIdx ==> nếu có con trái lớn hơn, ghi nhận index của nó
    nếu có cả con phải, mà con phải cũng lớn hơn, nhưng còn lớn hơn cả con trái thì mới cập nhật lại swapIdx, tới cuối cùng thì ta đảo chỗ thằng root ảo ấy về vị trí thật cuối cùng của nó 
    =======> motip bài toán khi phải so sánh giữu nhiều thứu với nhau mà chọn ra cái lướn nhất, ta dùng biến trung gian lưu lại index 

    */
    extracMax(){
        let max = this.value[0]
        let end = this.value.pop();

        if(this.value.length > 0){   // trường hợp pop hết các phần tử ra rồi 
            this.value[0] = end;
            this.sinkDown();
            console.log(this.value);
        }

        return max;
    }

    sinkDown(){
        let idx = 0;
        const length = this.value.length;
        let element = this.value[idx];
        
        while(true){
            let swapIdx = null;


            let leftChildIdx = 2 * idx + 1; 
            let rightChildIdx = 2 * idx + 2;
            let leftChild, rightChild;
            // có thể xảy ra trường hợp ind của hai con bị quá 

            if(leftChildIdx < length){
                leftChild = this.value[leftChildIdx];
                if(leftChild > element){
                    // ghi nhận lại vị trí mà con trỏ đang ở
                    swapIdx = leftChildIdx;
                }
            }

            if(rightChildIdx < length){
                rightChild = this.value[rightChildIdx];
                if((swapIdx === null && rightChild > element) ||
                    swapIdx !== null && rightChild > leftChild){  // tính bắc cầu:  nếu swapIndx có giá trị tức thằng trái đã lớn hơn rồi, mà thằng phải lớn hơn thằng trái ==> thằng phải lớn hơn element và lấy thằng phải
                        swapIdx = rightChildIdx; 
                    }
            }

            // nếu có nhiều trường hợp cùng có thể dẫn tới end vòng loop thi ta cho ra 1 biến riêng để check 
            if(swapIdx === null) break;

            //sau khi qua mấy cái if mà vã cuống được đây chứng tỏ swapIdx đã gh nhận đc vị trí cần chuyển;
            this.value[idx] = this.value[swapIdx];
            this.value[swapIdx] = element;

            // thay đổi thông sô idx và nhảy vòng check tiếp theo
            idx = swapIdx;
        }
    }
}
//[41,39,33,18,27,12]
// 0  1  2  3  4  5

let heap = new MaxBinaryHeap(); 



/////////////////////////////////////////////////

class Node{
    constructor(value,priority){
        this.val = value;
        this.prio = priority;
    }
}


class PriorityQueue{
    constructor(){
        this.value =  [];
    }

    enqueue(value,priority){
        //đầu tiên cứ chèn ở cuối array đã, sau đó với bubble up lên
        let newNode = new Node(value,priority);
        this.value.push(newNode);
        this.bubbleUpPrio();
        return this.value;
    }

    bubbleUpPrio(){
        let index = this.value.length - 1;
        let element = this.value[index];

        while(index > 0){
            let parentIndex = Math.floor((index - 1)/2);

            if(this.value[parentIndex].prio <= this.value[index].prio) break;

            this.value[index] = this.value[parentIndex];
            this.value[parentIndex] = element;
            index = parentIndex;

        }
    }



    dequeue(){
        let min = this.value[0]
        let end = this.value.pop();

        if(this.value.length > 0){   // trường hợp pop hết các phần tử ra rồi 
            this.value[0] = end;
            this.sinkDown();
        }

        return min;
    }

    sinkDown(){
        let idx = 0;
        const length = this.value.length;
        let element = this.value[idx];
        
        while(true){
            let swapIdx = null;


            let leftChildIdx = 2 * idx + 1; 
            let rightChildIdx = 2 * idx + 2;
            let leftChild, rightChild;
            // có thể xảy ra trường hợp ind của hai con bị quá 

            if(leftChildIdx < length){
                leftChild = this.value[leftChildIdx];
                if(leftChild.prio <= element.prio){
                    // ghi nhận lại vị trí mà con trỏ đang ở
                    swapIdx = leftChildIdx;
                }
            }

            if(rightChildIdx < length){
                rightChild = this.value[rightChildIdx];
                if((swapIdx === null && rightChild.prio < element.prio) ||
                    swapIdx !== null && rightChild.prio < leftChild.prio){  // tính bắc cầu:  nếu swapIndx có giá trị tức thằng trái đã lớn hơn rồi, mà thằng phải lớn hơn thằng trái ==> thằng phải lớn hơn element và lấy thằng phải
                        swapIdx = rightChildIdx; 
                    }
            }

            // nếu có nhiều trường hợp cùng có thể dẫn tới end vòng loop thi ta cho ra 1 biến riêng để check 
            if(swapIdx === null) break;

            //sau khi qua mấy cái if mà vã cuống được đây chứng tỏ swapIdx đã gh nhận đc vị trí cần chuyển;
            this.value[idx] = this.value[swapIdx];
            this.value[swapIdx] = element;

            // thay đổi thông sô idx và nhảy vòng check tiếp theo
            idx = swapIdx;
        }
    }
};

let PrioQueue = new PriorityQueue();

PrioQueue.enqueue("common cold",1);
PrioQueue.enqueue("gunshot",5);
PrioQueue.enqueue("fever",2);
PrioQueue.enqueue("corona",8);
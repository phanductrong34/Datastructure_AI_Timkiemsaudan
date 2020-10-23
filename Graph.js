class Graph{
    constructor(){
        this.adjacencyList = {};
    }

    /*
    addVertex: mỗi 1 node con là 1 key trong object tổng, và mỗi một node là 1 array chứa tên các node khác ==> mqh một chiều đc thiết lập
    */
    addVertex(vertex){
        this.adjacencyList[vertex] = []
    }


    /*
    addEdge: thiết lập quan hệ hai chiều, tao giữ địa chỉ của mày và ngược lại
    */
    addEdge(vertex1,vertex2){
        this.adjacencyList[vertex1].push(vertex2);
        this.adjacencyList[vertex2].push(vertex1);
    }

    removeEdge(vertex1,vertex2){
        // tìm tới vertex 1 (đang là 1 array) thì xóa phần tử vertex2 đi và ngược lại ==> xóa mối quan hệ ở hai chiều luôn;
        this.adjacencyList[vertex1] = this.adjacencyList[vertex1].filter(
            v => v !== vertex2
        )
        this.adjacencyList[vertex2] = this.adjacencyList[vertex2].filter(
            v => v !== vertex1
        )
    }

    removeVertex(vertex){
        // tìm tới thằng vertex đó, xem nó kết nối hai chiều với những thằng nào thì chạy hàm removeEdge() để xóa sạch toàn bộ mối liên kết
        // sau đó ra delete cái key ấy khỏi object tổng luôn

        this.adjacencyList[vertex].forEach(cur => {
            this.removeEdge(vertex,cur);
        });

        delete this.adjacencyList[vertex];
    }


    // thằng này thì khá rõ ràng rồi, nếu mà các thăng con chưa thăm thì ta nhích dần vào sâu hơn cho tới khi tới 1 vertex ko còn neigbor nào nữa thì quay lại và kiếm đường khác


    // nhận đầu vào là 1 string tên của 1 vertex
    deepFirstRecursive(start){
        // tạo ra 1 object visited để check xem đã thăm hay chưa và 1 result chứa các đỉnh đc thăm;
        var visited = {};
        var result = [];
        var adjacencyList = this.adjacencyList;
        (function dfs(vertex){
            // cái này là kiểm tra đk nhạp thôi, cũng không hẳn là basecase của đệ quy, vì bài toán này chạy tơi lá sâu nhất rồi cx tựu pop ra
            if (!vertex) return null;
            
            // nhảy tơi đây tức là có vertex
            visited[vertex] = true;
            result.push(vertex);

            adjacencyList[vertex].forEach(neighbor =>{
                if(!visited[neighbor]){
                    return dfs(neighbor);
                }
            })
            // nếu đi tới đây tức là 1 vertex ko thể đi tiếp tới neighbor nào nữa ==> nó sẽ pop callstack của hàm hiện tại ra vào quay lại call stack trước

        })(start);
        return result;
    }


    /////////////////// cái visited và result thời điểm chạy là khác nhau, ta cứ thêm vertex và stck hoặc queue thì tính là đa thăm, còn lúc mà pop() ra (chỉ có 1 cái duy nhất đc xết) thì khi ấy tính là thêm vào result


    // thằng này có dùng stack và đẩy hết các thằng con vào sau đó xử lý luôn các thằng con đó ==> cứ thêm con và đầu stack, rồi pop đúng thằng con ấy ra để tìm sâu hơn
    // ==> thực sự đay đúng là tìm theo chiều sáu thật

    // lưu ý: thêm vào stack thì tính là thăm; còn pop khỏi stack để duyệt tính là thêm vào kết quả ==> vì kết quả là trình tự ta duyệt
    deepFirstIterative(start){
        var stack = [];
        var result =[];
        var visited = {};
        
        //bước khởi tạo là push luôn thằng đầu tiên vào
        stack.push(start);
        visited[start] = true;
        
        // 1 vòng lặp cho tới bao h pop hết stack(tức duyệt hết tất cả đinh thì dừng lại)
        while(stack.length !== 0){
            // bắt đầu mỗi vòng là pop stack ra và add vào kết quả, vì ta đang duyệt tới nó đấy
            var curVertex = stack.pop();
            result.push(curVertex);

            this.adjacencyList[curVertex].forEach(neighbor =>{
                // kiểm tra thằng mới đc pop có neighbor nào chưa đc đánh dấu là thăm ko thì ta add vào stack và đánh dấu là đã đc thăm
                if(!visited[neighbor]){
                    visited[neighbor] = true;
                    stack.push(neighbor);
                }
            })

        }
        return result;
    }

    // nhiệm vụ ở đây là duyệt tất cả thằng neighbor rồi mới tới các con sâu hơn
    // duyệt hết 1 tầng level sau ròi mới duyệt tất cả ở level tiếp theo
    breathFirst(start){
        var queue = [start];
        var visited = {};
        var result = [];

        visited[start] = true;

        while(queue.length !== 0){
            var curVertex = queue.shift(); // lấy ở đầu của list
            result.push(curVertex);

            this.adjacencyList[curVertex].forEach(neighbor =>{
                if(!visited[neighbor]){
                    visited[neighbor] = true;
                    queue.push(neighbor);
                }
            })
        }
        return result;

    }


}



let g = new Graph();

g.addVertex("A")
g.addVertex("B")
g.addVertex("C")
g.addVertex("D")
g.addVertex("E")
g.addVertex("F")


g.addEdge("A", "B")
g.addEdge("A", "C")
g.addEdge("B","D")
g.addEdge("C","E")
g.addEdge("D","E")
g.addEdge("D","F")
g.addEdge("E","F")


//          A
//        /   \
//       B     C
//       |     |
//       D --- E
//        \   /
//          F


/////////////////// GRAPH TRAVERSAL ==> Duyệt graph (VISITING, UPDATING, CHECKING)


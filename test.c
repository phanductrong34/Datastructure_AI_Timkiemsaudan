int main(void){
    // khai báo cấp phát bộ nhớ nằm tren cùng
    char expression[80];
    int value;

    // nhập dữ liệu người dùng:
    printf("Nhap vao xau bieu thuc: ");
    gets(expression);
    printf("\nBieu thuc nhap vao = %s", expression);

    // hàm tính gái trị biểu thức hậu tố
    value = eval(expression);  // chúng ta không tạo ra giá trị mới, nên ko thể trung chuyển toàn bọ dữ liệu về giá trị đi được, chỉ có vận chuyển địa chỉ thui ==> cái này giống như truyền đi ID;
    printf("\nGia tri cua bieu thuc = %i",value);

    //hai thủ tục cuối cùng kết thúc hàm main
    getch();
    return 0 ;
}

// viết hàm tính giá trị biểu thức eval:
int eval(char *s){     // tuy para là 1 con trỏ nhưng chạy hàm ta lại truyền vào giá trị, hay char *s = expression
    char ptr*;        //khai báo con trỏ trỏ tới ô kiểu char
    int first, second,c;
    ptr = strtok(s, " "); // hàm giống split, gía trị của bản thân con trỏ ptr là 1 con trỏ trỏ đến vị trí đầu trong chuỗi char
    top = -1;
    while(ptr){
        if(isop (*ptr)){  //kiểm tra giá trị mà con trỏ đang trỏ tới có phải toán tử ko
                second = pop(); first() = pop();
                c= do_op(first,second, *ptr);
                push(c);
        }
        else{
            c = atoi(ptr);
            push(c);
        }
        ptr = strtok(NULL, " ") // tức tiếp tục dịch con trỏ lên 
    }
    return (pop()); // giá trị cuối cùng còn lại trong stack chính là kết quả của phép toán;
    
}


int pop(void){  //custom hàm pop này
    int remove;
    remove = stack[top]    // khởi tạo ở trên là top = -1; tức là giá trị cuối cùng;
    top--;
    return remove;
}

int push(int a){
    top++;
    stack[top] = a;
}

int main(void){
    char expression[80];
    char *ptr;
    gets(expression);
    ptr = strtok(expression, " ");   // ptr trỏ thành 1 con trỏ riêng của chuối token trả ra bởi strtok ấy luôn, và phát đầu là ptr trỏ vào token đầu tiên

    if(*ptr == "a")
    return 1;
    else return 0;
}

int *p = (int *) malloc(10 * sizeof(int))
                ------------------------- thực hiện cấp phát bộ nhớ bằng cách chỉ định số byte cần cấp phát
        ------- hàm này trả về con trỏ void ==> cho phép ta có thể ép kiểu vè bất cứ kiểu nào;
// mảng cấp phát tĩnh: mảng là 1 tập hợp các phần tử nằm liên tiếp nhau trong bộ nhớ có cùng kiểu dữ liệu. khi khai báo mảng phải chỉ rõ kích thước tối đa cho nó, sau khi khai báo thì ko thể thay đổi kích thước của mảng


int *p;
p = (int*) malloc(10 * sizeof(int))

con trỏ p này trỏ tới vùng nhớ đc cấp phát, để giải phóng bộ nhớ

free(p)

////////////////////////////////////////////////////////////////////////
int arr*
arr = (int *) malloc(10 * sizreof(int))
// con trỏ arr trỏ vào giá trị đầu của mảng đc cấp phát
// để dịch con trỏ ấy lên ta làm như sau
i = 1
arr + i ==> địa chỉ của arr[1]
*(arr + i) ===> giá trị của arr[1];

void themphantu (int *arr, int &n, int val, int pos)
        - int *arr : bởi vì arr đã dược cấp phát bộ phớ băng malloc ở chương trình trên ==> ta tìm tới địa chỉ và thay đổi nó thôi, chứ ko cần tạo ra data mới nữa
        - int &n : cũn gbowri vì n đã được khai báo ở chường tình bố, ta muốn tận dụng luôn để tránh tạo ra bộ hớ trong ram thừa thì truyền vào địa chỉ cuẩ n
        - int val và int pos: vì cái này mưới đc tạo ra ở trên, số lượng nhỏ và không vấn đề gì khi tạo ra bộ nhớ mới do quá nhỏ;


//////////////////////////////////////////////////////////
#include <stdio.h>
#include <stdlib.h>


int main(){
    int *arr,n;

    printf("\nNhap so luong phan tu trong mang n = ");
    scanf("%d",&n);
    // cap phat bo nho cho mang
    arr = (int *) malloc(n * sizeof(int));
    NhapMang(arr,n);
    printf("\nMang vua nhap la");
    XuatMang(arr,n)

    printf("========THEM PHAN TU=======");

    int pos, val
    prinf("\nNhap so can them:");
    scanf("%d", &val);
    prinf("\nNhap vi tri muon chen :");
    scanf("%d", &pos);

    Insert(arr,n,pos,val);

    printf("=========XOA PHAN TU=========");
    prinf("\nNhap vi tri muon xoa :");
    scanf("%d", &pos);

    Remove(arr,n,pos);

    prinf("\nMang sau khi xoa");
    XuatMang(arr,n);

    /// kết thúc chương trình phải giải phóng bộ nhớ đc cấp phát;
    free(arr)

}

void NhapMang(int arr*,int n){    /// chỗ này ko cần tới &n vì n ko hè bị thay đổi bên trong hàm con này
                                  /// chỉ khi n bị thay đổi hay update mới cần tới dịa chỉ của n 

    for(int i = 0; i < n; i++){
        printf("\narr[%d] =", i );
        scanf("%d",*(arr + i));
    }
}

void XuatMang(int arr*, int n){
    for(int i = 0; i < n; i++){
        printf("\narr[%d] = %d",i, *(arr +i))
    }
}
void Insert(int arr*,int n, int pos, int val){
    // update lại lượng bộ nhớ cấp phát cho arr đi
    arr = (int *) realloc(arr,(n+1) * sizeof(int));

    // xử lý input
    if(pos > n) pos = n;
    if(pos < 0) pos = 0;

    //dịch chuyển lại gias trị của các phần tử trong mảng lên trên chừa chỗ cho insert
    for(int i = n - 1; i >= pos; i--){
        *(arr + i + 1) = *(arr + i);
    }
    // chèn gái trị mới vào;
     
    *(arr + pos) = val;
    ++n;
}

Remove(int arr*, &n, int pos){
    // xư lý input
    if(pos > n) pos = n;
    if(pos < 0) pos = 0;

    //cập nhật lại giá trị của mảng
    for(int i = pos; i < n-1; i++){
        *(arr + i) = *(arr + i + 1);
    }

    // cập nhật lại cấp phat bộ nhớ cho con trỏ array;
    arr = (int *) realloc(arr,(n-1)* sizeof(int))

    --n;
}




////////////////////// VIET THU DANH SACH MOC NOI DON = C

#include <stdio.h>
#include <stlib.h>


typedef long ElementType;

typedef struct Node{
    ElementType val;
    Node *next;      // con trỏ next trỏ vào kiểu dữ liệu node;
}Node

// Định nghĩ head,tail
Node *head = NULL;   // con trỏ head hoàn toàn rỗng

Node *tail;
tail -> next = NULL;

Node *unshift(ElementType x; Node *list){          // hàm này là 1 con trỏ trỏ tới cái kiểu dữ liêu Node kia ==> giống this

    // tao ra Node mới đã bằng cách cấp phát bộ nhớ cho con trỏ head (hay ở hàm này là list)
    Node *newNode;
    newNode = (Node *)malloc(sizeof(Node));
    newNode -> val = x;

    // nếu không có phần tử trong list
    if(head == NULL){
        newNode -> next = NULL;
        head = newNode;
        tail = head;
    }else{
        newNode -> next = head;    // head ở đây là biến toàn cục, hàm nào cũng rờ đc
        head = newNode;
    }
    return head;


}

Node *push(ElementType x; Node *list){
        // có 1 con trỏ Node cur để dừng lại vào phần tử cuối cùng (tail)
        // sau đó set cur -> next = newNode;
        Node *newNode, *cur;
        
        // tạo ra Node mới đã
        newNode = (Node *)malloc(sizeOf(Node));
        newNode -> val = x;
        newNode -> next = NULL;

        cur = head;
        if(cur == NULL){  
            cur = newNode;
            head = cur;
        }else{
            while(cur != NULL && cur -> next != NULL){
                cur = cur -> next
            }
            cur -> next = newNode;
        }


}

int main(){
    ElementType input;
    scanf("value of the newNode = %d", &input);

    // unshift phần tử vào cuối dãy

    Node *ptemp;            // ptemp phải là 1 con trỏ có kiểu dữ liệu trên thì mới nhận đc return từ unshift ấy
    ptemp = unshift(input,head); // head ở đay lúc này dại diện cho cả cái list luôn;

    Node *ptemp2;
    ptemp2 = push(input,head);
}




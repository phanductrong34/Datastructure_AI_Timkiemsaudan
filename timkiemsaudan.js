/*

          A
      /   \    \
     B     C   D
  /  |  \ /    
E   F    G
        |
        H
        |
        I

danhsachke: {
    A: A-B-C-D- /,
    B: B-E-F-G- /,
    C: C-G -/,
    D: D-/,
    E: E-/,
    F: F-/,
    G: G-H-/,
    H: H-I -/
    I: I-/
}

*/

// biểu diễn graph dưới dạng 1 object các đỉnh, mỗi đỉnh là 1 node có thể trỏ tới node kề nó
class Dinh{
    constructor(v){
        /*
        1 đỉnh có 2 trường: giá trị, và đỉnh kề với nó, mặc định là null
        */
        this.v = v;
        this.dinhKe = null; 
    }
}

class DanhSachMocNoi{
    constructor(){
        this.dau = null;
        this.cuoi = null;
        this.length = 0;
    }

    //OUTPUT: 1 đỉnh(node) trắng lấy từ đầu ds
    getMO(){
        //lấy đỉnh đầu
        let dinh = this.dau;

        // dịch con tro
        this.dau = dinh.dinhKe;
        this.length--;

        // cô lập đỉnh lấy ra
        dinh.dinhKe = null;

        return dinh;
    };

    //hàm đẩy đỉnh vào đầu hoặc cuối ds, input là đỉnh có dữ liệu lấy ra từ đồ thị
    pushStack(dinh){
        //thêm phần tử đầu tiên
        let dinhmoi = new Dinh(dinh.v)  // tạo mới 1 node trắng để ko ảnh hưởng tới đỉnh đc tham chiếu
        if(!this.length){
            this.dau = dinhmoi;
            this.cuoi = this.dau;
        }else{
            //dịch con trỏ
            dinhmoi.dinhKe = this.dau;
            this.dau = dinhmoi;
        }

        this.length++;
    };

    //INPUT: 1 đỉnh có nội dung
    pushQueue(dinh){
        let dinhmoi = new Dinh(dinh.v)  // tạo mới 1 node trắng để ko ảnh hưởng tới đỉnh đc tham chiếu
        //thêm phần tử đầu tiên
        if(!this.length){
            this.dau = dinhmoi;
            this.cuoi = this.dau;
        }else{
            this.cuoi.dinhKe = dinhmoi;
            this.cuoi = dinhmoi;
        }
        this.length++;
    };

    inDs(){
        let dinhxet = this.dau;
        while(dinhxet){
            console.log(dinhxet.v);
            dinhxet = dinhxet.dinhKe;
        }
            
    };
};

class Dothi{
    constructor(){
        this.danhSachKe = {};
        this.soLuongDinh = 0;
        this.bangDoSau = {};
    };
    inDanhSach(){
        console.log(this.danhSachKe)
    };
    themDinh(v){
        if(!this.danhSachKe[v]){
            this.danhSachKe[v] = new Dinh(v);
            this.soLuongDinh++;
            return this;
        }else return false;
    };
    themCanh(v1,v2){
        /* 
        kiểm tra hai đỉnh có tồn tại trong danhsachke
        tìm tới đỉnh v1 trong đồ thị
        duyệt qua từng đỉnh kề của v1, xem có v2 không
        nếu duyệt tới cuối mà ko có, thì thêm v2 vào cuối ds
        return danhsachke nếu thành công, false nếu đã có đỉnh
        */

        if(!this.danhSachKe[v1] && !this.danhSachKe[v2]){
            console.log(`Khong ton tai dinh`);
            return false;
        }else{
            let dinhDau = this.danhSachKe[v1].dinhKe;
            let dinh = dinhDau;
            while(true){

                if(dinh == null){ //tức đi tới cuối danh sách rồi, mà vẫn chưa thoát vòng while
                   let dinhMoi = new Dinh(v2);
                   this.danhSachKe[v1].dinhKe = dinhMoi;
                   dinhMoi.dinhKe = dinhDau;
                   return this;
                }else{
                    if(dinh.v == v2){
                        console.log("Da ton tai canh");
                        return false;
                    }else{
                        dinh = dinh.dinhKe;
                    }
                }
            }
        }

    };

    xoaCanh(v1,v2){
        /*
        kiểm tra sự tôn tại của hai đỉnh trong danhSachKe
        đi tới đỉnh v1,duyệt qua từng đỉnh kề của v1, có lưu trữ cả đỉnh trước, tìm xem có v2 hay không
        nếu ko có thì báo lỗi, nếu có thì, xem đỉnh hiện tại đang duyệt là ở cuối ds hay ở giữa
        nếu là giữa thì dinhTruoc.dinhKe = dinh.dinhKe, còn nếu ở cuối thì dinhtruoc.dinhKe = null
        */
        
        if(!this.danhSachKe[v1] && !this.danhSachKe[v2]){
            console.log(`Khong ton tai dinh`);
            return false;
        }else{
            let dinhTruoc = this.danhSachKe[v1]
            let dinh = dinhTruoc.dinhKe;

            while(true){
                if(dinh == null){ //đi đến cuối vẫn không tìm ra v2 ==> cạnh v1,v2 không tồn tại
                    // console.log(`Khong ton tai canh ${v1}${v2}`);
                    return false;
                }else{
                    if(dinh.v == v2){
                        dinhTruoc.dinhKe = dinh.dinhKe;
                        return this;
                    }else{
                        dinhTruoc = dinh;
                        dinh = dinh.dinhKe;
                    }

                }
            }
            
        }

    };

    xoaDinh(v1){
        /*
            tìm trong danh sách xem có tồn tại đỉnh đó không
            Nếu không thì báo lỗi, nếu có thì delete, 
            sau đó loop qua tất cả đỉnh trong ds và tìm xóa cạnh vn-v1
        */
        
        if(!this.danhSachKe[v1]){
            console.log(`Khong ton tai dinh ${v1}`);
            return false;
        }else{
                delete this.danhSachKe[v1];
                for(let v in this.danhSachKe){
                    this.xoaCanh(v,v1);
                }
                this.soLuongDinh--;
                return this;
        }

    };
    
    /*
        B1: tạo ra hai ds móc nối MO và DONG
        B2: kiểm tra đỉnh người dùng có tồn tại trong Dothi ko, có thì thêm vào MO;
        B3: vòng while chừng nào MO còn đỉnh
                - getMo(), push vào DONG
    */
    timKiemSauDan(so,dich,h){
        let MO = new DanhSachMocNoi();
        let DONG  = new DanhSachMocNoi();
        let THAM = {};
        let check = false;
        let DS = h;
        //tÍnh bảng độ sau từ đỉnh so
        let BANGDS = this.tinhDoSau("A");

        //lấy ra đỉnh so từ đồ thi
        let dinhxet = this.danhSachKe[so]; 
        if(!dinhxet){   //kiểm tra có tồn tại đỉnh nhập ko
            console.log(`Khong ton tai dinh ${so}`);
            return null;
        };
        // thêm vào stack MO đỉnh đầu (thêm vào đầu)
        MO.pushStack(dinhxet);
        THAM[so] = true  // đầu tiên là đánh dâu đã thăm cho đỉnh truyền vào

        while(MO.length != 0){
            let dinh = MO.getMO();
            DONG.pushQueue(dinh);

            if(dinh.v == dich){
                check = true;
                break;
            };

            if(this.haveChild(dinh)){
                let dinhcon = this.danhSachKe[dinh.v].dinhKe;
                while(dinhcon){
                    if(!THAM[dinhcon.v]){
                        THAM[dinhcon.v] = true;
                        let dscon = BANGDS[dinhcon.v];
                        // bắt đầu xét độ sâu của đỉnh con ở đây để quyết định push thoe cách nào

                        if(dscon >=0 || dscon <= DS-1){
                            MO.pushStack(dinhcon);
                        }else if(dscon == DS){
                            MO.pushQueue(dinhcon);
                        }else if(dscon == DS +1){
                            DS = DS+h;  // chỗ này ko sợ vượt quá giói hạn vì nó duyệt tới khi pop hết MO là dừng
                            if(h==1) MO.pushQueue(dinhcon);
                            else MO.pushStack(dinhcon);
                        }
                    }
                    dinhcon = dinhcon.dinhKe;
                };
            }   
        }

        // thoát khỏi vòng while, và ta kiểm tra biến check
        if(check){
            console.log(`Tim thay dinh ${dich}! Duong di tu dinh ${so} la:`);
            DONG.inDs();
        }else{
            console.log(`Khong tim thay dinh ${dich}`)
        }


    };


    
    timKiemSau(so,dich){   //("A"."H")
        let MO = new DanhSachMocNoi();
        let DONG = new DanhSachMocNoi();
        let THAM = {};
        let check = false;
        
        // tìm đỉnh đc nhập trong đồ thị
        let dinhxet  = this.danhSachKe[so];
        if(!dinhxet){   //kiểm tra có tồn tại đỉnh nhập ko
            console.log(`Khong ton tai dinh ${so}`);
            return null;
        }
        // thêm vào stack MO đỉnh đầu
        MO.pushStack(dinhxet);
        THAM[so] = true  // đầu tiên là đánh dâu đã thăm cho đỉnh truyền vào
        while(MO.length != 0){
            let dinh = MO.getMO(); 
            DONG.pushQueue(dinh);  // để lúc in ra theo chiều xuôi

            if(dinh.v == dich){
                check = true;
                break;
            };
            
            //vòng lặp thêm con vào MO và THAM
            if(this.haveChild(dinh)){
                let dinhcon = this.danhSachKe[dinh.v].dinhKe;  // vì đỉnh pop ra ở getMo là đỉnh trắng, nên phải lấy lại trong graph
                while(dinhcon){
                    if(!THAM[dinhcon.v]){
                        THAM[dinhcon.v] = true;
                        MO.pushStack(dinhcon);
                    }
                    dinhcon = dinhcon.dinhKe;
                };

            };

        };

        // kiểm tra sau khi duyệt có tìm thấy kết quả ko
        if(check){
            console.log(`Tim thay dinh ${dich}! Duong di tu dinh ${so} la:`);
            DONG.inDs();
        }else{
            console.log(`Khong tim thay dinh ${dich}`)
        }
    }
   
    //INPUT: 1 đỉnh của đồ thị //OUTPUT: true nếu có con và ngược lại
    haveChild(dinh){
        //nếu đinh ko có con là đúng thì trả false
        let dinhxet = this.danhSachKe[dinh.v]
        if(!dinhxet.dinhKe) return false;
        else return true;
    };

    /*
    Hàm tính độ sâu của từ đỉnh gốc đc chọn tới điểm xét, độ sau này là độ sâu ngắn nhất
    VD: độ sâu của F tính từ A là 3 (tính từ gốc là 0)
    sử dụng object và đệ quy(vòng lặp cũng đc) với nguyên tắc là duyệt rộng, và thằng con có độ sâu bằng thắng bố đc lưu trong object + 1
    */
    tinhDoSau(goc){
        
        // tìm đỉnh đc nhập trong đồ thị
        let dinhxet  = this.danhSachKe[goc];
        if(!dinhxet){   //kiểm tra có tồn tại đỉnh nhập ko
            console.log(`Khong ton tai dinh ${goc}`);
            return null;
        }
        // nạp gốc vào bangDoSau và cho độ sâu bằng 1
        let bang = this.bangDoSau;
        bang[goc] = 0;
        //duyệt rộng, mỗi lần mà thêm vào bảng(coi như THĂM thì thêm cả độ sâu cho nó nữa)
        let MO = new DanhSachMocNoi();

        // thêm vào queue MO đỉnh đầu
        MO.pushQueue(dinhxet);
        while(MO.length != 0){
            let dinh = MO.getMO(); 
            //vòng lặp thêm con vào MO và bang
            if(this.haveChild(dinh)){
                let dinhcon = this.danhSachKe[dinh.v].dinhKe;  // vì đỉnh pop ra ở getMo là đỉnh trắng, nên phải lấy lại trong graph
                while(dinhcon){
                    if(!bang[dinhcon.v] && (dinhcon.v != goc)){    //ở đây ra có thêm điều kiện phụ dinhcon phải khác gốc vì nếu bang[dinhcon.v] mà là A: giá trị bằng 0 thì tuy A tồn tại nhưng lại lại tính là ko tồn tại
                        bang[dinhcon.v] = bang[dinh.v]+1;
                        MO.pushQueue(dinhcon);
                    }
                    dinhcon = dinhcon.dinhKe;
                };

            };


        };
        //kết thúc duyệt rộng, in ra bảng 
        return this.bangDoSau;
    };
}

const dt = new Dothi();
dt.themDinh("A");
dt.themDinh("B");
dt.themDinh("C");
dt.themDinh("D");
dt.themDinh("E");
dt.themDinh("F");
dt.themDinh("G");
dt.themDinh("H");
dt.themDinh("I");

dt.themCanh("A","B");
dt.themCanh("A","C");
dt.themCanh("A","D");
dt.themCanh("B","E");
dt.themCanh("B","F");
dt.themCanh("B","G");
dt.themCanh("G","H");
dt.themCanh("H","I");








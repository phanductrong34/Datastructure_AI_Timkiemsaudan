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
    A: [B,C,D],
    B:[E,F,G],
    C:[G],
    D: [],
    E: [],
    F: [],
    G: [H],
    H: [I]
    I: []
}

*/

class Dothi{
    constructor(){
        this.danhsachke = {};
    };

    inDanhSach(){
        console.log(this.danhsachke);
    };

    themDinh(dinh){
        this.danhsachke[dinh]=[];
    };

    themCanh(dinh1,dinh2){
        this.danhsachke[dinh1].push(dinh2);
    };

    xoaCanh(dinh1,dinh2){
        this.danhsachke[dinh1] = this.danhsachke[dinh1].filter(
            dinh => dinh != dinh1
        );
    };

    
    //thêm vào MO là đc THĂM, còn lấy khỏi MO là cho vao DONG
    timKiemRong(so,ketqua){
        let MO = [so];  //trong TK rong, MO la queue, FIFO;
        let DONG = [];
        let THAM = {};
        let check = false;

        THAM[so] = true;  //đầu tiên là đánh dấu THĂM cho đỉnh truyền vào
        while(MO.length != 0){   // chừng nào MO còn phần tử thì còn lặp
            let dinh = MO.shift();    //lấy khỏi queue và tống luôn vào ĐONG
            DONG.push(dinh);

            if(dinh == ketqua){
                check = true;
                break;
            }
            this.danhsachke[dinh].forEach(dinhcon => {
                if(!THAM[dinhcon]){
                    THAM[dinhcon] = true;
                    MO.push(dinhcon);
                }
            })
        };

        if(check){
            console.log(`Tim thay dinh ${ketqua}!
                        Duong di tu dinh ${so} la:`,
                        DONG);
        }else{
            console.log(`Khong tim thay dinh ${ketqua}`)
        }
    };

    //thêm vào MO là đc THĂM, còn lấy khỏi MO là cho vao DONG
    timKiemSau(so,ketqua){
        let MO = [so];  //trong TK sau, MO la stack, LIFO;
        let DONG = [];
        let THAM = {};
        let check = false;

        THAM[so] = true;  //đầu tiên là đánh dấu THĂM cho đỉnh truyền vào
        while(MO.length != 0){   // chừng nào MO còn phần tử thì còn lặp
            let dinh = MO.pop();    //lấy khỏi stack và tống luôn vào ĐONG
            DONG.push(dinh);

            if(dinh == ketqua){
                check = true;
                break;
            }
            this.danhsachke[dinh].forEach(dinhcon => {
                if(!THAM[dinhcon]){
                    THAM[dinhcon] = true;
                    MO.push(dinhcon);
                }
            })
        };

        if(check){
            console.log(`Tim thay dinh ${ketqua}!
                        Duong di tu dinh ${so} la:`,
                        DONG);
        }else{
            console.log(`Khong tim thay dinh ${ketqua}`)
        }
    };

    timKiemSauDan(dinh,h){
        
    }
}

let dt = new Dothi;

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
dt.themCanh("C","G");
dt.themCanh("G","H");
dt.themCanh("H","I");


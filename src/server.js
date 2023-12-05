import express, { request } from 'express';
import configViewEngine from './configs/viewEngine.js';
import dotenv from 'dotenv';
import mssql from 'mssql';
import bodyParser from 'body-parser';
import initWebRoute from './route/web.js';
import session from 'express-session';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;
//nơi lưu trữ phiên làm việc
app.use(session({
    secret: '123@',
    resave: false,
    saveUninitialized: true
}));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
configViewEngine(app);

//init web route
initWebRoute(app);

const config = {
    user: 'sa',
    password: '12345',
    server: 'localhost',
    database: 'WEB',
    driver: 'msnodesqlv8',
    options: {
        encrypt: false,
        trustServerCertificate: true
    }
};

// câu hỏi trắc nghiệm
mssql.connect(config)
    .then(() => {
        const printAnswersQuery = `SELECT ID, QuestionText, CorrectAnswer FROM Questionss`;
        const printAnswersRequest = new mssql.Request();
        printAnswersRequest.query(printAnswersQuery, (err, result) => {
            if (err) {
                console.log("Lỗi truy vấn SQL:", err);
            } else {
                const answersArray = result.recordset.map(item => ({
                    ID: item.ID,
                    QuestionText: item.QuestionText,
                    CorrectAnswer: item.CorrectAnswer
                }));
                // console.log("Array of Answers:", answersArray);
                app.get('/getAnswers', (req, res) => {
                    res.json(answersArray);
                });
            }
        });
    })
    .catch((err) => {
        console.log("Kết nối SQL thất bại:", err);
    });

//Câu hỏi phân viết
    mssql.connect(config)
    .then(() => {
        const printAnswersQuery = `SELECT  Answer FROM SoftwareQuestions`;
        const printAnswersRequest = new mssql.Request();
        printAnswersRequest.query(printAnswersQuery, (err, result) => {
            if (err) {
                console.log("Lỗi truy vấn SQL:", err);
            } else {
                const answersArray = result.recordset.map(item => ({
                
                    CorrectAnswer: item.Answer
                }));

                // console.log("Array of Answers:", answersArray);
                app.get('/getAnswers1', (req, res) => {
                    res.json(answersArray);
                });
            }
        });
        const printAnswersQuery1 = `SELECT Answer FROM SoftwareQuestions2`;
        const printAnswersRequest1 = new mssql.Request();
        printAnswersRequest1.query(printAnswersQuery1, (err, result) => {
            if (err) {
                console.log("Lỗi truy vấn SQL:", err);
            } else {
                const answersArray = result.recordset.map(item => ({
                
                    CorrectAnswer: item.Answer
                }));

                // console.log("Array of Answers:", answersArray);
                app.get('/getAnswers2', (req, res) => {
                    res.json(answersArray);
                });
            }
        });
    })
    .catch((err) => {
        console.log("Kết nối SQL thất bại:", err);
    });

    //code phần câu hỏi phần nghe
    mssql.connect(config)
    .then(() => {
        const printAnswersQuery = `SELECT ID, QuestionText, CorrectAnswer FROM Questionss1`;
        const printAnswersRequest = new mssql.Request();
        printAnswersRequest.query(printAnswersQuery, (err, result) => {
            if (err) {
                console.log("Lỗi truy vấn SQL:", err);
            } else {
                const answersArray = result.recordset.map(item => ({
                    ID: item.ID,
                    QuestionText: item.QuestionText,
                    CorrectAnswer: item.CorrectAnswer
                }));
                // console.log("Array of Answers:", answersArray);
                app.get('/getAnswers3', (req, res) => {
                    res.json(answersArray);
                });
            }
        });
    })
    .catch((err) => {
        console.log("Kết nối SQL thất bại:", err);
    });



// Kết nối đến SQL Server
mssql.connect(config).then(() => {
    console.log("Kết nối SQL thành công");
}).catch((err) => {
    console.log("Kết nối SQL thất bại:", err);
});

// Dangky 
let loidangnhap = null;
app.post('/', (req, res) => {
    // const isFormValid = req.body.isFormValid;
    // console.log('isFormValid:', isFormValid);
    const hoten= req.body.hoten;
    const tendangnhap = req.body.tendangnhap;
    const mk = req.body.mk;
    const ngaysinh=req.body.ngaysinh;
    const email= req.body.email;
    const sdt = req.body.sdt;
    const diachi= req.body.diachi;
    const gioitinh= req.body.gioitinh;
    const request = new mssql.Request();
    const query = `INSERT INTO DOAN  VALUES (N'${hoten}', N'${tendangnhap}', N'${mk}', '${ngaysinh}', N'${email}', N'${sdt}', N'${diachi}',N'${gioitinh}')`;
   
    request.query(query, (err, result) => {
        if (err) {
            loidangnhap = "Tên đăng nhập tồn tại!";
            res.json({loidangnhap}); 
            console.log(loidangnhap);
        } else  {
            loidangnhap = null;
            res.json({loidangnhap}); 
            // res.send('<script>alert("Đăng ký thành công"); window.location="/dangnhap";</script>');
        }
    
    });

});
// đăng nhập
app.post('/dangnhap', async (req, res) => {
    const tendangnhap = req.body.tendangnhap;
    const mk = req.body.mk;
    const request = new mssql.Request();
    try {
        const result = await request.query(`SELECT COUNT(*) AS Count FROM DOAN WHERE ( TenDangNhap = '${tendangnhap}' or Email= '${tendangnhap}') AND MatKhau = '${mk}'`);

        if (result.recordset[0].Count > 0) {
            req.session.isLoggedIn = true;
            console.log(req.session.isLoggedIn);
            try {
                const resultUserData = await request.query(`SELECT * FROM DOAN WHERE ( TenDangNhap = '${tendangnhap}' or Email= '${tendangnhap}') AND MatKhau = '${mk}'`);
                
                if (resultUserData.recordset.length > 0) {
                    const userData = resultUserData.recordset[0];
                    // req.session.userData = userData;
                      // Kiểm tra nếu người dùng là admin
                      if (userData.TenDangNhap === 'admin' && userData.MatKhau === '123') {
                        // Đăng nhập thành công với quyền admin
                        req.session.isAdminLoggedIn = true;
                        req.session.userData = userData;
                        res.send('<script>alert("Đăng nhập thành công với quyền admin"); window.location="/admin";</script>');
                    } else {
                        // Đăng nhập thành công, không phải là admin
                        req.session.isLoggedIn = true;
                        req.session.userData = userData;
                        res.send('<script>alert("Đăng nhập thành công"); window.location="/";</script>');
                    }
                }
            } catch (err) {
                console.log("Lỗi truy vấn SQL:", err);
            }
            // res.send('<script>alert("Đăng nhập thành công"); window.location="/";</script>');
        } else {
            res.send('<script>alert("Sai tên hoặc mật khẩu");window.location="/dangnhap"; </script>');
        }
    } catch (err) {
        console.log("Lỗi truy vấn SQL:", err);
        res.status(500).send('Lỗi truy vấn SQL');
    }


});

// hàm tổng hợp số câu đúng từ người dùng
app.post('/check', (req, res) => {
    const { answers } = req.body;
    const inputParameters = answers.map((answer, index) => ({
        name: index + 1,
        type: mssql.VarChar,
        value: answer
    }));
    let correctCount = 0;
    const request = new mssql.Request();
    // Mảng để lưu trữ các kết quả từ các câu truy vấn
    const results = [];
    for (let i = 0; i < inputParameters.length; i++) {
        const parameter = inputParameters[i];
        const name = parameter.name;
        const query = `SELECT ID, CorrectAnswer FROM Questionss WHERE ID = '${name}'`;
        request.query(query, (err, result) => {
            if (err) {
                console.log("Lỗi truy vấn SQL:", err);
            } else {
                const id = result.recordset[0].ID;
                const correctAnswer = result.recordset[0].CorrectAnswer;

                const isCorrect = parameter.value === correctAnswer;

                // Lưu trữ kết quả
                results.push({ id, isCorrect });

                // Nếu câu trả lời đúng, tăng biến đếm
                if (isCorrect) {
                    correctCount++;
                }
            }
            // Kiểm tra xem đã xử lý hết câu trả lời chưa
            if (results.length === inputParameters.length) {
                // console.log(correctCount);
                res.json({ results, correctCount });
            }
        });
    }
});
// hàm tổng hợp số câu đúng từ người dùng
app.post('/nghekq', (req, res) => {
    const { answers } = req.body;
    // console.log(answers);
    const inputParameters = answers.map((answer, index) => ({
        name: index + 1,
        type: mssql.VarChar,
        value: answer
    }));
    let correctCount = 0;
    const request = new mssql.Request();
    // console.log(inputParameters);
    // Mảng để lưu trữ các kết quả từ các câu truy vấn
    const results = [];
    for (let i = 0; i < inputParameters.length; i++) {
        const parameter = inputParameters[i];
        const name = parameter.name;
        const query = `SELECT ID, CorrectAnswer FROM Questionss1 WHERE ID = '${name}'`;
        request.query(query, (err, result) => {
            if (err) {
                console.log("Lỗi truy vấn SQL:", err);
            } else {
                const id = result.recordset[0].ID;
                const correctAnswer = result.recordset[0].CorrectAnswer;
                const isCorrect = parameter.value === correctAnswer;
                // Lưu trữ kết quả
                results.push({ id, isCorrect });
                // Nếu câu trả lời đúng, tăng biến đếm
                if (isCorrect) {
                    correctCount++;
                }
            }
            // Kiểm tra xem đã xử lý hết câu trả lời chưa
            if (results.length === inputParameters.length) {
                // console.log(correctCount);
                res.json({ results, correctCount });
            }
        });
    }
});

// Trong mã định nghĩa tuyến đường
// Thay đổi từ app.delete sang app.post
app.post('/deleteUser', async (req, res) => {
    const userId = req.body.userId;
    console.log(userId);

    try {
        const request = new mssql.Request();
        const deleteUserQuery = 'DELETE FROM DOAN WHERE id = @userId';
        request.input('userId', mssql.VarChar, userId);
        const result = await request.query(deleteUserQuery);
        res.json({ success: true, message: 'Người dùng đã được xóa.' });
    } catch (err) {
        console.log("Lỗi truy vấn SQL:", err);
        res.status(500).json({ success: false, message: 'Lỗi truy vấn SQL' });
    }
});




// hiển thị cổng đang hoạt động hiện tại
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
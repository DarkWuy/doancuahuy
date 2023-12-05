CREATE TABLE DOAN
(
	id INT IDENTITY(1,1) PRIMARY KEY, 
	HoTen nvarchar(100),
	TenDangNhap  nvarchar(100) unique,
	MatKhau nvarchar(100),
	NgaySinh datetime,
	Email varchar(100),
	Sdt varchar(10),
	DiaChi nvarchar(100),
	GioiTinh nvarchar(6)
)


select * from DOAN
delete DOAN
drop table DOAN
drop table Questionss
SELECT COUNT(*) AS Count FROM DOAN WHERE (TenDangNhap = 'thaonganng' and Email= 'thaongan123@gmail.com') AND MatKhau = '123';

 CREATE TABLE Questionss (
    ID INT ,
    QuestionText NVARCHAR(MAX),
    CorrectAnswer NVARCHAR(10)
);

INSERT INTO Questionss (ID, QuestionText, CorrectAnswer) VALUES
(1, 'Caau 1', 'D'),
(2, 'Caau 2', 'A'),
(3, 'Caau 3', 'B'),
(4, 'Caau 4', 'C'),
(5, 'Caau 5', 'D'),
(6, 'Caau 6', 'A'),
(7, 'Caau 7', 'A'),
(8, 'Caau 8', 'C'),
(9, 'Caau 9', 'C'),
(10, 'Caau 10', 'D'),
(11, 'Caau 11', 'A'),
(12, 'Caau 12', 'C'),
(13, 'Caau 13', 'A'),
(14, 'Caau 14', 'A'),
(15, 'Caau 15', 'A'),
(16, 'Caau 16', 'C'),
(17, 'Caau 17', 'A'),
(18, 'Caau 18', 'C'),
(19, 'Caau 19', 'B'),
(20, 'Caau 20', 'A'),
(21, 'Caau 21', 'C'),
(22, 'Caau 22', 'B'),
(23, 'Caau 23', 'B'),
(24, 'Caau 24', 'B'),
(25, 'Caau 25', 'C'),
(26, 'Caau 26', 'A'),
(27, 'Caau 27', 'A'),
(28, 'Caau 28', 'B'),
(29, 'Caau 29', 'B'),
(30, 'Caau 30', 'A'),
(31, 'Caau 31', 'B'),
(32, 'Caau 32', 'B'),
(33, 'Caau 33', 'B'),
(34, 'Caau 34', 'B'),
(35, 'Caau 35', 'A'),
(36, 'Caau 36', 'C'),
(37, 'Caau 37', 'B'),
(38, 'Caau 38', 'A'),
(39, 'Caau 39', 'C'),
(40, 'Caau 40', 'A');

Delete Questionss
select * from  Questionss


-- Tạo bảng
CREATE TABLE SoftwareQuestions (
    QuestionNumber INT ,
    Question NVARCHAR(1000),
    Answer NVARCHAR(1000)
);
delete  SoftwareQuestions
drop table SoftwareQuestions

-- Chèn dữ liệu
INSERT INTO SoftwareQuestions (QuestionNumber, Question, Answer)
VALUES
    (1, 'What are the components to set up software?', 'The components to set up software include instructions, data, or programs that are used to operate a computer and execute specific tasks. Additionally, a high-level programming language, a compiler or interpreter, and the hardware on which the software will run are essential components.'),
    (2, 'Name some devices that the software can run on.', 'Software can run on various devices, including but not limited to: Personal Computers (PCs), Mobile Phones, Tablets, Smart Devices.'),
    (3, 'What components of a computer contrast with software?', 'The components of a computer that contrast with software are hardware. Hardware refers to the physical aspects of a computer that perform the work, such as the central processing unit (CPU), memory (RAM), storage devices, input/output devices, and other physical components.'),
    (4, 'What language is the software written in?', 'Software is primarily written in high-level programming languages. The options are: A. High-level programming languages B. Natural human language C. Machine language'),
    (5, 'What is the compiler?', 'The compiler is a tool used in software development to translate high-level programming languages into low-level machine code. It takes the human-readable code written in a high-level language and converts it into a form that the computer''s hardware can understand and execute. The correct answer is: A. High-level programming languages');

CREATE TABLE SoftwareQuestions2 (
    QuestionNumber INT ,
    Question NVARCHAR(1000),
    Answer NVARCHAR(1000)
);
INSERT INTO SoftwareQuestions2 (QuestionNumber, Question, Answer)
VALUES
   (1,'cau1','A'),
   (2,'cau2','B'),
	 (3,'cau3','B'),
	  (4,'cau4','B'),
	   (5,'cau5','B');


	 CREATE TABLE Questionss1 (
    ID INT ,
    QuestionText NVARCHAR(MAX),
    CorrectAnswer NVARCHAR(10)
);
delete  Questionss1
drop table  SoftwareQuestions3

INSERT INTO Questionss1 (ID, QuestionText, CorrectAnswer) 
VALUES
(1, 'Caau 1', 'C'),
(2, 'Caau 2', 'C'),
(3, 'Caau 3', 'C'),
(4, 'Caau 4', 'C'),
(5, 'Caau 5', 'C'),
(6, 'Caau 6', 'A'),
(7, 'Caau 7', 'C'),
(8, 'Caau 8', 'C'),
(9, 'Caau 9', 'C'),
(10, 'Caau 10','C'),


(11, 'Caau 11', 'B'),
(12, 'Caau 12', 'B'),
(13, 'Caau 13', 'C'),
(14, 'Caau 14', 'B'),
(15, 'Caau 15', 'D'),

(16, 'Caau 16', 'D'),
(17, 'Caau 17', 'D'),
(18, 'Caau 18', 'A'),
(19, 'Caau 19', 'B'),
(20, 'Caau 20', 'A'),
(21, 'Caau 21', 'D'),
(22, 'Caau 22', 'C'),
(23, 'Caau 23', 'B'),
(24, 'Caau 24', 'B'),
(25, 'Caau 25', 'D'),

(26, 'Caau 26', 'A'),
(27, 'Caau 27', 'B'),
(28, 'Caau 28', 'B'),
(29, 'Caau 29', 'D'),
(30, 'Caau 30', 'C'),

(31, 'Caau 31', 'D'),
(32, 'Caau 32', 'C'),
(33, 'Caau 33', 'A'),
(34, 'Caau 34', 'B'),
(35, 'Caau 35', 'C'),

(36, 'Caau 36', 'C'),
(37, 'Caau 37', 'C'),
(38, 'Caau 38', 'C'),
(39, 'Caau 39', 'B'),
(40, 'Caau 40', 'C');

drop table TKL



const questions = [
    {
        question: "HTML là viết tắt của từ gì?",
        options: [
            "Hyper Text Markup Language",
            "Home Tool Markup Language",
            "Hyperlinks and Text Markup Language",
            "Hyper Text Markdown Language"
        ],
        answer: 0
    },
    {
        question: "Thẻ nào dùng để chèn hình ảnh vào trang web?",
        options: ["<img>", "<image>", "<src>", "<picture>"],
        answer: 0
    },
    {
        question: "CSS viết tắt của từ gì?",
        options: [
            "Creative Style Sheet",
            "Cascading Style Sheets",
            "Colorful Style Sheets",
            "Computer Style Sheets"
        ],
        answer: 1
    },
    {
        question: "Thẻ nào dùng để tạo liên kết trong HTML?",
        options: ["<a>", "<link>", "<href>", "<url>"],
        answer: 0
    },
    {
        question: "Thuộc tính nào dùng để đổi màu chữ trong CSS?",
        options: ["font-color", "text-color", "color", "font-style"],
        answer: 2
    },
    {
        question: "Cách viết comment trong HTML là gì?",
        options: ["// comment", "# comment", "/* comment */", "<!-- comment -->"],
        answer: 3
    },
    {
        question: "Trong JavaScript, kiểu dữ liệu nào là số?",
        options: ["'42'", "true", "42", "null"],
        answer: 2
    },
    {
        question: "Hàm nào dùng để in ra console?",
        options: ["print()", "log()", "console.log()", "echo()"],
        answer: 2
    },
    {
        question: "Khai báo biến trong JavaScript dùng từ khóa nào?",
        options: ["int", "var", "define", "value"],
        answer: 1
    },
    {
        question: "Sự kiện click là gì?",
        options: ["onhover", "onload", "onclick", "onchange"],
        answer: 2
    }
];

let currentQuestion = 0;
let score = 0;
let answered = false;

const questionEl = document.getElementById("question");
const answersEl = document.getElementById("answers");
const nextBtn = document.getElementById("next-btn");
const scoreEl = document.getElementById("score");
const progressEl = document.getElementById("progress");

function showQuestion() {
    answered = false;

    const q = questions[currentQuestion];

    progressEl.textContent = `Câu hỏi ${currentQuestion + 1}/10`;
    questionEl.textContent = q.question;

    answersEl.innerHTML = "";

    q.options.forEach((option, index) => {
        const div = document.createElement("div");
        div.className = "answer";
        div.textContent = option;

        div.onclick = () => selectAnswer(index, div);

        answersEl.appendChild(div);
    });

    nextBtn.disabled = true;

    if (currentQuestion === questions.length - 1) {
        nextBtn.textContent = "Kết thúc";
    } else {
        nextBtn.textContent = "Câu tiếp theo";
    }
}

function selectAnswer(index, element) {
    if (answered) return;

    answered = true;

    const correct = questions[currentQuestion].answer;
    const all = document.querySelectorAll(".answer");

    all.forEach((el, i) => {
        if (i === correct) el.classList.add("correct");
        if (i === index && index !== correct) el.classList.add("wrong");
    });

    if (index === correct) {
        score++;
        scoreEl.textContent = "Điểm: " + score;
    }

    nextBtn.disabled = false;
}

nextBtn.onclick = () => {
    currentQuestion++;

    if (currentQuestion < questions.length) {
        showQuestion();
    } else {
        showResult();
    }
};

function showResult() {
    questionEl.textContent = "Hoàn thành!";
    answersEl.innerHTML = "";
    nextBtn.style.display = "none";

    scoreEl.textContent = `Bạn được ${score}/10 điểm`;
}

showQuestion();
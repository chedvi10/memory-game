//מערך של אובייקטים, כל אובייקט מורכב מצבע
const cards = [
    {
        color: "red"
    },
    {
        color: "red"
    },
    {
        color: "darkred"
    },
    {
        color: "darkred"
    },
    {
        color: "beige"
    },
    {

        color: "beige"
    },
    {
 
        color: "coral"
    },
    {
     
        color: "coral"
    },
    {
    
        color: "aqua"
    },
    {
        color: "aqua"
    },
    {

        color: "darkgreen"
    },
    {
        color: "darkgreen"
    },
    {
        color: "yellow"
    },
    {
        color: "yellow"
    },
    {
        color: "yellowgreen"
    },
    {
        color: "yellowgreen"
    },
    {
        color: "hotpink"
    },
    {
        color: "hotpink"
    },
    {
        color: "pink"
    },
    {
        color: "pink"
    },
    {
        color: "slateblue"
    },
    {
        color: "slateblue"
    },
    {
        color: "green"
    },
    {
        color: "green"
    },
    {
        color: "black"
    },
    {
        color: "black"
    },
    {
        color: "blueviolet"
    },
    {
        color: "blueviolet"
    },
    {
        color: "brown"
    },
    {
        color: "brown"
    },
    {
        color: "cadetblue"
    },
    {
        color: "cadetblue"
    },
    {
        color: "darkolivegreen"
    },
    {
        color: "darkolivegreen"
    },
    {
        color: "darkslategrey"
    },
    {
        color: "darkslategrey"
    },
    {
        color: "teal"
    },
    {
        color: "teal"
    },
    {
        color: "darkkhaki"
    },
    {
        color: "darkkhaki"
    }
];
let i = 0;
const arrIndex = [];
const arrCards = [];
let index;
let class1;
let k = 0;
let count_click = 0;
let listCrdsButton;
let card_1;
let card_2;
let m_card1;
let m_card2;
let time = 0;
let gameTimer;
let win = 0;
let num;
let player_name;
let minutes;
let flag = false;

const queryString = location.search;
const obj = new URLSearchParams(queryString);
let level = obj.get("level_game");

switch (level) {
    case ("easy"):
        num = 16;
        time = 2;
        break;
    case ("mid"):
        num = 24;
        time = 4;
        break;
    case ("high"):
        num = 40;
        time = 8;
        break;
}
notSort(num);

const arrNames1 = localStorage.getItem("arr_names");
let arrNames;
if (arrNames1) {
    arrNames = JSON.parse(arrNames1);

    //פונקציה שקורית בזמן הקלדת שם ותפקידה לעבור על מערך השמות ולהציג לשחקן את השמות השמורים בהתאם למה שמקליד 
    document.querySelector("#input_name").oninput = function () {
        let n = document.querySelector("#input_name").value;
        document.querySelector("#my_div").innerHTML = " ";
        const new_arr_names = arrNames.filter(function (value) {
            if (value.indexOf(n) > -1)
                return true;
            return false;
        })
        for (let item of new_arr_names) {
            document.querySelector("#my_div").innerHTML += `<a href="#" class="my_a">${item}</a> <br>`
        }
        let list = document.querySelectorAll(".my_a");
        for (let i = 0; i < list.length; i++) {
            list[i].onclick = function () {
                document.querySelector("#input_name").value = list[i].innerHTML;
            }
        }
    }
}
else
    arrNames = [];

//פונ' שקורית בזמן המעבר בין עמוד הבית לעמוד המשחק, תפקידה לבדוק אם הזינו שם ואם לא לעצור
//את השליחה וכן להוסיף לזכרון שמות חדשים
document.getElementById("my_select").onsubmit = (e) => {
    player_name = document.getElementById("input_name").value;
    e.preventDefault();
    if (player_name != "") {
        save_player_name(player_name);

        for (let item of arrNames) {
            if (item == player_name) {
                flag = true;
                break;
            }
        }
        if (flag == false) {
            arrNames.push(player_name);
            const str = JSON.stringify(arrNames);
            localStorage.setItem("arr_names", str);
        }
        let level = document.querySelector("select").value;
        location.href = `game.html\?level_game=${level}`;
        alert(`שלום ${player_name}! בהצלחה רבה!`)
    }

    else {
        alert("אין כניסה ללא הזדהות!");
    }
};
//פונקציה של ערבוב שמקבלת מערך וגם טווח לפי רמת המשחק
function notSort(num) {
    while (i < num) {
        index = Math.floor(Math.random() * num);//הגרלת מספר בטווח הרצוי
        if (notInTheArr(index) == true) {//שלייחיה לפונ' שבודקת אם קיים 
            arrCards.unshift(cards[index]);//אם לא- האובייקט נכנס למערך המעורבב
            arrIndex.push(index);//וגם האינדקס הנוכחי מוכנס למערך האינדקסים
            i++;
        }
    }
    console.log(arrCards);
    for (i = 0; i < num; i++) {
        draw();
    }
    game_body();
}
//פונקציה שבודקת אם האינדקס המוגרל כבר מומש
function notInTheArr(index) {
    for (item of arrIndex) {
        if (index == item)
            return false;
    }
    return true;
}
//פונקציה שהופכת את צבע הכרטיס מאפור לצבע שלו
function color_of_card(x) {
    for (let n = 0; n < arrCards.length; n++) {
        let my_color = arrCards[n].color;
        if (x.classList.contains(my_color)) {
            x.style.backgroundColor = my_color;
            break;
        }
    }
}
//- פונקציה שמציירת על המסך את הקלפים
function draw() {
    const new_button = document.createElement("button");
    class1 = arrCards[k++].color;
    new_button.classList.add(class1);
    new_button.classList.add("gray_card");
    document.querySelector("#the_game").append(new_button);
}
//פונקציה של גוף המשחק- ממנה נשלח לפונ' נוספות
// 'כמו בדיקה אם הכרטיסים זהים, הפעלה של טיימרים, בדיקה של נצחון וכו
function game_body() {
    init_game_timer()
    document.querySelector("body").onmouseenter = function () {
        document.querySelector("h1").style.color = "red";
    };
    document.querySelector("body").onmouseleave = function () {
        document.querySelector("h1").style.color = "white";
    };

    listCrdsButton = document.querySelectorAll(".gray_card");
    for (let m = 0; m < listCrdsButton.length; m++) {
        listCrdsButton[m].onclick = () => {
            color_of_card(listCrdsButton[m]);
            if (count_click == 0) {
                card_1 = listCrdsButton[m];
                m_card1 = m;
                count_click++;
            }
            else {
                card_2 = listCrdsButton[m];
                m_card2 = m;
                if (m_card1 == m_card2) {
                    console.log("נסה שנית");
                    listCrdsButton[m].style.backgroundColor = "gray";
                }
                else {
                    check(card_1, card_2);
                    count_click = 0;
                }
            }
        }
    }
}
//פונ' שמפעילה טיימר
function game_timer() {
    if (time == 0)
        clear_game_timer()
    else {
        document.querySelector("h2").innerHTML = `נותרו לך ${time} דקות`

        if (time <= 2) {
            document.querySelector("h2").style.color = "yellow";
        }
        time--
    }
}
//אתחול טיימר
function init_game_timer() {
    gameTimer = setInterval(game_timer, 60000)

}
//איפוס טיימר
function clear_game_timer() {
    document.querySelector("h2").innerHTML = `!!!תם הזמן`
    listCrdsButton.forEach(element => {
        element.disabled = true;
    });
    clearInterval(gameTimer);
};
//בדיקה האם 2 כרטיסים זהים
function check(x, y) {
    if (x.style.backgroundColor == y.style.backgroundColor) {
        console.log("זהה");
        win++;
        if (win == (num / 2)) {
            minutes = num / 4 - 2 - time;
            document.querySelector("h2").style.color = "orange";
            if (minutes < 1)
                document.querySelector("h2").innerHTML = `כל הכבוד ${localStorage.getItem("player_name")}! הצלחת תוך פחות מדקה`;
            else
                document.querySelector("h2").innerHTML = `כל הכבוד ${localStorage.getItem("player_name")}! הצלחת תוך ${minutes} דקות`;
            clearInterval(gameTimer);
            setTimeout(() => {
                window.print();
            }, 3000);
        }
        for (const item of listCrdsButton) {
            if (x == item) {
                item.disabled = true;
                break;
            }
        }
        for (const item of listCrdsButton) {
            if (y == item) {
                item.disabled = true;
                break;
            }
        }

    }
    else {
        console.log("שונה");
        setTimeout(function () {
            x.style.backgroundColor = "gray";
            y.style.backgroundColor = "gray";
        }, 700);
    }
}
//שמירת שם השחקן
function save_player_name(player_name) {
    const p_n = player_name;
    localStorage.setItem("player_name", p_n);
}




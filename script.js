// ========================================
// Schedule Link
// ========================================


// ========================================
// データ
// ========================================


let classes =
JSON.parse(
localStorage.getItem("classes")
)
||
[];


let schedules =
JSON.parse(
localStorage.getItem("scheduleData")
)
||
{};


let templates =
JSON.parse(
localStorage.getItem("templates")
)
||
[];


let school =
JSON.parse(
localStorage.getItem("school")
)
||
{
    name:"",
    days:["月","火","水","木","金"],
    periods:[1,2,3,4,5,6]
};


let currentDate = new Date();

let selectedDate = new Date();


// 現在編集中の授業

let editingClassIndex = -1;

// 新しく登録する授業の曜日・時限

let selectedClassDay = "";

let selectedClassPeriod = 0;


// ========================================
// 保存
// ========================================


function saveAllData(){

    localStorage.setItem(
        "classes",
        JSON.stringify(classes)
    );

    localStorage.setItem(
        "scheduleData",
        JSON.stringify(schedules)
    );

    localStorage.setItem(
        "templates",
        JSON.stringify(templates)
    );

    localStorage.setItem(
        "school",
        JSON.stringify(school)
    );

}


// ========================================
// ページ切り替え
// ========================================


function showPage(page){

    document.querySelectorAll("section")
    .forEach(section => {

        section.style.display = "none";

    });


    const target =
        document.getElementById(page);


    if(target){

        target.style.display = "block";

    }


    if(page === "calendarPage"){

        renderCalendar();

        showDetail();

    }


    if(page === "timetablePage"){

        renderTimetableWithClass();

    }

}


// ========================================
// カレンダー
// ========================================

function dateKey(date){

    return (
        date.getFullYear()
        + "-"
        + (date.getMonth()+1)
        + "-"
        + date.getDate()
    );

}


function renderCalendar(){

    const calendar =
        document.getElementById("calendar");


    if(!calendar){
        return;
    }


    calendar.innerHTML = "";


    const year =
        currentDate.getFullYear();


    const month =
        currentDate.getMonth();


    document.getElementById("monthTitle")
        .textContent =
        `${year}年${month+1}月`;


    const firstDay =
        new Date(
            year,
            month,
            1
        ).getDay();


    const lastDay =
        new Date(
            year,
            month + 1,
            0
        ).getDate();


    // ========================================
    // 月初の空白
    // ========================================

    for(
        let i = 0;
        i < firstDay;
        i++
    ){

        calendar.innerHTML +=
            "<div></div>";

    }


    // ========================================
    // 日付
    // ========================================

    for(
        let day = 1;
        day <= lastDay;
        day++
    ){

        const date =
            new Date(
                year,
                month,
                day
            );


        const key =
            dateKey(date);


        // ========================================
        // 予定マーク
        // ========================================

         
let eventMark = "";

if(
    schedules[key]
    &&
    schedules[key].events
    &&
    schedules[key].events.length > 0
){

    schedules[key].events
    .sort((a,b) =>
        (a.start || "").localeCompare(
            b.start || ""
        )
    )
    .forEach((event, index) => {

let categoryClass = "";

if(event.category === "バイト"){
    categoryClass = "event-color-baito";
}
else if(event.category === "大学"){
    categoryClass = "event-color-daigaku";
}
else if(event.category === "授業"){
    categoryClass = "event-color-jugyo";
}
else if(event.category === "サークル"){
    categoryClass = "event-color-circle";
}
else if(event.category === "プライベート"){
    categoryClass = "event-color-private";
}
else{
    categoryClass = "event-color-other";
}

let startText = "";
let endText = "";

if(event.start){

    startText =
        event.start.endsWith(":00")
        ? event.start.slice(0, -3)
        : event.start;

}

if(event.end){

    endText =
        event.end.endsWith(":00")
        ? event.end.slice(0, -3)
        : event.end;

}

let timeText = "";

if(startText){

    timeText =
        startText
        +
        (
            endText
            ? "〜" + endText
            : ""
        );

}

const shortName =
    event.shortName || event.name || "予定";

eventMark += `

    <div
        class="calendar-event-mini ${categoryClass}"
        onclick="
            event.stopPropagation();
            openEventDetail(
                '${key}',
                ${index}
            );
        "
    >

        <span class="event-short-name">
            ${shortName}
        </span>

        ${
            timeText
            ?
            `<span class="event-time-mini">
                ${timeText}
            </span>`
            :
            ""
        }

    </div>

`;

});

}
     // ========================================
        // 授業のコンパクト表示
        // ========================================

        let classMark = "";


        const dayNames =
            [
                "日",
                "月",
                "火",
                "水",
                "木",
                "金",
                "土"
            ];


        const dayName =
            dayNames[
                date.getDay()
            ];


        const dayClasses =
            classes.filter(c =>
                c.day === dayName
            );


        if(dayClasses.length > 0){

            const periodNumbers =
                dayClasses.map(c =>
                    Number(c.period)
                );


            classMark =
                `<div class="class-mini">`;


            school.periods.forEach(period => {

                if(
                    periodNumbers.includes(
                        Number(period)
                    )
                ){

                    classMark +=
                        `<span class="class-box active"></span>`;

                }

                else{

                    classMark +=
                        `<span class="class-box"></span>`;

                }

            });


            classMark +=
                `</div>`;

        }


        // ========================================
        // カレンダーに追加
        // ========================================

        calendar.innerHTML += `

            <div
                class="day"
                onclick="
                    selectDate(
                        ${year},
                        ${month},
                        ${day}
                    )
                "
            >

                <div class="date-number">
                    ${day}
                </div>

		${classMark}

                ${eventMark}

                

            </div>

        `;

    }

}



function selectDate(y,m,d){

    selectedDate =
        new Date(y,m,d);

    showDetail();

}


function showDetail(){

    // ========================================
    // 選択した日付
    // ========================================

    const title =
        document.getElementById(
            "selectedDate"
        );


    if(!title){
        return;
    }


    title.textContent =
        `${selectedDate.getMonth()+1}月${selectedDate.getDate()}日`;


    const key =
        dateKey(selectedDate);


    // ========================================
    // 予定を表示
    // ========================================

    const list =
        document.getElementById(
            "eventList"
        );


if(
    schedules[key]
    &&
    schedules[key].events
    &&
    schedules[key].events.length > 0
){

    list.innerHTML = "";

    schedules[key].events
.sort((a,b) =>
    (a.start || "").localeCompare(
        b.start || ""
    )
)
.forEach((event,index) => {
        list.innerHTML += `

            <div class="calendar-event">

                <span class="event-time">

                    ${event.start || ""}

                    ${
                        event.start && event.end
                        ? "〜"
                        : ""
                    }

                    ${event.end || ""}

                </span>


                <span class="event-category">

                    ${event.category || "予定"}

                </span>


                <strong>

                    ${event.name}

                </strong>


                <button
                    onclick="deleteEvent(${index})"
                >
                    削除
                </button>

            </div>

        `;

    });

}

    else{

        list.textContent =
            "予定はありません";

    }


    // ========================================
    // その日の授業を表示
    // ========================================

    const classList =
        document.getElementById(
            "classList"
        );


    if(classList){

        const dayNames =
            [
                "日",
                "月",
                "火",
                "水",
                "木",
                "金",
                "土"
            ];


        const dayName =
            dayNames[
                selectedDate.getDay()
            ];


        const dayClasses =
            classes.filter(c => {

                return (
                    c.day === dayName
                );

            });


        dayClasses.sort(
            (a,b) =>
                Number(a.period)
                -
                Number(b.period)
        );


        if(dayClasses.length > 0){

            classList.innerHTML =
                "<h3>🏫 今日の授業</h3>";


            dayClasses.forEach(c => {

                classList.innerHTML += `

                    <div class="calendar-class">

                        <strong>
                            ${c.period}限
                        </strong>

                        ${c.name}

                        ${
                            c.room
                            ?
                            `<br>
                             📍${c.room}`
                            :
                            ""
                        }

                    </div>

                `;

            });

        }

        else{

            classList.innerHTML = `

                <h3>🏫 今日の授業</h3>

                <p>
                    授業はありません
                </p>

            `;

        }

    }


    // ========================================
    // 日記
    // ========================================

    const diary =
        document.getElementById(
            "diary"
        );


    if(diary){

        diary.value =
            schedules[key]?.diary
            ||
            "";

    }

}

function changeMonth(value){

    currentDate.setMonth(
        currentDate.getMonth() + value
    );

    renderCalendar();

}


function goToday(){

    currentDate =
        new Date();

    selectedDate =
        new Date();

    renderCalendar();

    showDetail();

}

// ========================================
// 予定追加フォーム
// ========================================

function openEventForm(){

    const form =
        document.getElementById(
            "eventForm"
        );


    if(form){

        form.style.display =
            "block";

    }

}


function closeEventForm(){

    const form =
        document.getElementById(
            "eventForm"
        );


    if(form){

        form.style.display =
            "none";

    }

}


// ========================================
// 予定保存
// ========================================

// ========================================
// 予定を保存
// ========================================

function saveEvent(){

    const category =
        document.getElementById(
            "eventCategory"
        ).value.trim();


    const name =
        document.getElementById(
            "eventName"
        ).value.trim();

    const shortName =
    document.getElementById(
        "eventShortName"
    ).value.trim();


    const noTime =
        document.getElementById(
            "eventNoTime"
        ).checked;


    const start =
        document.getElementById(
            "eventStart"
        ).value;


    const end =
        document.getElementById(
            "eventEnd"
        ).value;


    // -------------------------
    // 予定名チェック
    // -------------------------

    if(!name){

        alert(
            "予定名を入力してください📅"
        );

        return;

    }


    // -------------------------
    // 時間チェック
    // -------------------------

    if(
        !noTime
        &&
        (!start || !end)
    ){

        alert(
            "開始時刻と終了時刻を入力してください⏰"
        );

        return;

    }


    const key =
        dateKey(selectedDate);


    // -------------------------
    // 日付データがなければ作成
    // -------------------------

    if(!schedules[key]){

        schedules[key] = {

            events:[],

            diary:""

        };

    }


// -------------------------
// 予定データ
// -------------------------

const eventData = {

    category:
        category || "予定",

    name:
        name,

    shortName:
        shortName || name,

    start:
        noTime
        ? ""
        : start,

    end:
        noTime
        ? ""
        : end,

    noTime:
        noTime
};


// -------------------------
// 新規登録 or 編集
// -------------------------

if(
    editingEventKey !== ""
    &&
    editingEventIndex !== -1
){

    // 編集

    schedules[
        editingEventKey
    ].events[
        editingEventIndex
    ] = eventData;

}

else{

    // 新規登録

    schedules[key].events.push(
        eventData
    );

}


    // -------------------------
    // 保存
    // -------------------------

    saveAllData();


    // -------------------------
    // 入力欄をリセット
    // -------------------------

    document.getElementById(
        "eventCategory"
    ).value = "バイト";


    document.getElementById(
        "eventName"
    ).value = "";

    document.getElementById(
    "eventShortName"
    ).value = "";
    


    document.getElementById(
        "eventStart"
    ).value = "";


    document.getElementById(
        "eventEnd"
    ).value = "";


    document.getElementById(
        "eventNoTime"
    ).checked = false;


    toggleEventTime();


    // -------------------------
    // 画面更新
    // -------------------------
　　editingEventKey = "";
　　editingEventIndex = -1;

    closeEventForm();

    renderCalendar();

    showDetail();


    alert(
        "予定を追加しました📅"
    );

}

// ========================================
// 時間割
// ========================================

function renderTimetableWithClass(){

    const body =
        document.getElementById("timetableBody");

    if(!body){
        return;
    }

    body.innerHTML = "";

    const days = school.days;
    const periods = school.periods;

    periods.forEach(period => {

        let row =
            `<tr><th>${period}限</th>`;

        days.forEach(day => {

            const index =
                classes.findIndex(c =>
                    c.day === day &&
                    Number(c.period) === Number(period)
                );

            if(index !== -1){

                const c = classes[index];

                row += `
                    <td>
                        <div
                            class="class-card timetable-class"
                            data-class-index="${index}"
                            style="cursor:pointer;"
                        >
                            ${c.name}
                            <br>
                            <span class="room">
                                📍${c.room || ""}
                            </span>
                        </div>
                    </td>
                `;

            } else {

                row += `
                    <td>
                        <div
                            class="empty-class-slot"
                            data-day="${day}"
                            data-period="${period}"
                            style="
                                cursor:pointer;
                                min-height:50px;
                            "
                        >
                            ＋
                        </div>
                    </td>
                `;

            }

        });

        row += "</tr>";

        body.innerHTML += row;

    });


    // -------------------------
    // 授業あり → 詳細表示
    // -------------------------

    document
    .querySelectorAll(".timetable-class")
    .forEach(card => {

        card.addEventListener(
            "click",
            function(){

                const index =
                    Number(
                        this.dataset.classIndex
                    );

                // 今開いている授業をもう一度押したら閉じる
                if(
                    detailClassIndex === index
                ){

                    closeClassDetail();

                    return;

                }

                // 別の授業を押した場合は
                // その授業の詳細を表示
                openClassDetail(index);

            }
        );

    });

    // -------------------------
    // 空きマス → 授業登録
    // -------------------------

    document
        .querySelectorAll(".empty-class-slot")
        .forEach(slot => {

            slot.addEventListener(
                "click",
                function(){

                    const day =
                        this.dataset.day;

                    const period =
                        Number(
                            this.dataset.period
                        );

                    openClassModal(
                        day,
                        period
                    );

                }
            );

        });

}


// ========================================
// 授業登録・編集画面を開く
// ========================================

function openClassModal(
    day,
    period,
    index = -1
){

    editingClassIndex = index;

    selectedClassDay = day;

    selectedClassPeriod = period;


    const modal =
        document.getElementById(
            "classModal"
        );

    const title =
        document.getElementById(
            "classModalTitle"
        );

    const time =
        document.getElementById(
            "classTime"
        );


    if(!modal || !title || !time){
        return;
    }


    time.textContent =
        `${day}曜日 ${period}限`;


    if(index === -1){

        // -------------------------
        // 新規登録
        // -------------------------

        title.textContent =
            "📚 授業登録";


        document.getElementById(
            "className"
        ).value = "";

        document.getElementById(
            "teacher"
        ).value = "";

        document.getElementById(
            "room"
        ).value = "";

        document.getElementById(
            "belongings"
        ).value = "";

        document.getElementById(
            "classMemo"
        ).value = "";

    }

    else{

        // -------------------------
        // 編集
        // -------------------------

        const c =
            classes[index];


        if(!c){
            return;
        }


        title.textContent =
            "✏️ 授業を編集";


        document.getElementById(
            "className"
        ).value =
            c.name || "";

        document.getElementById(
            "teacher"
        ).value =
            c.teacher || "";

        document.getElementById(
            "room"
        ).value =
            c.room || "";

        document.getElementById(
            "belongings"
        ).value =
            c.belongings || "";

        document.getElementById(
            "classMemo"
        ).value =
            c.memo || "";

    }


    modal.style.display =
        "block";

}


// ========================================
// 授業保存
// ========================================

function saveClass(){

    const name =
        document.getElementById(
            "className"
        ).value.trim();


    if(!name){

        alert(
            "授業名を入力してください📚"
        );

        return;

    }


    const data = {

        name:name,

        teacher:
            document.getElementById(
                "teacher"
            ).value,

        room:
            document.getElementById(
                "room"
            ).value,

        day:
            selectedClassDay,

        period:
            Number(
                selectedClassPeriod
            ),

        belongings:
            document.getElementById(
                "belongings"
            ).value,

        memo:
            document.getElementById(
                "classMemo"
            ).value

    };


    if(editingClassIndex === -1){

        classes.push(data);

    }

    else{

        classes[
            editingClassIndex
        ] = data;

    }


    saveAllData();

    closeClassModal();

    renderTimetableWithClass();

}


// ========================================
// 授業削除
// ========================================

function deleteClass(){

    if(editingClassIndex === -1){
        return;
    }


    const result =
        confirm(
            "この授業を削除しますか？"
        );


    if(!result){
        return;
    }


    classes.splice(
        editingClassIndex,
        1
    );


    saveAllData();

    closeClassModal();

    renderTimetableWithClass();

}


// ========================================
// 授業登録・編集画面を閉じる
// ========================================

function closeClassModal(){

    const modal =
        document.getElementById(
            "classModal"
        );


    if(modal){

        modal.style.display =
            "none";

    }


    editingClassIndex = -1;

}


// ========================================
// 授業詳細
// ========================================

let detailClassIndex = -1;


function openClassDetail(index){

    const c =
        classes[index];


    if(!c){
        return;
    }


    detailClassIndex =
        index;


    document.getElementById(
        "detailClassName"
    ).textContent =
        "📚 " + (c.name || "授業");


    document.getElementById(
        "detailClassTime"
    ).textContent =
        `${c.day}曜日 ${c.period}限`;


    document.getElementById(
        "detailTeacher"
    ).textContent =
        c.teacher || "未登録";


    document.getElementById(
        "detailRoom"
    ).textContent =
        c.room || "未登録";


    document.getElementById(
        "detailBelongings"
    ).textContent =
        c.belongings || "なし";


    document.getElementById(
        "detailMemo"
    ).textContent =
        c.memo || "なし";


    document.getElementById(
        "classDetailModal"
    ).style.display =
        "block";

}


// ========================================
// 詳細 → 編集
// ========================================

function editCurrentClass(){

    if(detailClassIndex === -1){
        return;
    }


    const index =
        detailClassIndex;


    const c =
        classes[index];


    if(!c){
        return;
    }


    // 詳細画面を閉じる
    closeClassDetail();


    // 編集画面を開く
    openClassModal(
        c.day,
        c.period,
        index
    );

}


// ========================================
// 詳細 → 削除
// ========================================

function deleteCurrentClass(){

    if(detailClassIndex === -1){
        return;
    }


    const result =
        confirm(
            "この授業を削除しますか？"
        );


    if(!result){
        return;
    }


    classes.splice(
        detailClassIndex,
        1
    );


    saveAllData();


    closeClassDetail();


    renderTimetableWithClass();

}


// ========================================
// 詳細を閉じる
// ========================================

function closeClassDetail(){

    const modal =
        document.getElementById(
            "classDetailModal"
        );


    if(modal){

        modal.style.display =
            "none";

    }


    detailClassIndex = -1;

}
// ========================================
// 学校設定
// ========================================


function saveSchool(){

    const name =
        document.getElementById(
            "schoolName"
        ).value;


    const dayCheckboxes =
        document.querySelectorAll(
            ".school-day"
        );


    const periodCheckboxes =
        document.querySelectorAll(
            ".school-period"
        );


    const days = [];


    dayCheckboxes.forEach(box => {

        if(box.checked){

            days.push(box.value);

        }

    });


    const periods = [];


    periodCheckboxes.forEach(box => {

        if(box.checked){

            periods.push(
                Number(box.value)
            );

        }

    });


    school = {

        name:name,

        days:days,

        periods:periods

    };


    saveAllData();


    renderTimetableWithClass();


    alert(
        "学校設定を保存しました🏫"
    );

}


// ========================================
// 初期表示
// ========================================


window.onload = function(){

    renderCalendar();

    renderTimetableWithClass();

};

// ========================================
// 授業詳細表示
// ========================================


// ========================================
// 時間指定あり・なしの切り替え
// ========================================

function toggleEventTime(){

    const noTime =
        document.getElementById(
            "eventNoTime"
        );

    const timeArea =
        document.getElementById(
            "eventTimeArea"
        );

    if(!noTime || !timeArea){
        return;
    }

    if(noTime.checked){

        timeArea.style.display =
            "none";

    }

    else{

        timeArea.style.display =
            "block";

    }

}

// ========================================
// 予定詳細
// ========================================

let detailEventKey = "";
let detailEventIndex = -1;

let editingEventIndex = -1;
let editingEventKey = "";


function openEventDetail(key, index){

    if(
        !schedules[key]
        ||
        !schedules[key].events
        ||
        !schedules[key].events[index]
    ){

        return;

    }


    const event =
        schedules[key].events[index];


    detailEventKey =
        key;

    detailEventIndex =
        index;


    document.getElementById(
        "detailEventCategory"
    ).textContent =
        event.category || "予定";


    document.getElementById(
        "detailEventName"
    ).textContent =
        event.name || "予定";


    document.getElementById(
        "detailEventTime"
    ).textContent =
        event.start
        ?
        `${event.start}〜${event.end || ""}`
        :
        "時間指定なし";


    document.getElementById(
        "eventDetailModal"
    ).style.display =
        "block";

}

// ========================================
// 予定詳細を閉じる
// ========================================

function closeEventDetail(){

    const modal =
        document.getElementById(
            "eventDetailModal"
        );

    if(modal){

        modal.style.display =
            "none";

    }

    detailEventKey =
        "";

    detailEventIndex =
        -1;

}


// ========================================
// 予定詳細 → 削除
// ========================================

function deleteCurrentEvent(){

    if(
        detailEventKey === ""
        ||
        detailEventIndex === -1
    ){

        return;

    }


    const result =
        confirm(
            "この予定を削除しますか？"
        );


    if(!result){

        return;

    }


    if(
        !schedules[detailEventKey]
        ||
        !schedules[detailEventKey].events
    ){

        return;

    }


    schedules[
        detailEventKey
    ].events.splice(
        detailEventIndex,
        1
    );


    saveAllData();


    closeEventDetail();


    renderCalendar();


    showDetail();

}

// ========================================
// 予定詳細 → 編集
// ========================================

function editCurrentEvent(){

    if(
        detailEventKey === ""
        ||
        detailEventIndex === -1
    ){

        return;

    }


    const schedule =
        schedules[detailEventKey];


    if(
        !schedule
        ||
        !schedule.events
        ||
        !schedule.events[detailEventIndex]
    ){

        return;

    }


    const event =
        schedule.events[
            detailEventIndex
        ];


    // 編集中の予定を記憶
    editingEventKey =
        detailEventKey;

    editingEventIndex =
        detailEventIndex;


    // 詳細画面を閉じる
    closeEventDetail();


    // 入力欄に現在の内容を入れる

    document.getElementById(
        "eventCategory"
    ).value =
        event.category || "その他";


    document.getElementById(
        "eventName"
    ).value =
        event.name || "";


    document.getElementById(
        "eventShortName"
    ).value =
        event.shortName || "";
 

    document.getElementById(
        "eventStart"
    ).value =
        event.start || "";


    document.getElementById(
        "eventEnd"
    ).value =
        event.end || "";


    const noTime =
        document.getElementById(
            "eventNoTime"
        );


    if(noTime){

        noTime.checked =
            event.noTime === true;

    }


    // 時間欄を表示・非表示
    toggleEventTime();


    // 予定入力フォームを開く
    const form =
        document.getElementById(
            "eventForm"
        );


    if(form){

        form.style.display =
            "block";

    }

}


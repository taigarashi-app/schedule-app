// ========================================
// データ保持・初期化
// ========================================
let classes = JSON.parse(localStorage.getItem("classes")) || [];
let scheduleData = JSON.parse(localStorage.getItem("scheduleData")) || {};
let school = JSON.parse(localStorage.getItem("schoolConfig")) || {
  name: "大学",
  days: ["月", "火", "水", "木", "金"],
  periods: [1, 2, 3, 4, 5]
};

let currentDate = new Date();
let selectedDate = null;
let editingEventKey = "";
let editingEventIndex = -1;
let detailClassIndex = -1;

// ========================================
// 初期表示イベント
// ========================================
document.addEventListener("DOMContentLoaded", function () {
  renderCalendar();
  renderTimetableWithClass();
  initSchoolSettings();

  // クリックイベントの競合防止処理
  document.addEventListener("click", function (e) {
    if (e.target && (e.target.matches(".sheet-footer button") || e.target.textContent.includes("この日に予定を追加"))) {
      e.stopPropagation();
      e.preventDefault();
      addEventFromDetail();
    }
  });
});

// ========================================
// カレンダー描画
// ========================================
function renderCalendar() {
  const monthEl = document.getElementById("currentMonth");
  if (!monthEl) return;

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  monthEl.textContent = `${year}年${month + 1}月`;

  const firstDay = new Date(year, month, 1).getDay();
  const lastDate = new Date(year, month + 1, 0).getDate();
  const grid = document.getElementById("calendarGrid");
  if (!grid) return;

  grid.innerHTML = "";

  // 空白セル
  for (let i = 0; i < firstDay; i++) {
    grid.innerHTML += `<div class="calendar-day empty"></div>`;
  }

  // 日付セル
  for (let date = 1; date <= lastDate; date++) {
    const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(date).padStart(2, "0")}`;
    const dayEvents = scheduleData[dateStr] || [];
    
    let eventMark = "";
    if (Array.isArray(dayEvents)) {
      dayEvents.forEach(ev => {
        const sName = ev.shortName || ev.title || ev.name || "";
        const tText = formatEventTime(ev.startTime || ev.start, ev.endTime || ev.end);
        
        let categoryClass = "event-color-other";
        const cat = ev.category || "";
        if (cat === "バイト") categoryClass = "event-color-baito";
        else if (cat === "大学") categoryClass = "event-color-daigaku";
        else if (cat === "授業") categoryClass = "event-color-jugyo";
        else if (cat === "サークル") categoryClass = "event-color-circle";
        else if (cat === "プライベート") categoryClass = "event-color-private";

        // ★スペースなし・1行表示★
        eventMark += `
          <div class="event-badge ${categoryClass}">
            <span class="event-short-name">${sName}</span>${tText ? `<span class="event-time">${tText}</span>` : ''}
          </div>
        `;
      });
    }

    grid.innerHTML += `
      <div class="calendar-day" onclick="openDetailSheet('${dateStr}')">
        <span class="day-number">${date}</span>
        <div class="event-marks">${eventMark}</div>
      </div>
    `;
  }
}

function formatEventTime(start, end) {
  if (!start) return "";
  const s = start.split(":")[0];
  if (!end) return `${s}`;
  const e = end.split(":")[0];
  return `${s}〜${e}`;
}

// ========================================
// 時間割描画 (曜日・時限の自動更新)
// ========================================
function renderTimetableWithClass() {
  const body = document.getElementById("timetableBody");
  if (!body) return;

  body.innerHTML = "";

  const days = school.days || ["月", "火", "水", "木", "金"];
  const periods = school.periods || [1, 2, 3, 4, 5];

  // 動的ヘッダー更新
  const thead = document.querySelector("#timetablePage table thead");
  if (thead) {
    let headerRow = "<tr><th></th>";
    days.forEach(day => {
      headerRow += `<th>${day}</th>`;
    });
    headerRow += "</tr>";
    thead.innerHTML = headerRow;
  }

  periods.forEach(period => {
    let row = `<tr><th>${period}限</th>`;
    days.forEach(day => {
      const index = classes.findIndex(
        c => c.day === day && Number(c.period) === Number(period)
      );

      if (index !== -1) {
        const c = classes[index];
        row += `
          <td>
            <div class="class-card timetable-class" data-class-index="${index}" style="cursor:pointer;">
              ${c.name}<br>
              <span class="room">📍${c.room || ""}</span>
            </div>
          </td>
        `;
      } else {
        row += `
          <td>
            <div class="empty-class-slot" data-day="${day}" data-period="${period}" style="cursor:pointer; min-height:50px;">
              ＋
            </div>
          </td>
        `;
      }
    });
    row += "</tr>";
    body.innerHTML += row;
  });

  // イベントバインド
  document.querySelectorAll(".timetable-class").forEach(card => {
    card.addEventListener("click", function () {
      const index = Number(this.dataset.classIndex);
      openClassDetail(index);
    });
  });

  document.querySelectorAll(".empty-class-slot").forEach(slot => {
    slot.addEventListener("click", function () {
      const day = this.dataset.day;
      const period = Number(this.dataset.period);
      openClassModal(day, period);
    });
  });
}

// ========================================
// ボトムシート＆予定モーダル制御
// ========================================
function openDetailSheet(dateStr) {
  selectedDate = dateStr;
  const sheet = document.getElementById("detailBottomSheet");
  if (sheet) sheet.style.display = "block";
}

function addEventFromDetail() {
  const sheet = document.getElementById("detailBottomSheet");
  if (sheet) sheet.style.display = "none";

  editingEventKey = "";
  editingEventIndex = -1;

  const dateInput = document.getElementById("eventDateInput");
  if (dateInput && selectedDate) {
    dateInput.value = selectedDate;
  }

  const form = document.getElementById("eventFormModal");
  if (form) form.style.display = "flex";
}

// ========================================
// 学校設定関連
// ========================================
function initSchoolSettings() {
  const nameInput = document.getElementById("schoolName");
  if (nameInput) nameInput.value = school.name || "";
}

function saveSchoolSettings() {
  const nameInput = document.getElementById("schoolName");
  if (nameInput) school.name = nameInput.value;

  const dayInputs = document.querySelectorAll('#schoolPage input[name="days"]:checked');
  school.days = Array.from(dayInputs).map(cb => cb.value);

  const periodInputs = document.querySelectorAll('#schoolPage input[name="periods"]:checked');
  school.periods = Array.from(periodInputs).map(cb => Number(cb.value));

  localStorage.setItem("schoolConfig", JSON.stringify(school));
  renderTimetableWithClass();
  alert("設定を保存しました！");
}

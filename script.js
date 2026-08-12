// ========================================
// Schedule Link (Main Script)
// ========================================

let classes = JSON.parse(localStorage.getItem("classes")) || [];
let schedules = JSON.parse(localStorage.getItem("scheduleData")) || {};
let templates = JSON.parse(localStorage.getItem("templates")) || [];
let school = JSON.parse(localStorage.getItem("school")) || {
  name: "",
  days: ["月", "火", "水", "木", "金"],
  periods: [1, 2, 3, 4, 5, 6]
};

let currentDate = new Date();
let selectedDate = new Date();

let editingClassIndex = -1;
let detailClassIndex = -1;
let selectedClassDay = "";
let selectedClassPeriod = 0;

let detailEventKey = "";
let detailEventIndex = -1;
let editingEventIndex = -1;
let editingEventKey = "";

// ========================================
// ページ切り替え
// ========================================

function showPage(page) {
  document.querySelectorAll("section").forEach(section => {
    section.style.display = "none";
  });

  const target = document.getElementById(page);
  if (target) {
    target.style.display = "block";
  }

  if (page === "calendarPage") {
    renderCalendar();
    showDetail();
  }

  if (page === "timetablePage") {
    renderTimetableWithClass();
  }

  if (page === "customPage") {
    renderCategories();
    updateCategoryUI();
  }
}

// ========================================
// 保存
// ========================================

function saveAllData() {
  localStorage.setItem("classes", JSON.stringify(classes));
  localStorage.setItem("scheduleData", JSON.stringify(schedules));
  localStorage.setItem("templates", JSON.stringify(templates));
  localStorage.setItem("school", JSON.stringify(school));
}

// ========================================
// 共通関数
// ========================================

function dateKey(date) {
  return (
    date.getFullYear() +
    "-" +
    (date.getMonth() + 1) +
    "-" +
    date.getDate()
  );
}

function formatDateToInput(dateObj) {
  const y = dateObj.getFullYear();
  const m = String(dateObj.getMonth() + 1).padStart(2, "0");
  const d = String(dateObj.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

function formatEventTime(startTime, endTime) {
  if (!startTime) return "";
  const parseTime = t => {
    const [h, m] = t.split(":").map(Number);
    return { h, m };
  };
  const start = parseTime(startTime);
  const end = endTime ? parseTime(endTime) : null;
  
  const startStr = start.m === 0 ? `${start.h}` : startTime;
  const endStr = end ? (end.m === 0 ? `${end.h}` : endTime) : "";

  if (endStr) {
    return `${startStr}-${endStr}`;
  }
  return startStr;
}

// ========================================
// カレンダー描画
// ========================================

function renderCalendar() {
  const calendar = document.getElementById("calendar");
  if (!calendar) return;

  calendar.innerHTML = "";

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const monthTitle = document.getElementById("monthTitle");
  if (monthTitle) {
    monthTitle.textContent = `${year}年${month + 1}月`;
  }

  const firstDay = new Date(year, month, 1).getDay();
  const lastDay = new Date(year, month + 1, 0).getDate();
  const today = new Date();

  const prevMonthLastDay = new Date(year, month, 0).getDate();
  for (let i = firstDay - 1; i >= 0; i--) {
    const dayNum = prevMonthLastDay - i;
    const emptyCell = document.createElement("div");
    emptyCell.className = "day other-month";
    emptyCell.innerHTML = `<span class="date-number">${dayNum}</span>`;
    calendar.appendChild(emptyCell);
  }

  for (let day = 1; day <= lastDay; day++) {
    const date = new Date(year, month, day);
    const key = dateKey(date);

    const isToday =
      date.getFullYear() === today.getFullYear() &&
      date.getMonth() === today.getMonth() &&
      date.getDate() === today.getDate();

    const isSelected =
      selectedDate &&
      date.getFullYear() === selectedDate.getFullYear() &&
      date.getMonth() === selectedDate.getMonth() &&
      date.getDate() === selectedDate.getDate();

    const dayNames = ["日", "月", "火", "水", "木", "金", "土"];
    const dayName = dayNames[date.getDay()];
    const dayClasses = classes.filter(c => c.day === dayName);
    const periodNumbers = dayClasses.map(c => Number(c.period));

    let classMark = `<div class="class-mini">`;
    [1, 2, 3, 4, 5, 6].forEach(period => {
      if (periodNumbers.includes(period)) {
        classMark += `<span class="class-box active"></span>`;
      } else {
        classMark += `<span class="class-box"></span>`;
      }
    });
    classMark += `</div>`;

    const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    const dayEvents = schedules[dateStr] || schedules[key]?.events || [];
    let eventMark = `<div class="day-events">`;

    if (Array.isArray(dayEvents)) {
      dayEvents.forEach(ev => {
        const sName = ev.shortName || ev.title || ev.name || "";
        const tText = formatEventTime(ev.startTime || ev.start, ev.endTime || ev.end);
        const bgColor = ev.color || "#808080";

        eventMark += `
          <div class="event-badge" style="background-color: ${bgColor}; color: #fff;">
            <span class="event-short-name">${sName}</span>${tText ? `<span class="event-time">${tText}</span>` : ''}
          </div>
        `;
      });
    }
    eventMark += `</div>`;

    let dayClassesList = "day";
    if (isToday) dayClassesList += " today";
    if (isSelected) dayClassesList += " selected";

    calendar.innerHTML += `
      <div class="${dayClassesList}" onclick="selectDate(${year}, ${month}, ${day})">
        <span class="date-number">${day}</span>
        ${classMark}
        ${eventMark}
      </div>
    `;
  }

  const totalCells = firstDay + lastDay;
  const nextDays = (42 - totalCells) % 7;
  for (let i = 1; i <= nextDays; i++) {
    calendar.innerHTML += `<div class="day other-month"><span class="date-number">${i}</span></div>`;
  }
}

function selectDate(y, m, d) {
  selectedDate = new Date(y, m, d);
  renderCalendar();
  showDetail();
  openDetailSheet();
}

function openDetailSheet() {
  const sheet = document.getElementById("detailBottomSheet");
  if (sheet) sheet.style.display = "flex";
}

function closeDetailSheet(e) {
  if (e) e.stopPropagation();
  const sheet = document.getElementById("detailBottomSheet");
  if (sheet) sheet.style.display = "none";
}

function showDetail() {
  const title = document.getElementById("selectedDate");
  if (!title) return;

  const dayNames = ["日曜日", "月曜日", "火曜日", "水曜日", "木曜日", "金曜日", "土曜日"];
  const dayOfWeek = dayNames[selectedDate.getDay()];

  title.textContent = `${selectedDate.getMonth() + 1}月${selectedDate.getDate()}日 ${dayOfWeek}`;

  const key = dateKey(selectedDate);
  const list = document.getElementById("eventList");

  if (schedules[key] && schedules[key].events && schedules[key].events.length > 0) {
    list.innerHTML = "";
    schedules[key].events
      .sort((a, b) => (a.start || "").localeCompare(b.start || ""))
      .forEach((event, index) => {
        list.innerHTML += `
          <div class="calendar-event-card" style="display:flex; justify-content:space-between; align-items:center; background:#2c2c2e; padding:10px 14px; border-radius:10px; margin-bottom:8px;">
            <div>
              <div class="event-time-badge" style="font-size:12px; color:#8e8e93;">
                ${event.noTime ? "終日" : (event.start ? `${event.start}〜${event.end || ""}` : "終日")}
              </div>
              <div class="event-info">
                <span class="event-cat" style="font-size:12px; color:${event.color || '#0a84ff'};">[${event.category || "予定"}]</span>
                <strong class="event-title-text" style="color:#fff; font-size:15px; margin-left:4px;">${event.name}</strong>
              </div>
            </div>
            <div style="display:flex; gap:6px;">
              <button onclick="editEvent(${index})" style="background:#3a3a3c; color:#fff; border:none; padding:6px 10px; border-radius:6px; font-size:12px; cursor:pointer;">編集</button>
              <button onclick="deleteEvent(${index})" style="background:#ff453a22; color:#ff453a; border:none; padding:6px 10px; border-radius:6px; font-size:12px; cursor:pointer;">削除</button>
            </div>
          </div>
        `;
      });
  } else {
    list.innerHTML = `
      <div class="empty-event-msg">
        <p>予定はありません</p>
        <p class="sub">下部の[＋ この日に予定を追加]ボタンから作成できます。</p>
      </div>
    `;
  }

  const classList = document.getElementById("classList");
  if (classList) {
    const dayNamesShort = ["日", "月", "火", "水", "木", "金", "土"];
    const dayName = dayNamesShort[selectedDate.getDay()];
    const dayClasses = classes.filter(c => c.day === dayName);

    dayClasses.sort((a, b) => Number(a.period) - Number(b.period));

    if (dayClasses.length > 0) {
      classList.innerHTML = "<h3>🏫 今日の授業</h3>";
      dayClasses.forEach(c => {
        classList.innerHTML += `
          <div class="calendar-class">
            <strong>${c.period}限</strong> ${c.name}
            ${c.room ? `<br>📍${c.room}` : ""}
          </div>
        `;
      });
    } else {
      classList.innerHTML = "";
    }
  }

  const diary = document.getElementById("diary");
  if (diary) {
    diary.value = schedules[key]?.diary || "";
  }
}

function saveDiary() {
  const key = dateKey(selectedDate);
  if (!schedules[key]) {
    schedules[key] = { events: [], diary: "" };
  }
  schedules[key].diary = document.getElementById("diary").value;
  saveAllData();
  alert("日記を保存しました📝");
}

function changeMonth(value) {
  currentDate.setMonth(currentDate.getMonth() + value);
  renderCalendar();
}

function goToday() {
  currentDate = new Date();
  selectedDate = new Date();
  renderCalendar();
  showDetail();
}

// ========================================
// 予定追加・編集フォーム (モーダル)
// ========================================

function openEventForm() {
  const sheet = document.getElementById("detailBottomSheet");
  if (sheet) sheet.style.display = "none";

  editingEventKey = "";
  editingEventIndex = -1;

  const nameInput = document.getElementById("eventName");
  const shortNameInput = document.getElementById("eventShortName");
  if (nameInput) nameInput.value = "";
  if (shortNameInput) shortNameInput.value = "";
  
  const titleEl = document.querySelector("#eventFormModal .modal-title");
  if (titleEl) titleEl.textContent = "予定の作成";

  const dateInput = document.getElementById("eventDateInput");
  if (dateInput) {
    const targetDate = selectedDate || new Date();
    dateInput.value = formatDateToInput(targetDate);
  }

  const form = document.getElementById("eventFormModal");
  if (form) form.style.display = "flex";
}

function addEventFromDetail() {
  const sheet = document.getElementById("detailBottomSheet");
  if (sheet) sheet.style.display = "none";

  editingEventKey = "";
  editingEventIndex = -1;

  const nameInput = document.getElementById("eventName");
  const shortNameInput = document.getElementById("eventShortName");
  if (nameInput) nameInput.value = "";
  if (shortNameInput) shortNameInput.value = "";

  const titleEl = document.querySelector("#eventFormModal .modal-title");
  if (titleEl) titleEl.textContent = "予定の作成";

  const dateInput = document.getElementById("eventDateInput");
  if (dateInput && selectedDate) {
    dateInput.value = formatDateToInput(selectedDate);
  }

  const form = document.getElementById("eventFormModal");
  if (form) form.style.display = "flex";
}

function closeEventForm() {
  const form = document.getElementById("eventFormModal");
  if (form) form.style.display = "none";

  editingEventKey = "";
  editingEventIndex = -1;
}

function toggleEventTime() {
  const noTime = document.getElementById("eventNoTime");
  const timeArea = document.getElementById("eventTimeArea");
  if (!noTime || !timeArea) return;

  timeArea.style.display = noTime.checked ? "none" : "block";
}

function editEvent(index) {
  const key = dateKey(selectedDate);
  if (!schedules[key] || !schedules[key].events || !schedules[key].events[index]) return;

  const event = schedules[key].events[index];
  editingEventKey = key;
  editingEventIndex = index;

  closeDetailSheet();

  const titleEl = document.querySelector("#eventFormModal .modal-title");
  if (titleEl) titleEl.textContent = "予定の編集";

  document.getElementById("eventCategory").value = event.category || "その他";
  document.getElementById("eventName").value = event.name || "";
  document.getElementById("eventShortName").value = event.shortName || "";
  document.getElementById("eventStart").value = event.start || "22:00";
  document.getElementById("eventEnd").value = event.end || "23:00";

  const dateInput = document.getElementById("eventDateInput");
  if (dateInput) {
    dateInput.value = formatDateToInput(selectedDate);
  }

  const noTime = document.getElementById("eventNoTime");
  if (noTime) noTime.checked = event.noTime === true;

  toggleEventTime();

  const form = document.getElementById("eventFormModal");
  if (form) form.style.display = "flex";
}

function saveEvent() {
  const category = document.getElementById("eventCategory").value.trim();
  const name = document.getElementById("eventName").value.trim();
  const shortName = document.getElementById("eventShortName").value.trim();
  const noTime = document.getElementById("eventNoTime").checked;
  const start = document.getElementById("eventStart").value;
  const end = document.getElementById("eventEnd").value;
  const dateVal = document.getElementById("eventDateInput").value;

  if (!name) {
    alert("予定名を入力してください📅");
    return;
  }

  if (!noTime && (!start || !end)) {
    alert("開始時刻と終了時刻を入力してください⏰");
    return;
  }

  let targetKey = dateKey(selectedDate);
  if (dateVal) {
    const [y, m, d] = dateVal.split("-").map(Number);
    targetKey = `${y}-${m}-${d}`;
    selectedDate = new Date(y, m - 1, d);
  }

  if (!schedules[targetKey]) {
    schedules[targetKey] = { events: [], diary: "" };
  }

  const categories = getCategories();
  const selectedCat = categories.find(c => c.name === category);
  const color = selectedCat ? selectedCat.color : "#808080";

  const eventData = {
    category: category || "予定",
    name: name,
    shortName: shortName || name,
    start: noTime ? "" : start,
    end: noTime ? "" : end,
    noTime: noTime,
    color: color
  };

  if (editingEventKey !== "" && editingEventIndex !== -1) {
    if (editingEventKey !== targetKey) {
      schedules[editingEventKey].events.splice(editingEventIndex, 1);
      schedules[targetKey].events.push(eventData);
    } else {
      schedules[targetKey].events[editingEventIndex] = eventData;
    }
  } else {
    schedules[targetKey].events.push(eventData);
  }

  saveAllData();

  document.getElementById("eventCategory").value = "バイト";
  document.getElementById("eventName").value = "";
  document.getElementById("eventShortName").value = "";
  document.getElementById("eventStart").value = "22:00";
  document.getElementById("eventEnd").value = "23:00";
  document.getElementById("eventNoTime").checked = false;

  toggleEventTime();
  closeEventForm();
  renderCalendar();
  showDetail();
}

function deleteEvent(index) {
  const key = dateKey(selectedDate);
  if (schedules[key] && schedules[key].events) {
    schedules[key].events.splice(index, 1);
    saveAllData();
    renderCalendar();
    showDetail();
  }
}

// ========================================
// 時間割
// ========================================

function renderTimetableWithClass() {
  const body = document.getElementById("timetableBody");
  if (!body) return;

  body.innerHTML = "";

  const days = school.days;
  const periods = school.periods;

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

  document.querySelectorAll(".timetable-class").forEach(card => {
    card.addEventListener("click", function () {
      const index = Number(this.dataset.classIndex);
      if (detailClassIndex === index) {
        closeClassDetail();
        return;
      }
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

function openClassModal(day, period, index = -1) {
  editingClassIndex = index;
  selectedClassDay = day;
  selectedClassPeriod = period;

  const modal = document.getElementById("classModal");
  const title = document.getElementById("classModalTitle");
  const time = document.getElementById("classTime");

  if (!modal || !title || !time) return;

  time.textContent = `${day}曜日 ${period}限`;

  if (index === -1) {
    title.textContent = "📚 授業登録";
    document.getElementById("className").value = "";
    document.getElementById("teacher").value = "";
    document.getElementById("room").value = "";
    document.getElementById("belongings").value = "";
    document.getElementById("classMemo").value = "";
  } else {
    const c = classes[index];
    if (!c) return;
    title.textContent = "✏️ 授業を編集";
    document.getElementById("className").value = c.name || "";
    document.getElementById("teacher").value = c.teacher || "";
    document.getElementById("room").value = c.room || "";
    document.getElementById("belongings").value = c.belongings || "";
    document.getElementById("classMemo").value = c.memo || "";
  }

  modal.style.display = "block";
}

function saveClass() {
  const name = document.getElementById("className").value.trim();
  if (!name) {
    alert("授業名を入力してください📚");
    return;
  }

  const data = {
    name: name,
    teacher: document.getElementById("teacher").value,
    room: document.getElementById("room").value,
    day: selectedClassDay,
    period: Number(selectedClassPeriod),
    belongings: document.getElementById("belongings").value,
    memo: document.getElementById("classMemo").value
  };

  if (editingClassIndex === -1) {
    classes.push(data);
  } else {
    classes[editingClassIndex] = data;
  }

  saveAllData();
  closeClassModal();
  renderTimetableWithClass();
}

function closeClassModal() {
  const modal = document.getElementById("classModal");
  if (modal) modal.style.display = "none";
  editingClassIndex = -1;
}

function openClassDetail(index) {
  const c = classes[index];
  if (!c) return;

  detailClassIndex = index;

  document.getElementById("detailClassName").textContent = "📚 " + (c.name || "授業");
  document.getElementById("detailClassTime").textContent = `${c.day}曜日 ${c.period}限`;
  document.getElementById("detailTeacher").textContent = c.teacher || "未登録";
  document.getElementById("detailRoom").textContent = c.room || "未登録";
  document.getElementById("detailBelongings").textContent = c.belongings || "なし";
  document.getElementById("detailMemo").textContent = c.memo || "なし";

  document.getElementById("classDetailModal").style.display = "block";
}

function editCurrentClass() {
  if (detailClassIndex === -1) return;
  const index = detailClassIndex;
  const c = classes[index];
  if (!c) return;
  closeClassDetail();
  openClassModal(c.day, c.period, index);
}

function deleteCurrentClass() {
  if (detailClassIndex === -1) return;
  if (!confirm("この授業を削除しますか？")) return;
  classes.splice(detailClassIndex, 1);
  saveAllData();
  closeClassDetail();
  renderTimetableWithClass();
}

function closeClassDetail() {
  const modal = document.getElementById("classDetailModal");
  if (modal) modal.style.display = "none";
  detailClassIndex = -1;
}

function saveSchool() {
  const name = document.getElementById("schoolName").value;
  const dayCheckboxes = document.querySelectorAll(".school-day");
  const periodCheckboxes = document.querySelectorAll(".school-period");

  const days = [];
  dayCheckboxes.forEach(box => {
    if (box.checked) days.push(box.value);
  });

  const periods = [];
  periodCheckboxes.forEach(box => {
    if (box.checked) periods.push(Number(box.value));
  });

  school = { name: name, days: days, periods: periods };
  saveAllData();
  renderTimetableWithClass();
  alert("学校設定を保存しました🏫");
}

function openEventDetail(key, index) {
  if (!schedules[key] || !schedules[key].events || !schedules[key].events[index]) return;

  const event = schedules[key].events[index];
  detailEventKey = key;
  detailEventIndex = index;

  document.getElementById("detailEventCategory").textContent = event.category || "予定";
  document.getElementById("detailEventName").textContent = event.name || "予定";
  document.getElementById("detailEventTime").textContent = event.start
    ? `${event.start}〜${event.end || ""}`
    : "時間指定なし";

  document.getElementById("eventDetailModal").style.display = "block";
}

function closeEventDetail() {
  const modal = document.getElementById("eventDetailModal");
  if (modal) modal.style.display = "none";
  detailEventKey = "";
  detailEventIndex = -1;
}

function deleteCurrentEvent() {
  if (detailEventKey === "" || detailEventIndex === -1) return;
  if (!confirm("この予定を削除しますか？")) return;

  schedules[detailEventKey].events.splice(detailEventIndex, 1);
  saveAllData();
  closeEventDetail();
  renderCalendar();
  showDetail();
}

function editCurrentEvent() {
  if (detailEventKey === "" || detailEventIndex === -1) return;
  const schedule = schedules[detailEventKey];
  if (!schedule || !schedule.events || !schedule.events[detailEventIndex]) return;

  const event = schedule.events[detailEventIndex];
  editingEventKey = detailEventKey;
  editingEventIndex = detailEventIndex;

  closeEventDetail();

  document.getElementById("eventCategory").value = event.category || "その他";
  document.getElementById("eventName").value = event.name || "";
  document.getElementById("eventShortName").value = event.shortName || "";
  document.getElementById("eventStart").value = event.start || "22:00";
  document.getElementById("eventEnd").value = event.end || "23:00";

  const noTime = document.getElementById("eventNoTime");
  if (noTime) noTime.checked = event.noTime === true;

  toggleEventTime();
  openEventForm();
}

// ========================================
// カテゴリ管理機能（キー名を "myCategories" に統一）
// ========================================

function getCategories() {
    const saved = localStorage.getItem("myCategories");
    if (saved) return JSON.parse(saved);
    return [
        { name: "バイト", color: "#ffd700" },
        { name: "大学", color: "#ff6b6b" },
        { name: "その他", color: "#808080" }
    ];
}

function addCategory() {
    const nameInput = document.getElementById("newCatName");
    const colorInput = document.getElementById("newCatColor");
    if (!nameInput || !nameInput.value) return;

    let cats = getCategories();
    cats.push({ name: nameInput.value, color: colorInput.value });
    localStorage.setItem("myCategories", JSON.stringify(cats));
    
    nameInput.value = "";
    renderCategories();
    updateCategoryUI();
}

// カスタム画面用の編集・削除付きリスト描画
function renderCategories() {
  const listContainer = document.getElementById('categoryList');
  if (!listContainer) return;

  let categories = getCategories();

  if (categories.length === 0) {
    listContainer.innerHTML = '<p style="color: #8e8e93; font-size: 13px; padding: 10px;">カテゴリがありません</p>';
    return;
  }

  let html = '<div style="display: flex; flex-direction: column; gap: 10px;">';
  
  categories.forEach((cat, index) => {
    html += `
      <div style="display: flex; align-items: center; gap: 8px; background: #2c2c2e; padding: 10px; border-radius: 8px;">
        
        <!-- ▼ ここを変更：CSSのクラスを当てて綺麗な丸にする -->
        <input type="color" value="${cat.color}" id="edit-color-${index}" class="circle-color-picker" onchange="saveCategoryEdit(${index})">
        
        <!-- 名前の変更用テキストボックス -->
        <input type="text" value="${cat.name}" id="edit-name-${index}" style="flex: 1; background: #1c1c1e; border: 1px solid #3a3a3c; color: #fff; padding: 6px; border-radius: 4px;">
        
        <!-- 変更（保存）ボタン -->
        <button type="button" onclick="saveCategoryEdit(${index})" style="background: #34c759; color: white; border: none; padding: 6px 10px; border-radius: 4px; cursor: pointer; font-size: 12px; font-weight: bold;">変更</button>
        
        <!-- 削除ボタン -->
        <button type="button" onclick="deleteCategoryItem(${index})" style="background: #ff453a; color: white; border: none; padding: 6px 10px; border-radius: 4px; cursor: pointer; font-size: 12px;">削除</button>
      </div>
    `;
  });

  html += '</div>';
  listContainer.innerHTML = html;
}
function saveCategoryEdit(index) {
  let categories = getCategories();
  
  const nameInput = document.getElementById(`edit-name-${index}`);
  const colorInput = document.getElementById(`edit-color-${index}`);

  if (categories[index] && nameInput && colorInput) {
    const oldName = categories[index].name; // 変更前の名前を保持
    const newName = nameInput.value;
    const newColor = colorInput.value;

    // カテゴリ情報を更新
    categories[index].name = newName;
    categories[index].color = newColor;
    
    localStorage.setItem("myCategories", JSON.stringify(categories));
    
    // 🔥 ここを追加：既存のスケジュール（schedules）内にある同じカテゴリ名の予定の色と名前を一括更新する
    for (let dateKey in schedules) {
      if (schedules[dateKey] && Array.isArray(schedules[dateKey].events)) {
        schedules[dateKey].events.forEach(event => {
          if (event.category === oldName) {
            event.category = newName;
            event.color = newColor;
          }
        });
      }
    }
    
    // 全データを保存し直す
    saveAllData();
    
    // 画面を再描画
    renderCategories();
    updateCategoryUI();
    renderCalendar();
    if (typeof showDetail === 'function') showDetail();
    
    alert('カテゴリを更新し、予定の色も反映しました！');
  }
}

function deleteCategoryItem(index) {
  if (!confirm('このカテゴリを削除してもよろしいですか？')) return;

  let categories = getCategories();
  categories.splice(index, 1);
  
  localStorage.setItem("myCategories", JSON.stringify(categories));
  renderCategories();
  updateCategoryUI();
  if (typeof loadEvents === 'function') loadEvents();
}

function updateCategoryUI() {
    const select = document.getElementById("eventCategory");
    if(select) {
        const cats = getCategories();
        select.innerHTML = cats.map(cat => 
            `<option value="${cat.name}">${cat.name}</option>`
        ).join('');
    }
}

window.onload = function () {
  renderCalendar();
  renderTimetableWithClass();
  updateCategoryUI();
};

// ボトムシートをスワイプ（またはドラッグ）して閉じる機能
document.addEventListener('DOMContentLoaded', () => {
  const sheet = document.getElementById('detailBottomSheet');
  const handle = document.getElementById('sheetHandle');
  
  if (!sheet || !handle) return;

  let startY = 0;
  let currentY = 0;
  let isDragging = false;

  // タッチ開始、またはマウスを押したとき
  const dragStart = (e) => {
    isDragging = true;
    startY = e.touches ? e.touches[0].clientY : e.clientY;
    sheet.style.transition = 'none'; // ドラッグ中はアニメーションを切る
  };

  // 動かしているとき
  const dragMove = (e) => {
    if (!isDragging) return;
    currentY = e.touches ? e.touches[0].clientY : e.clientY;
    let diffY = currentY - startY;

    // 下方向へのドラッグのみ受け付ける
    if (diffY > 0) {
      sheet.style.transform = `translateY(${diffY}px)`;
    }
  };

  // 指を離してたとき
  const dragEnd = () => {
    if (!isDragging) return;
    isDragging = false;
    sheet.style.transition = 'transform 0.3s ease'; // アニメーションを元に戻す

    let diffY = currentY - startY;
    
    // 100px以上下にスワイプしていたら閉じる
    if (diffY > 100) {
      closeDetailSheet();
      sheet.style.transform = 'translateY(0)'; // 位置をリセット
    } else {
      // 戻す
      sheet.style.transform = 'translateY(0)';
    }
    currentY = 0;
    startY = 0;
  };

  // イベント登録（スマホのタッチ ＆ PCのマウス両対応）
  handle.addEventListener('touchstart', dragStart);
  window.addEventListener('touchmove', dragMove);
  window.addEventListener('touchend', dragEnd);

  handle.addEventListener('mousedown', dragStart);
  window.addEventListener('mousemove', dragMove);
  window.addEventListener('mouseup', dragEnd);
});

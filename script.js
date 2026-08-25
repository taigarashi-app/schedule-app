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
    // 修正：月と日を必ず2桁にゼロ埋めする
    const mm = String(m).padStart(2, "0");
    const dd = String(d).padStart(2, "0");
    targetKey = `${y}-${mm}-${dd}`;
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

  // フォームのリセット
  document.getElementById("eventName").value = "";
  document.getElementById("eventShortName").value = "";
  document.getElementById("eventStart").value = "22:00";
  document.getElementById("eventEnd").value = "23:00";
  document.getElementById("eventNoTime").checked = false;

  toggleEventTime();
  closeEventForm();
  renderCalendar();
  showDetail();
}function saveEvent() {
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
    // 修正：月と日を必ず2桁にゼロ埋めする
    const mm = String(m).padStart(2, "0");
    const dd = String(d).padStart(2, "0");
    targetKey = `${y}-${mm}-${dd}`;
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

  // フォームのリセット
  document.getElementById("eventName").value = "";
  document.getElementById("eventShortName").value = "";
  document.getElementById("eventStart").value = "22:00";
  document.getElementById("eventEnd").value = "23:00";
  document.getElementById("eventNoTime").checked = false;

  toggleEventTime();
  closeEventForm();
  renderCalendar();
  showDetail();
}function saveEvent() {
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
    // 修正：月と日を必ず2桁にゼロ埋めする
    const mm = String(m).padStart(2, "0");
    const dd = String(d).padStart(2, "0");
    targetKey = `${y}-${mm}-${dd}`;
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

  // フォームのリセット
  document.getElementById("eventName").value = "";
  document.getElementById("eventShortName").value = "";
  document.getElementById("eventStart").value = "22:00";
  document.getElementById("eventEnd").value = "23:00";
  document.getElementById("eventNoTime").checked = false;

  toggleEventTime();
  closeEventForm();
  renderCalendar();
  showDetail();
}function saveEvent() {
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
    // 修正：月と日を必ず2桁にゼロ埋めする
    const mm = String(m).padStart(2, "0");
    const dd = String(d).padStart(2, "0");
    targetKey = `${y}-${mm}-${dd}`;
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

  // フォームのリセット
  document.getElementById("eventName").value = "";
  document.getElementById("eventShortName").value = "";
  document.getElementById("eventStart").value = "22:00";
  document.getElementById("eventEnd").value = "23:00";
  document.getElementById("eventNoTime").checked = false;

  toggleEventTime();
  closeEventForm();
  renderCalendar();
  showDetail();
}function saveEvent() {
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
    // 修正：月と日を必ず2桁にゼロ埋めする
    const mm = String(m).padStart(2, "0");
    const dd = String(d).padStart(2, "0");
    targetKey = `${y}-${mm}-${dd}`;
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

  // フォームのリセット
  document.getElementById("eventName").value = "";
  document.getElementById("eventShortName").value = "";
  document.getElementById("eventStart").value = "22:00";
  document.getElementById("eventEnd").value = "23:00";
  document.getElementById("eventNoTime").checked = false;

  toggleEventTime();
  closeEventForm();
  renderCalendar();
  showDetail();
}function saveEvent() {
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
    // 修正：月と日を必ず2桁にゼロ埋めする
    const mm = String(m).padStart(2, "0");
    const dd = String(d).padStart(2, "0");
    targetKey = `${y}-${mm}-${dd}`;
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

  // フォームのリセット
  document.getElementById("eventName").value = "";
  document.getElementById("eventShortName").value = "";
  document.getElementById("eventStart").value = "22:00";
  document.getElementById("eventEnd").value = "23:00";
  document.getElementById("eventNoTime").checked = false;

  toggleEventTime();
  closeEventForm();
  renderCalendar();
  showDetail();
}function saveEvent() {
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
    // 修正：月と日を必ず2桁にゼロ埋めする
    const mm = String(m).padStart(2, "0");
    const dd = String(d).padStart(2, "0");
    targetKey = `${y}-${mm}-${dd}`;
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

  // フォームのリセット
  document.getElementById("eventName").value = "";
  document.getElementById("eventShortName").value = "";
  document.getElementById("eventStart").value = "22:00";
  document.getElementById("eventEnd").value = "23:00";
  document.getElementById("eventNoTime").checked = false;

  toggleEventTime();
  closeEventForm();
  renderCalendar();
  showDetail();
}function saveEvent() {
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
    // 修正：月と日を必ず2桁にゼロ埋めする
    const mm = String(m).padStart(2, "0");
    const dd = String(d).padStart(2, "0");
    targetKey = `${y}-${mm}-${dd}`;
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

  // フォームのリセット
  document.getElementById("eventName").value = "";
  document.getElementById("eventShortName").value = "";
  document.getElementById("eventStart").value = "22:00";
  document.getElementById("eventEnd").value = "23:00";
  document.getElementById("eventNoTime").checked = false;

  toggleEventTime();
  closeEventForm();
  renderCalendar();
  showDetail();
}function saveEvent() {
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
    // 修正：月と日を必ず2桁にゼロ埋めする
    const mm = String(m).padStart(2, "0");
    const dd = String(d).padStart(2, "0");
    targetKey = `${y}-${mm}-${dd}`;
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

  // フォームのリセット
  document.getElementById("eventName").value = "";
  document.getElementById("eventShortName").value = "";
  document.getElementById("eventStart").value = "22:00";
  document.getElementById("eventEnd").value = "23:00";
  document.getElementById("eventNoTime").checked = false;

  toggleEventTime();
  closeEventForm();
  renderCalendar();
  showDetail();
}function saveEvent() {
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
    // 修正：月と日を必ず2桁にゼロ埋めする
    const mm = String(m).padStart(2, "0");
    const dd = String(d).padStart(2, "0");
    targetKey = `${y}-${mm}-${dd}`;
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

  // フォームのリセット
  document.getElementById("eventName").value = "";
  document.getElementById("eventShortName").value = "";
  document.getElementById("eventStart").value = "22:00";
  document.getElementById("eventEnd").value = "23:00";
  document.getElementById("eventNoTime").checked = false;

  toggleEventTime();
  closeEventForm();
  renderCalendar();
  showDetail();
}function saveEvent() {
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
    // 修正：月と日を必ず2桁にゼロ埋めする
    const mm = String(m).padStart(2, "0");
    const dd = String(d).padStart(2, "0");
    targetKey = `${y}-${mm}-${dd}`;
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

  // フォームのリセット
  document.getElementById("eventName").value = "";
  document.getElementById("eventShortName").value = "";
  document.getElementById("eventStart").value = "22:00";
  document.getElementById("eventEnd").value = "23:00";
  document.getElementById("eventNoTime").checked = false;

  toggleEventTime();
  closeEventForm();
  renderCalendar();
  showDetail();
}function saveEvent() {
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
    // 修正：月と日を必ず2桁にゼロ埋めする
    const mm = String(m).padStart(2, "0");
    const dd = String(d).padStart(2, "0");
    targetKey = `${y}-${mm}-${dd}`;
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

  // フォームのリセット
  document.getElementById("eventName").value = "";
  document.getElementById("eventShortName").value = "";
  document.getElementById("eventStart").value = "22:00";
  document.getElementById("eventEnd").value = "23:00";
  document.getElementById("eventNoTime").checked = false;

  toggleEventTime();
  closeEventForm();
  renderCalendar();
  showDetail();
}function saveEvent() {
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
    // 修正：月と日を必ず2桁にゼロ埋めする
    const mm = String(m).padStart(2, "0");
    const dd = String(d).padStart(2, "0");
    targetKey = `${y}-${mm}-${dd}`;
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

  // フォームのリセット
  document.getElementById("eventName").value = "";
  document.getElementById("eventShortName").value = "";
  document.getElementById("eventStart").value = "22:00";
  document.getElementById("eventEnd").value = "23:00";
  document.getElementById("eventNoTime").checked = false;

  toggleEventTime();
  closeEventForm();
  renderCalendar();
  showDetail();
}function saveEvent() {
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
    // 修正：月と日を必ず2桁にゼロ埋めする
    const mm = String(m).padStart(2, "0");
    const dd = String(d).padStart(2, "0");
    targetKey = `${y}-${mm}-${dd}`;
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

  // フォームのリセット
  document.getElementById("eventName").value = "";
  document.getElementById("eventShortName").value = "";
  document.getElementById("eventStart").value = "22:00";
  document.getElementById("eventEnd").value = "23:00";
  document.getElementById("eventNoTime").checked = false;

  toggleEventTime();
  closeEventForm();
  renderCalendar();
  showDetail();
}function saveEvent() {
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
    // 修正：月と日を必ず2桁にゼロ埋めする
    const mm = String(m).padStart(2, "0");
    const dd = String(d).padStart(2, "0");
    targetKey = `${y}-${mm}-${dd}`;
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

  // フォームのリセット
  document.getElementById("eventName").value = "";
  document.getElementById("eventShortName").value = "";
  document.getElementById("eventStart").value = "22:00";
  document.getElementById("eventEnd").value = "23:00";
  document.getElementById("eventNoTime").checked = false;

  toggleEventTime();
  closeEventForm();
  renderCalendar();
  showDetail();
}function saveEvent() {
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
    // 修正：月と日を必ず2桁にゼロ埋めする
    const mm = String(m).padStart(2, "0");
    const dd = String(d).padStart(2, "0");
    targetKey = `${y}-${mm}-${dd}`;
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

  // フォームのリセット
  document.getElementById("eventName").value = "";
  document.getElementById("eventShortName").value = "";
  document.getElementById("eventStart").value = "22:00";
  document.getElementById("eventEnd").value = "23:00";
  document.getElementById("eventNoTime").checked = false;

  toggleEventTime();
  closeEventForm();
  renderCalendar();
  showDetail();
}function saveEvent() {
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
    // 修正：月と日を必ず2桁にゼロ埋めする
    const mm = String(m).padStart(2, "0");
    const dd = String(d).padStart(2, "0");
    targetKey = `${y}-${mm}-${dd}`;
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

  // フォームのリセット
  document.getElementById("eventName").value = "";
  document.getElementById("eventShortName").value = "";
  document.getElementById("eventStart").value = "22:00";
  document.getElementById("eventEnd").value = "23:00";
  document.getElementById("eventNoTime").checked = false;

  toggleEventTime();
  closeEventForm();
  renderCalendar();
  showDetail();
}function saveEvent() {
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
    // 修正：月と日を必ず2桁にゼロ埋めする
    const mm = String(m).padStart(2, "0");
    const dd = String(d).padStart(2, "0");
    targetKey = `${y}-${mm}-${dd}`;
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

  // フォームのリセット
  document.getElementById("eventName").value = "";
  document.getElementById("eventShortName").value = "";
  document.getElementById("eventStart").value = "22:00";
  document.getElementById("eventEnd").value = "23:00";
  document.getElementById("eventNoTime").checked = false;

  toggleEventTime();
  closeEventForm();
  renderCalendar();
  showDetail();
}function saveEvent() {
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
    // 修正：月と日を必ず2桁にゼロ埋めする
    const mm = String(m).padStart(2, "0");
    const dd = String(d).padStart(2, "0");
    targetKey = `${y}-${mm}-${dd}`;
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

  // フォームのリセット
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

// ========================================
// ページの起動処理
// ========================================
window.onload = function () {
  showPage('calendarPage'); // 先にページを表示状態にする
  
  renderCalendar();
  renderTimetableWithClass();
  updateCategoryUI();
  
  const initialNav = document.getElementById("nav-calendarPage");
  if (initialNav) {
    initialNav.classList.add("active");
  }
};

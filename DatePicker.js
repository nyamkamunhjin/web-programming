class DatePicker {
  // id: div id, fixedDate: {month: 1, day: 30, year: 2016}
  constructor(id, callback) {
    this.id = id;
    this.callback = callback;
    this.date = {
      month: null,
      day: null,
      year: null,
    };
  }

  render(date) {
    const element = document.getElementById(this.id);
    this.date = {
      month: date.getMonth(),
      day: date.getDate(),
      year: date.getFullYear(),
    };

    this.callback(this.id, this.date);
    const table = this.generateMonthTable();
    element.innerHTML = table;
  }

  getFirstLastWeekday(date) {
    return {
      first: new Date(`${date.year}-${date.month}-01`).getDay(),
      last: new Date(date.year, date.month, 0).getDate(),
    };
  }

  generateMonthTable() {
    let table = '<table><tr>';
    table +=
      '<td>Su</td><td>Mo</td><td>Tu</td><td>We</td><td>Th</td><td>Fr</td><td>Sa</td></tr>';
    console.log(this.date);
    const { firstDay, lastDay } = this.getFirstLastWeekday(this.date);
    console.log({ firstDay, lastDay });
    for (let i = 0, day = 1; day <= lastDay; i++) {
      if (i === 0) table += '<tr>';
      if (i !== 0 && i % 7 === 0) table += '</tr><tr>';
      if (i >= firstDay) {
        table += `<td>${day}</td>`;
        day++;
      } else {
        table += `<td></td>`;
      }
    }
    table += '</table>';
    return table;
  }
}

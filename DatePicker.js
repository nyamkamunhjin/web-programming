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
      month: date.getMonth() + 1,
      day: date.getDate(),
      year: date.getFullYear(),
    };

    this.callback(this.id, this.date);
    const table = this.generateMonthTable();
    element.innerHTML = table;
  }

  getFirstLastWeekday(date) {
    // console.log('date:', date);
    return {
      first: new Date(`${date.year}-${date.month}-01`).getDay(),
      last: new Date(date.year, date.month, 0).getDate(),
    };
  }

  generateMonthTable() {
    const months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];

    let table = `<h2>${months[this.date.month - 1]}</h2>`;
    table += '<table><tr>';
    table +=
      '<td>Su</td><td>Mo</td><td>Tu</td><td>We</td><td>Th</td><td>Fr</td><td>Sa</td></tr>';

    const { first: firstDay, last: lastDay } = this.getFirstLastWeekday(
      this.date
    );

    // get sibling months
    const prevMonth = this.getFirstLastWeekday({
      ...this.date,
      month: this.date.month - 1 === 0 ? 11 : this.date.month - 1,
    });

    const nextMonth = this.getFirstLastWeekday({
      ...this.date,
      month: this.date.month + 1 === 12 ? 0 : this.date.month + 1,
    });
    // console.log({
    //   ...this.date,
    //   month: this.date.month - 1 === 0 ? 11 : this.date.month - 1,
    // });
    // console.log('last month: ', months[lastMonth]);

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

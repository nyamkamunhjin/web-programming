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
      numOfDays: new Date(date.year, date.month, 0).getDate(),
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

    let table = `<h2>${months[this.date.month - 1]}, ${this.date.year}</h2>`;
    table += '<table><tr>';
    table +=
      '<td>Su</td><td>Mo</td><td>Tu</td><td>We</td><td>Th</td><td>Fr</td><td>Sa</td></tr>';

    const { first: firstDay, numOfDays } = this.getFirstLastWeekday(this.date);

    // get sibling months
    const prevMonth = this.getFirstLastWeekday({
      ...this.date,
      month: this.date.month - 1 === 0 ? 12 : this.date.month - 1,
    });

    const limit =
      (firstDay + numOfDays) % 7 !== 0
        ? 7 * (parseInt((firstDay + numOfDays) / 7) + 1)
        : 7 * ((firstDay + numOfDays) / 7);

    console.log(limit);
    for (let i = 0, day = 1; i < limit; i++) {
      if (i === 0) table += '<tr>';
      if (i !== 0 && i % 7 === 0) table += '</tr><tr>';
      if (i < firstDay) {
        table += `<td class="dim">${
          prevMonth.numOfDays - (firstDay - 1) + i
        }</td>`;
      }
      if (i >= firstDay && i < firstDay + numOfDays) {
        table += `<td>${day}</td>`;
        day++;
      }

      if (i >= firstDay + numOfDays) {
        table += `<td class="dim">${i - (numOfDays + firstDay) + 1}</td>`;
      }
    }
    table += '</table>';
    return table;
  }
}

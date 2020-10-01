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
    this.months = [
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
    this.week = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
    this.selectedDay = null;
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

    // create buttons
    const buttonPrev = document.createElement('button');
    buttonPrev.appendChild(document.createTextNode('<'));

    buttonPrev.setAttribute('class', 'btn-prev');
    buttonPrev.addEventListener('click', () => {
      this.onPrevClick();
      this.callback(this.id, this.date);
    });

    const monthYear = document.createElement('h2');
    monthYear.appendChild(
      document.createTextNode(
        `${this.months[this.date.month - 1]}, ${this.date.year}`
      )
    );

    const buttonNext = document.createElement('button');
    buttonNext.appendChild(document.createTextNode('>'));

    buttonNext.setAttribute('class', 'btn-next');
    buttonNext.addEventListener('click', () => {
      this.onNextClick();
      this.callback(this.id, this.date);
    });

    const dateElement = document.createElement('div');
    dateElement.setAttribute('class', 'date');
    dateElement.appendChild(table);

    element.appendChild(buttonPrev);
    element.appendChild(monthYear);
    element.appendChild(buttonNext);
    element.appendChild(dateElement);
  }

  getFirstLastWeekday(date) {
    // console.log('date:', date);
    return {
      first: new Date(`${date.year}-${date.month}-01`).getDay(),
      numOfDays: new Date(date.year, date.month, 0).getDate(),
    };
  }

  generateMonthTable() {
    const { first: firstDay, numOfDays } = this.getFirstLastWeekday(this.date);

    // get sibling months
    const prevMonth = this.getFirstLastWeekday({
      ...this.date,
      month: this.date.month === 1 ? 12 : this.date.month - 1,
    });

    const limit =
      (firstDay + numOfDays) % 7 !== 0
        ? 7 * (parseInt((firstDay + numOfDays) / 7) + 1)
        : 7 * ((firstDay + numOfDays) / 7);

    const table = document.createElement('table');

    const week = document.createElement('tr');

    this.week.map((day) => {
      const col = document.createElement('td');
      col.appendChild(document.createTextNode(day));
      week.appendChild(col);
    });

    table.appendChild(week);

    for (let i = 0, row, col, day = 1; i < limit; i++) {
      if (i % 7 === 0) {
        row && table.appendChild(row);
        row = document.createElement('tr');
      }

      if (i < firstDay) {
        const day = prevMonth.numOfDays - (firstDay - 1) + i;
        col = document.createElement('td');
        col.setAttribute('class', 'dim');
        col.appendChild(document.createTextNode(day));
        row.appendChild(col);
      }

      if (i >= firstDay && i < firstDay + numOfDays) {
        col = document.createElement('td');
        col.classList.add('valid-days');

        col.appendChild(document.createTextNode(day));

        col.addEventListener('click', () => {
          this.date = {
            ...this.date,
            day: day - 1,
          };
          // remove other selected class names
          col.classList.add('selected');

          // console.log(this.selectedDay);

          if (this.selectedDay) this.selectedDay.classList.remove('selected');
          this.selectedDay = col;

          this.callback(this.id, {
            ...this.date,
            day: day - 1,
          });
        });

        if (this.date.day === day) {
          col.classList.add('selected');
          this.selectedDay = col;
        }

        row.appendChild(col);
        day++;
      }

      if (i >= firstDay + numOfDays) {
        const day = i - (numOfDays + firstDay) + 1;
        col = document.createElement('td');
        col.setAttribute('class', 'dim');

        col.appendChild(document.createTextNode(day));
        row.appendChild(col);
      }

      if (i === limit - 1) {
        table.appendChild(row);
      }
    }

    return table;
  }

  onPrevClick() {
    this.date = {
      ...this.date,
      month: this.date.month === 1 ? 12 : this.date.month - 1,
      year: this.date.month === 1 ? this.date.year - 1 : this.date.year,
    };

    const dateElement = document.getElementById(this.id).lastChild;

    const table = this.generateMonthTable();
    dateElement.innerHTML = '';
    dateElement.appendChild(table);
    this.updateDate();
  }

  onNextClick() {
    this.date = {
      ...this.date,
      month: this.date.month === 12 ? 1 : this.date.month + 1,
      year: this.date.month === 12 ? this.date.year + 1 : this.date.year,
    };

    const dateElement = document.getElementById(this.id).lastChild;
    const table = this.generateMonthTable();
    dateElement.innerHTML = '';
    dateElement.appendChild(table);
    this.updateDate();
  }

  updateDate() {
    document.getElementById(this.id).children[1].innerHTML = `${
      this.months[this.date.month - 1]
    }, ${this.date.year}`;
  }
}

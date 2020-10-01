class TableTemplate {
  // id: table id,
  static fillIn(id, dict, columnName) {
    const tableElement = document.getElementById(id);

    for (let i = 0, row, parseColumn; (row = tableElement.rows[i]); i++) {
      for (let j = 0, cell; (cell = row.cells[j]); j++) {
        const text = cell.innerHTML;
        const temp = new Cs142TemplateProcessor(text);
        if (columnName) {
          if (i === 0) {
            if (dict[Object.keys(dict)[i + j]] === columnName) {
              parseColumn = j;
              // console.log(parseColumn);
            }
            cell.innerHTML = temp.fillIn(dict);
          }

          if (j === parseColumn) {
            cell.innerHTML = temp.fillIn(dict);
          }
        } else {
          cell.innerHTML = temp.fillIn(dict);
        }
      }
    }

    tableElement.style.visibility = 'visible';
  }
}

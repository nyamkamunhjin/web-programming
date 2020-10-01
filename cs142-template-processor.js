function Cs142TemplateProcessor(template) {
  this.template = template;
}

Cs142TemplateProcessor.prototype.fillIn = function (dictionary) {
  // console.log(dictionary);
  let newTemplate = this.template;
  Object.entries(dictionary).map(([key, value]) => {
    // console.log(key, value);
    newTemplate = newTemplate.replace(`{{${key}}}`, value);
  });
  // console.log(newTemplate);
  return newTemplate;
};
const test = new Cs142TemplateProcessor(
  'My favorite month is {{month}} but not the day {{day}} or the year {{year}}'
);
test.fillIn({ month: 'July', day: '1', year: '2016' });

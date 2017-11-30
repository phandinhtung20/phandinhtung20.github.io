var Excel = require('exceljs');
var workbook = new Excel.Workbook();

const headerColor=  { type: 'pattern',
                    pattern: 'solid',
                    fgColor: { argb: 'FF003333' },
                    bgColor: { argb: 'FF003300' }
                  };
const center = { vertical: 'middle', horizontal: 'center' };
const border= { top: {style:'thin'}, left: {style:'thin'}, bottom: {style:'thin'}, right: {style:'thin'}};

var week=5;

workbook.xlsx.readFile("form.xlsx")
  .then(function() {
    var sheet= workbook.getWorksheet('Sheet1');
    sheet.properties.defaultRowHeight = 15;
    let header = [
      { key: 'no', width: 5 },
      { key: 'project', width: 25 },
      { key: 'plan1', width: 10 },
      { key: 'actual1', width: 10 },
      { key: 'plan2', width: 10 },
      { key: 'actual2', width: 10 },
      { key: 'plan3', width: 10 },
      { key: 'actual3', width: 10 },
      { key: 'plan4', width: 10 },
      { key: 'actual4', width: 10 }
    ];

    if (week===5) header.push({ key: 'plan5', width: 10 }, { key: 'actual5', width: 10 });
    header.push({ key: 'note', width: 25 });

    sheet.columns= header;

    for (var i = 1; i <= sheet.rowCount; i++) {
      sheet.getRow(i).hidden= false;
    }

    if (week===5) {
      // Add 2 columns for week 5th
      sheet.getCell('K3').value= 6;
      // week
      sheet.mergeCells('K4:L4');
      console.log(sheet.getCell('I4').value+1);
      sheet.getCell('K4').value= sheet.getCell('I4').value + 1;
      // actual and plan
      sheet.getCell('K5').value= 'Plan';
      sheet.getCell('L5').value= 'Actual'
      // merge cell Note
      sheet.mergeCells('M3:M5');
      sheet.getCell('M3').value= 'Note';
      for (let i= 3; i<=5; i++){
        for (let j= 11; j<=13; j++){
          sheet.getRow(i).getCell(j).fill= headerColor;
          sheet.getRow(i).getCell(j).alignment= center;
          sheet.getRow(i).getCell(j).border= border;
        }
      }
    } else {
      // merge cell Note
      sheet.mergeCells('K3:K5');
      sheet.getCell('K3').value= 'Note';
      sheet.getCell('K3').fill= headerColor;
      sheet.getCell('K3').alignment= center;
      sheet.getCell('K3').border = border;
    }

    workbook.xlsx.writeFile("output2.xlsx")
    .then(function() {
      console.log("ok");
    });
  });

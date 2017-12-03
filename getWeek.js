var st="",
    count=1,
    year= 2017,
    month= 2,
    dom= new Date(year, month, 0).getDate(),
    begin= new Date(year, month-1, 1),
    end= new Date(year, month-1, dom);

if (begin.getDay()%6===0) begin.setDate(begin.getDay()%5+2);
console.log(""+begin);

while(begin<=end) {
  let dow=begin.getDay();
  begin.setDate(begin.getDate()+8-dow);
  if(begin>end) {
    if (end.getDay()%6===0) st+= count+": "+5;
    else st+= count+": "+(end.getDay()+1-begin.getDay());
  } else {
    st+= count+": "+(6-dow)+", ";
  }
  console.log(""+begin);
  count++;
}

console.log(st);

sheetToForm();

function sheetToForm() {
  /* 
  @desc - Opens the google sheet and reads the data, stores the details in range and category global params
          Updates the google form with the details from the forms
  @param -  sheetID-the web ID of the sheet to be read,
            activeSheet-the sheet to be used for reading the data

   **SET THESE 2 PARAMETERS, the sheetID and the activeSheet */

  var sheetID='1GmGdJs6gc76VtRX5YFmFwLTo0w0UOD0EIfVHBwLQPxM';
  var activeSheet='ActiveSheet';
  
  /* DO NOT SKIP ABOVE STEP */
  
  var sourcedata=SpreadsheetApp.openById(sheetID);
  var sheet = sourcedata.getSheetByName(activeSheet);
  let form = FormApp.getActiveForm();
  deleteFormQuestions(form);
  
  let ranges=sheet.getDataRange().getValues();
  let myUniqueTitleArr=[];
  for (i in ranges){
    let category=ranges[i][0];
    if (!myUniqueTitleArr.includes(category)){myUniqueTitleArr.push(category);}
  }

  let myNormalizedListArr=[];
  for (i in myUniqueTitleArr){
    let myValuesPerCategory=[];   
    for (j in ranges){
      if (ranges[j][0].includes(myUniqueTitleArr[i])){ myValuesPerCategory.push(ranges[j][1]);}
    }
     myNormalizedListArr.push(myValuesPerCategory);
  }
    var k=0;
    myUniqueTitleArr.forEach(function(e){
      var section = form.addPageBreakItem();
      var checkboxItem = form.addCheckboxItem();
      section.setTitle(e);
      checkboxItem.setTitle(e);
      checkboxItem.setChoiceValues(myNormalizedListArr[k]);
      k++;
    });
  
}

function deleteFormQuestions(form){
  var items = form.getItems();
  items.forEach(function(e){form.deleteItem(e)}) 
}


 

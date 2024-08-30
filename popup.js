document.getElementById('rr-form').addEventListener('submit', function (event) {
  event.preventDefault();
  let asins_textarea = document.getElementById('textarea_asin').value.trim().split('\n')
  console.log(asins_textarea);

  
  if (asins_textarea[0] !=="") {
console.log('hyyy');

    chrome.runtime.sendMessage({
      message: "urlData_textArea",
      data: asins_textarea
    })
  }

  else {
    console.log('yo');
    
    let asins_excel = document.getElementById('excel_asin')
    const file = asins_excel.files[0]
    if (file) {
      const reader = new FileReader();

      reader.onload = function (e) {
        try {
          console.log('hyy');
          const data = new Uint8Array(e.target.result);
          console.log(data);
          
          const workbook = XLSX.read(data, { type: 'array' });
          console.log(workbook);
          

          // Assuming the first sheet is the one you want to read
          const firstSheetName = workbook.SheetNames[0];
          const worksheet = workbook.Sheets[firstSheetName];
          console.log(workbook);
          

          // Convert the worksheet to JSON
          const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
          console.log(jsonData);

          chrome.runtime.sendMessage({
            message: "urlData_file",
            excel: jsonData
          })
        } catch (error) {
          console.error("Error reading file:", error);
        }
      };
      reader.onerror = function (ex) {
        console.error("File could not be read! Code " + ex.target.error.code);
      };
      reader.readAsArrayBuffer(file);

    }
  }
})
// "host_permissions": [
//   "https://www.amazon.com/*",
//   "https://www.amazon.in/*"
// ],
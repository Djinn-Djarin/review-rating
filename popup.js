document.getElementById('form-id-c8s').addEventListener('submit', function (event) {
  event.preventDefault();
  let textarea_id_65e_NS = document.getElementById('textarea_id_65e').value.trim().split('\n')
  console.log(textarea_id_65e_NS);


  if (textarea_id_65e_NS[0] !== "") {
    console.log('hyyy');

    chrome.runtime.sendMessage({
      message: "msg from popup", data: textarea_id_65e_NS
    })
  }

  else {
    console.log('yo');

    let asins_excel = document.getElementById('input_id_ii2')
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

          const firstSheetName = workbook.SheetNames[0];
          const worksheet = workbook.Sheets[firstSheetName];
          console.log(workbook);

          const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
          console.log(jsonData);

          chrome.runtime.sendMessage({
            data: jsonData,
            message: "msg from popup",
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
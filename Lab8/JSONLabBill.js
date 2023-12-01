function tableToJSON() {
    const headerRow = document.querySelector('#originalTable thead tr');
    const headerCells = headerRow.querySelectorAll('th');
    const columnNames = [];

    for (let i = 0; i < headerCells.length; i++) {
    const th = headerCells[i];
    columnNames.push(th.textContent);
    }

    const rows = document.querySelectorAll('#originalTable tbody tr');
    const items = [];
        
    rows.forEach((row) => {
        const columns = row.querySelectorAll('td');
        const item = {};
        
        columnNames.forEach((columnName, index) => {
            item[columnName] = columns[index].textContent;
        });
        
        items.push(item);
    });
    

    const totalRow = document.querySelector('#originalTable tfoot tr');
    const totalCells = totalRow.querySelectorAll('td');
    const Footitems = [];

    totalCells.forEach((cell) => {
        var totalValue = 1;
        const item = {};
        item["value"] = cell.textContent;
        if (cell.hasAttribute('colspan')) {
            totalValue = parseInt(cell.getAttribute('colspan'));
        }
        item["span"] = totalValue;
        Footitems.push(item); 
    });
    const jsonData = {
        Header: columnNames,
        Items: items,
        Footer: Footitems,
    };
    
    document.getElementById('displayTextarea').value = JSON.stringify(jsonData, null, 2);
}

function convert() {
    const jsonData = JSON.parse(document.getElementById('displayTextarea').value);
    const header = jsonData.Header;
    const items = jsonData.Items;
    const footer = jsonData.Footer;

    const table = document.createElement('table');
    const thead = document.createElement('thead');
    const tbody = document.createElement('tbody');
    const tfoot = document.createElement('tfoot');

    // Header row
    const headerRow = document.createElement('tr');
    header.forEach((element) => {
        const th = document.createElement('th');
        th.textContent = element;
        headerRow.appendChild(th);
    });
    thead.appendChild(headerRow);

    // Footer row
    const footerRow = document.createElement('tr');
    footer.forEach((element) => {
        const td = document.createElement('td');
        td.textContent = element.value;
        if (element.span) {
            td.setAttribute('colspan', element.span);
        }
        footerRow.appendChild(td);
    });
    tfoot.appendChild(footerRow);

    table.appendChild(thead);

    items.forEach((element) => {
        const tr = document.createElement('tr');
        header.forEach((headerElement) => {
            const td = document.createElement('td');
            td.textContent = element[headerElement];
            tr.appendChild(td);
        });
        tbody.appendChild(tr);
    });

    table.appendChild(tbody);
    table.appendChild(tfoot);

    const newTable = document.getElementById('newTable');
    newTable.innerHTML = '';
    newTable.appendChild(table);

    const trs = document.querySelectorAll('#newTable tr');
    trs.forEach((tr) => {
        tr.style.border = '1px solid black';
    });
    const tds = document.querySelectorAll('#newTable td');
    tds.forEach((td) => {
        td.style.border = '1px solid black';
    });
    const ths = document.querySelectorAll('#newTable th');
    ths.forEach((th) => {
        th.style.border = '1px solid black';
    });
}

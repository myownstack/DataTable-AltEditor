$(document).ready(function () {
    var columnDefs = [
        {
            data: "id",
            title: "ID",
            type: "readonly"
        },
        {
            data: "title",
            title: "Title"
        },
        {
            data: "author",
            title: "Author"
        }
    ];

    var wsUrlMock = 'http://localhost:3000/posts';

    var myTable = $('#myAwesomeTable').DataTable({
        "sPaginationType": "full_numbers",
        ajax: {
            url: wsUrlMock,
            // our data is an array of objects, in the root node instead of /data node, so we need 'dataSrc' parameter
            dataSrc: ''
        },
        columns: columnDefs,
        dom: 'Bfrtip',        // Needs button container
        select: 'single',
        responsive: false,
        altEditor: true,     // Enable altEditor
        buttons: [{
            text: 'Add',
            name: 'add'        // do not change name
        },
            {
                extend: 'selected', // Bind to Selected row
                text: 'Edit',
                name: 'edit'        // do not change name
            },
            {
                extend: 'selected', // Bind to Selected row
                text: 'Delete',
                name: 'delete'      // do not change name
            },
            {
                text: 'Refresh',
                name: 'refresh'      // do not change name
            }],
        onAddRow: function (datatable, rowdata, success, error) {
            $.ajax({
                // a typical url would be / with type='POST'
                url: wsUrlMock + "/",
                type: 'POST',
                data: rowdata,
                success: success,
                error: error,
                dataType: 'json',
            });
        },
        onDeleteRow: function (datatable, rowdata, success, error) {
            $.ajax({
                // a typical url would be /{id} with type='DELETE'
                url: wsUrlMock + "/" + rowdata.id,
                type: 'DELETE',
                data: rowdata,
                success: success,
                error: error,
                dataType: 'json',
            });
        },
        onEditRow: function (datatable, rowdata, success, error) {
            $.ajax({
                // a typical url would be /{id} with type='PUT'
                url: wsUrlMock + "/" + rowdata.id,
                type: 'PUT',
                data: rowdata,
                success: success,
                error: error,
                dataType: 'json',
            });
        }
    });
});

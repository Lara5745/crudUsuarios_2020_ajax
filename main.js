$(document).ready(function() {
    var IdUsuario, opcion;
    opcion = 4;

    tablaUsuarios = $('#tablaUsuarios').DataTable({
        "ajax": {
            "url": "bd/crud.php",
            "method": 'POST', //usamos el metodo POST
            "data": { opcion: opcion }, //enviamos opcion 4 para que haga un SELECT
            "dataSrc": ""
        },
        "columns": [ //Son las columnas que estan en la base de datos y seran mostradas en la tabla
            { "data": "IdUsuario" },
            { "data": "Expediente" },
            { "data": "NombreCompleto" },
            { "data": "Area" },
            // {
            //     data: null,
            //     render: function(data, type, row) {
            //         // Combine the first and last names into a single table field
            //         return data.IdUsuario + ' ' + data.Expediente;
            //     }
            // },
            { "data": "Usuario" },
            { "data": "Pwd" },
            { "data": "TipoCuenta" },
            { "defaultContent": "<div class='text-center'><div class='btn-group'><button class='btn btn-primary btn-sm btnEditar'><i class='material-icons'>edit</i></button><button class='btn btn-danger btn-sm btnBorrar'><i class='material-icons'>delete</i></button></div></div>" }
        ],
        //Para cambiar el lenguaje a español
        "language": {
            "lengthMenu": "Mostrar _MENU_ registros",
            "zeroRecords": "No se encontraron resultados",
            "info": "Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros",
            "infoEmpty": "Mostrando registros del 0 al 0 de un total de 0 registros",
            "infoFiltered": "(filtrado de un total de _MAX_ registros)",
            "sSearch": "Buscar:",
            "oPaginate": {
                "sFirst": "Primero",
                "sLast": "Último",
                "sNext": "Siguiente",
                "sPrevious": "Anterior"
            },
            "sProcessing": "Procesando...",
        }
    });

    var fila; //captura la fila, para editar o eliminar
    //submit para el Alta y Actualización
    $('#formUsuarios').submit(function(e) {
        e.preventDefault(); //evita el comportambiento normal del submit, es decir, recarga total de la página
        Expediente = $.trim($('#Expediente').val());
        NombreCompleto = $.trim($('#NombreCompleto').val());
        Area = $.trim($('#Area').val());
        Usuario = $.trim($('#Usuario').val());
        Pwd = $.trim($('#Pwd').val());
        TipoCuenta = $.trim($('#TipoCuenta').val());
        $.ajax({
            url: "bd/crud.php",
            type: "POST",
            datatype: "json",
            data: { IdUsuario: IdUsuario, Expediente: Expediente, NombreCompleto: NombreCompleto, Area: Area, Usuario: Usuario, Pwd: Pwd, TipoCuenta: TipoCuenta, opcion: opcion },
            success: function(data) {
                tablaUsuarios.ajax.reload(null, false);
            }
        });
        $('#modalCRUD').modal('hide');
    });



    //para limpiar los campos antes de dar de Alta una Persona
    $("#btnNuevo").click(function() {
        opcion = 1; //alta           
        IdUsuario = null;
        $("#formUsuarios").trigger("reset");
        $(".modal-header").css("background-color", "#17a2b8");
        $(".modal-header").css("color", "white");
        $(".modal-title").text("Alta de Usuario");
        $('#modalCRUD').modal('show');
    });

    //Editar        
    $(document).on("click", ".btnEditar", function() {
        opcion = 2; //editar
        fila = $(this).closest("tr");
        IdUsuario = parseInt(fila.find('td:eq(0)').text()); //capturo el ID		            
        Expediente = fila.find('td:eq(1)').text();
        NombreCompleto = fila.find('td:eq(2)').text();
        Area = fila.find('td:eq(3)').text();
        Usuario = fila.find('td:eq(4)').text();
        Pwd = fila.find('td:eq(5)').text();
        TipoCuenta = fila.find('td:eq(6)').text();
        $("#Expediente").val(Expediente);
        $("#NombreCompleto").val(NombreCompleto);
        $("#Area").val(Area);
        $("#Usuario").val(Usuario);
        $("#Pwd").val(Pwd);
        $("#TipoCuenta").val(TipoCuenta);
        $(".modal-header").css("background-color", "#007bff");
        $(".modal-header").css("color", "white");
        $(".modal-title").text("Editar Usuario");
        $('#modalCRUD').modal('show');
    });

    //Borrar
    $(document).on("click", ".btnBorrar", function() {
        fila = $(this);
        IdUsuario = parseInt($(this).closest('tr').find('td:eq(0)').text());
        opcion = 3; //eliminar        
        var respuesta = confirm("¿Está seguro de borrar el registro " + IdUsuario + "?");
        if (respuesta) {
            $.ajax({
                url: "bd/crud.php",
                type: "POST",
                datatype: "json",
                data: { opcion: opcion, IdUsuario: IdUsuario },
                success: function() {
                    tablaUsuarios.row(fila.parents('tr')).remove().draw();
                }
            });
        }
    });

});
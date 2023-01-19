document.querySelector('#btn_add').addEventListener('click', function(){
    var row = document.querySelectorAll('span.formclase')[0];
    var nodo = row.cloneNode(true);
    document.querySelector('span.formclases').append(nodo);
    //Vaciar el texto de materia una vez copiado para que quede vacio
    document.querySelectorAll('span.formclase')[document.querySelectorAll('span.formclase').length - 1].querySelector('#val_materia').value = '';
})


document.querySelector('#btn_generar').addEventListener('click', function(e){
    e.preventDefault();
    validarForm();
})

function validarForm(){
    var error = false;
    //Validar que se ha seleccionado un día para todas las materias
    var dias = [...document.querySelectorAll('#diaclase')]
    dias.every(el => {
        if(el.value == ''){
            document.querySelector('p.error-msg').innerHTML = 'Selecciona un día para todas tus clases'
            document.querySelector('p.error-msg').style.color = '#A50011';
            error = true;
            return false;
        }
        document.querySelector('p.error-msg').innerHTML = ''
        error = false;
        return true;
    })

    //Validar que todas las clases tengan hora de inicio
    if(error == false){
        var inicios = [...document.querySelectorAll('#hora-inicio')]
        inicios.every(el => {
            if(el.value == ''){
                document.querySelector('p.error-msg').innerHTML = 'Selecciona una hora de inicio para todas tus clases'
                document.querySelector('p.error-msg').style.color = '#A50011';
                error = true;
                return false;
            }
            document.querySelector('p.error-msg').innerHTML = ''
            error = false;
            return true;
        })
    }

    //Validar que todas las clases tengan hora de fin
    if(error == false){
        var finales = [...document.querySelectorAll('#hora-final')]
        finales.every(el => {
            if(el.value == ''){
                document.querySelector('p.error-msg').innerHTML = 'Selecciona una hora de fin para todas tus clases'
                document.querySelector('p.error-msg').style.color = '#A50011';
                error = true;
                return false;
            }
            document.querySelector('p.error-msg').innerHTML = ''
            error = false;
            return true;
        })
    }

    //Validar que las horas de fin sean mayores a las de inicio
    if(error == false){
        var horas_inicio = [...document.querySelectorAll('span.formclase')]
        horas_inicio.every(input => {
            var inc_sel = input.querySelector('#hora-inicio')
            var inc_val = inc_sel.options[inc_sel.selectedIndex].text
            inc_val = inc_val.split(':')

            var fin_sel = input.querySelector('#hora-final')
            var fin_val = fin_sel.options[fin_sel.selectedIndex].text
            fin_val = fin_val.split(':')
            
            var hora_inicio = new Date('2000','11','9',inc_val[0],inc_val[1])
            var hora_final = new Date('2000','11','9',fin_val[0],fin_val[1])

            var time_diff = hora_final.getTime() - hora_inicio.getTime()

            if(time_diff < 0 || time_diff == 0){
                document.querySelector('p.error-msg').innerHTML = 'Las horas de fin de clase deben ser mayores a las de inicio'
                document.querySelector('p.error-msg').style.color = '#A50011';
                error = true;
                return false;
            }
        
            document.querySelector('p.error-msg').innerHTML = ''
            error = false;
            return true;
        })
    }

    //Validar que todas las sesiones de clase tengan una materia
    if(error == false){
        var finales = [...document.querySelectorAll('#val_materia')]
        finales.every(el => {
            if(el.value.length < 2){
                document.querySelector('p.error-msg').innerHTML = 'Todas las sesiones de clase deben tener un nombre de materia'
                document.querySelector('p.error-msg').style.color = '#A50011';
                error = true;
                return false;
            }
            document.querySelector('p.error-msg').innerHTML = ''
            error = false;
            return true;
        })
    }

    if(error == false){
        generarHorario()
    }
}

function generarHorario(){
    console.log("JOM")
    //Crear los objetos Date con las horas
    var hora_min = new Date('2000','11','09','07','00')
    var hora_max = new Date('2000','11','09','22','00')

    //Crear la tabla
    var valores_tiempo = ['07:00','08:00','09:00','10:00','11:00','12:00','13:00','14:00','15:00','16:00','17:00','18:00','19:00','20:00','21:00','22:00']

    var tablebody = document.querySelector('.fila-contenido')

    tablebody.innerHTML = ''

    //Crear las filas con las horas de menor a mayor
    var cant_filas = 0;

    for(let loop = hora_min; loop <= hora_max; loop.setMinutes(loop.getMinutes() + 60)){
        cant_filas += 1;
        var hora_string = String(loop.getHours()).padStart(2,"0") + ':' + String(loop.getMinutes()).padStart(2,"0")
        var pos = valores_tiempo.indexOf(hora_string)

        var celda_hora = document.createElement("p")
        celda_hora.setAttribute("id",pos)
        celda_hora.setAttribute("class","hora-cell")
        celda_hora.style.gridRowStart = pos + 1
        celda_hora.innerText = hora_string
        tablebody.append(celda_hora)
        
        var celda_lu = document.createElement("p")
        celda_lu.setAttribute("id", 'lu-'+ pos +'')
        celda_lu.setAttribute("class", "class-cell")
        tablebody.appendChild(celda_lu)

        var celda_ma = document.createElement("p")
        celda_ma.setAttribute("id", 'ma-'+ pos +'')
        celda_ma.setAttribute("class", "class-cell")
        tablebody.appendChild(celda_ma)

        var celda_mi = document.createElement("p")
        celda_mi.setAttribute("id", 'mi-'+ pos +'')
        celda_mi.setAttribute("class", "class-cell")
        tablebody.appendChild(celda_mi)

        var celda_ju = document.createElement("p")
        celda_ju.setAttribute("id", 'ju-'+ pos +'')
        celda_ju.setAttribute("class", "class-cell")
        tablebody.appendChild(celda_ju)

        var celda_vi = document.createElement("p")
        celda_vi.setAttribute("id", 'vi-'+ pos +'')
        celda_vi.setAttribute("class", "class-cell")
        tablebody.appendChild(celda_vi)

        var celda_sa = document.createElement("p")
        celda_sa.setAttribute("id", 'sa-'+ pos +'')
        celda_sa.setAttribute("class", "class-cell")
        tablebody.appendChild(celda_sa)

    }

    //Poner las filas necesarias
    document.querySelector('.fila-contenido').style.gridTemplateRows = 'repeat('+ cant_filas +',50px)'

    //Arreglo de clases para asignar colores
    var materias = []
    document.querySelectorAll('#val_materia').forEach(m => {
        materias.push(m.value)
    })

    materias = [...new Set(materias)]

    //Agregar las sesiones a su hora
    var filas_clases = [...document.querySelectorAll('span.formclase')]

    var celdas_del = 0

    filas_clases.forEach(clase => {
        var inicio = clase.querySelector('#hora-inicio')
        inicio = inicio.options[inicio.selectedIndex].text
        inicio = inicio.split(':')

        var final = clase.querySelector('#hora-final')
        final = final.options[final.selectedIndex].text
        final = final.split(':')

        var hora_inicio = new Date('2000','11','9',inicio[0],inicio[1])
        var hora_fin = new Date('2000','11','9',final[0],final[1])

        var duracion = (hora_fin.getTime() - hora_inicio.getTime()) / 1000
        duracion /= (60 * 60);
        duracion = Math.abs(Math.round(duracion))

        //Ubicar la hora de inicio de clase
        hora_inicio = String(hora_inicio.getHours()).padStart(2,"0") + ':' + String(hora_inicio.getMinutes()).padStart(2,"0")
        
        var pos_inicio = valores_tiempo.indexOf(hora_inicio).toString()

        //Ubicar la columna según el día seleccionado
        var dia = clase.querySelector('#diaclase')
        dia = dia.options[dia.selectedIndex].text

        var valores_dias = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado']

        var dia_index = valores_dias.indexOf(dia)

        //Conv a minusculas y extrar primeras 2 letras para id de celda
        dia = dia.toString().toLowerCase()
        dia = dia.substring(0,2)

        var id_celda = dia + '-' + pos_inicio

        //Ubicar celda segun dia y hora de inicio
        var celda = document.querySelector('p[id="'+ id_celda +'"]')

        //Obtener nombre de materia
        var nombre = clase.querySelector('#val_materia').value
        celda.innerHTML = nombre
        var materia_id = materias.indexOf(nombre)
        celda.setAttribute('data-materiaid', materia_id);

        //Acomodar en el Grid
        //Columna segun el día
        var columna_grid = dia_index + 2
        celda.style.gridColumnStart = columna_grid

        //Fila de inicio segun hora
        var fila_grid = parseInt(pos_inicio) + 1

        //Span en filas segun duracion
        var span_rows = fila_grid + duracion

        var val_grid = fila_grid.toString() + ' / ' + span_rows.toString()

        celda.style.gridRow = val_grid

        if(duracion > 1){
            celdas_del = celdas_del + (Math.abs(1-duracion))
        }

    })

    //Eliminar celdas vacias para evitar overflow
    var celdas_tot = cant_filas * 6
    celdas_del = celdas_tot - celdas_del

    var els = document.querySelectorAll('.class-cell')

    els.forEach(el =>{
        var cant_elementos = document.querySelectorAll('.class-cell').length
        if(el.innerText.length == 0 && cant_elementos > celdas_del){
            el.remove()
        }
    })

    //Asignar colores
    var colores = ['#6B0F1A', '#0E79B2', '#364935', '#E98A15', '#00272B', '#373F51', '#2191FB', '#BA274A', '#EF8354', '#CB793A']
    document.querySelectorAll('p[data-materiaid]').forEach(materia => {
        var id = parseInt(materia.dataset.materiaid)
        console.log(id)
        var color = colores[id]
        materia.style.backgroundColor = color
    })

    //Mostrar la tabla
    document.querySelector('.vistaprevia').style.display = 'flex'

    //Generar screenshot de tabla
    var resultado_final = document.querySelector('#horario-resultado')
    html2canvas(resultado_final).then(function(canvas){
        var uri = canvas.toDataURL()

        var link = document.querySelector('#download-btn')
        link.href = uri
        link.download = 'horario.png'
    })
}

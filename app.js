// URL de la API

const URL = "https://apidemo.geoeducacion.com.ar/api/testing/encuesta/1";



// Función para obtener estudiantes

async function obtenerEstudiantes() {

    try {

        const respuesta = await fetch(URL);

        const datos = await respuesta.json();

        const estudiantes = datos.data;





        // TABLA PRINCIPAL

        const tabla = document.getElementById("tablaEstudiantes");





        let sumaEdades = 0;

        let cantAlumnos = 0;

        let edades = [];





        estudiantes.forEach(estudiante => {

            sumaEdades = sumaEdades + estudiante.Edad;

            cantAlumnos++;

            edades.push(estudiante.Edad);





            const fila = document.createElement("tr");





            fila.innerHTML = `

                <td>${estudiante.nombre} ${estudiante.apellido}</td>

                <td>${estudiante.Edad}</td>

                <td>${estudiante.curso}</td>

                <td>${estudiante.nivel}</td>

            `;





            tabla.appendChild(fila);

        });





        // =========================
        // TABLA DE FRECUENCIA NIVELES
        // =========================

        let frecuenciasNivel = {};





        estudiantes.forEach(estudiante => {

            if (frecuenciasNivel[estudiante.nivel]) {

                frecuenciasNivel[estudiante.nivel]++;

            } else {

                frecuenciasNivel[estudiante.nivel] = 1;

            }

        });





        let acumuladaNivel = 0;





        const tablaFrecuenciaNiveles =
            document.getElementById("tablaFrecuenciaNiveles");





        for (let nivel in frecuenciasNivel) {

            acumuladaNivel += frecuenciasNivel[nivel];





            let relativa =
                (frecuenciasNivel[nivel] / estudiantes.length * 100).toFixed(2);





            const fila = document.createElement("tr");





            fila.innerHTML = `

                <td>${nivel}</td>

                <td>${frecuenciasNivel[nivel]}</td>

                <td>${acumuladaNivel}</td>

                <td>${relativa}%</td>

            `;





            tablaFrecuenciaNiveles.appendChild(fila);

        }





        // =========================
        // TABLA DE FRECUENCIA CURSOS
        // =========================

        let frecuenciasCurso = {};





        estudiantes.forEach(estudiante => {

            if (estudiante.nivel === "Secundario") {

                if (frecuenciasCurso[estudiante.curso]) {

                    frecuenciasCurso[estudiante.curso]++;

                } else {

                    frecuenciasCurso[estudiante.curso] = 1;

                }

            }

        });





        let acumuladaCurso = 0;





        const tablaFrecuenciaCursos =
            document.getElementById("tablaFrecuenciaCursos");





        for (let curso in frecuenciasCurso) {

            acumuladaCurso += frecuenciasCurso[curso];





            let relativa =
                (frecuenciasCurso[curso] / estudiantes.length * 100).toFixed(2);





            const fila = document.createElement("tr");





            fila.innerHTML = `

                <td>${curso}</td>

                <td>${frecuenciasCurso[curso]}</td>

                <td>${acumuladaCurso}</td>

                <td>${relativa}%</td>

            `;





            tablaFrecuenciaCursos.appendChild(fila);

        }





        // =========================
        // ESTADISTICOS
        // =========================

        let promedioEdades = sumaEdades / cantAlumnos;





        // ORDENAR EDADES

        edades.sort((a, b) => a - b);





        // MEDIANA

        let mediana = 0;





        if (edades.length % 2 === 0) {

            mediana =
                (edades[edades.length / 2 - 1] +
                    edades[edades.length / 2]) / 2;

        } else {

            mediana = edades[Math.floor(edades.length / 2)];

        }





        // MAXIMO Y MINIMO

        let maximo = Math.max(...edades);

        let minimo = Math.min(...edades);





        // CUARTILES

        let primerCuartil =
            edades[Math.floor(edades.length * 0.25)];





        let segundoCuartil = mediana;





        // DESVIO ESTANDAR

        let sumaCuadrados = 0;





        edades.forEach(edad => {

            sumaCuadrados =
                sumaCuadrados + Math.pow(edad - promedioEdades, 2);

        });





        let desvioEstandar =
            Math.sqrt(sumaCuadrados / edades.length);





        // TABLA ESTADISTICOS

        const tablaEstadisticos =
            document.getElementById("tablaEstadisticos");





        const filaEstadisticos =
            document.createElement("tr");





        filaEstadisticos.innerHTML = `

            <td>${promedioEdades.toFixed(2)}</td>

            <td>${mediana}</td>

            <td>${maximo}</td>

            <td>${minimo}</td>

            <td>${primerCuartil}</td>

            <td>${segundoCuartil}</td>

            <td>${desvioEstandar.toFixed(2)}</td>

        `;





        tablaEstadisticos.appendChild(filaEstadisticos);

    } catch (error) {

        console.log("Error al obtener estudiantes:", error);

    }

}





obtenerEstudiantes();
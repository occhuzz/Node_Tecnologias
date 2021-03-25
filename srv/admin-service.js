const cds = require("@sap/cds");
const { Tecnologias, Listado_Tecnologias } = cds.entities;

module.exports = cds.service.impl(async (srv)=>
{
    srv.after('CREATE','Proyectos', async (data,req) =>
    
    /*Ingresar en la URL los ID de la tecnologia [0-9], las dificultades [1,3,5]. Ejemplo:
    'Proyectos?Tecnologias=1234,3135':
    ID Tecnologia: 1, Dificultad 3
    ID Tecnologia: 2, Dificultad 1
    ID Tecnologia: 3, Dificultad 3
    ID Tecnologia: 4, Dificultad 5
    */
    
    {
        const { ID } = data;

        let textoURL = (req._.req.query.Tecnologias);   //Se obtienen los datos del URL
        let splitURL = textoURL.split(","); //Se dividen en 2 arrays
        let arrayTabla = [];
        let valor;
        
        try
        {
            for (let i = 0; i < splitURL[0].length; i++) //For por cada tecnologia
            {
                valor = splitURL[1][i]; //Se guarda el valor de la dificultad
                if(valor == 1 || valor == 3 || valor == 5) //Comprobar dificultad correcta (1,3,5)
                {
                    await cds.run(UPDATE(Tecnologias).set({dificultad: valor}).where({ ID : splitURL[0][i]}));//Update de Dificultad a la Tecnologia
                    
                    arrayTabla.push //Push al array para insertar en la tabla
                    ({
                        proyecto_ID : ID,
                        tecnologia_ID : splitURL[0][i]
                    });
                }
            }

            await cds.run(INSERT.into (Listado_Tecnologias).entries(arrayTabla));   //Insert a la tabla
            
            return "Asignación realizada correctamente.";
        }
        catch(err)
        {
            console.log(err);
            return "Ocurrió un error al asignar tecnologias a un Proyecto";
        };
    });
});
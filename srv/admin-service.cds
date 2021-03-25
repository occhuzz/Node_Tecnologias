using { miEmpresa as my } from '../db/schema';

service ApiService @(_requires:'authenticated-user')
{
    entity Proyectos as projection on my.Proyectos;
    entity Tecnologias as select from my.Tecnologias
    {
        *,
    } where dificultad <> 'null';

    entity Listado_Tecnologias as select from my.Listado_Tecnologias
    {
        *,
        tecnologia.nombre as nombre,
        tecnologia.dificultad as dificultad,
        (tecnologia.precio * tecnologia.dificultad) as precio_subtotal: Integer,
        (tecnologia.tiempo * tecnologia.dificultad) as horas_subtotal: Integer
    } order by nombre;
    
    entity VistaFactura as select from Listado_Tecnologias
    {
        proyecto.cliente,
        sum(dificultad) as dificultad_total : Integer,
        sum(precio_subtotal) as precio_total : Integer,
        sum(horas_subtotal) as horas_total : Integer,
    };
}
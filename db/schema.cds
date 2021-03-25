using { cuid } from '@sap/cds/common';
namespace miEmpresa;

entity Proyectos
{
    key ID : Integer;
    cliente : String(50);
    tecnologia: Association to many Listado_Tecnologias on tecnologia.proyecto =$self;
}

entity Tecnologias
{
    key ID : Integer;
    nombre : String(50);
    proyecto : Association to many Listado_Tecnologias on proyecto.tecnologia =$self;
    dificultad : Integer enum
    {
        baja = 1;
        media = 3;
        alta = 5;
    };
    precio : Integer;
    tiempo : Integer;
}

entity Listado_Tecnologias : cuid
{
    key proyecto  : Association to Proyectos;
    key tecnologia  : Association to Tecnologias;
}
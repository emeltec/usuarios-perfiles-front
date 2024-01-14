export interface PerfilOpcionDto {
  id_modulo:         number;
  id_perfil:         number;
  id_opcion:         number;
  modulo_titulo:     string;
  opcion_titulo:     string;
  opcion_url:        string;
  nombre_perfil:     string;

  acceso_visualizar: boolean;
  acceso_crear:      boolean;
  acceso_actualizar: boolean;
  acceso_eliminar:   boolean;

  pageNum:           null;
  pageSize:          null;
  totalRecord:       null;
  totalPage:         null;
  startIndex:        null;
  sort:              null;
}

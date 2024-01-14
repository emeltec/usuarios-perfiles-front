import { environment } from "src/environments/environment";

const URL_BASE = environment.urlBase;


export const ENDPOINTS = {
    POST_LISTAR_PERFILES: `${URL_BASE}/Perfil/GetListPerfil`,
    POST_LISTAR_PERFIL_OPCION_NUEVO: `${URL_BASE}/Perfil/GetListPerfilOpcionNuevo`,
    POST_LISTAR_PERMISOS: `${URL_BASE}/Perfil/GetListPerfilOpcion`,
    POST_REGISTRAR_PERFIL_OPCION: `${URL_BASE}/Perfil/RegisterPerfilOpcion`,
}
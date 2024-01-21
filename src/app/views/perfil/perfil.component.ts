import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { map } from 'rxjs/operators'

import { PerfilOpcionDto } from './perfil-opcion.dto';
import { ENDPOINTS } from 'src/app/config/endpoints';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  showDialog:boolean = false; 

  perfiles:any[] = [];
  perfilOpciones:PerfilOpcionDto[] = [];

  req = {
    id_perfil: 0,
    nombre_perfil: "",
    descripcion_perfil: "",
    estado_registro: -1
  }

  constructor(
    private http: HttpClient
  ) { }

  ngOnInit() {
    this.listarPerfiles();
  }

  listarPerfiles() {
    this.http.post(ENDPOINTS.POST_LISTAR_PERFILES, this.req).subscribe((res:any) => {
      console.log(res)
      this.perfiles = res.data;
    })
  }

  nuevoPerfil() {
    this.showDialog = true;
    this.http.post(ENDPOINTS.POST_LISTAR_PERFIL_OPCION_NUEVO, {id_perfil: -1}).pipe(
      // map((res:any) => {
      //   return {
      //     ...res,
      //     data: res.data?.map((x:any) => {
      //       return {
      //         ...x,
      //         acceso_actualizar: x.acceso_actualizar == 1 ? true: false,
      //         acceso_crear: x.acceso_crear == 1 ? true: false,
      //         acceso_eliminar: x.acceso_eliminar == 1 ? true: false,
      //         acceso_visualizar: x.acceso_visualizar == 1 ? true: false
      //       }
      //     })
      //   }
      // })
    ).subscribe((res:any)=> {
      this.perfilOpciones = res.data
    })
  }

  editarPerfil(data:any) {
    this.showDialog = true;
    this.listarPermisos(data)
  }

  listarPermisos(data:any) {
    this.http.post(ENDPOINTS.POST_LISTAR_PERMISOS, {id_perfil: data.id_perfil}).pipe(
      map((res:any) => {
        return {
          ...res,
          data: res.data?.map((x:any) => {
            return {
              ...x,
              acceso_actualizar: x.acceso_actualizar == 1 ? true: false,
              acceso_crear: x.acceso_crear == 1 ? true: false,
              acceso_eliminar: x.acceso_eliminar == 1 ? true: false,
              acceso_visualizar: x.acceso_visualizar == 1 ? true: false
            }
          })
        }
      })
    ).subscribe((res:any)=> {
      this.perfilOpciones = res.data
    })
  }

  savePerfil() {
    // console.log(this.perfilOpciones)
    let list = this.perfilOpciones.map(item => {
      return {
        ...item,
        acceso_actualizar: (item.acceso_actualizar == true ? 1 : 0),
        acceso_crear: (item.acceso_crear == true ? 1 : 0),
        acceso_eliminar: (item.acceso_eliminar == true ? 1 : 0),
        acceso_visualizar: (item.acceso_visualizar == true ? 1 : 0),
      }
    })

    const req = {
      perfil: {
        id_perfil:1,
        nombre_perfil:'Admin',
        descripcion_perfil:'Admin',
        estado_registro:1
      },
      perfilOpcion: list
    }

    this.http.post(ENDPOINTS.POST_REGISTRAR_PERFIL_OPCION, req).subscribe(res => {
      console.log(res);
    })
  }

  selectCheck(event:any) {
    console.log(event)
  }

  cancelDialog(){
    this.showDialog = false;
  }

}

import type { ILoginType } from './login/types'
import type { ISystemType } from './main/system/types'
import type { IDashBoardType } from './main/analysis/types'

export interface IRootType {
  entireDepartment: any[]
  entireRole: any[]
  entireMenu: any[]
}

export interface IRootWithModule {
  login: ILoginType
  system: ISystemType
  dashboard: IDashBoardType
}

export type IStoreType = IRootType & IRootWithModule

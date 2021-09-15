export type NullableType<MT> = null | MT

type PropertiesType<T> = T extends {[key: string]: infer U} ? U : never

export type ActionsType<T extends {[key: string]: (...arg: any[]) => any} > = ReturnType<PropertiesType<T>>
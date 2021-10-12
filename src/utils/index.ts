import { format } from 'date-fns'

export const groupBy = function (collection: any) {
  return collection.reduce(
    (entryMap: { set: (arg0: any, arg1: any[]) => any; get: (arg0: any) => any; }, e: any) => entryMap.set(e, [...entryMap.get(e) || [], e]),
    new Map()
  )
}

export const formatTimeStamp = (timestamp: string) => {
  return format(new Date(Number(timestamp)), 'HH:mm:ss.SSS');
}
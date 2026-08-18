export const RECORD_TYPES = ['red-flag', 'intervention']
export const RECORD_STATUSES = ['pending','under-investigation','rejected','resolved']

export function defaultRecord(){
  return {
    id: '',
    title: '',
    description: '',
    type: '',
    status: 'pending',
    latitude: '',
    longitude: '',
    createdBy: '',
    createdAt: ''
  }
}

export default { RECORD_TYPES, RECORD_STATUSES, defaultRecord }

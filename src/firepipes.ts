import { HasChildrenPipe } from './terminals/has_children_pipe'
import { IsExistPipe } from './terminals/is_exist_pipe'
import { NumChildrenPipe } from './terminals/num_children_pipe'
import { OnValuePipe } from './terminals/on_value_pipe'
import { ToArrayPipe } from './terminals/to_array_pipe'
import { ToObjectPipe } from './terminals/to_object_pipe'

export { AssignLocal } from './assign_local'
export { HasChildrenPipe } from './terminals/has_children_pipe'
export { IsExistPipe } from './terminals/is_exist_pipe'
export { NumChildrenPipe } from './terminals/num_children_pipe'
export { OnValuePipe } from './terminals/on_value_pipe'
export { ToArrayPipe } from './terminals/to_array_pipe'
export { ToObjectPipe } from './terminals/to_object_pipe'

export const FIREBASE_PIPES = [
  HasChildrenPipe,
  IsExistPipe,
  NumChildrenPipe,
  OnValuePipe,
  ToArrayPipe,
  ToObjectPipe,
];

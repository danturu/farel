import { HasChildrenPipe } from './terminals/has_children_pipe'
import { IsExistPipe } from './terminals/is_exist_pipe'
import { NumChildrenPipe } from './terminals/num_children_pipe'
import { ToArrayPipe } from './terminals/to_array_pipe'
import { ToObjectPipe } from './terminals/to_object_pipe'

import { ChildPipe } from './queries/child_pipe'
import { EndAtPipe } from './queries/end_at_pipe'
import { EqualToPipe } from './queries/equal_to_pipe'
import { LimitToFirstPipe } from './queries/limit_to_first_pipe'
import { LimitToLastPipe } from './queries/limit_to_last_pipe'
import { OrderByChildPipe } from './queries/order_by_child_pipe'
import { OrderByKeyPipe } from './queries/order_by_key_pipe'
import { OrderByPriorityPipe } from './queries/order_by_priority_pipe'
import { OrderByValuePipe } from './queries/order_by_value_pipe'
import { StartAtPipe } from './queries/start_at_pipe'

export { AssignLocal } from './assign_local'

export { HasChildrenPipe } from './terminals/has_children_pipe'
export { IsExistPipe } from './terminals/is_exist_pipe'
export { NumChildrenPipe } from './terminals/num_children_pipe'
export { ToArrayPipe } from './terminals/to_array_pipe'
export { ToObjectPipe } from './terminals/to_object_pipe'

export { ChildPipe } from './queries/child_pipe'
export { EndAtPipe } from './queries/end_at_pipe'
export { EqualToPipe } from './queries/equal_to_pipe'
export { LimitToFirstPipe } from './queries/limit_to_first_pipe'
export { LimitToLastPipe } from './queries/limit_to_last_pipe'
export { OrderByChildPipe } from './queries/order_by_child_pipe'
export { OrderByKeyPipe } from './queries/order_by_key_pipe'
export { OrderByPriorityPipe } from './queries/order_by_priority_pipe'
export { OrderByValuePipe } from './queries/order_by_value_pipe'
export { StartAtPipe } from './queries/start_at_pipe'

export const FIREBASE_PIPES = [
  HasChildrenPipe,
  IsExistPipe,
  NumChildrenPipe,
  ToArrayPipe,
  ToObjectPipe,

  ChildPipe,
  EndAtPipe,
  EqualToPipe,
  LimitToFirstPipe,
  LimitToLastPipe,
  OrderByChildPipe,
  OrderByKeyPipe,
  OrderByPriorityPipe,
  OrderByValuePipe,
  StartAtPipe,
]

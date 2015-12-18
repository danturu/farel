import { ChildPipe } from './pipes/queries/child_pipe';
import { EndAtPipe } from './pipes/queries/end_at_pipe';
import { EqualToPipe } from './pipes/queries/equal_to_pipe';
import { LimitToFirstPipe } from './pipes/queries/limit_to_first_pipe';
import { LimitToLastPipe } from './pipes/queries/limit_to_last_pipe';
import { OrderByChildPipe } from './pipes/queries/order_by_child_pipe';
import { OrderByKeyPipe } from './pipes/queries/order_by_key_pipe';
import { OrderByPriorityPipe } from './pipes/queries/order_by_priority_pipe';
import { OrderByValuePipe } from './pipes/queries/order_by_value_pipe';
import { StartAtPipe } from './pipes/queries/start_at_pipe';
import { ToArrayPipe } from './pipes/terminals/to_array_pipe';
import { ToObjectPipe } from './pipes/terminals/to_object_pipe';

export { ChildPipe } from './pipes/queries/child_pipe';
export { EndAtPipe } from './pipes/queries/end_at_pipe';
export { EqualToPipe } from './pipes/queries/equal_to_pipe';
export { LimitToFirstPipe } from './pipes/queries/limit_to_first_pipe';
export { LimitToLastPipe } from './pipes/queries/limit_to_last_pipe';
export { OrderByChildPipe } from './pipes/queries/order_by_child_pipe';
export { OrderByKeyPipe } from './pipes/queries/order_by_key_pipe';
export { OrderByPriorityPipe } from './pipes/queries/order_by_priority_pipe';
export { OrderByValuePipe } from './pipes/queries/order_by_value_pipe';
export { StartAtPipe } from './pipes/queries/start_at_pipe';
export { ToArrayPipe } from './pipes/terminals/to_array_pipe';
export { ToObjectPipe } from './pipes/terminals/to_object_pipe';

export const FAREL_PIPES = [
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
  ToArrayPipe,
  ToObjectPipe,
];

import { Query } from './directives/query';
export { Query } from './directives/query';

export const FAREL_DIRECTIVES = [
  Query,
];

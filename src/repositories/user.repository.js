import { BaseRepository } from '#src/common/base/base.repository';
import { User } from '#models/user.model';

export class UserRepository extends BaseRepository {
  constructor() {
    super(User);
  }
}

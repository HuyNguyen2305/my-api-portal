import { BaseRepository } from '#src/common/base/base.repository';
import { Product } from '#models/product.model';

export class ProductRepository extends BaseRepository {
  constructor() {
    super(Product);
  }
}

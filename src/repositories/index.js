import { REPOSITORY_KEYS } from '#constants/singleton';
import { registerSingleton } from '#src/container';
import { UserRepository } from '#repositories/user.repository';
import { ProductRepository } from '#repositories/product.repository';

registerSingleton(REPOSITORY_KEYS.USER, UserRepository);
registerSingleton(REPOSITORY_KEYS.PRODUCT, ProductRepository);

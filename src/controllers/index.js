import { CONTROLLER_KEYS } from '#constants/singleton';
import { registerSingleton } from '#src/container';
import { UserController } from '#controllers/user.controller';
import { ProductController } from '#controllers/product.controller';

registerSingleton(CONTROLLER_KEYS.USER, UserController);
registerSingleton(CONTROLLER_KEYS.PRODUCT, ProductController);

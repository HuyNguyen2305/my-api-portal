import { SERVICE_KEYS } from '#constants/singleton';
import { registerSingleton } from '#src/container';
import { UserService } from '#services/user.service';
import { ProductService } from '#services/product.service';

registerSingleton(SERVICE_KEYS.USER, UserService);
registerSingleton(SERVICE_KEYS.PRODUCT, ProductService);

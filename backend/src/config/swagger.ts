import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';
import path from 'path';
import { Router } from 'express';

const router = Router();

// Carrega o arquivo swagger.yaml
const swaggerDocument = YAML.load(path.join(__dirname, '../../swagger.yaml'));

// Configurações customizadas do Swagger UI
const options = {
  customCss: '.swagger-ui .topbar { display: none }',
  customSiteTitle: 'Image Generator API - Documentação',
  swaggerOptions: {
    persistAuthorization: true,
    displayRequestDuration: true,
    filter: true,
    showRequestHeaders: true,
    showResponseHeaders: true,
  },
};

// Configura as rotas do Swagger
router.use('/', swaggerUi.serve);
router.get('/', swaggerUi.setup(swaggerDocument, options));

export default router;
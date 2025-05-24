import swaggerJsdoc from 'swagger-jsdoc';

export const swaggerSpec = swaggerJsdoc({
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'EL OSITO FELIZ API',
      version: '1.0.0',
      description: 'Documentación interactiva de la API de EL OSITO FELIZ',
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Servidor de desarrollo',
      },
    ],
    components: {
      schemas: {
        Cliente: {
          type: 'object',
          required: ['codigoCliente', 'nombre', 'apellido', 'direccion', 'telefono'],
          properties: {
            id: { type: 'integer', example: 1 },
            codigoCliente: { type: 'string', example: 'CL001' },
            nombre: { type: 'string', example: 'Juan' },
            apellido: { type: 'string', example: 'Pérez' },
            direccion: { type: 'string', example: 'Av. Siempre Viva 742' },
            telefono: { type: 'string', example: '987654321' }
          }
        },
        Producto: {
          type: 'object',
          required: ['codigoProducto', 'nombre', 'descripcion', 'precio', 'stock'],
          properties: {
            id: { type: 'integer', example: 1 },
            codigoProducto: { type: 'string', example: 'PR001' },
            nombre: { type: 'string', example: 'Mouse inalámbrico' },
            descripcion: { type: 'string', example: 'Mouse óptico con conexión USB' },
            precio: { type: 'number', format: 'float', example: 49.99 },
            stock: { type: 'integer', example: 150 }
          }
        },
        Proveedor: {
          type: 'object',
          required: ['codigoProveedor', 'nombre', 'empresa', 'telefono', 'email'],
          properties: {
            id: { type: 'integer', example: 1 },
            codigoProveedor: { type: 'string', example: 'PV001' },
            nombre: { type: 'string', example: 'Carlos Ruiz' },
            empresa: { type: 'string', example: 'Tech Supplies S.A.' },
            telefono: { type: 'string', example: '912345678' },
            email: { type: 'string', example: 'proveedor@techsupplies.com' }
          }
        },
        Venta: {
          type: 'object',
          required: ['codigoVenta', 'clienteId', 'productos', 'fecha'],
          properties: {
            id: { type: 'integer', example: 1 },
            codigoVenta: { type: 'string', example: 'VN001' },
            clienteId: { type: 'integer', example: 1 },
            productos: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  productoId: { type: 'integer', example: 3 },
                  cantidad: { type: 'integer', example: 2 }
                }
              }
            },
            fecha: { type: 'string', format: 'date-time', example: '2025-04-12T14:30:00Z' },
            total: { type: 'number', format: 'float', example: 99.98 }
          }
        }
      }
    }
  },
  apis: ['./src/routes/*.ts'],
});

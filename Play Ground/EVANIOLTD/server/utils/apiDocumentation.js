// API Documentation Generator
// This generates OpenAPI/Swagger-compatible documentation

export const generateAPIDocumentation = () => {
  return {
    openapi: '3.0.0',
    info: {
      title: 'Evanio API',
      version: '1.0.0',
      description: 'Complete API documentation for Evanio platform',
      contact: {
        email: 'support@evanio.com'
      }
    },
    servers: [
      {
        url: process.env.FRONTEND_URL || 'http://localhost:5000',
        description: 'Development server'
      }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        }
      },
      schemas: {
        User: {
          type: 'object',
          properties: {
            _id: { type: 'string' },
            name: { type: 'string' },
            email: { type: 'string' },
            role: { type: 'string', enum: ['user', 'admin'] },
            language: { type: 'string' },
            timezone: { type: 'string' },
            currency: { type: 'string' },
            twoFactorEnabled: { type: 'boolean' }
          }
        },
        Order: {
          type: 'object',
          properties: {
            _id: { type: 'string' },
            orderNumber: { type: 'string' },
            service: { type: 'string' },
            amount: { type: 'number' },
            status: { type: 'string' },
            paymentStatus: { type: 'string' }
          }
        },
        Error: {
          type: 'object',
          properties: {
            message: { type: 'string' }
          }
        }
      }
    },
    paths: {
      '/api/auth/register': {
        post: {
          tags: ['Authentication'],
          summary: 'Register a new user',
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  required: ['name', 'email', 'password'],
                  properties: {
                    name: { type: 'string' },
                    email: { type: 'string' },
                    password: { type: 'string', minLength: 6 }
                  }
                }
              }
            }
          },
          responses: {
            201: {
              description: 'User created successfully',
              content: {
                'application/json': {
                  schema: { $ref: '#/components/schemas/User' }
                }
              }
            },
            400: { $ref: '#/components/responses/BadRequest' }
          }
        }
      },
      '/api/auth/login': {
        post: {
          tags: ['Authentication'],
          summary: 'Login user',
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  required: ['email', 'password'],
                  properties: {
                    email: { type: 'string' },
                    password: { type: 'string' },
                    twoFactorToken: { type: 'string', description: 'Required if 2FA is enabled' }
                  }
                }
              }
            }
          },
          responses: {
            200: {
              description: 'Login successful',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      token: { type: 'string' },
                      requires2FA: { type: 'boolean' },
                      user: { $ref: '#/components/schemas/User' }
                    }
                  }
                }
              }
            },
            401: { $ref: '#/components/responses/Unauthorized' }
          }
        }
      },
      '/api/orders/my-orders': {
        get: {
          tags: ['Orders'],
          summary: 'Get user orders',
          security: [{ bearerAuth: [] }],
          responses: {
            200: {
              description: 'List of orders',
              content: {
                'application/json': {
                  schema: {
                    type: 'array',
                    items: { $ref: '#/components/schemas/Order' }
                  }
                }
              }
            }
          }
        }
      },
      '/api/analytics/revenue': {
        get: {
          tags: ['Analytics'],
          summary: 'Get revenue report',
          security: [{ bearerAuth: [] }],
          parameters: [
            {
              name: 'period',
              in: 'query',
              schema: { type: 'string', enum: ['today', 'week', 'month', 'year', 'all', 'custom'] }
            },
            {
              name: 'startDate',
              in: 'query',
              schema: { type: 'string', format: 'date' }
            },
            {
              name: 'endDate',
              in: 'query',
              schema: { type: 'string', format: 'date' }
            }
          ],
          responses: {
            200: {
              description: 'Revenue report data'
            }
          }
        }
      },
      '/api/webhooks': {
        post: {
          tags: ['Webhooks'],
          summary: 'Create webhook',
          security: [{ bearerAuth: [] }],
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  required: ['name', 'url', 'events'],
                  properties: {
                    name: { type: 'string' },
                    url: { type: 'string', format: 'uri' },
                    events: {
                      type: 'array',
                      items: { type: 'string' }
                    }
                  }
                }
              }
            }
          },
          responses: {
            201: {
              description: 'Webhook created'
            }
          }
        }
      }
    },
    components: {
      responses: {
        BadRequest: {
          description: 'Bad request',
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/Error' }
            }
          }
        },
        Unauthorized: {
          description: 'Unauthorized',
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/Error' }
            }
          }
        }
      }
    }
  };
};



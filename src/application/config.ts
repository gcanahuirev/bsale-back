import Joi from 'joi';

export const configSchema = Joi.object({
  NODE_ENV: Joi.string().valid('development', 'production', 'test'),
  PORT: Joi.number().default(4000),
  DATABASE_URL: Joi.string(),
});

export const configurations = () => ({
  api: {
    env: process.env.NODE_ENV || 'development',
    port: parseInt(process.env.PORT, 10) || 4000,
  },
});

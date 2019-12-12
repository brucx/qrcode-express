import * as express from 'express';
import * as QRCode from 'qrcode';
import Pino = require('express-pino-logger');

const pino = Pino();

/**
 * WEB 服务
 */
const app = express();

app.use(pino);

app.post('/', async (req, resp) => {
  const { body } = req;
  pino.logger.info({ body });
  resp.send('OK');
});

/**
 * 生成二维码
 */
app.get('/qrcode', async (req, resp) => {
  const {content} = req.query;
  pino.logger.info({ content });
  try {
    resp.writeHead(200, { 'Content-Type': 'image/png' });
    QRCode.toFileStream(resp, content);
  } catch (error) {
    pino.logger.error(error);
    resp.send({ error });
  }
});

const server = app.listen(3000, '0.0.0.0', () => {
  pino.logger.info('二维码生成服务已启动, 地址是：http://0.0.0.0:3000');
});
